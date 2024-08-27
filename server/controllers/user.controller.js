import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../configs/authUtils.js";

export const register = async (req, res) => {
    const { name, title, username, email, password, profilePic } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({ message: 'Name, username, email, and password are required' });
    }

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        user = new User({
            name,
            title,
            username,
            email,
            password,
            profilePic
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = generateToken(user.id, res);
        res.status(201).json({ msg: 'User registered successfully', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const token = generateToken(user.id, res);
        res.status(200).json({ msg: 'Login successful', token });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
};