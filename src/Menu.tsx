import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useAuth } from './AuthContext';
import './style.css';

interface MenuItem {
  id: number; // Unique ID for each menu item
  name: string;
  price: number;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { role } = useAuth();

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

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: menuItems.length + 1,
      name: prompt('Enter item name:') || 'New Item',
      price: parseFloat(prompt('Enter item price:') || '0'),
    };
    setMenuItems((prevMenu) => [...prevMenu, newItem]);
  };

  const handleModifyMenuItem = (id: number) => {
    const updatedMenu = menuItems.map((item) =>
      item.id === id
        ? {
            ...item,
            name: prompt('Enter new name:', item.name) || item.name,
            price: parseFloat(prompt('Enter new price:', item.price.toString()) || item.price.toString()),
          }
        : item
    );
    setMenuItems(updatedMenu);
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
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}
              <button id="button-grid-button" onClick={() => handleAddToCart(item)}>Add to Order</button>
              {role === 'admin' && (
                <button id="button-grid-button" onClick={() => handleModifyMenuItem(item.id)}>Modify</button>
              )}
            </li>
          ))}
        </ul>
        {role === 'admin' && (
          <button id="button-grid-button" onClick={handleAddMenuItem} className="add-item-button">
          Add New Item
          </button>
        )}
        <button id="button-grid-button" onClick={() => navigate('/cart')} className="view-cart-button">
          View Cart
        </button>
      </div>
    </div>
  );
};

export default Menu;
