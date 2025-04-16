import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// NoteMaster context for the AI to refer to
const NOTEMASTER_CONTEXT = `
NoteMaster is an all-in-one note-taking platform where students and teachers can create, share, and manage notes efficiently.
Key features include:
- Creating and editing notes with rich text formatting
- Uploading PDFs and other file formats
- Sharing notes with individuals or communities
- Real-time collaboration on notes
- Organizing notes in folders
- Starring/favoriting important notes
- PDF export functionality
- Free for all students and educators
- Coming soon: Dark mode, offline access, mobile app, and multi-language support
`;

export const getFaqResponses = async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    // Configure the model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    // Generate the prompt with context
    const prompt = `
      You are NoteBot, a helpful chatbot assistant for NoteMaster note-taking platform.
      Keep your answers brief, friendly, and focused on NoteMaster functionality.
      
      Context about NoteMaster:
      ${NOTEMASTER_CONTEXT}
      
      User question: ${message}
      
      Your response:
    `;
    
    // Generate response from Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return res.status(200).json({ reply: text });
  } catch (error) {
    console.error("Error generating chat response:", error);
    return res.status(500).json({ 
      error: "Failed to generate response", 
      details: error.message 
    });
  }
};