import mongoose from 'mongoose';

const { Schema } = mongoose;

export const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }
},{ strictPopulate: false });

export default mongoose.model('Like', LikeSchema);
