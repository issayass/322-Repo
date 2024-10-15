import React from 'react';
import './App.css';

const Menu: React.FC = () => {
  const items: string[] = ['Burger', 'Pasta', 'Pizza', 'Salad'];

  const handleOrder = (item: string) => {
    alert(`You selected: ${item}`);
  };

  return (
    <div className="menu">
      <h2>Menu</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item} 
            <button onClick={() => handleOrder(item)}>Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
