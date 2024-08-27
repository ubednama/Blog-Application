import Post from "../models/post.model.js";
import slugify from 'slugify';

export const getPosts = async (req, res) => {
    console.log("fetching posts")
    try {
        const posts = await Post.find({}, 'title duration featuredImage excerpt tags slug updatedAt');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    const {slug} = req.params;
    try {
        const post = await Post.findOne({slug:slug})
            .populate('author', 'name');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const { title, sections, excerpt, featuredImage, duration, tags } = req.body;

    const userId = req.userId;
    console.log(userId)

    if (!title || !sections ) {
        return res.status(400).json({ message: 'Title and sections are required' });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existingPost = await Post.findOne({ slug: slug });
    if (existingPost) {
        return res.status(400).json({ message: 'A post with this title already exists' });
    }

    const post = new Post({
        title,
        slug,
        sections,
        excerpt,
        featuredImage,
        duration,
        tags,
        author: userId
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { title, sections, excerpt, featuredImage } = req.body;
    const userId = req.userId;
    const { slug } = req.params;

    try {
        const post = await Post.findOne({ slug: slug });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        if (title) post.title = title;
        if (sections) post.sections = sections;
        if (excerpt) post.excerpt = excerpt;
        if (featuredImage) post.featuredImage = featuredImage;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    const userId = req.userId;
    const { slug } = req.params;

    console.log(slug)
    try {
        const post = await Post.findOne({ slug: slug });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.author.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(post._id);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};