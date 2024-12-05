/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import express from 'express';

// Cors Imports
import cors from 'cors';

// Route Imports
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import customerRoutes from './routes/customerRoutes';
import staffRoutes from './routes/staffRoutes';
import managerRoutes from './routes/managerRoutes';
import inventoryRoutes from './routes/inventoryRoutes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/staff', staffRoutes);
app.use('/managers', managerRoutes);
app.use('/inventory', inventoryRoutes);

export default app;
