import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
        type: {
            type: String,
            enum: ['text', 'image', 'video', 'link'],
            required: true
        }, data: {
            type: String,
            trim: true
        }, url: {
            type: String,
            trim: true
        }, linkText: {
            type: String,
            trim: true
        }, imageUrl: {
            type: String,
            trim: true
        }, paragraphs: [{
            type: String,
            trim: true
        }]
    },{_id: false});

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }, slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, sections: [{
        sectionTitle: {
            type: String,
            required: true,
            trim: true
        },
        content: [contentSchema]
    }], excerpt: {
        type: String,
        required: true,
        trim: true
    }, featuredImage: {
        type: String,
        trim: true
    }, duration: {
        type: Number,
        required: true
    }, tags: [{
        type: String,
        trim: true
    }], author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;