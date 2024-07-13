import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
      console.log('Logged in user:', response.data);
      onLogin('user');
      navigate('/'); // Redirect to the home page after successful login
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className={`login-container ${isTyping ? 'stop-animation' : ''}`}>
      <div className="login-form">
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button" style={{ backgroundColor: '#9b4bd0' }}>Login</button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
