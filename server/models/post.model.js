import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: [{
        type: {
            type: String,
            enum: ['text', 'image', 'video', 'link'],
            required: true
        },
        data: {
            type: String,
            trim: true
        },
        url: {
            type: String,
            trim: true
        },
        linkText: {
            type: String,
            trim: true
        },
        imageUrl: {
            type: String,
            trim: true
        },
        paragraphs: [{
            type: String,
            trim: true
        }]
    }],
    excerpt: {
        type: String,
        required: true,
        trim: true
    },
    featuredImage: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;