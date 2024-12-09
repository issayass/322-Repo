// frontend/src/Login.tsx

import React, { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from './AuthContext';
import axiosInstance from './axiosInstance';
import './style.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      
      const { token, user } = response.data;
      setAuthToken(token);

      if (user.isAdmin) {
        setRole('admin');
      } else {
        setRole('guest');
      }

      navigate('/launchpad');
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  return (
    <div id='wrapper' className="loginWrapper">
      <div id='component' className="login">
        <h2>Welcome to Harry's Diner!</h2>
        <p>Enter your account email and password to log in.</p>
        <form onSubmit={handleSubmit}>
          <input
            id='input'
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            id='input'
            type="password"
            placeholder="ExamplePassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button id='center-button' type="submit">Login</button>
        </form>
        <p id="new-account">
          Don't have an account?{' '}
          <button id='center-button' onClick={() => navigate('/register')}>Register here</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
