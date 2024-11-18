/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Zod Validation Imports
import { z } from 'zod';

export const createStaffSchema = z.object({
  staffID: z.string().min(1, 'Staff ID is required.'),
  role: z.string().min(1, 'Role is required.'),
  userId: z.number().int('User ID must be an integer.'),
});

export const updateStaffSchema = z.object({
  staffID: z.string().min(1).optional(),
  role: z.string().optional(),
  userId: z.number().int().optional(),
});

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type UpdateStaffInput = z.infer<typeof updateStaffSchema>;
