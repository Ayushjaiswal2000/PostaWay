import PostRepository from "./post.repository.js"


export const createPost = async (req, res) => {
    try {
        // Extract caption and user ID from request
        const { caption } = req.body;
        const userId = req.user._id; // Assuming req.user._id is available after authentication

        // Save file path or URL from multer upload
        const imageUrl = req.file.path; // Adjust depending on how multer stores the file path

        // Create new post object
        const postData = {
            caption,
            imageUrl,
            user: userId
        };

        // Call repository function to save post
        const post = await PostRepository.createPost(postData);

        // Respond with the created post
        res.status(201).json(post);
    } catch (error) {
        if (error instanceof multer.MulterError) {
            // Multer error handling
            res.status(400).json({ success: false, error: error.message });
        } else {
            // Other errors
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
    export const getPostById = async(req, res)=> {
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

 // post.controller.js
 export const getPost = async (req, res) => {
    try {
      const userId = req._id;
      console.log("User ID:", userId);
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Example: Fetch user's posts using userId
      const posts = await PostRepository.getUserPosts(userId);
  
      if (!posts || posts.length === 0) {
        return res.status(404).json({ error: 'No posts found for this user' });
      }
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


    export  const  getAllPosts = async(req, res)  =>{
        try {
            const posts = await PostRepository.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    export const updatePost = async (req, res) => {
        try {
            const post = await PostRepository.getPostById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
    
            if (post.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
    
            const { caption } = req.body;
            let imageUrl = post.imageUrl;
    
            // Check if a new file is uploaded
            if (req.file) {
                imageUrl = req.file.path;
            }
    
            const postData = {
                caption,
                imageUrl
            };
    
            const updatedPost = await PostRepository.updatePost(req.params.id, postData);
            res.status(200).json(updatedPost);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    export const  deletePost= async(req, res) =>{
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



