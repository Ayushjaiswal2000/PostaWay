import express from 'express';
import { createComment, updateComment, deleteComment,getCommentsByPostId } from '../comments/comments.controller.js';
import { auth } from '../../middlewares/jwtAuth.js'; // Adjust path

const router = express.Router();

router.route('/:id')
.post(auth,createComment)
.get(getCommentsByPostId)
    .put(auth, updateComment)
    .delete(auth,deleteComment);

export default router;
