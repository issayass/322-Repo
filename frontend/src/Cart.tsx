import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './style.css';
import axiosInstance from './axiosInstance';

const TAX_RATE = 0.1;
const DEFAULT_TIP_PERCENTAGE = 0.15;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, updateCartItem } = useContext(CartContext);

  const [tipPercentage, setTipPercentage] = useState<number>(DEFAULT_TIP_PERCENTAGE);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * TAX_RATE;
  const tip = subtotal * tipPercentage;
  const totalBeforeDiscount = subtotal + taxes + tip;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  const handleApplyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscountAmount(totalBeforeDiscount * 0.1);
    } else {
      alert('Invalid discount code!');
      setDiscountAmount(0);
    }
  };

  const handleIncrement = (itemId?: number) => {
    if (!itemId) return;
    const item = cartItems.find(ci => ci.id === itemId);
    if (item) {
      updateCartItem(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId?: number) => {
    if (!itemId) return;
    const item = cartItems.find(ci => ci.id === itemId);
    if (item && item.quantity > 1) {
      updateCartItem(itemId, item.quantity - 1);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // We just pick a default status, e.g. "Pending"
      const response = await axiosInstance.post('/orders', { status: 'Pending' });
      if (response.status === 201) {
        // Clear cart after successful order placement
        await clearCart();
        navigate('/order-notification');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div id="wrapper">
      <div id="return-button">
        <button className="back-button" onClick={() => navigate('/menu')}>
          ← Back to Menu
        </button>
      </div>
      <div id="component" className="cart">
        <h1 className="heading">Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity} - ${item.price * item.quantity}
                  <button id='general-button' onClick={() => handleIncrement(item.id)}>Add</button>
                  <button id='general-button' onClick={() => handleDecrement(item.id)}>Remove</button>
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
                <button id='general-button' onClick={handleApplyDiscount}>Apply Discount</button>
              </div>
              {discountAmount > 0 && (
                <p>Discount Applied: -${discountAmount.toFixed(2)}</p>
              )}
              <p className="total">Total After Discount: ${Math.max(0, totalAfterDiscount).toFixed(2)}</p>
            </div>
            <button id='general-button' onClick={handlePlaceOrder}>Place Order</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
