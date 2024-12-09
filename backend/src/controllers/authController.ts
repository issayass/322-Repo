// backend/src/controllers/authController.ts

import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { registerUser, loginUser } from '../services/authService';
import { createUserSchema, toUserDTO } from '../models/userModel';

export const register = async (req: Request, res: Response) => {
  try {
    const data = createUserSchema.parse(req.body);
    // The isAdmin logic is handled inside registerUser now
    const newUser = await registerUser(data);
    const userDTO = toUserDTO(newUser);

    res.status(201).json({ message: 'User registered successfully.', user: userDTO });
  } catch (error: unknown) {
    let statusCode = 500;
    let message = 'Failed to register a new user.';

    if (error instanceof ZodError) {
      statusCode = 400;
      message = error.issues[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        statusCode = 409;
        message = 'A user already exists with this email address.';
      } else {
        message = `Prisma error: ${error.message}`;
      }
    }

    res.status(statusCode).json({ error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error: unknown) {
    let message = 'Failed to login user.';
    if (error instanceof Error && error.message === 'Invalid email or password.') {
      message = error.message;
    }
    res.status(500).json({ error: message });
  }
};
