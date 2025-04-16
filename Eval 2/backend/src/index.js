import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import connectDB from "./db/dbConnect.js";
import contactRouter from "./routes/contact.route.js";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
import emailRouter from "./routes/email.route.js";
import feedbackRouter from "./routes/feedback.route.js";
import faqRouter from "./routes/faq.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: "./env" });
connectDB();

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Middleware to parse JSON, cookies, and URL encoded data
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use("/api/faq", faqRouter); 
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.use("/api/email", emailRouter);
app.use("/api/contact", contactRouter);
app.use("/api/feedback", feedbackRouter);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});