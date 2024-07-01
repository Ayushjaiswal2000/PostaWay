import mongoose from "mongoose";
import {LikeSchema} from "../likes/likes.schema.js";
import { userSchema } from "../user/user.schema.js";

// Get likes for a post
const LikeModal = mongoose.model("Like", LikeSchema);
const UserModel = mongoose.model("User", userSchema);

export const toggleLike = async (userId, objectId, type) => {
    const like = await LikeModal.findOne({ user: userId, [type.toLowerCase()]: objectId });
    if (like) {
        await LikeModal.deleteOne({ _id: like._id });
        return { action: 'unliked' };
    } else {
        const newLike = new LikeModal({ user: userId, [type.toLowerCase()]: objectId });
        await newLike.save();
        return { action: 'liked', like: newLike };
    }
};

export const getLikesWithUsers = async (objectId) => {
    return await LikeModal.find({ $or: [{ post: objectId }, { comment: objectId }] })
        .populate('users', 'name');
};
