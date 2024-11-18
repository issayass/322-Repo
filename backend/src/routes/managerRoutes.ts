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
  getManagers,
  getManager,
  createManagerHandler,
  updateManagerHandler,
  deleteManagerHandler,
} from '../controllers/managerController';

const router = Router();

router.get('/', getManagers);
router.get('/:id', getManager);
router.post('/', createManagerHandler);
router.put('/:id', updateManagerHandler);
router.delete('/:id', deleteManagerHandler);

export default router;
