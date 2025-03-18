import mongoose from 'mongoose';
import { MongoUrl } from '../utils/config.js';
import { info,errors } from '../utils/logger.js';


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
},
{
    timestamps: true,
}
);

export const Product = mongoose.model('Product', productSchema)

export const Database = async () => {
    try {
        const conn = await mongoose.connect(MongoUrl)
        info(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        errors("Could not connect to the Database!");
        errors(`Error: ${error.message}`);
        process.exit(1); 
    }
}