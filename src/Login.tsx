
import React, { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import axiosInstance from './axiosInstance';
import { AuthContext } from './AuthContext';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (email === 'a@a.com' && password === 'pw') {
      setAuthToken('mockToken'); 
      navigate('/launchpad');
    } else {
      alert('Invalid email or password');
    }

    

    /*
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      const { token } = response.data;
      setAuthToken(token);
      navigate('/launchpad');
    } catch (error) {
      alert('Invalid email or password');
    }
    */
  };

  return (
    <div className="loginWrapper">
      <div className="login">
        <h2>Welcome to Harry's Diner!</h2>
        <p>Enter your account email and password to log in.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="ExamplePassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p id="newAccount">
          Don't have an account?{' '}
          <button onClick={() => navigate('/register')}>Register here</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
