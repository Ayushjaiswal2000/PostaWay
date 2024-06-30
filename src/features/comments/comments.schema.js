import mongoose from 'mongoose';

const { Schema } = mongoose;

export const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, );

export default mongoose.model('Comment', CommentSchema);
