import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const { jwtToken } = req.cookies;
  jwt.verify(jwtToken, "codinNinjas", (err, data) => {
    if (err) {
      res.status(400).send("unauthorized! login to continue!");
    } else {
      // console.log("data is", data);
      req._id = data._id;
      req.user = data.user;
      next();
    }
  });
};


export const checkCommentOwnership = async (req, res, next) => {
  const { id } = req.params;
  const userId = req._id;

  try {
      const comment = await Comment.findById(id);

      if (!comment) {
          return res.status(404).json({ error: 'Comment not found' });
      }

      if (comment.user.toString() !== userId) {
          return res.status(403).json({ error: 'You are not authorized to perform this action' });
      }

      next();
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
