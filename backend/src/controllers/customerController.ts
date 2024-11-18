/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Express Imports
import type { Request, Response } from 'express';

// Prisma Imports
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Zod Validation Imports
import { ZodError } from 'zod';

// Service (Customer Model) Imports
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customerService';

// Scheme Validation (Customer Model) Imports
import {
  createCustomerSchema,
  updateCustomerSchema,
} from '../models/customerModel';

/**
 * Controller to fetch all customers.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Retrieves all customers from the database, includes the user relations, and
 * sends the result as a JSON response.
 */
export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await getAllCustomers();

    res.json(customers);
  } catch (error: unknown) {
    let message = 'Failed to fetch customers.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to fetch a single customer.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Retrieves a single customer from the database from an ID number. Includes
 * the user property, and sends the customer as a JSON response.
 */
export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const customer = await getCustomerById(customerId);

    if (!customer) {
      res.status(404).json({ error: 'Customer not found.' });
      return;
    }

    res.json(customer);
  } catch (error: unknown) {
    let message = 'Failed to fetch customer.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to create a new customer.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Creates a new customer in the database when given a userId that the customer
 * will belong to. Validates with Zod and sends the newly created customer
 * object as a JSON resposne.
 */
export const createCustomerHandler = async (req: Request, res: Response) => {
  try {
    const data = createCustomerSchema.parse(req.body);

    const newCustomer = await createCustomer(data);

    res.status(201).json(newCustomer);
  } catch (error: unknown) {
    let statusCode = 400;
    let message = 'Failed to create customer.';

    if (error instanceof ZodError) {
      statusCode = 400;
      message = error.issues[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        statusCode = 409;
        message = 'A customer already exists for this user.';
      } else {
        message = `Prisma error: ${error.message}`;
      }
    }

    res.status(statusCode).json({ error: message });
  }
};

/**
 * Controller to update an existing customer.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Updates an existing customer in the database when given an ID and some
 * properties of the customer model. Sends the updated customer as a JSON
 * response.
 */
export const updateCustomerHandler = async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const updates = updateCustomerSchema.parse(req.body);
    const updatedCustomer = await updateCustomer(customerId, updates);

    if (!updatedCustomer) {
      res.status(404).json({ error: 'Customer not found.' });
      return;
    }

    res.json(updatedCustomer);
  } catch (error: unknown) {
    let message = 'Failed to update customer.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};

/**
 * Controller to delete an existing customer.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 *
 * @description
 * Deletes an existing customer from the database when given an ID. Sends a
 * success message if the customer was deleted, else an error.
 */
export const deleteCustomerHandler = async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.id, 10);
    const deletedCustomer = await deleteCustomer(customerId);

    if (!deletedCustomer) {
      res.status(404).json({ error: 'Customer not found.' });
      return;
    }

    res.json({ message: 'Customer deleted successfully.' });
  } catch (error: unknown) {
    let message = 'Failed to delete customer.';

    if (error instanceof PrismaClientKnownRequestError) {
      message = `Prisma error: ${error.message}`;
    }

    res.status(500).json({ error: message });
  }
};
