/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import express from 'express';
import type { Request, Response } from 'express';

// Prisma Imports
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 3001;

const prisma = new PrismaClient()

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});