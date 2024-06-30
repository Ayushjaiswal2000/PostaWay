import mongoose from "mongoose";
import {PostSchema} from "../post/post.schema.js";


const PostModel = mongoose.model("Post", PostSchema);

class PostRepository {
    async createPost(data) {
        try {
            const post = new PostModel(data); // Use PostSchema here
            return await post.save();
        } catch (error) {
            throw new Error(`Could not create post: ${error.message}`);
        }
    }

    async getPostById(postId) {
        try {
            return await PostModel.findById(postId);
        } catch (error) {
            throw new Error(`Could not find post: ${error.message}`);
        }
    }

    async getAllPosts() {
        try {
            return await PostModel.find();
        } catch (error) {
            throw new Error(`Could not fetch posts: ${error.message}`);
        }
    }
    

    async updatePost(postId, postData) {
        try {
            return await PostModel.findByIdAndUpdate(postId, postData, { new: true });
            
        } catch (error) {
            throw new Error(`Could not update post: ${error.message}`);
        }
    }

    async deletePost(postId) {
        try {
            return await PostModel.findByIdAndDelete(postId);
        } catch (error) {
            throw new Error(`Could not delete post: ${error.message}`);
        }
    }

    async getUserPosts(userId) {
        try {
            return await PostModel.find({ user: userId });
        } catch (error) {
            throw new Error(`Could not fetch user posts: ${error.message}`);
        }
    }
}

export default new PostRepository();
