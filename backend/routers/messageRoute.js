import express from "express";
import { getAllMessages, sendMessage } from "../controllers/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router =express.Router();

router.route("/send").post(sendMessage);
router.route("/all").get(isAdminAuthenticated,getAllMessages);

export default router;