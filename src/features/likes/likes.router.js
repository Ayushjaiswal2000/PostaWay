import express from "express";
import { toggleLikeController, getLikesCountController } from "../likes/likes.controller.js";
import {auth} from "../../middlewares/jwtAuth.js"; // Assuming you have auth middleware

const router = express.Router();


router.route('/toggle/:id').get(auth, toggleLikeController);
router.get('/:id', getLikesCountController);

export default router;
