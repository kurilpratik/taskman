import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

/**
 * Custom request type that includes userId
 */
export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Unauthorized' });

  const token = header.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId;
    next();
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
