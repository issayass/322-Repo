import { Request, Response, RequestHandler } from 'express';
import { getCartForUser, addCartItemForUser, updateCartItemQuantity, clearCartForUser } from '../services/cartService';

export const getCartHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }
    const cart = await getCartForUser(req.user.id);
    res.json(cart || { cartItems: [], totalPrice: 0 });
  } catch (error: unknown) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart.' });
  }
};

export const addItemToCartHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }
    const { name, price, quantity } = req.body;
    const item = await addCartItemForUser(req.user.id, { name, price, quantity });
    res.status(201).json(item);
  } catch (error: unknown) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart.' });
  }
};

export const updateCartItemHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }

    const cartItemId = parseInt(req.params.id, 10);
    const { quantity } = req.body;
    await updateCartItemQuantity(req.user.id, cartItemId, quantity);
    res.json({ message: 'Cart item updated successfully.' });
  } catch (error: unknown) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item.' });
  }
};

export const clearCartHandler: RequestHandler = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authenticated.' });
      return;
    }
    await clearCartForUser(req.user.id);
    res.json({ message: 'Cart cleared successfully.' });
  } catch (error: unknown) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart.' });
  }
};
