import express from 'express';
const router = express.Router();

import { createProduct, deleteProduct, fetchAllProducts, updateProduct, updateStock } from '../controllers/product.controllers.js';
import { authenticateUser, authorizeRole } from '../middleware/auth.js';

router.get('/', fetchAllProducts);

router.put('/:id/stock', authenticateUser, authorizeRole('stockist', 'admin'), updateStock);

router.post('/', authenticateUser, authorizeRole('admin'), createProduct);

router.put('/:id', authenticateUser, authorizeRole('admin'), updateProduct);

router.delete('/:id', authenticateUser, authorizeRole('admin'), deleteProduct);

export { router as productRoutes };