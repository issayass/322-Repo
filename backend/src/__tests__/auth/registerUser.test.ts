/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Axios Imports
import axios from 'axios';
import type { AxiosError } from 'axios';

// Dotenv Imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

// Prisma Imports
import prisma from '../../utils/prismaClient';

describe('Register User API', () => {
  const baseURL = 'http://localhost:3002/auth';
  const registerEndpoint = `${baseURL}/register`;

  const validUser = {
    name: 'johndoe',
    email: 'john.doe@gmail.com',
    password: 'Password123!',
  };

  const invalidName = {
    name: '',
    email: 'jane.doe@gmail.com',
    password: 'Password123!',
  };

  const invalidEmail = {
    name: 'janedoe',
    email: 'janedoe',
    password: 'Password123!',
  };

  const invalidPassword = {
    name: 'janedoe',
    email: 'jane.doe@gmail.com',
    password: 'short',
  };

  const duplicateEmail = {
    name: 'janedoe',
    email: 'john.doe@gmail.com',
    password: 'Password123!',
  };

  afterAll(async () => {
    // Delete all users after tests.
    await prisma.user.deleteMany({});
  });

  it('should register a new user with valid data', async () => {
    const response = await axios.post(registerEndpoint, validUser);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty(
      'message',
      'User registered successfully.'
    );
    expect(response.data).toHaveProperty('user');
    expect(response.data.user).toMatchObject({
      name: validUser.name,
      email: validUser.email,
    });
  });

  it('should error with name is required', async () => {
    try {
      await axios.post(registerEndpoint, invalidName);
    } catch (error: unknown) {
      const typedError = error as AxiosError;

      expect(typedError.response?.status).toBe(400);
      expect(typedError.response?.data).toHaveProperty(
        'error',
        'Name is required.'
      );
    }
  });

  it('should error with invalid email address', async () => {
    try {
      await axios.post(registerEndpoint, invalidEmail);
    } catch (error: unknown) {
      const typedError = error as AxiosError;

      expect(typedError.response?.status).toBe(400);
      expect(typedError.response?.data).toHaveProperty(
        'error',
        'Invalid email address.'
      );
    }
  });

  it('should error with password too short', async () => {
    try {
      await axios.post(registerEndpoint, invalidPassword);
    } catch (error: unknown) {
      const typedError = error as AxiosError;

      expect(typedError.response?.status).toBe(400);
      expect(typedError.response?.data).toHaveProperty(
        'error',
        'Password must be at least 8 characters long.'
      );
    }
  });

  it('should error with user already exists with this email', async () => {
    try {
      await axios.post(registerEndpoint, duplicateEmail);
    } catch (error: unknown) {
      const typedError = error as AxiosError;

      expect(typedError.response?.status).toBe(409);
      expect(typedError.response?.data).toHaveProperty(
        'error',
        'A user already exists with this email address.'
      );
    }
  });
});
