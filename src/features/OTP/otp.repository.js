import OTP from "./otp.schema.js";

export const saveOTP = async (email, otp) => {
  const otpEntry = new OTP({ email, otp });
  await otpEntry.save();
  return otpEntry;
};

export const getOTP = async (email, otp) => {
  return await OTP.findOne({ email, otp });
};

export const deleteOTP = async (email) => {
   return await OTP.deleteMany({ email });
};
