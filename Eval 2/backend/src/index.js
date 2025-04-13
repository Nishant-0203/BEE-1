import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { promises as fs } from 'fs'; // ✅ Add this
import connectDB from "./db/dbConnect.js";
import contactRouter from "./routes/contact.route.js";
import authRouter from "./routes/auth.route.js";
import noteRouter from "./routes/note.route.js";
import emailRouter from "./routes/email.route.js";
import feedbackRouter from "./routes/feedback.route.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: "./env" });

// Connect to the database
connectDB();

// Create Express app
const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Middleware to parse JSON, cookies, and URL encoded data
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);
app.use("/api/email", emailRouter);
app.use("/api/feedback", feedbackRouter);

// Feedback Form Routes
app.get('/feedback', async (req, res) => {
  const filePath = path.join(__dirname, 'contactMessages.json');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const feedbacks = JSON.parse(data);
    res.render('feedback', { feedbacks });
  } catch (error) {
    res.render('feedback', { feedbacks: [] });
  }
});

app.post('/submit-feedback', async (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  const filePath = path.join(__dirname, '../contactMessages.json');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const messages = JSON.parse(data);

    const newFeedback = { name, email, feedback };
    messages.push(newFeedback);

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf8');
    res.status(200).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Error saving feedback.' });
  }
});

// ✅ FAQ Chatbot Page Route
app.get('/faq', (req, res) => {
  res.render('faq'); // This will render views/faq.ejs
});

// Contact Route
app.use("/contact", contactRouter);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;