/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Zod Validation Imports
import { z } from 'zod';

export const createManagerSchema = z.object({
  userId: z.number().int('User ID must be an integer.'),
});

export const updateManagerSchema = z.object({
  userId: z.number().int('User ID must be an integer.').optional(),
});

export type CreateManagerInput = z.infer<typeof createManagerSchema>;
export type UpdateManagerInput = z.infer<typeof updateManagerSchema>;
