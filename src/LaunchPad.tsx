// src/LaunchPad.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LaunchPad: React.FC = () => { // Renamed component
  const navigate = useNavigate();

  return (
    <div className="launch-pad">
      <h2 className="welcome-text">Welcome to the Restaurant App</h2>
      <button onClick={() => navigate('/menu')}>Menu</button>
      <button onClick={() => navigate('/inventory')}>Inventory</button>
    </div>
  );
};

export default LaunchPad; // Exporting the renamed component

