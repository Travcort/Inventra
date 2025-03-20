import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';

export const fetchAllProducts = async (req,res) => {
    try {
        const allProducts = await Product.find({});
        if(!allProducts) return res.status(404).json({ success: false, message: 'The Inventory is empty!' });

        return res.status(200).json({ success: true, products: allProducts });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
};

export const updateStock = async (req,res) => {
    const id = req.params.id;
    const { stock, updatedBy } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    if (!stock || !updatedBy) return res.status(400).json({ success: false, message: 'Undefined fields!' });

    try {
        const productToUpdate = await Product.findById(id);
        if(!productToUpdate) return res.status(404).json({ success: false, message: 'Product does not exist' });

        productToUpdate.stock = stock;
        productToUpdate.updatedBy = updatedBy;

        const updatedProduct = await productToUpdate.save();
        return res.status(200).json({ success: true, message: 'The Stock count has been updated', products: updatedProduct  });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

export const createProduct = async (req,res) => {
    const { name, description, price, image, stock, createdBy } = req.body;

    if(!name || !description || !price || !image || !stock || !createdBy) {
        return res.status(400).json({ success: false, message: 'You have undefined properties in the body!' });
    }

    if (isNaN(stock)) return res.status(400).json({ success: false, message: 'Stock field should be a number' });

    const newProduct = new Product({ name, description, price, image, stock, createdBy, updatedBy: createdBy });

    try {
        const updated = await newProduct.save();
        return res.status(201).json({ success: true, message: 'The Product has been created', products: updated });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}

export const updateProduct =  async (req,res) => {
    const id = req.params.id;
    const { name, price, description, image, stock, updatedBy } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID!" });
    }

    if(!name || !price || !description || !image || !stock || !updatedBy) {
        return res.status(400).json({ success: false, message: 'You have undefined properties in the body!' });
    }

    if (isNaN(stock)) return res.status(400).json({ success: false, message: 'Stock field should be a number!' });

    let productToUpdate = await Product.findById(id);
    if(!productToUpdate) return res.status(404).json({ success: false, message: 'Product does not exist' });

    productToUpdate = { name, price, description, image, stock, createdBy: productToUpdate.createdBy, updatedBy };

    try {
        const updated = await Product.findByIdAndUpdate(id, productToUpdate, { new: true });
        return res.status(200).json({ success: true, message: 'The Product has been updated', products: updated });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}

export const deleteProduct = async (req,res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }

    const productToDelete = await Product.findById(id);
    if(!productToDelete) return res.status(404).json({ success: false, message: 'The Product does not exist!' });

    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Successfully deleted the Product' });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}