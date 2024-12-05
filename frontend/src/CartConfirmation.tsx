import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './style.css';

const CartConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart } = useContext(CartContext);

  const [addCheese, setAddCheese] = useState(false);
  const [allergies, setAllergies] = useState<string>('');

  const handleAddCheese = () => {
    if (addCheese) {
      // Add $2 to the last item added to the cart
      const lastItem = cartItems[cartItems.length - 1];
      if (lastItem) {
        addToCart({ name: `${lastItem.name} (Cheese)`, price: 2 });
      }
    }
    navigate('/cart'); // Navigate to the cart after applying changes
  };

  return (
    <div id="wrapper">
      <div id="component">
        <h1>Item Added to Cart</h1>
        <p>Your item has been successfully added to the cart!</p>
        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={addCheese}
              onChange={(e) => setAddCheese(e.target.checked)}
            />
            Add Cheese ($2.00)
          </label>
          <div className="allergy-section">
            <label>
              Allergies (Optional):
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="Enter allergy info"
              />
            </label>
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => navigate('/menu')} className="back-button">
            Back to Menu
          </button>
          <button onClick={handleAddCheese} className="view-cart-button">
            Confirm and View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartConfirmation;
