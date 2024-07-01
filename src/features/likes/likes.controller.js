import * as LikeRepository from '../likes/likes.repository.js';
import mongoose from "mongoose";
import { CommentSchema } from '../comments/comments.schema.js'; // Adjust path as necessary
import { PostSchema } from "../post/post.schema.js";
import { LikeSchema } from "../likes/likes.schema.js";

const PostModel = mongoose.model("Post", PostSchema);
const CommentModel = mongoose.model('Comment', CommentSchema);
const LikeModel = mongoose.model("Like", LikeSchema);

// Helper function to validate object existence
const validateObjectExistence = async (type, objectId) => {
    if (type === 'Post') {
        return await PostModel.findById(objectId);
    } else if (type === 'Comment') {
        return await CommentModel.findById(objectId);
    }
    return null;
};

// Like a post or comment
export const toggleLikeController = async (req, res) => {
    try {
        const userId = req._id; // Assuming `userId` is set in the auth middleware
        const { type } = req.query;
        const objectId = req.params.id;

        if (!['Post', 'Comment'].includes(type)) {
            return res.status(400).send({ error: 'Invalid type' });
        }

        const object = await validateObjectExistence(type, objectId);
        if (!object) {
            return res.status(404).send({ error: `${type} not found` });
        }

        const result = await LikeRepository.toggleLike(userId, objectId, type);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get likes count for a post or comment
export const getLikesCountController = async (req, res) => {
    try {
        const objectId = req.params.id;

        const count = await LikeRepository.getLikesCount(objectId);
        res.send({ count });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
