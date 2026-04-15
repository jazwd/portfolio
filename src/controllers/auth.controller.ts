import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  const normalizedUsername = username?.trim();
  const normalizedPassword = password?.trim();
  const configuredUsername = env.authUsername.trim();
  const configuredPassword = env.authPassword.trim();

  if (!normalizedUsername || !normalizedPassword) {
    res.status(400).json({
      message: 'Username and password are required',
    });
    return;
  }

  if (!env.jwtSecret || !configuredUsername || !configuredPassword) {
    res.status(500).json({
      message: 'JWT authentication is not configured correctly.',
    });
    return;
  }

  if (
    normalizedUsername !== configuredUsername ||
    normalizedPassword !== configuredPassword
  ) {
    res.status(401).json({
      message: 'Invalid credentials',
    });
    return;
  }

  const signOptions: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'],
  };

  const token = jwt.sign({ sub: username }, env.jwtSecret, signOptions);

  res.status(200).json({
    message: 'Login successful',
    token,
    tokenType: 'Bearer',
    expiresIn: env.jwtExpiresIn,
  });
};
