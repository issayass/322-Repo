/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, World!");
});

export default app;