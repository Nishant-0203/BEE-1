import express from "express"
import { signin, signout, signup } from "../controller/auth.controller.js"
import { verifyToken } from "../utils/verifyUser.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()

router.post("/signup", upload.single("avatar"), signup);
router.post("/signin", signin);
router.get("/signout", verifyToken, signout);

export default router
