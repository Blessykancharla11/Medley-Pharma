import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import Logo from '../assets/Logo.jpeg';

const Navbar = ({ isLoggedIn, role, user, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleCatDropdown = () => {
    setShowCatDropdown(!showCatDropdown);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogin = (role) => {
    setShowDropdown(false);
    if (role === 'User') {
      navigate('/login');
    } else if (role === 'Admin') {
      navigate('/admin');
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-violet">
      <div className="logo">
        <img src={Logo} alt="Medly-Pharma Logo" className="logo-image" />
        Medley Pharma
      </div>
      <ul className="nav-links navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/" onClick={() => setShowDropdown(false)}>Home</Link>
        </li>
        {!isLoggedIn && (
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" onClick={toggleDropdown}>Login</a>
            <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
              <a className="dropdown-item" href="#" onClick={() => handleLogin('User')}>User</a>
              <a className="dropdown-item" href="#" onClick={() => handleLogin('Admin')}>Admin</a>
            </div>
          </li>
        )}
        {isLoggedIn && role === 'user' && (
          <>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" onClick={toggleCatDropdown}>Categories</a>
              <div className={`dropdown-menu ${showCatDropdown ? 'show' : ''}`}>
                <Link className="dropdown-item" to="/baby-care" onClick={() => setShowCatDropdown(false)}>Baby Care</Link>
                <Link className="dropdown-item" to="/otc" onClick={() => setShowCatDropdown(false)}>OTC</Link>
                <Link className="dropdown-item" to="/vitamins-supplements" onClick={() => setShowCatDropdown(false)}>Vitamins</Link>
                <Link className="dropdown-item" to="/personal-care" onClick={() => setShowCatDropdown(false)}>Personal Care</Link>
                <Link className="dropdown-item" to="/pain-relief" onClick={() => setShowCatDropdown(false)}>Pain Relief</Link>
                <Link className="dropdown-item" to="/allergy" onClick={() => setShowCatDropdown(false)}>Allergy</Link>
                <Link className="dropdown-item"to="/antibiotics" onClick={() => setShowCatDropdown(false)}>Antibiotics</Link>
                <Link className="dropdown-item" to="/diabetes" onClick={() => setShowCatDropdown(false)}>Diabetes</Link>
                <Link className="dropdown-item" to="/blood-pressure" onClick={() => setShowCatDropdown(false)}>Blood Pressure</Link>
                <Link className="dropdown-item" to="/digestive-health" onClick={() => setShowCatDropdown(false)}>Digestive Health</Link>
                
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" onClick={toggleProfileDropdown}>Orders</a>
              <div className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`}>
                <Link className="dropdown-item" to="/wishlist" onClick={() => setShowProfileDropdown(false)}>Wishlist</Link>
                <Link className="dropdown-item" to="/view-cart" onClick={() => setShowProfileDropdown(false)}>View Cart</Link>
              </div>
            </li>
            <li><button className="nav-link btn btn-link white-text" onClick={handleLogout}>Logout</button></li>

          </>
        )}
        {isLoggedIn && role === 'admin' && (
          <>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" onClick={toggleCatDropdown}>Categories</a>
              <div className={`dropdown-menu ${showCatDropdown ? 'show' : ''}`}>
                <Link className="dropdown-item" to="/pain-relief" onClick={() => setShowCatDropdown(false)}>Pain Relief</Link>
                <Link className="dropdown-item" to="/baby-care" onClick={() => setShowCatDropdown(false)}>Baby Care</Link>
                <Link className="dropdown-item" to="/otc" onClick={() => setShowCatDropdown(false)}>OTC</Link>
                <Link className="dropdown-item" to="/vitamins-supplements" onClick={() => setShowCatDropdown(false)}>Vitamins & Supplements</Link>
                <Link className="dropdown-item" to="/personal-care" onClick={() => setShowCatDropdown(false)}>Personal Care</Link>
                <Link className="dropdown-item" to="/allergy" onClick={() => setShowCatDropdown(false)}>Allergy</Link>
                <Link className="dropdown-item"to="/antibiotics" onClick={() => setShowCatDropdown(false)}>Antibiotics</Link>
                <Link className="dropdown-item" to="/diabetes" onClick={() => setShowCatDropdown(false)}>Diabetes</Link>
                <Link className="dropdown-item" to="/blood-pressure" onClick={() => setShowCatDropdown(false)}>Blood Pressure</Link>
                <Link className="dropdown-item" to="/digestive-health" onClick={() => setShowCatDropdown(false)}>Digestive Health</Link>
                
                
              </div>
            </li>
            <li><button className="nav-link btn btn-link white-text" onClick={handleLogout}>Logout</button></li>

          </>
        )}
        <li className="nav-item">
          <HashLink className="nav-link" smooth to="/#contact" onClick={() => setShowDropdown(false)}>Contact</HashLink>
        </li>
        <li className="nav-item">
          <HashLink className="nav-link" smooth to="/#about" onClick={() => setShowDropdown(false)}>About</HashLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
