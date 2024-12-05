/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Zod Validation Imports
import { z } from 'zod';

export const createInventorySchema = z.object({
    ingredientID: z.string().min(1, 'Ingredient ID is required.'),
    name: z.string().min(1, 'Name is required.'),
    quantity: z.number().min(0, 'Quantity must be a positive number.'),
    unitPrice: z.number().min(0, 'Unit price must be a positive number.'),
    expirationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid expiration date.',
    }),
  });
  
  export const updateInventorySchema = z.object({
    ingredientID: z.string().optional(),
    name: z.string().optional(),
    quantity: z.number().min(0, 'Quantity must be a positive number.').optional(),
    unitPrice: z.number().min(0, 'Unit price must be a positive number.').optional(),
    expirationDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid expiration date.',
      })
      .optional(),
  });
  
  export type CreateInventoryInput = z.infer<typeof createInventorySchema>;
  export type UpdateInventoryInput = z.infer<typeof updateInventorySchema>;