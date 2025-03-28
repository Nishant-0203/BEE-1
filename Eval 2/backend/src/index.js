import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./db/dbConnect.js";
import contactRouter from "./routes/contact.route.js";
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"
import emailRouter from "./routes/email.route.js"
dotenv.config({ path: "./env" });

// Connect to the database
connectDB();
const app = express();


// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// CORS configuration
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.use("/api/email", emailRouter);
app.use("/contact", contactRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
