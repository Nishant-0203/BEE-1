import express from "express";
import { getFaqResponses } from "../controller/faq.controller.js";

const router = express.Router();
router.get("/", (_, res) => {
    res.render("faq");
});
router.post("/", getFaqResponses);

export default router;