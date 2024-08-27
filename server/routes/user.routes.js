import express from 'express';
import { login, register } from '../controllers/user.controller.js';
import { removeToken } from '../configs/authUtils.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', removeToken);

export default router;