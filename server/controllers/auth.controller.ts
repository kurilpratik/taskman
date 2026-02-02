import { Request, Response } from 'express';
import * as service from '../services/auth.service';

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
};

export const register = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await service.register(
      req.body.email,
      req.body.password,
      req.body.fullName
    );
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({ accessToken, message: 'New account created' });
    res.status(201);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await service.login(
      req.body.email,
      req.body.password
    );
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.json({ accessToken, message: 'Login successful' });
    res.status(200);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    const { accessToken } = await service.refresh(token);
    res.json({ accessToken });
  } catch (err: any) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    const user = await service.getMe(token);

    return res.status(200).json({ user });
  } catch (err: any) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (token) await service.logout(token);

  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' }); // Send an empty JSON response
  res.status(204);
};
