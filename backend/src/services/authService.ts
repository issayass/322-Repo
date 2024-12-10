import bcrypt from 'bcryptjs';
import prisma from '../utils/prismaClient';
import { signToken } from '../utils/jwtUtils';

export const registerUser = async (data: {
  email: string;
  name: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const isAdmin = data.email.endsWith('@admin.com');

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
      isAdmin: isAdmin,
    },
  });

  await prisma.customer.create({
    data: {
      userId: newUser.id,
    },
  });

  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  const token = signToken({ id: user.id, email: user.email, isAdmin: user.isAdmin });

  return { token, user };
};
