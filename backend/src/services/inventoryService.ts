/**
 * inventoryService.ts
 *
 * Contains the logic to interact with the database for inventory.
 */

// Prisma Client Imports
import prisma from '../utils/prismaClient';

// Model (Inventory) Imports
import {
  CreateInventoryInput,
  UpdateInventoryInput,
} from '../models/inventoryModel';

export const getInventoryItems = async () => {
  return prisma.inventory.findMany();
};

export const createInventoryItem = async (data: CreateInventoryInput) => {
  return prisma.inventory.create({ data });
};

export const updateInventoryItem = async (id: number, data: UpdateInventoryInput) => {
  return prisma.inventory.update({
    where: { id },
    data,
  });
};

export const deleteInventoryItem = async (id: number) => {
  return prisma.inventory.delete({
    where: { id },
  });
};

/**
 * Seed inventory with 10 items.
 * These are arbitrary items for demonstration purposes.
 */
export const seedInventoryItems = async () => {
  const itemsData: CreateInventoryInput[] = [
    { ingredientID: 'A001', name: 'Tomato', quantity: 100, unitPrice: 0.5, expirationDate: '2024-12-31T00:00:00.000Z' },
    { ingredientID: 'A002', name: 'Lettuce', quantity: 60, unitPrice: 0.3, expirationDate: '2024-11-30T00:00:00.000Z' },
    { ingredientID: 'A003', name: 'Onion', quantity: 80, unitPrice: 0.2, expirationDate: '2024-10-15T00:00:00.000Z' },
    { ingredientID: 'A004', name: 'Cheese', quantity: 40, unitPrice: 1.0, expirationDate: '2025-01-10T00:00:00.000Z' },
    { ingredientID: 'A005', name: 'Bread', quantity: 50, unitPrice: 0.75, expirationDate: '2024-09-01T00:00:00.000Z' },
    { ingredientID: 'A006', name: 'Chicken', quantity: 30, unitPrice: 2.5, expirationDate: '2024-08-20T00:00:00.000Z' },
    { ingredientID: 'A007', name: 'Beef', quantity: 20, unitPrice: 3.0, expirationDate: '2024-08-25T00:00:00.000Z' },
    { ingredientID: 'A008', name: 'Pasta', quantity: 70, unitPrice: 0.6, expirationDate: '2025-03-05T00:00:00.000Z' },
    { ingredientID: 'A009', name: 'Rice', quantity: 90, unitPrice: 0.4, expirationDate: '2025-05-15T00:00:00.000Z' },
    { ingredientID: 'A010', name: 'Mushrooms', quantity: 25, unitPrice: 0.9, expirationDate: '2024-07-30T00:00:00.000Z' },
  ];

  // Upsert items or just create if empty. For simplicity, we'll just create them.
  const createdItems = [];
  for (const itemData of itemsData) {
    const created = await prisma.inventory.create({ data: itemData });
    createdItems.push(created);
  }

  return createdItems;
};
