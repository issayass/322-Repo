/**
 * Copyright (c) CPTS 322 Harry's Diner Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Dotenv Imports
import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });

// Axios Imports
import axios from 'axios';
import type { AxiosError } from 'axios';

// Prisma Imports
import prisma from '../../utils/prismaClient';

describe('Login User API', () => {
  const baseURL = `http://localhost:${process.env.PORT}/auth`;
  const registerEndpoint = `${baseURL}/register`;
  const loginEndpoint = `${baseURL}/login`;

  const user = {
    name: 'johndoe',
    email: 'john.doe1@gmail.com',
    password: 'Password123!',
  };

  const validLogin = {
    email: 'john.doe1@gmail.com',
    password: 'Password123!',
  };

  const invalidEmail = {
    email: 'emaildoesnotexist@gmail.com',
    password: 'Password123!',
  };

  const invalidPassword = {
    email: 'john.doe1@gmail.com',
    password: 'thisisnottherightpassword',
  };

  beforeAll(async () => {
    // Register the user before tests.
    await axios.post(registerEndpoint, user);
  });

  afterAll(async () => {
    // Delete all users after tests.
    await prisma.user.deleteMany({});
  });

  it('should login user correctly with valid data', async () => {
    const response = await axios.post(loginEndpoint, validLogin);

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('user');
    expect(response.data.user).toMatchObject({
      name: user.name,
      email: user.email,
    });
    expect(response.data).toHaveProperty('token');
  });

  it('should fail login with user does not exist', async () => {
    try {
      await axios.post(loginEndpoint, invalidEmail);
    } catch (error: unknown) {
      const typedError = error as AxiosError;

      expect(typedError.response?.status).toBe(500);
      expect(typedError.response?.data).toHaveProperty(
        'error',
        'Invalid email or password.'
      );
    }
  });

  it('should fail login with invalid password', async () => {
    try {
      await axios.post(loginEndpoint, invalidPassword);
    } catch (error: unknown) {
      const typedError = error as AxiosError;

      expect(typedError.response?.status).toBe(500);
      expect(typedError.response?.data).toHaveProperty(
        'error',
        'Invalid email or password.'
      );
    }
  });
});
