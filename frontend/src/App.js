import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';
import AdminSignup from './components/AdminSignup';
import Navbar from './components/Navbar';
import About from './components/About';
import ViewMedicines from './components/ViewMedicines';
import OrderPage from './components/OrderPage';
import ViewCart from './components/ViewCart';
import Wishlist from './components/Wishlist';
import UserDetailsForm from './components/UserDetailsForm';
import OrderConfirmation from './components/OrderConfirmation';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem('wishlist')) || []
  );

  const handleLogin = (role, user) => {
    setIsLoggedIn(true);
    setRole(role);
    setUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setUser(null);
    setCart([]);
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item =>
      item._id === id ? { ...item, quantity, total: item.price * quantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const moveToCart = (medicine) => {
    setWishlist(wishlist.filter(item => item._id !== medicine._id));
    setCart([...cart, { ...medicine, quantity: 1, total: medicine.price }]);
  };

  return (
    <div className="background-container">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} role={role} user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin onLogin={handleLogin} />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/about" element={<About />} />
          <Route path="/personal-care" element={<ViewMedicines role={role} category="Personal Care" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/baby-care" element={<ViewMedicines role={role} category="Baby Care" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/otc" element={<ViewMedicines role={role} category="OTC" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/vitamins-supplements" element={<ViewMedicines role={role} category="Vitamins & Supplements" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/pain-relief" element={<ViewMedicines role={role} category="Pain Relief" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/allergy" element={<ViewMedicines role={role} category="Allergy" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/antibiotics" element={<ViewMedicines role={role} category="Antibiotics" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/diabetes" element={<ViewMedicines role={role} category="Diabetes" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/blood-pressure" element={<ViewMedicines role={role} category="Blood Pressure" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/digestive-health" element={<ViewMedicines role={role} category="Digestive health" cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} />} />
          <Route path="/view-cart" element={<ViewCart cart={cart} setCart={setCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/place-order" element={<OrderPage cart={cart} setCart={setCart} userEmail={user ? user.email : ''} />} />
          <Route path="/user-details" element={<UserDetailsForm cart={cart} setCart={setCart} userEmail={user ? user.email : ''} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} moveToCart={moveToCart} />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
