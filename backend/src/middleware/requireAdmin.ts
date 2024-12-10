import { RequestHandler } from 'express';

export const requireAdmin: RequestHandler = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403).json({ error: 'Admin privileges required.' });
    return;
  }
  next();
};
