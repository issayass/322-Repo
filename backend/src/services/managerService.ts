/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Client Import
import prisma from '../utils/prismaClient';

export const getAllManagers = async () => {
  return prisma.manager.findMany({
    include: {
      user: true,
    },
  });
};

export const getManagerById = async (id: number) => {
  return prisma.manager.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const createManager = async (data: { userId: number }) => {
  return prisma.manager.create({
    data,
  });
};

export const updateManager = async (
  id: number,
  updates: Partial<{ userId: number }>
) => {
  return prisma.manager.update({
    where: { id },
    data: updates,
  });
};

export const deleteManager = async (id: number) => {
  return prisma.manager.delete({
    where: { id },
  });
};
