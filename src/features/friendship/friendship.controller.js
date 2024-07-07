import * as friendshipRepository from './friendship.repository.js';
import UserModel from '../user/user.schema.js';

export const getFriends = async (req, res) => {
  try {
    const friends = await friendshipRepository.getFriends(req.params.userId);
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await friendshipRepository.getPendingRequests(req.user._id);
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleFriendship = async (req, res) => {
  try {
    const requester = { userId: req.user._id, name: req.user.name };

    const recipientUser = await UserModel.findById(req.params.friendId).select('name');
    if (!recipientUser) {
      return res.status(404).json({ message: 'Friend not found' });
    }
    const recipient = { userId: req.params.friendId, name: recipientUser.name };

    const friendship = await friendshipRepository.toggleFriendship(requester, recipient);
    res.status(200).json(friendship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const respondToRequest = async (req, res) => {
  try {
    const status = req.params.status; // 'accepted' or 'rejected'
    const userId = req.user._id; // Get user ID from the request (ensure this is set by auth middleware)
    const friendId = req.params.friendId; // Get friend request ID from the request parameters

    const friendship = await friendshipRepository.respondToRequest(userId, friendId, status);
    res.status(200).json(friendship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
