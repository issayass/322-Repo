import React, { useState, useEffect } from 'react';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface DiscountCode {
  code: string;
  discountPercentage: number; // Discount as a percentage
}

interface CartProps {
  cartItems: CartItem[];
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, clearCart }) => {
  const [tip, setTip] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [enteredCode, setEnteredCode] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountError, setDiscountError] = useState<string | null>(null);

  const taxRate = 0.08; // Example tax rate: 8%
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const tax = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + tax + tip;

  // Fetch discount codes from discountcode.json
  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await fetch('/discountcode.json');
        const data = await response.json();
        setDiscountCodes(data.codes);
      } catch (error) {
        console.error("Error fetching discount codes:", error);
      }
    };

    fetchDiscountCodes();
  }, []);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleTipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTip(parseFloat(event.target.value) || 0);
  };

  const applyDiscountCode = () => {
    const validCode = discountCodes.find(
      (code) => code.code.toLowerCase() === enteredCode.toLowerCase()
    );

    if (validCode) {
      setAppliedDiscount(validCode.discountPercentage);
      setDiscountError(null); // Clear error if any
    } else {
      setDiscountError('Invalid discount code. Please try again.');
    }
  };

  return (
    <div className="cart">
      <h2 className="checkout-text">Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="checkout-text">
            {item.name} - ${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <p className="checkout-text">Subtotal: ${subtotal.toFixed(2)}</p>
      <p className="checkout-text">Discount: -${discountAmount.toFixed(2)}</p>
      <p className="checkout-text">Tax (8%): ${tax.toFixed(2)}</p>

      {showCheckout ? (
        <div className="checkout">
          <label className="checkout-text">
            Add Tip: $
            <input
              type="number"
              step="0.01"
              value={tip}
              onChange={handleTipChange}
            />
          </label>
          <div className="discount">
            <input
              type="text"
              placeholder="Enter discount code"
              value={enteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
            />
            <button onClick={applyDiscountCode}>Apply Code</button>
          </div>
          {discountError && <p className="checkout-text error">{discountError}</p>}
          {appliedDiscount > 0 && (
            <p className="checkout-text">
              Discount Applied: {appliedDiscount}% off
            </p>
          )}
          <p className="checkout-text">Grand Total: ${total.toFixed(2)}</p>
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
