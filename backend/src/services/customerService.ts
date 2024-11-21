/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Client Import
import prisma from '../utils/prismaClient';

export const getAllCustomers = async () => {
  return prisma.customer.findMany({
    include: {
      user: true,
      cart: true,
      orders: true,
      paymentDetails: true,
    },
  });
};

export const getCustomerById = async (id: number) => {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      user: true,
      cart: true,
      orders: true,
      paymentDetails: true,
    },
  });
};

export const createCustomer = async (data: { userId: number }) => {
  return prisma.customer.create({
    data,
  });
};

export const updateCustomer = async (
  id: number,
  updates: Partial<{ userId: number }>
) => {
  return prisma.customer.update({
    where: { id },
    data: updates,
  });
};

export const deleteCustomer = async (id: number) => {
  return prisma.customer.delete({
    where: { id },
  });
};
