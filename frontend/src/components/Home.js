import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    if (isLoggedIn) {
      navigate('/pain-relief');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
      <header className="hero-section" id="home">
        <h1>Welcome to Medley Pharma</h1>
        <p>Your one-stop solution for online medicine ordering</p>
        <button onClick={handleOrderClick}>Order Now</button>
      </header>
      <section className="features-section" id="about">
        <center><h2>Why Choose Us?</h2></center>
        <div className="features">
          <div className="feature">
            <h3>Fast Delivery</h3>
            <p>Get your medicines delivered to your doorstep quickly and efficiently.</p>
          </div>
          <div className="feature">
            <h3>Wide Range</h3>
            <p>We offer a wide variety of medicines and health products.</p>
          </div>
          <div className="feature">
            <h3>Expert Advice</h3>
            <p>Consult with our healthcare professionals for the best advice.</p>
          </div>
        </div>
      </section>
      <footer className="footer" id="contact">
        <p>Contact us: support@medleypharma.com | +1 234 567 890</p>
        <p>&copy; 2024 Medley Pharma. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
