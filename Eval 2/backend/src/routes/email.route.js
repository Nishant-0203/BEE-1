import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/send-email", async (req, res) => {
  try {
    const { email, pdfBase64 } = req.body;

    if (!email || !pdfBase64) {
      return res.status(400).json({ success: false, message: "Missing email or PDF data" });
    }

    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", // Replace with verified sender
      to: email,
      subject: "Your Notes PDF",
      html: "<p>Here is your notes PDF.</p>",
      attachments: [
        {
          filename: "MyNotes.pdf",
          content: pdfBase64,
          contentType: "application/pdf",
        },
      ],
    });

    if (response.error) {
      return res.status(500).json({ success: false, message: "Failed to send email" });
    }

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ success: false, message: "Server error while sending email" });
  }
});

export default router;
