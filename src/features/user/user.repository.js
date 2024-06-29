import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import {
  compareHashedPassword,
  hashPassword,
} from "../../utils/hashPassword.js";

const UserModel = mongoose.model("User", userSchema);

export const userRegisterationRepo = async (userData) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return { success: true, res: newUser };
  } catch (error) {
    // throw new Error("email duplicate");
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
export const userLoginRepo = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      let passwordValidation = await compareHashedPassword(
        password,
        user.password
      );
      if (passwordValidation) {
        return { success: true, res: user };
      } else {
        return {
          success: false,
          error: { statusCode: 400, msg: "invalid credentials" },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

export const getUserDetailsRepo = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return { success: false, error: { statusCode: 404, msg: "User not found" } };
    }
    return { success: true, res: user };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const getAllUsersRepo = async () => {
  try {
    const users = await UserModel.find();
    return { success: true, res: users };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const updateUserProfileRepo = async (userId, updateData) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return { success: false, error: { statusCode: 404, msg: "User not found" } };
    }
    return { success: true, res: updatedUser };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

export const updateUserPasswordRepo = async (_id, newpassword, next) => {
  try {
    const user = await UserModel.findOne({ _id });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      const newHashedPassword = await hashPassword(newpassword, next);
      user.password = newHashedPassword;
      let updatedUser = await user.save();
      return { success: true, res: updatedUser };
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
