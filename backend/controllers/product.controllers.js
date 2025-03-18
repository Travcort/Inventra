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

export const fetchParticularProduct = (req,res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    Product.findById(id)
    .then((result) => {
        res.json(result);
    })
    .catch((error) => res.status(500).json({ success: false, message: "Internal Server Error" }));
}

export const createProduct = async (req,res) => {
    const { name, description, price, image, stock } = req.body;

    if(!name || !description || !price || !image || !stock) {
        return res.status(400).json({ success: false, message: 'You have undefined properties in the body!' });
    }

    if (isNaN(stock)) return res.status(400).json({ success: false, message: 'Stock field should be a number' });

    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        image: image,
        stock: stock
    });

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
    const { name, price, description, image, stock } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID!" });
    }

    if(!name || !price || !description || !image || !stock) {
        return res.status(400).json({ success: false, message: 'You have undefined properties in the body!' });
    }

    if (isNaN(stock)) return res.status(400).json({ success: false, message: 'Stock field should be a number!' });

    const newProduct = {
        name,
        price,
        description,
        image,
        stock
    };

    try {
        const updated = await Product.findByIdAndUpdate(id, newProduct, { new: true });
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