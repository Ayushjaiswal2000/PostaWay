import PostRepository from "./post.repository.js"

class PostController {
    async createPost(req, res) {
        try {
            const data = {
                caption: req.body.caption,
                imageUrl: req.body.imageUrl,
                user: req.user._id
            };
            const post = await PostRepository.createPost(data);
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getPostById(req, res) {
        try {
            const post = await PostRepository.getPostById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await PostRepository.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updatePost(req, res) {
        try {
            const post = await PostRepository.getPostById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (post.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const updatedPost = await PostRepository.updatePost(req.params.id, req.body);
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletePost(req, res) {
        try {
            const post = await PostRepository.getPostById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }

            if (post.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            await PostRepository.deletePost(req.params.id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PostController();
