import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const LaunchPad: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div id="wrapper">
      <button id="return-button" onClick={() => navigate('/login')}>
        Log In / Sign Up
      </button>
      <div id="component">
        <h2 className="welcome-text">Welcome to the Restaurant App</h2>
        <div id="button-grid">
          <button id="button-grid-button" onClick={() => navigate('/menu')}>
            Menu
          </button>
          <button id="button-grid-button" onClick={() => navigate('/inventory')}>
            Inventory
          </button>
          <button id="button-grid-button" onClick={() => navigate('/order-notification')}>
            See Order Notification
          </button>
          <button id="button-grid-button" onClick={() => navigate('/modify-order-notification')}>
            Modify Order Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaunchPad;
