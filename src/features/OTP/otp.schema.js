import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "Please provide a valid email address"],
  },
  otp: {
    type: String,
    required: [true, "OTP is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTP expires after 5 minutes
  },
});

export default mongoose.model("OTP", otpSchema);
