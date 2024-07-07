import mongoose from 'mongoose';

const { Schema } = mongoose;

export const FriendshipSchema = new Schema({
  requester: {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true }
  },
  recipient: {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});

export default mongoose.model('Friendship', FriendshipSchema);
