/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import type { Request, Response } from 'express';

// Prisma Imports
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Service (auth) Imports
import { registerUser, loginUser } from '../services/authService';

/**
 * Controller to register a new user.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Registers a new user to the platform when given a valid email, name, and
 * password. Sends the new user without the password as a JSON response.
 */
export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully.', user });
  } catch (error: unknown) {
    let message = 'Failed to register a new user.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(401).json({ error: message });
  }
};

/**
 * Controller to login an existing user.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Logs in an existing user to the platform when given a valid email and
 * password of an existing user. Sends the JWT token and the user as a JSON
 * response.
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error: unknown) {
    let message = 'Failed to login user.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};
