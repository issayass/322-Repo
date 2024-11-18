/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// JsonWebToken Imports
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_EXPIRATION = '1h';

export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string): string | JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error: unknown) {
    console.error('Invalid or expired token:', error);
    return null;
  }
};

export const decodeToken = (token: string): string | JwtPayload | null => {
  return jwt.decode(token);
};
