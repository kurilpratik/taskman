import jwt from 'jsonwebtoken';

const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

export const signAccessToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: ACCESS_TTL,
  });

export const signRefreshToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: REFRESH_TTL,
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as {
    userId: string;
  };
