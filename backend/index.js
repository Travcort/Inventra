import { serverPort } from './utils/config.js';
import path from 'path';

// Express
import express from 'express'
const app = express();
app.use(express.json());

const __dirname = path.resolve();

// Logging
import {info,requestsLogger} from './utils/logger.js'
app.use(requestsLogger);


// Routing
import productRoutes from './routes/product.routes.js'
app.use('/api/products', productRoutes)

// Check for  Environments
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    // Routing in Production
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

import { Database } from './models/product.model.js'

app.listen(serverPort, () => {
    Database();
    info(`Server started on https://localhost:${serverPort}`);
})