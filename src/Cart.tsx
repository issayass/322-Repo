import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './style.css';

const TAX_RATE = 0.1; // 10% tax rate
const DEFAULT_TIP_PERCENTAGE = 0.15; // 15% tip by default

interface DiscountCode {
  code: string;
  discountPercentage: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const [tipPercentage, setTipPercentage] = useState<number>(DEFAULT_TIP_PERCENTAGE);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * TAX_RATE;
  const tip = subtotal * tipPercentage;

  const totalBeforeDiscount = subtotal + taxes;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount + tip;

  useEffect(() => {
    const fetchDiscountCodes = async () => {
      try {
        const response = await fetch('/discountcode.json');
        const data = await response.json();
        setDiscountCodes(data.codes);
      } catch (error) {
        console.error('Error fetching discount codes:', error);
      }
    };

    fetchDiscountCodes();
  }, []);

  const handleApplyDiscount = () => {
    const matchingCode = discountCodes.find((code) => code.code === discountCode);

    if (matchingCode) {
      const discount = (totalBeforeDiscount * matchingCode.discountPercentage) / 100;
      setDiscountAmount(discount);
    } else {
      alert('Invalid discount code!');
      setDiscountAmount(0);
    }
  };

  return (
    <div id="wrapper">
      <button id="return-button" className="return-button" onClick={() => navigate('/menu')}>
        ← Back to Menu
      </button>
      <div id="component" className="cart">
        <h1 className="heading">Cart</h1>
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
            <div className="summary">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Taxes (10%): ${taxes.toFixed(2)}</p>
              <p>
                Tip ({(tipPercentage * 100).toFixed(0)}%): ${tip.toFixed(2)}
                <input
                  type="number"
                  value={(tipPercentage * 100).toFixed(0)}
                  onChange={(e) => setTipPercentage(Number(e.target.value) / 100)}
                  style={{ marginLeft: '10px', width: '60px' }}
                  min="0"
                  placeholder="Tip %"
                />%
              </p>
              <p>Total before discount: ${totalBeforeDiscount.toFixed(2)}</p>
              <div className="discount">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter discount code"
                  style={{ marginRight: '10px' }}
                />
                <button onClick={handleApplyDiscount}>Apply Discount</button>
              </div>
              {discountAmount > 0 && (
                <p>Discount Applied: -${discountAmount.toFixed(2)}</p>
              )}
              <p className="total">Total After Discount: ${Math.max(0, totalAfterDiscount).toFixed(2)}</p>
            </div>
            <button onClick={clearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
