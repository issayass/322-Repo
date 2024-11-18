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

// Service (Staff Model) Imports
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from '../services/staffService';

// Scheme Validation (Staff Model) Imports
import { createStaffSchema, updateStaffSchema } from '../models/staffModel';

/**
 * Controller to fetch all staff.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Retrieves all staff from the database, includes the user relations, and
 * sends the result as a JSON response.
 */
export const getStaff = async (req: Request, res: Response) => {
  try {
    const staff = await getAllStaff();

    res.json(staff);
  } catch (error: unknown) {
    let message = 'Failed to fetch staff.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to fetch a single staff.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Retrieves a single staff from the database from an ID number. Includes
 * the user property, and sends the staff as a JSON response.
 */
export const getAStaff = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.id, 10);
    const staff = await getStaffById(staffId);

    if (!staff) {
      res.status(404).json({ error: 'Staff not found.' });
      return;
    }

    res.json(staff);
  } catch (error: unknown) {
    let message = 'Failed to fetch staff.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to create a new staff.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Creates a new staff in the database when given a userId that the staff
 * will belong to. Validates with Zod and sends the newly created staff
 * object as a JSON resposne.
 */
export const createStaffHandler = async (req: Request, res: Response) => {
  try {
    const data = createStaffSchema.parse(req.body);

    const newStaff = await createStaff(data);

    res.status(201).json(newStaff);
  } catch (error: unknown) {
    let statusCode = 400;
    let message = 'Failed to create staff.';

    if (error instanceof ZodError) {
      statusCode = 400;
      message = error.issues[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        statusCode = 409;
        message = 'A staff already exists for this user.';
      } else {
        message = `Prisma error: ${error.message}`;
      }
    }

    res.status(statusCode).json({ error: message });
  }
};

/**
 * Controller to update an existing staff.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Updates an existing staff in the database when given an ID and some
 * properties of the staff model. Sends the updated staff as a JSON
 * response.
 */
export const updateStaffHandler = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.id, 10);
    const updates = updateStaffSchema.parse(req.body);
    const updatedStaff = await updateStaff(staffId, updates);

    if (!updatedStaff) {
      res.status(404).json({ error: 'Staff not found.' });
      return;
    }

    res.json(updatedStaff);
  } catch (error: unknown) {
    let message = 'Failed to update staff.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to delete an existing staff.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Deletes an existing staff from the database when given an ID. Sends a
 * success message if the staff was deleted, else an error.
 */
export const deleteStaffHandler = async (req: Request, res: Response) => {
  try {
    const staffId = parseInt(req.params.id, 10);
    const deletedStaff = await deleteStaff(staffId);

    if (!deletedStaff) {
      res.status(404).json({ error: 'Staff not found.' });
      return;
    }

    res.json({ message: 'Staff deleted successfully.' });
  } catch (error: unknown) {
    let message = 'Failed to delete staff.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};
