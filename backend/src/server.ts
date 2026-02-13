import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes';
import resourceRoutes from './routes/resourceRoutes';
import collectionRoutes from './routes/collectionRoutes';
import goalRoutes from './routes/goalRoutes';
import discoveryRoutes from './routes/discoveryRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Set security headers
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/discover', discoveryRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/learning-hub')
    .then(() => {
        console.log('Connected to MongoDB');
        // Start Server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
