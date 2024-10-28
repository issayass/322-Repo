
import React, { useEffect, useState } from 'react';

interface MenuItem {
  name: string;
  price: number;
}

interface MenuProps {
  addToCart: (item: MenuItem) => void;
}

const Menu: React.FC<MenuProps> = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('/mockData.json');
        const data = await response.json();
        setMenuItems(data.menu);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    
    fetchMenuItems();
  }, []);

  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price.toFixed(2)}
            <button onClick={() => addToCart(item)}>Add to Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
