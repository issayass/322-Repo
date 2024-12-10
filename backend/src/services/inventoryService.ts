// backend/src/services/inventoryService.ts

import prisma from '../utils/prismaClient';
import { CreateInventoryInput, UpdateInventoryInput } from '../models/inventoryModel';

/**
 * Get all inventory items.
 */
export const getInventoryItems = async () => {
  return prisma.inventory.findMany();
};

/**
 * Create a new inventory item.
 * The ingredientID will be set to the name of the ingredient.
 * The expirationDate will be 30 days from now.
 */
export const createInventoryItem = async (data: CreateInventoryInput) => {
  const { name, quantity, unitPrice } = data;

  // Set ingredientID to name
  const ingredientID = name;

  // Set expiration date 30 days from now
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  return prisma.inventory.create({
    data: {
      ingredientID,
      name,
      quantity,
      unitPrice,
      expirationDate,
    },
  });
};

/**
 * Update an existing inventory item by ID.
 */
export const updateInventoryItem = async (id: number, data: UpdateInventoryInput) => {
  return prisma.inventory.update({
    where: { id },
    data,
  });
};

/**
 * Delete an inventory item by ID.
 */
export const deleteInventoryItem = async (id: number) => {
  return prisma.inventory.delete({
    where: { id },
  });
};

/**
 * Seed inventory items (not modified, but can remain as is if desired).
 */
export const seedInventoryItems = async () => {
  const itemsData = [
    { name: 'Tomato', quantity: 100, unitPrice: 0.5 },
    { name: 'Lettuce', quantity: 60, unitPrice: 0.3 },
    { name: 'Onion', quantity: 80, unitPrice: 0.2 },
    { name: 'Cheese', quantity: 40, unitPrice: 1.0 },
    { name: 'Bread', quantity: 50, unitPrice: 0.75 },
    { name: 'Chicken', quantity: 30, unitPrice: 2.5 },
    { name: 'Beef', quantity: 20, unitPrice: 3.0 },
    { name: 'Pasta', quantity: 70, unitPrice: 0.6 },
    { name: 'Rice', quantity: 90, unitPrice: 0.4 },
    { name: 'Mushrooms', quantity: 25, unitPrice: 0.9 },
  ];

  for (const itemData of itemsData) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    await prisma.inventory.create({
      data: {
        ingredientID: itemData.name,
        name: itemData.name,
        quantity: itemData.quantity,
        unitPrice: itemData.unitPrice,
        expirationDate,
      },
    });
  }
};
