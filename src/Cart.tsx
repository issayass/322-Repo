import React, { useState } from 'react';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, clearCart }) => {
  const [tip, setTip] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);

  const taxRate = 0.08; // Example tax rate: 8%
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax + tip;

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleTipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTip(parseFloat(event.target.value) || 0);
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Subtotal: ${subtotal.toFixed(2)}</p>
      <p>Tax (8%): ${tax.toFixed(2)}</p>

      {showCheckout ? (
        <div className="checkout">
          <label>
            Add Tip: $
            <input
              type="number"
              step="0.01"
              value={tip}
              onChange={handleTipChange}
            />
          </label>
          <p>Grand Total: ${total.toFixed(2)}</p>
          <button onClick={clearCart}>Complete Order</button>
        </div>
      ) : (
        <button onClick={handleCheckout}>Checkout</button>
      )}

      <button onClick={clearCart} style={{ marginTop: '10px' }}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
