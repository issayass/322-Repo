// backend/src/services/cartService.ts

import prisma from '../utils/prismaClient';

export async function getCustomerIdByUserId(userId: number): Promise<number | null> {
  const customer = await prisma.customer.findUnique({
    where: { userId },
  });
  return customer ? customer.id : null;
}

export async function getCartForUser(userId: number) {
  const customerId = await getCustomerIdByUserId(userId);
  if (!customerId) return null;

  return prisma.cart.findUnique({
    where: { customerId },
    include: { cartItems: true },
  });
}

interface AddCartItemInput {
  name: string;
  price: number;
  quantity: number;
}

export async function addCartItemForUser(userId: number, data: AddCartItemInput) {
  const customerId = await getCustomerIdByUserId(userId);
  if (!customerId) {
    throw new Error('No customer found for this user.');
  }

  let cart = await prisma.cart.findUnique({ where: { customerId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { customerId, totalPrice: 0 } });
  }

  // Check if the item already exists in the cart (by name)
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, name: data.name },
  });

  if (existingItem) {
    // Update the quantity of the existing item
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + data.quantity },
    });
  } else {
    // Create a new cart item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        quantity: data.quantity,
        name: data.name,
        price: data.price,
      },
    });
  }

  await recalculateCartTotal(cart.id);
}

export async function updateCartItemQuantity(userId: number, cartItemId: number, quantity: number) {
  const customerId = await getCustomerIdByUserId(userId);
  if (!customerId) {
    throw new Error('No customer found for this user.');
  }

  const cart = await prisma.cart.findUnique({ where: { customerId } });
  if (!cart) throw new Error('Cart not found for this user.');

  const cartItem = await prisma.cartItem.findUnique({ where: { id: cartItemId } });
  if (!cartItem || cartItem.cartId !== cart.id) {
    throw new Error('Cart item not found or does not belong to this user.');
  }

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });

  await recalculateCartTotal(cart.id);
}

export async function clearCartForUser(userId: number) {
  const customerId = await getCustomerIdByUserId(userId);
  if (!customerId) return;

  const cart = await prisma.cart.findUnique({ where: { customerId } });
  if (!cart) return;

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  await prisma.cart.update({
    where: { id: cart.id },
    data: { totalPrice: 0 },
  });
}

async function recalculateCartTotal(cartId: number) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: true },
  });
  if (!cart) return;

  const totalPrice = cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  await prisma.cart.update({
    where: { id: cartId },
    data: { totalPrice },
  });
}
