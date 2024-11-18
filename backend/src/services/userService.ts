/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Client Import
import prisma from '../utils/prismaClient';

export const getAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      notifications: true,
      staff: true,
      customer: true,
      manager: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      notifications: true,
      staff: true,
      customer: true,
      manager: true,
    },
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  managerId?: number;
}) => {
  return prisma.user.create({
    data,
  });
};

export const updateUser = async (
  id: number,
  updates: Partial<{ name: string; email: string; password: string }>
) => {
  return prisma.user.update({
    where: { id },
    data: updates,
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};
