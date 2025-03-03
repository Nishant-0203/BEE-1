import fs from "fs";

const FILE_PATH = "contactMessages.json";

const readMessages = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeMessages = (messages) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(messages, null, 2));
};

export const saveMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newMessage = { id: Date.now(), name, email, message, date: new Date() };
  const messages = readMessages();
  messages.push(newMessage);
  writeMessages(messages);

  res.status(201).json({ message: "Message saved successfully." });
};