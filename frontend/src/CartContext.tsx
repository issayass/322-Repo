
import React, { createContext, useState, ReactNode } from 'react';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: { name: string; price: number }) => void;
  updateCartItem: (itemName: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  updateCartItem: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: { name: string; price: number }) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartItem = (itemName: string, quantity: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.name === itemName
          ? { ...cartItem, quantity: Math.max(0, quantity) } // Ensure quantity is non-negative
          : cartItem
      ).filter((cartItem) => cartItem.quantity > 0) // Remove items with quantity 0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
