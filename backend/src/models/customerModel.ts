/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Zod Validation Imports
import { z } from 'zod';

export const createCustomerSchema = z.object({
  userId: z.number().int('User ID must be an integer.'),
});

export const updateCustomerSchema = z.object({
  userId: z.number().int('User ID must be an integer.').optional(),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;
