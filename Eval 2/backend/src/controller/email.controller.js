import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to send email
export const sendEmailWithPDF = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required!" });
    }

    // PDF file path
    const pdfPath = path.join(__dirname, "../generated/MyNotes.pdf");

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ success: false, message: "PDF file not found!" });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "goyalhardik654@gmail.com", // Replace with your email
        pass: "uqal blrt jtid tlzj", // Use App Password if using Gmail
      },
    });

    // Email options
    const mailOptions = {
      from: "goyalhardik654@gmail.com",
      to: email,
      subject: "Your Notes PDF",
      text: "Here is your notes PDF attachment.",
      attachments: [
        {
          filename: "MyNotes.pdf",
          path: pdfPath,
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Failed to send email!" });
  }
};
