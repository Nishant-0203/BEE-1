import express from 'express';
import path from 'path';
import fs from 'fs/promises'; // Use fs/promises for async file operations
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Path to contactMessages.json - fixed to be consistent
const MESSAGES_FILE_PATH = path.join(dirname(dirname(__dirname)), 'feedbackMessages.json');

// GET route to render the feedback page with existing messages
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(MESSAGES_FILE_PATH, 'utf8');
    const feedbacks = JSON.parse(data);
    res.render('feedback', { feedbacks });
  } catch (error) {
    console.error('Error reading feedbacks:', error);
    res.render('feedback', { feedbacks: [] });
  }
});

// GET route to fetch all feedback as JSON (API endpoint)
// router.get('/api', async (req, res) => {
//   try {
//     const data = await fs.readFile(MESSAGES_FILE_PATH, 'utf8');
//     const messages = JSON.parse(data);
//     res.status(200).json(messages);
//   } catch (error) {
//     console.error('Error reading feedbacks:', error);
//     res.status(500).json({ error: 'Failed to load feedbacks.' });
//   }
// });

// POST route to save feedback
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields.' });
  }

  try {
    let messages = [];
    try {
      const data = await fs.readFile(MESSAGES_FILE_PATH, 'utf8');
      messages = JSON.parse(data);
    } catch (readError) {
      // If file doesn't exist or is invalid, start with empty array
      console.log('Creating new messages file');
    }

    const newFeedback = {
      id: Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString()
    };

    messages.push(newFeedback);
    await fs.writeFile(MESSAGES_FILE_PATH, JSON.stringify(messages, null, 2), 'utf8');

    // Redirect back to the feedback page after submission
    res.redirect('/api/feedback');
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Error saving feedback.' });
  }
});

export default router;