import mongoose from "mongoose";
import { FriendshipSchema } from "./friendship.schema.js";
import UserModel from '../user/user.schema.js'; // Assuming you have a user model

const FriendShipModel = mongoose.model('Friendship', FriendshipSchema);

const getUserDetails = async (userId) => {
  return await UserModel.findById(userId).select('name');
};

export const createFriendship = async (requester, recipient) => {
  const friendship = new FriendShipModel({ 
    requester: { userId: requester.userId, name: requester.name },
    recipient: { userId: recipient.userId, name: recipient.name }
  });
  return await friendship.save();
};

export const getFriends = async (userId) => {
  return await FriendShipModel.find({
    $or: [{ "requester.userId": userId, status: 'accepted' }, { "recipient.userId": userId, status: 'accepted' }]
  }).populate({
    path: 'recipient.name',
    path: "requester.name"// Adjust fields as needed
  });
};

export const getPendingRequests = async (userId) => {
  return await FriendShipModel.find({ "recipient.userId": userId, status: 'pending' })
    .populate({
      path: 'requester.name'// Adjust fields as needed
    });
};

export const respondToRequest = async (userId, friendId, status) => {
  // Check if the friend request exists and if the current user is the requester
  const friendship = await FriendShipModel.findOne({
    "requester.userId": userId,
    "recipient.userId": friendId
  });

  if (!friendship) {
    throw new Error('Friend request not found or you are not the requester');
  }

  // Update the status of the friend request
  return await FriendShipModel.findOneAndUpdate(
    { "recipient.userId": friendId },
    { status },
    { new: true }
  );
};

export const toggleFriendship = async (requester, recipient) => {
  const friendship = await FriendShipModel.findOne({
    $or: [
      { "requester.userId": requester.userId, "recipient.userId": recipient.userId }, 
      { "requester.userId": recipient.userId, "recipient.userId": requester.userId }
    ]
  });

  if (friendship) {
    return await FriendShipModel.deleteOne({ _id: friendship._id });
  } else {
    return await createFriendship(requester, recipient);
  }
};
