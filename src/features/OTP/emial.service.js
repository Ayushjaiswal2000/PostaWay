import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codingninjas2k16@gmail.com",
    pass: "slwvvlczduktvhdj",
  },
});

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};
