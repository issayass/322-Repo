import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getCartHandler,
  addItemToCartHandler,
  updateCartItemHandler,
  clearCartHandler
} from '../controllers/cartController';

const router = Router();

router.use(authenticate);

// No `return` statements in route callbacks, they are defined in cartController as RequestHandlers
router.get('/', getCartHandler);
router.post('/item', addItemToCartHandler);
router.put('/item/:id', updateCartItemHandler);
router.delete('/clear', clearCartHandler);

export default router;
