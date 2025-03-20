import express from 'express';
const router = express.Router();
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/config.js';

router.post('/register', async (req,res) => {
    try {
        const { username, password, email, role } = req.body;

        if (!['admin', 'stockist', 'user'].includes(role)) res.status(400).json({ success: false, message: 'Invalid role selected' });
        if (!username || !password || !email) return res.status(400).json({ success: false, message: 'Missing fields!' });

        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ success: false, message: 'User already exists!' });

        const user = new User({ username, email, password, role });
        const savedUser = await user.save();
        return res.status(201).json({ success: true, message: 'User created Successfully', user: { username: savedUser.username, role: savedUser.role } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
});

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user) return res.status(404).json({ success: false, message: 'User does not exist!' });

        const validPassword = await user.comparePassword(password);
        if (!validPassword) return res.status(400).json({ success: false, message: 'Invalid Password!' });

        const token = jwt.sign({ user: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        return res.status(200).json({ success: true, message: 'Successfully Logged in', user: {username: user.username, userId: user._id, role: user.role}, token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
});

export { router as userRoutes };