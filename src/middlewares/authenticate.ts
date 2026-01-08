import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { config } from '../config/config.ts';

export interface AuthRequest extends Request {
  userId: string;
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return next(createHttpError(401, 'Unauthenticated'));
  }

  const parsedToken = token.split(" ")[1] as string;

  try {
    const decoded = jwt.verify(parsedToken, config.jwtSecret as string);

    const _req = req as AuthRequest;
    _req.userId = decoded.sub as string;
  } catch (error) {
    return next(createHttpError(401, 'Token Expired!!!'));
  }
  next();
}

export default authenticate;