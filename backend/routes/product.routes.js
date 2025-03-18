import express from 'express';
const router = express.Router();

import { createProduct, deleteProduct, fetchAllProducts, fetchParticularProduct, updateProduct } from '../controllers/product.controllers.js';

router.get('/', fetchAllProducts);

router.get('/:id', fetchParticularProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;