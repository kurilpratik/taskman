import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import router from './routes/auth.routes';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.use(authMiddleware);

app.get('/api/health', (_, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/auth', authRoutes);

export default app;
