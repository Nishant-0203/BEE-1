const path = require("path");
const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const publicDirectory = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET") {
    // Serve static files (CSS, JS, etc.)
    if (url.startsWith("/assets/")) {
      const filePath = path.join(__dirname, url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(`Error reading ${url}:`, err);
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          const ext = path.extname(filePath).toLowerCase();
          const contentType = {
            ".css": "text/css",
            ".jpg": "image/jpeg",
            ".png": "image/png",
            ".js": "application/javascript",
          }[ext] || "application/octet-stream";

          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
    } 
    // Serve homepage
    else if (url === "/table") {
      serveFile("Table.html", "text/html", res);
    }
    else if (url == "/home"){
      serveFile("index.html", "text/html", res);
    } 
    else if (url == "/contact"){
      serveFile("contact.html", "text/html", res);
    } 
    else if (url == "/menu"){
      serveFile("Menu.html", "text/html", res);
    } 

    // Serve register page
    else if (url === "/register") {
      serveFile("register.html", "text/html", res);
    } 
    // Serve bookings page
    else if (url === "/viewBookings") {
        serveFile("viewBookings.html", "text/html", res);
      }
    // Serve bookings data
    else if (url === "/bookings") {
      console.log("Serving Booking Data");
      fs.readFile("Bookings.json", "utf8", (err, data) => {
        if (err) {
          console.error("Error reading Bookings.json:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Failed to load bookings" }));
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        }
      });
    } 
    // 404 for other GET routes
    else {
      console.log("404 Not Found for GET", url);
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  } 
  else if (method === "POST" && url === "/register") {
    // Handle POST requests for /register
    console.log("Handling POST request for /register");
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const userData = qs.decode(body);

      // Read existing data from User.json
      let users = [];
      if (fs.existsSync("Bookings.json")) {
        const existingData = fs.readFileSync("Bookings.json", "utf8");
        if (existingData) {
          users = JSON.parse(existingData);
        }
      }

      // Add new user data
      users.push(userData);
      fs.writeFile("Bookings.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.error("Error writing to Bookings.json:", err);
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error");
        } else {
          console.log("User data saved successfully:", userData);
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("Registration successful!");
        }
      });
    });
  } 
  else {
    console.log("404 Not Found for", method, url);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Helper function to serve files
function serveFile(filePath, contentType, res) {
  const fullPath = path.join(__dirname, filePath);
  fs.readFile(fullPath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}:`, err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    }
  });
}

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
