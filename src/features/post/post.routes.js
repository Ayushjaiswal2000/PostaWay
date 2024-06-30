import express from 'express';
import {createPost,getPostById, getAllPosts,updatePost,deletePost,getPost} from './post.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'upload' });

// Define routes using router.route format
router.route('/')
    .post(auth, upload.single('imageUrl'),createPost)
    .get(auth , getPost);

    router.route("/all").get(getAllPosts);

router.route('/:id')
    .get(getPostById)
    .put(auth, upload.single('imageUrl'), updatePost)
    .delete(auth,deletePost);

export default router;
