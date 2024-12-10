import prisma from '../utils/prismaClient';

async function getCustomerIdByUserId(userId: number) {
  const customer = await prisma.customer.findUnique({ where: { userId } });
  return customer ? customer.id : null;
}

interface CreateOrderInput {
  status: string;
}

export async function createOrderForUser(userId: number, data: CreateOrderInput) {
  const customerId = await getCustomerIdByUserId(userId);
  if (!customerId) throw new Error('No customer found for this user.');

  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: { cartItems: true },
  });

  if (!cart || cart.cartItems.length === 0) {
    throw new Error('Cart is empty, cannot place order.');
  }

  const subtotal = cart.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const specialInstructions = JSON.stringify({
    status: data.status,
    subtotal: subtotal.toFixed(2),
  });

  const order = await prisma.order.create({
    data: {
      orderDate: new Date(),
      orderStatus: false,
      specialInstructions,
      customerId,
    },
  });

  // Create order items
  for (const cItem of cart.cartItems) {
    for (let i = 0; i < cItem.quantity; i++) {
      await prisma.orderItem.create({
        data: {
          itemID: cItem.name,
          name: cItem.name,
          price: cItem.price,
          orderId: order.id,
        },
      });
    }
  }

  // Clear cart
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
  await prisma.cart.update({
    where: { id: cart.id },
    data: { totalPrice: 0 },
  });

  return getOrderById(order.id);
}

export async function getAllOrders() {
  const orders = await prisma.order.findMany({ include: { orderItems: true } });

  return orders.map(o => {
    const instructions = JSON.parse(o.specialInstructions);
    const combinedItems = combineOrderItems(o.orderItems);
    return {
      id: o.id,
      status: instructions.status,
      subtotal: instructions.subtotal,
      items: combinedItems,
    };
  });
}

export async function getOrderById(id: number) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { orderItems: true },
  });
  if (!order) return null;

  const instructions = JSON.parse(order.specialInstructions);
  const combinedItems = combineOrderItems(order.orderItems);

  return {
    id: order.id,
    status: instructions.status,
    subtotal: instructions.subtotal,
    items: combinedItems,
  };
}

export async function updateOrderStatus(id: number, newStatus: string) {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) return null;

  const instructions = JSON.parse(order.specialInstructions);
  instructions.status = newStatus;

  const updated = await prisma.order.update({
    where: { id },
    data: {
      specialInstructions: JSON.stringify(instructions),
    },
    include: { orderItems: true },
  });

  const parsed = JSON.parse(updated.specialInstructions);
  const combinedItems = combineOrderItems(updated.orderItems);

  return {
    id: updated.id,
    status: parsed.status,
    subtotal: parsed.subtotal,
    items: combinedItems,
  };
}

function combineOrderItems(orderItems: { name: string; price: number }[]) {
  return orderItems.reduce((acc, curr) => {
    const existing = acc.find(a => a.name === curr.name && a.price === curr.price);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ name: curr.name, price: curr.price, quantity: 1 });
    }
    return acc;
  }, [] as { name: string; price: number; quantity: number }[]);
}
