import express from "express";
import { generateChatResponse } from "../controller/chat.controller.js";

const router = express.Router();

router.post("/", generateChatResponse);

export default router;