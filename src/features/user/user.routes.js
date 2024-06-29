import express from "express";
import {
  getUserDetails,
  getAllUsers,
  updateUserProfile,
  userRegisteration,
  userLogin,
  updateUserPassword,
  userLogout,
} from "../user/user.cotroller.js";
import { auth } from "../../middlewares/jwtAuth.js";

const router = express.Router();

router.route("/signup").post(userRegisteration);
router.route("/signin").post(userLogin);
router.route("/get-details/:userId").get(getUserDetails);
router.route("/get-all-details").get(getAllUsers);
router.route("/logout").get(userLogout);
router.route("/update-details/:userId").put(auth, updateUserProfile);

export default router;
