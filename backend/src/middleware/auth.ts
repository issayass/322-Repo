import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

interface DecodedToken {
  id: number;
  email: string;
  isAdmin?: boolean;
  iat?: number;
  exp?: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authorization token missing or invalid.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded || typeof decoded === 'string') {
    res.status(401).json({ error: 'Invalid or expired token.' });
    return;
  }

  req.user = {
    id: (decoded as DecodedToken).id,
    email: (decoded as DecodedToken).email,
    isAdmin: (decoded as DecodedToken).isAdmin,
  };

  next();
};
