import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import { useAuth } from './AuthContext';

interface CartItem {
  id?: number;      // id given from the backend
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  fetchCart: () => Promise<void>;
  addToCart: (item: { name: string; price: number }) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  fetchCart: async () => {},
  addToCart: async () => {},
  updateCartItem: async () => {},
  clearCart: async () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { authToken } = useAuth();

  const fetchCart = async () => {
    if (!authToken) {
      setCartItems([]);
      return;
    }
    try {
      const response = await axiosInstance.get('/cart');
      const cart = response.data;
      if (cart && cart.cartItems) {
        setCartItems(cart.cartItems.map((ci: any) => ({
          id: ci.id,
          name: ci.name,
          price: ci.price,
          quantity: ci.quantity
        })));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (item: { name: string; price: number }) => {
    if (!authToken) {
      alert('You must be logged in to add to cart');
      return;
    }
    try {
      await axiosInstance.post('/cart/item', { name: item.name, price: item.price, quantity: 1 });
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    if (!authToken) {
      alert('You must be logged in to update cart');
      return;
    }
    try {
      await axiosInstance.put(`/cart/item/${itemId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const clearCart = async () => {
    if (!authToken) {
      return;
    }
    try {
      await axiosInstance.delete('/cart/clear');
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [authToken]);

  return (
    <CartContext.Provider value={{ cartItems, fetchCart, addToCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
