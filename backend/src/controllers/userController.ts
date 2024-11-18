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
import { getAllUsers, createUser } from '../services/userService';

// Schema Validation (User Model) Imports
import { createUserSchema, toUserDTO } from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();

        users.map(toUserDTO);

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const data = createUserSchema.parse(req.body);

        const newUser = await createUser(data);

        const userDTO = toUserDTO(newUser);

        res.status(201).json(userDTO);
    } catch (error: unknown) {
        let message = 'Failed to create user.';

        if (error instanceof ZodError) {
            message = error.issues[0].message;
        }

        if (error instanceof PrismaClientKnownRequestError) {
            message = 'User already exists with this email address.';
        }
        
        res.status(500).json({ error: message });
    }
}