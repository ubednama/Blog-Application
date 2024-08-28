import express from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getUserPost,
} from '../controllers/post.controller.js';
import { authenticateToken } from '../configs/authUtils.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/me', authenticateToken, getUserPost);
router.get('/:slug', getPost);
router.post('/', authenticateToken, createPost);
router.put('/:slug', authenticateToken, updatePost);
router.delete('/:slug', authenticateToken, deletePost);

export default router;
