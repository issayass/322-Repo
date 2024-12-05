
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import './style.css'

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/auth/register', {
        email,
        password,
      });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div id='wrapper'>
      <button id='return-button' onClick={() => navigate('/Login')}>Back to log in</button>
      <div id="component">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input id='input'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input id='input'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button id='center-button' type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
