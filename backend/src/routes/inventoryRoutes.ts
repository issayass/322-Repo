import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/requireAdmin';
import { createInventory, updateInventory, deleteInventory, getAllInventory } from '../controllers/inventoryController';

const router = Router();

// Authenticated users can view inventory
router.get('/', authenticate, getAllInventory);

// Only admins can create, update, or delete inventory
router.post('/', authenticate, requireAdmin, createInventory);
router.put('/:id', authenticate, requireAdmin, updateInventory);
router.delete('/:id', authenticate, requireAdmin, deleteInventory);

export default router;
