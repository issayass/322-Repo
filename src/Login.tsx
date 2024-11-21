
import React, { useState, FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//import axiosInstance from './axiosInstance';
import { AuthContext } from './AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (email === 'test@example.com' && password === 'password123') {
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
    <div className="login">
      <h2>Login</h2>
      <p>enter an email(test@example.com): <strong></strong> and password: <strong>(password123)</strong> to log in.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <button onClick={() => navigate('/register')}>Register here</button>
      </p>
    </div>
  );
};

export default Login;
