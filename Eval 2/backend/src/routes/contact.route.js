import express from "express";
import { saveMessage } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", saveMessage);

export default router;