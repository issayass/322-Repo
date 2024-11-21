
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { CartProvider } from './CartContext';
import AppRouter from './AppRouter';
import './App.css';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRouter />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
