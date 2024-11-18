/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// BCrypt Imports
import bcrypt from 'bcryptjs';

// Prisma Client Imports
import prisma from '../utils/prismaClient';

// Service (User Model) Imports
import { createUser } from '../services/userService';

// Utility Imports
import { signToken } from '../utils/jwtUtils';

export const registerUser = async (data: {
  email: string;
  name: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return createUser({
    ...data,
    password: hashedPassword,
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  const token = signToken({ id: user.id, email: user.email });

  return { token, user };
};
