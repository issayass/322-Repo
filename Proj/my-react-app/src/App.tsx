import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Menu from './Menu';

const App: React.FC = () => {
  const [goToLogin, setLoginPage] = useState<boolean>(false);
  const [goToMenu, setMenuPage] = useState<boolean>(false);

  const handleLoginClick = () => setLoginPage(true);
  const handleMenuClick = () => setMenuPage(true);

  return (
    <div className="App">
      {goToLogin ? (
        <Login />
      ) : goToMenu ? (
        <Menu />
      ) : (
        <div className="HomePage">
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
          <h2>Welcome to Harry's Diner!</h2>
          <h3>Serving comfort on every plate.</h3>
          <button className="menu-button" onClick={handleMenuClick}>
            Browse Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
