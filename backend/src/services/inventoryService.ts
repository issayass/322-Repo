/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Prisma Client Imports
import prisma from '../utils/prismaClient';

// Model (Inventory) Imports
import {
  CreateInventoryInput,
  UpdateInventoryInput,
} from '../models/inventoryModel';

/**
 * Service to get all inventory items.
 */
export const getInventoryItems = async () => {
  return prisma.inventory.findMany();
};

/**
 * Service to create a new inventory item.
 */
export const createInventoryItem = async (data: CreateInventoryInput) => {
  return prisma.inventory.create({ data });
};

/**
 * Service to update an inventory item.
 */
export const updateInventoryItem = async (id: number, data: UpdateInventoryInput) => {
  return prisma.inventory.update({
    where: { id },
    data,
  });
};

/**
 * Service to delete an inventory item.
 */
export const deleteInventoryItem = async (id: number) => {
  return prisma.inventory.delete({
    where: { id },
  });
};