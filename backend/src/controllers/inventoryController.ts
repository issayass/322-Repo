import type { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import {
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
} from '../services/inventoryService';
import {
  createInventorySchema,
  updateInventorySchema,
} from '../models/inventoryModel';

export const getAllInventory = async (req: Request, res: Response) => {
  try {
    const items = await getInventoryItems();
    res.status(200).json({ message: 'Inventory retrieved successfully.', items });
    return;
  } catch (error: unknown) {
    let statusCode = 500;
    let message = 'Failed to get inventory.';

    if (error instanceof ZodError) {
      statusCode = 400;
      message = error.issues[0].message;
    }

    res.status(statusCode).json({ error: message });
    return;
  }
};

export const createInventory = async (req: Request, res: Response) => {
  try {
    const data = createInventorySchema.parse(req.body);
    const newItem = await createInventoryItem(data);
    res.status(201).json({ message: 'Inventory item created successfully.', item: newItem });
    return;
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
    return;
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = updateInventorySchema.parse(req.body);
    const updatedItem = await updateInventoryItem(id, data);
    res.status(200).json({ message: 'Inventory item updated successfully.', item: updatedItem });
    return;
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
    return;
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    await deleteInventoryItem(id);
    res.status(200).json({ message: 'Inventory item deleted successfully.' });
    return;
  } catch (error: unknown) {
    let message = 'Failed to delete inventory item.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
    return;
  }
};
