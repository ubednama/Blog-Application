import Post from "../models/post.model.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const { title, content, excerpt, featuredImage } = req.body;

    if (!title || !content || !excerpt) {
        return res.status(400).json({ message: 'Title, content, and excerpt are required' });
    }

    const post = new Post({
        title,
        content,
        excerpt,
        featuredImage
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { title, content, excerpt, featuredImage } = req.body;

    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (title) post.title = title;
        if (content) post.content = content;
        if (excerpt) post.excerpt = excerpt;
        if (featuredImage) post.featuredImage = featuredImage;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        await post.remove();
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};