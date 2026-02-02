// Within the service (business) layer, write just the business logic and interaction with the db.

import { prisma } from '../config/db';
import { comparePassword, hashPassword } from '../utils/hash';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt';

export const register = async (
  email: string,
  password: string,
  fullName: string
) => {
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) throw new Error('User already exists.');

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      fullName,
      password: hashed,
    },
  });

  return createTokens(user.id);
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('No user present by this email');

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Incorrect password');

  return createTokens(user.id);
};

// refresh generates new access token by using the first refresh token which has not been revoked, and of course it verifies the refresh token is from the particular user

// The token passed in the argument already has encoded userId inside it so we simpliy verify it first and then check for the revoked status and not for the userId because if the token is valid then it must be of that userId
export const refresh = async (token: string) => {
  const payload = verifyRefreshToken(token);

  const storedToken = await prisma.refreshToken.findFirst({
    where: { token, revoked: false },
  });
  if (!storedToken) throw new Error('Invalid refresh token');

  return { accessToken: signAccessToken(payload.userId) };
};

// Logging out revokes the refreshToken now it will be generated when the user logins again.
export const logout = async (token: string) => {
  await prisma.refreshToken.updateMany({
    where: { token },
    data: { revoked: true },
  });
};

// Helper function to generate tokens using userId

const createTokens = async (userId: string) => {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return { accessToken, refreshToken };
};
