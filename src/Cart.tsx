// src/Cart.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import { CartContext } from './CartContext';

const Cart: React.FC = () => {
  const navigate = useNavigate(); // Updated from useHistory to useNavigate
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <button onClick={() => navigate('/menu')}>← Back to Menu</button>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.name}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
