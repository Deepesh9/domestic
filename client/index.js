import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import cors
import reportRoutes from "./routes/Creport.route.js"; // Correct import for Creport route
import deviceInfoRoutes from "./routes/CdeviceInfo.route.js"; // Add routes for device info
import transactionRoutes from "./routes/Ctransaction.route.js"; // Add routes for transaction
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';

const mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/domestic';
const jwtSecret = '6f9e76f86d325b506e891130ad7fb84f81a263c44a1d0b3bceb6b28ea53c9334';

if (!jwtSecret) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    process.exit(1);
}

mongoose.connect(mongodbUri)
    .then(() => {
        console.log("Succeeded to connect to MongoDB 🚀");
    })
    .catch((err) => console.log('MongoDB connection error:', err));

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the client build directory
const clientBuildPath = path.join(__dirname, '../client/dist');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Add CORS middleware
app.use(cors({
    origin: '*', // Allow all origins (for development only; specify your domain in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Use imported routes
app.use('/api/reports', reportRoutes);
app.use('/api/deviceinfo', deviceInfoRoutes); // Add device info route
app.use('/api/transactions', transactionRoutes); // Add transaction route

// Serve static files from the client build directory
app.use(express.static(clientBuildPath));

// Serve the index.html file for all other routes (for client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`Error: ${message}, Status Code: ${statusCode}`);
    console.error(err.stack);
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on PORT http://localhost:${PORT}`);
});
