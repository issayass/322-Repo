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

// Service (Manager Model) Imports
import {
  getAllManagers,
  getManagerById,
  createManager,
  updateManager,
  deleteManager,
} from '../services/managerService';

// Scheme Validation (Manager Model) Imports
import {
  createManagerSchema,
  updateManagerSchema,
} from '../models/managerModel';

/**
 * Controller to fetch all managers.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Retrieves all managers from the database, includes the user relations, and
 * sends the result as a JSON response.
 */
export const getManagers = async (req: Request, res: Response) => {
  try {
    const managers = await getAllManagers();

    res.json(managers);
  } catch (error: unknown) {
    let message = 'Failed to fetch managers.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to fetch a single manager.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Retrieves a single manager from the database from an ID number. Includes
 * the user property, and sends the manager as a JSON response.
 */
export const getManager = async (req: Request, res: Response) => {
  try {
    const managerId = parseInt(req.params.id, 10);
    const manager = await getManagerById(managerId);

    if (!manager) {
      res.status(404).json({ error: 'Manager not found.' });
      return;
    }

    res.json(manager);
  } catch (error: unknown) {
    let message = 'Failed to fetch manager.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to create a new manager.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Creates a new manager in the database when given a userId that the manager
 * will belong to. Validates with Zod and sends the newly created manager
 * object as a JSON resposne.
 */
export const createManagerHandler = async (req: Request, res: Response) => {
  try {
    const data = createManagerSchema.parse(req.body);

    const newManager = await createManager(data);

    res.status(201).json(newManager);
  } catch (error: unknown) {
    let statusCode = 400;
    let message = 'Failed to create manager.';

    if (error instanceof ZodError) {
      statusCode = 400;
      message = error.issues[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        statusCode = 409;
        message = 'A manager already exists for this user.';
      } else {
        message = `Prisma error: ${error.message}`;
      }
    }

    res.status(statusCode).json({ error: message });
  }
};

/**
 * Controller to update an existing manager.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Updates an existing manager in the database when given an ID and some
 * properties of the manager model. Sends the updated manager as a JSON
 * response.
 */
export const updateManagerHandler = async (req: Request, res: Response) => {
  try {
    const managerId = parseInt(req.params.id, 10);
    const updates = updateManagerSchema.parse(req.body);
    const updatedManager = await updateManager(managerId, updates);

    if (!updatedManager) {
      res.status(404).json({ error: 'Manager not found.' });
      return;
    }

    res.json(updatedManager);
  } catch (error: unknown) {
    let message = 'Failed to update manager.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to delete an existing manager.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Deletes an existing manager from the database when given an ID. Sends a
 * success message if the manager was deleted, else an error.
 */
export const deleteManagerHandler = async (req: Request, res: Response) => {
  try {
    const managerId = parseInt(req.params.id, 10);
    const deletedManager = await deleteManager(managerId);

    if (!deletedManager) {
      res.status(404).json({ error: 'Manager not found.' });
      return;
    }

    res.json({ message: 'Manager deleted successfully.' });
  } catch (error: unknown) {
    let message = 'Failed to delete manager.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};
