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

// Service (inventory) Imports
import {
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
} from '../services/inventoryService';

// Schema Validation (Inventory Model) Imports
import {
  createInventorySchema,
  updateInventorySchema,
} from '../models/inventoryModel';

/**
 * Controller to get all inventory items.
 */
export const getAllInventory = async (req: Request, res: Response) => {
  try {
    const items = await getInventoryItems();
    res.status(200).json({ message: 'Inventory retrieved successfully.', items });
  } catch (error: unknown) {
    let statusCode = 500;
    let message = 'Failed to get inventory.';

    if (error instanceof ZodError) {
        statusCode = 400;
        message = error.issues[0].message;
    }

    res.status(statusCode).json({ error: message })
  }
};

/**
 * Controller to create a new inventory item.
 */
export const createInventory = async (req: Request, res: Response) => {
  try {
    const data = createInventorySchema.parse(req.body);
    const newItem = await createInventoryItem(data);
    res
      .status(201)
      .json({ message: 'Inventory item created successfully.', item: newItem });
  } catch (error: unknown) {
    let statusCode = 500;
    let message = 'Failed to create inventory item.';

    if (error instanceof ZodError) {
      statusCode = 400;
      message = error.issues[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(statusCode).json({ error: message });
  }
};

/**
 * Controller to update an inventory item.
 */
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = updateInventorySchema.parse(req.body);
    const updatedItem = await updateInventoryItem(id, data);
    res
      .status(200)
      .json({ message: 'Inventory item updated successfully.', item: updatedItem });
  } catch (error: unknown) {
    let statusCode = 500;
    let message = 'Failed to update inventory item.';

    if (error instanceof ZodError) {
      statusCode = 400;
      message = error.issues[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(statusCode).json({ error: message });
  }
};

/**
 * Controller to delete an inventory item.
 */
export const deleteInventory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteInventoryItem(id);
    res.status(200).json({ message: 'Inventory item deleted successfully.' });
  } catch (error: unknown) {
    let message = 'Failed to delete inventory item.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};