import express, {Request, NextFunction, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './config/db';
import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Simple logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (_, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

export default app;
