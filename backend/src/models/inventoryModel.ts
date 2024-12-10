// backend/src/models/inventoryModel.ts

import { z } from 'zod';

export const createInventorySchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  quantity: z.number().min(0, 'Quantity must be a positive number.'),
  unitPrice: z.number().min(0, 'Unit price must be a positive number.'),
});

export const updateInventorySchema = z.object({
  name: z.string().optional(),
  quantity: z.number().min(0, 'Quantity must be a positive number.').optional(),
  unitPrice: z.number().min(0, 'Unit price must be a positive number.').optional(),
});

export type CreateInventoryInput = z.infer<typeof createInventorySchema>;
export type UpdateInventoryInput = z.infer<typeof updateInventorySchema>;
