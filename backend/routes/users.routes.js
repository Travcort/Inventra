import express from 'express';
const router = express.Router();

import { createUser, loginUser, getUsers, deleteUser, updateUserRole } from '../controllers/users.controllers.js';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';

router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/', authenticateUser, authorizeRole('admin'), getUsers);

router.delete('/:id', authenticateUser, authorizeRole('admin'), deleteUser);

router.put('/:id/role', authenticateUser, authorizeRole('admin'), updateUserRole);

export { router as userRoutes };