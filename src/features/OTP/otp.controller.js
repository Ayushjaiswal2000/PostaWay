import crypto from "crypto";
import User from "../user/user.schema.js";
import { saveOTP, getOTP, deleteOTP } from "./otp.repository.js";
import { sendOTPEmail } from "./emial.service.js";
import bcrypt from "bcrypt";

export const generateOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  const otp = crypto.randomInt(100000, 999999).toString();
  await saveOTP(email, otp);
  await sendOTPEmail(email, otp);

  res.status(200).send("OTP sent to email");
};

export const validateOTP = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) return res.status(400).send("Email, OTP, and new password are required");

  const otpEntry = await getOTP(email, otp);
  if (!otpEntry) return res.status(400).send("Invalid or expired OTP");

  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");
   let password = await bcrypt.hash(newPassword, 12);

  user.password = password;
  await user.save();
  await deleteOTP(email);

  res.status(200).send("Password reset successful");
};
