import mongoose from "mongoose";
import { CommentSchema } from '../comments/comments.schema.js'; // Adjust path as necessary
import { PostSchema } from "../post/post.schema.js";

const PostModel = mongoose.model("Post", PostSchema);
const CommentModel = mongoose.model('Comment', CommentSchema);

export const createComment = async (commentData) => {
    try {
        // Check if the post exists
        const post = await PostModel.findById(commentData.post);
        if (!post) {
            throw new Error('Post not found');
        }

        // Create the new comment
        const comment = new CommentModel(commentData);
        const savedComment = await comment.save();

        // Update the post to include the new comment's content
        await PostModel.findByIdAndUpdate(
            commentData.post,
            { $push: { comments: { content: savedComment.content, user: savedComment.user } } },
            { new: true }
        );

        return savedComment;
    } catch (error) {
        throw new Error(`Could not create comment: ${error.message}`);
    }
};

// Other functions remain unchanged
export const findCommentById = async (commentId) => {
    try {
        return await CommentModel.findById(commentId);
    } catch (error) {
        throw new Error(`Could not find comment: ${error.message}`);
    }
};

export const updateComment = async (commentId, newData) => {
    try {
        return await CommentModel.findByIdAndUpdate(commentId, newData, { new: true });
    } catch (error) {
        throw new Error(`Could not update comment: ${error.message}`);
    }
};

export const deleteComment = async (commentId) => {
    try {
        return await CommentModel.findByIdAndDelete(commentId);
    } catch (error) {
        throw new Error(`Could not delete comment: ${error.message}`);
    }
};

export const findCommentsByPostId = async (postId) => {
    try {
        return await CommentModel.find({ post: postId });
    } catch (error) {
        throw new Error(`Could not find comments: ${error.message}`);
    }
};
