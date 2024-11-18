/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Client Import
import prisma from '../utils/prismaClient';

export const getAllStaff = async () => {
  return prisma.staff.findMany({
    include: {
      user: true,
    },
  });
};

export const getStaffById = async (id: number) => {
  return prisma.staff.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const createStaff = async (data: {
  staffID: string;
  role: string;
  userId: number;
}) => {
  return prisma.staff.create({
    data,
  });
};

export const updateStaff = async (
  id: number,
  updates: Partial<{ staffID: string; role: string; userId: number }>
) => {
  return prisma.staff.update({
    where: { id },
    data: updates,
  });
};

export const deleteStaff = async (id: number) => {
  return prisma.staff.delete({
    where: { id },
  });
};
