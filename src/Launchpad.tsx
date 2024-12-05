import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './style.css';

const LaunchPad: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  return (
    <div id="wrapper">
      <button id="login-button" onClick={() => navigate('/login')}>
        Log In / Sign Up
      </button>
      <div id="component">
        <h2 className="welcome-text">Welcome to the Harry's Diner!</h2>
        <div id="button-grid">
          <button id="button-grid-button" onClick={() => navigate('/menu')}>
            Menu
          </button>
          {role === 'admin' && (
            <button id="button-grid-button" onClick={() => navigate('/inventory')}>
              Inventory
            </button>
          )}

          <button id="button-grid-button" onClick={() => navigate('/order-notification')}>
            See Order Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaunchPad;
