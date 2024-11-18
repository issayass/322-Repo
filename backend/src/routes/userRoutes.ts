/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import { Router } from 'express';

// User Controller Imports
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
router.delete('/:id', deleteUserHandler);

export default router;
