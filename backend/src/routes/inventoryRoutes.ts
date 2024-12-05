/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from 'express';
import {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from '../controllers/inventoryController';

const router = Router();

// Routes for inventory management
router.get('/', getAllInventory); // Get all inventory items
router.post('/', createInventory); // Create a new inventory item
router.put('/:id', updateInventory); // Update an existing inventory item
router.delete('/:id', deleteInventory); // Delete an inventory item

export default router;