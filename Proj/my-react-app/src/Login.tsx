import React, { useState } from 'react';
import Menu from './Menu';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
      
    const handleLogin = () => {
        if (username === 'harry' && password === 'diner') {
            setLoggedIn(true);
        } else {
            alert('Invalid username or password');
        }
    };
      
    return (
        !loggedIn ? (
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
        ) : (
              <Menu />
        )
    );
};

export default Login;