/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Zod Validation Imports
import { z } from 'zod';

// Prisma Model Imports
import { User } from '@prisma/client';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
  managerId: z.number().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address.').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .optional(),
  managerId: z.number().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type UserDTO = Omit<User, 'password'>;

export const toUserDTO = (user: User): UserDTO => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userDTO } = user;
  return userDTO;
};
