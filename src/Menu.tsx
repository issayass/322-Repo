import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './style.css';

interface MenuItem {
  name: string;
  price: number;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/mockData.json');
        const data = await response.json();
        setMenuItems(data.menu);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    navigate('/cart-confirmation'); // Redirect to the confirmation page
  };

  return (
    <div id="wrapper">
      <div id="return-button">
        <button onClick={() => navigate('/launchpad')} className="back-button">
          ← Back to Main Menu
        </button>
      </div>
      <div id="component">
        <h2>Menu</h2>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price.toFixed(2)}
              <button onClick={() => handleAddToCart(item)}>Add to Order</button>
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/cart')} className="view-cart-button">
          View Cart
        </button>
      </div>
    </div>
  );
};

export default Menu;
