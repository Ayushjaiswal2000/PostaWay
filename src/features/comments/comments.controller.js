import * as CommentRepository from '../comments/comments.repository.js'; // Adjust path as necessary

// Create a new comment
export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const  postId =req.params.id;
        const userId = req._id;


        console.log("content:" +content );
        console.log("userId:" +userId );
        

        const commentData = {
            content,
            post: postId,
            user:userId
        };

        const comment = await CommentRepository.createComment(commentData);

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req._id;
        const { content } = req.body;

        // Find the comment by ID
        const comment = await CommentRepository.findCommentById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the user is authorized to update the comment
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Update the comment
        const updatedComment = await CommentRepository.updateComment(id, { content });

        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req._id;
        
        const comment = await CommentRepository.findCommentById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if the user is authorized to update the comment
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const deletedComment = await CommentRepository.deleteComment(id);

        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Example of finding comments by post ID
export const getCommentsByPostId = async (req, res) => {
    try {
        const postId  = req.params.id;

        const comments = await CommentRepository.findCommentsByPostId(postId);

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
