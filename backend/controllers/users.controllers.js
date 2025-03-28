import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/config.js';

export const createUser = async (req,res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) return res.status(400).json({ success: false, message: 'Missing fields!' });

        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ success: false, message: 'User already exists!' });

        const user = new User({ username, email, password });
        const savedUser = await user.save();
        return res.status(201).json({ success: true, message: 'User created Successfully', user: { username: savedUser.username, role: savedUser.role } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}

export const loginUser = async (req,res) => {
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
}

export const getUsers = async (req,res) => {
    try {
        const users = await User.find({});
        if(!users) return res.status(404).json({ success: false, message: 'No users!' });
        const cleanedUsers = users.filter(user => user.email !== 'tarv@inventra.admin').map((user) => ({ userId: user._id, username: user.username, email: user.email, role: user.role }));
        return res.status(200).json({ success: true, users: cleanedUsers });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}

export const updateUserRole = async (req,res) => {
    try{
        const userId = req.params.id;
        const { role } = req.body;
        const userToUpdate = await User.findById(userId);
        if(!userToUpdate) return res.status(404).json({ success: false, message: 'User does not exist!' });
        userToUpdate.role = role;

        const updatedUser = await userToUpdate.save();
        return res.status(200).json({ 
            success: true, 
            message: `Successfully updated ${updatedUser.username}'s role`, 
            users: { 
                userId: updatedUser._id, 
                username: updatedUser.username, 
                email: updatedUser.email, 
                role: updatedUser.role 
            } 
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}

export const deleteUser = async (req,res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'User has been successfuly deleted!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}