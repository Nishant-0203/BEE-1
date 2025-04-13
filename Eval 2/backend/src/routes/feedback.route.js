import express from 'express';
import path from 'path';
import fs from 'fs/promises'; // Use fs/promises for async file operations
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const router = express.Router();

router.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies



router.post('/', async (req, res) => {
    const { name, email, feedback } = req.body;
  
    if (!name || !email || !feedback) {
      return res.status(400).json({ error: 'Please fill in all fields.' });
    }
  
    const filePath = path.join(__dirname, '../contactMessages.json');
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const messages = JSON.parse(data);
  
      const newFeedback = {
        name,
        email,
        feedback,
        createdAt: new Date()
      };
  
      messages.push(newFeedback);
      await fs.writeFile(filePath, JSON.stringify(messages, null, 2), 'utf8');
  
      res.status(200).json({ message: 'Feedback submitted successfully.' });
    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ error: 'Error saving feedback.' });
    }
  });
  router.get('/', async (req, res) => {
    const filePath = path.join(__dirname, '../contactMessages.json');
    try {
      const data = await fs.readFile(filePath, 'utf8');
      const messages = JSON.parse(data);
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error reading feedbacks:', error);
      res.status(500).json({ error: 'Failed to load feedbacks.' });
    }
  });
  

export default router;