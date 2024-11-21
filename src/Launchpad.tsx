import React from 'react';

interface LaunchPadProps {
  goToMenu: () => void;
  goToInventory?: () => void; 
}

const LaunchPad: React.FC<LaunchPadProps> = ({ goToMenu, goToInventory }) => {
  return (
    <div className="launch-pad">
      <h2 className="welcome-text">Welcome to the Restaurant App</h2>
      <button onClick={goToMenu}>Menu</button>
      {goToInventory && <button onClick={goToInventory}>Inventory</button>}
    </div>
  );
};

export default LaunchPad;
