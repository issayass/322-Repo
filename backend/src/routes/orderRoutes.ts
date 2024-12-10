import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/requireAdmin';
import { createOrderHandler, getOrdersHandler, updateOrderStatusHandler } from '../controllers/orderController';

const router = Router();

router.use(authenticate);

router.post('/', createOrderHandler);
router.get('/', getOrdersHandler);
router.put('/:id', requireAdmin, updateOrderStatusHandler);

export default router;
