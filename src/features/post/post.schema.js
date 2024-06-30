import mongoose from "mongoose";

const { Schema } = mongoose; // Destructure Schema from mongoose

export const PostSchema = new Schema({
    caption: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    comments: [{
        content: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    }]
});

export default mongoose.model("Post", PostSchema);
