import express from 'express';
const router = express.Router();
import PostController from './post.controller.js';
import { auth } from '../../middlewares/jwtAuth.js'; // Assuming auth middleware for user authentication

// Define routes using router.route format
router.route('/')
    .post(auth, PostController.createPost)
    .get(PostController.getAllPosts);

router.route('/:id')
    .get(PostController.getPostById)
    .put(auth, PostController.updatePost)
    .delete(auth, PostController.deletePost);

export { router }; // Explicitly export router instead of default
