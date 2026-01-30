import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'OK' });
});

export default app;
