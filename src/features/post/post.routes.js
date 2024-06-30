import express from 'express';
import {createPost,getPostById, getAllPosts,updatePost,deletePost} from './post.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'upload' });

// Define routes using router.route format
router.route('/')
    .post(auth, upload.single('imageUrl'),createPost)
    .get(getAllPosts);

router.route('/:id')
    .get(getPostById)
    .put(auth, updatePost)
    .delete(auth,deletePost);

export default router;
