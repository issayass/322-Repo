
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

interface MenuItem {
  name: string;
  price: number;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
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
    setNotification(`${item.name} has been added to your cart!`);
    setTimeout(() => setNotification(null), 1000);
  };

  return (
    <div className="menu">
      <button onClick={() => navigate('/launchpad')} className="back-button">
        ← Back to Launch Pad
      </button>
      <h2>Menu</h2>
      {notification && <div className="notification">{notification}</div>}
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
  );
};

export default Menu;
