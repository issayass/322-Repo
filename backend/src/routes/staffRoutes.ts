/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import { Router } from 'express';

// Customer Controller Imports
import {
  getStaff,
  getAStaff,
  createStaffHandler,
  updateStaffHandler,
  deleteStaffHandler,
} from '../controllers/staffController';

const router = Router();

router.get('/', getStaff);
router.get('/:id', getAStaff);
router.post('/', createStaffHandler);
router.put('/:id', updateStaffHandler);
router.delete('/:id', deleteStaffHandler);

export default router;
