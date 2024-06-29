import { PostSchema  } from "../post/post.schema.js";

class PostRepository {
    async createPost(data) {
        try {
            const post = new PostSchema(data); // Use PostSchema here
            return await post.save();
        } catch (error) {
            throw new Error(`Could not create post: ${error.message}`);
        }
    }

    async getPostById(postId) {
        try {
            return await PostSchema.findById(postId).populate('user');
        } catch (error) {
            throw new Error(`Could not find post: ${error.message}`);
        }
    }

    async getAllPosts() {
        try {
            return await PostSchema.find().populate('user');
        } catch (error) {
            throw new Error(`Could not fetch posts: ${error.message}`);
        }
    }

    async updatePost(postId, data) {
        try {
            return await PostSchema.findByIdAndUpdate(postId, data, { new: true });
        } catch (error) {
            throw new Error(`Could not update post: ${error.message}`);
        }
    }

    async deletePost(postId) {
        try {
            return await PostSchema.findByIdAndDelete(postId);
        } catch (error) {
            throw new Error(`Could not delete post: ${error.message}`);
        }
    }

    async getUserPosts(userId) {
        try {
            return await PostSchema.find({ user: userId });
        } catch (error) {
            throw new Error(`Could not fetch user posts: ${error.message}`);
        }
    }
}

export default new PostRepository();
