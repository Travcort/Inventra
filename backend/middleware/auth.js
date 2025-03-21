import jwt from 'jsonwebtoken';
import { jwtSecret } from '../utils/config.js';

export const authenticateUser = (req,res,next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ success: false, message: 'Unauthorized. Access token Missing!' });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error.message);
        if(error.message === 'jwt expired') return res.status(400).json({ success: false, message: 'Access Token is expired! Please log in'})
        return res.status(400).json({ success: false, message: 'Invalid Access Token' });
    }
}

export const authorizeRole = (...roles) => {
    return (req,res,next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access Denied' });
        }
        next();
    }
}