// src/components/Admin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const Admin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
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
      const { data } = await axios.post('http://localhost:8000/api/admins/login', { email, password });
      console.log('Admin Logged In:', data);
      onLogin('admin');
      navigate('/'); // Redirect to the medicines page after successful login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`admin-container ${isTyping ? 'stop-animation' : ''}`}>
      <div className="admin-form">
        <h2>Admin Login</h2>
        {error && <p>{error}</p>}
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
          <button type="submit" className="login-button" style={{backgroundColor: '#9b4bd0' }}>Login</button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/admin-signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
