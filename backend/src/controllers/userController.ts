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

// Zod Validation Imports
import { ZodError } from 'zod';

// Service (User Model) Imports
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userService';

// Schema Validation (User Model) Imports
import { createUserSchema, toUserDTO } from '../models/userModel';

/**
 * Controller to fetch all users.
 */
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    const userDTOs = Object.fromEntries(
      users.map((user) => [user.id, toUserDTO(user)])
    );

    res.json(userDTOs);
    return;
  } catch (error: unknown) {
    let message = 'Failed to fetch users.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
    return;
  }
};

/**
 * Controller to fetch a single user.
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    const userDTO = toUserDTO(user);

    res.json(userDTO);
    return;
  } catch (error: unknown) {
    let message = 'Failed to fetch user.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
    return;
  }
};

/**
 * Controller to create a new user.
 */
export const createUserHandler = async (req: Request, res: Response) => {
  try {
    const data = createUserSchema.parse(req.body);

    const newUser = await createUser(data);

    const userDTO = toUserDTO(newUser);

    res.status(201).json(userDTO);
    return;
  } catch (error: unknown) {
    let statusCode = 500;
    let message = 'Failed to create user.';

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
    return;
  }
};

/**
 * Controller to update an existing user.
 */
export const updateUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const updates = req.body;
    const updatedUser = await updateUser(userId, updates);

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.json(toUserDTO(updatedUser));
    return;
  } catch (error: unknown) {
    let message = 'Failed to update user.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
    return;
  }
};

/**
 * Controller to delete an existing user.
 */
export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);

    // A user can only delete themselves.
    if (req.user?.id !== userId) {
      res.status(403).json({ error: 'You are not authorized to delete this user.' });
      return;
    }

    const deletedUser = await deleteUser(userId);

    if (!deletedUser) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.json({ message: 'User deleted successfully.' });
    return;
  } catch (error: unknown) {
    let message = 'Failed to delete user.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
    return;
  }
};
