import express from 'express';
import * as friendshipController from './friendship.controller.js';
import { auth } from '../../middlewares/jwtAuth.js';

const router = express.Router();

router.get('/get-friends/:userId', auth, friendshipController.getFriends);
router.get('/get-pending-requests', auth, friendshipController.getPendingRequests);
router.get('/toggle-friendship/:friendId', auth, friendshipController.toggleFriendship);
router.get('/response-to-request/:friendId/:status', auth, friendshipController.respondToRequest);

export default router;
