import type { Request, Response, NextFunction } from 'express';

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ error: 'Admin privileges required.' });
    return;
  }
  next();
};
