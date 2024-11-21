// src/LaunchPad.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LaunchPad: React.FC = () => { // Renamed component
  const navigate = useNavigate();

  return (
    <div id='wrapper'>
      <button id='return-button' onClick={() => navigate('/Login')}>Log in / Sign up</button>
      <div id="component">
        <h2 className="welcome-text">Welcome to the Restaurant App</h2>
        <div id='button-grid'>
          <button id='button-grid-button' onClick={() => navigate('/menu')}>Menu</button>
          <button id='button-grid-button' onClick={() => navigate('/inventory')}>Inventory</button>
        </div>
      </div>
    </div>
  );
};

export default LaunchPad; // Exporting the renamed component

