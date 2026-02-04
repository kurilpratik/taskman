import { Request, Response } from 'express';
import * as service from '../services/auth.service';

// Cookie options:
// - httpOnly: always true (so JS cannot read the cookie)
// - secure: only when in production (https)
// - sameSite: when in production we need 'none' so cross-site requests can
//   send the cookie (browser requires Secure with SameSite=None). For local
//   development (http://localhost) set 'lax' so the cookie will be accepted
//   by the browser while still providing reasonable CSRF protection.
const getCookieOptions = () => {
  const baseOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite:
      process.env.NODE_ENV === 'production'
        ? ('none' as const)
        : ('lax' as const),
    path: '/',
  };

  return baseOptions;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await service.register(
      req.body.email,
      req.body.password,
      req.body.fullName
    );
    res.cookie('refreshToken', refreshToken, getCookieOptions());
    return res.status(201).json({
      accessToken,
      message: 'Your account has been created successfully.',
    });
  } catch (err: any) {
    const message =
      err?.message === 'User already exists.'
        ? 'An account with this email already exists. Please log in instead.'
        : 'We could not create your account. Please check your details and try again.';
    return res.status(400).json({ message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await service.login(
      req.body.email,
      req.body.password
    );
    res.cookie('refreshToken', refreshToken, getCookieOptions());
    return res.status(200).json({
      accessToken,
      message: 'You have logged in successfully.',
    });
  } catch (err: any) {
    let status = 400;
    let message = 'We could not log you in. Please try again.';

    if (err?.message === 'No user present by this email') {
      message =
        'We could not find an account with this email. Please check it or sign up.';
    } else if (err?.message === 'Incorrect password') {
      message = 'The password you entered is incorrect. Please try again.';
    }

    return res.status(status).json({ message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res
        .status(401)
        .json({ message: 'No refresh token was provided.' });
    }

    const { accessToken } = await service.refresh(token);
    return res.status(200).json({ accessToken });
  } catch (err: any) {
    const message =
      err?.message === 'Invalid refresh token'
        ? 'Your session has expired. Please log in again.'
        : 'We could not refresh your session. Please log in again.';
    return res.status(401).json({ message });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'You must be logged in to access this resource.' });
    }

    const token = authHeader.split(' ')[1];
    const user = await service.getMe(token);

    return res.status(200).json({ user });
  } catch (err: any) {
    const message =
      err?.message === 'User not found'
        ? 'The requested user could not be found.'
        : 'Your session is not valid. Please log in again.';
    return res.status(401).json({ message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      await service.logout(token);
    }

    res.clearCookie('refreshToken', getCookieOptions());
    return res
      .status(200)
      .json({ message: 'You have been logged out successfully.' });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: 'We could not log you out. Please try again.' });
  }
};