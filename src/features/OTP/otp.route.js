import express from "express";
import { generateOTP, validateOTP } from "./otp.controller.js";

const router = express.Router();

router.post("/send", generateOTP);
router.post("/verify", validateOTP);

export default router;
