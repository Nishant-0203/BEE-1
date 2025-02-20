const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Handle static files
    if (method === "GET" && url.startsWith("/assets")) {
        const filePath = path.join(__dirname, url);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error(`Error: File not found - ${filePath}`);
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("File Not Found");
            } else {
                const ext = path.extname(filePath);
                const contentType = {
                    ".css": "text/css",
                    ".js": "application/javascript",
                    ".woff2": "font/woff2",
                    ".woff": "font/woff",
                    ".ttf": "font/ttf",
                    ".png": "image/png",
                    ".jpg": "image/jpeg",
                }[ext] || "application/octet-stream";

                res.writeHead(200, { "Content-Type": contentType });
                res.end(data);
            }
        });
        return;
    }

    // Handle other routes
    if (method === "GET") {
        if (url === "/") {
            console.log("Handling / route (GET)");
            fs.readFile("User.json", "utf8", (err, data) => {
                if (err) {
                    console.error("Error reading User.json:", err);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(data);
                }
            });
        } else if (url === "/allstudent") {
            console.log("Handling /allstudent route (GET)");
            fs.readFile("allstudent.html", "utf8", (err, data) => {
                if (err) {
                    console.error("Error reading allstudent.html:", err);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        } else if (url === "/register") {
            console.log("Handling /register route (GET)");
            fs.readFile("register.html", "utf8", (err, data) => {
                if (err) {
                    console.error("Error reading register.html:", err);
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Server Error");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        } else {
            console.log(`Invalid route: ${url}`);
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
        }
    } else if (method === "POST") {
        if (url === "/register") {
            console.log("Handling /register route (POST)");
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });

            req.on("end", () => {
                // Initialize User.json if it doesn't exist
                if (!fs.existsSync("User.json")) {
                    fs.writeFileSync("User.json", JSON.stringify([]));
                }

                let readdata = fs.readFileSync("User.json", "utf-8");
                let users = [];
                try {
                    users = JSON.parse(readdata);
                } catch (err) {
                    console.error("Error parsing JSON:", err);
                }

                const newUser = qs.decode(body);
                users.push(newUser);

                fs.writeFile("User.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.error("Error writing to User.json:", err);
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end("Server Error");
                    } else {
                        console.log("User data inserted successfully:", newUser);
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("Registration successful!");
                    }
                });
            });
        } else {
            console.log(`Invalid POST route: ${url}`);
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found in POST request");
        }
    } else {
        console.log(`Invalid method: ${method}`);
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed");
    }
});

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
