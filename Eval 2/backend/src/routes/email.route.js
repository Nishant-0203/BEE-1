import express from "express";
import { sendEmailWithPDF } from "../controller/email.controller.js";

const router = express.Router();

router.post("/send-email", sendEmailWithPDF);

export default router;
