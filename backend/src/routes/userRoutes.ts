import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import {
  getUsers,
  getUser,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', authenticate, deleteUserHandler);

export default router;
