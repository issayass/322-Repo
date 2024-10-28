// App.tsx
import React, { useState } from 'react';
import './App.css';
import Menu from './Menu';
import Cart from './Cart';
import LaunchPad from './Launchpad.tsx';
import Inventory from './Inventory';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

type View = 'launchPad' | 'menu' | 'inventory' | 'cart';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<View>('launchPad');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleLogin = () => {
    if (username === 'harry' && password === 'diner') {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const addToCart = (item: { name: string; price: number }) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prevCartItems.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="login">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : currentView === 'launchPad' ? (
        <LaunchPad 
          goToMenu={() => setCurrentView('menu')}
          goToInventory={() => setCurrentView('inventory')}
        />
      ) : currentView === 'menu' ? (
        <>
          <button onClick={() => setCurrentView('launchPad')} className="back-arrow">
            ← Back to Launch Pad
          </button>
          <Menu addToCart={addToCart} />
          <button onClick={() => setCurrentView('cart')}>View Cart</button>
        </>
      ) : currentView === 'inventory' ? (
        <Inventory goBack={() => setCurrentView('launchPad')} />
      ) : (
        <>
          <button onClick={() => setCurrentView('menu')} className="back-arrow">
            ← Back to Menu
          </button>
          <Cart cartItems={cartItems} clearCart={clearCart} />
        </>
      )}
    </div>
  );
};

export default App;
