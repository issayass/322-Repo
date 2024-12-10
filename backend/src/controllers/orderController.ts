import { RequestHandler } from 'express';
import { createOrderForUser, getAllOrders, updateOrderStatus } from '../services/orderService';

export const createOrderHandler: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'User not authenticated.' });
      return;
    }

    const { status } = req.body;
    if (typeof status !== 'string') {
      res.status(400).json({ error: 'Status is required and must be a string.' });
      return;
    }

    const order = await createOrderForUser(req.user.id, { status });
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order.' });
  }
};

export const getOrdersHandler: RequestHandler = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
};

export const updateOrderStatusHandler: RequestHandler = async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (typeof status !== 'string') {
      res.status(400).json({ error: 'Invalid status.' });
      return;
    }

    const updatedOrder = await updateOrderStatus(orderId, status);
    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found.' });
      return;
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order.' });
  }
};
