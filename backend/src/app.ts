/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import express from 'express';

// Route Imports
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

export default app;