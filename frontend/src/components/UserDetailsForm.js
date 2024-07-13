import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDetailsForm.css';

const UserDetailsForm = ({ cart, setCart }) => {
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => reject(false); // Handle script loading error
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (orderData) => {
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/orders/create-order', { amount: orderData.totalPrice });

      const options = {
        key: 'rzp_test_FlxkX9qnqEB5eP',
        amount: response.data.amount,
        currency: 'INR',
        name: 'Medley Pharma',
        description: 'Test Transaction',
        order_id: response.data.id,
        handler: function (response) {
          handleSubmit(response, orderData);
        },
        prefill: {
          name: userEmail,
          email: userEmail,
          contact: phoneNumber,
        },
        notes: {
          address: address,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        console.error(response.error.code);
        console.error(response.error.description);
        console.error(response.error.source);
        console.error(response.error.step);
        console.error(response.error.reason);
        console.error(response.error.metadata.order_id);
        console.error(response.error.metadata.payment_id);
        alert('Payment failed');
      });

      rzp1.open();
    } catch (error) {
      console.error('Error in payment:', error);
      alert('Failed to initiate payment');
    }
  };

  const handleSubmit = async (paymentResponse, orderData) => {
    try {
      orderData.paymentId = paymentResponse.razorpay_payment_id;
      orderData.orderId = paymentResponse.razorpay_order_id;
      orderData.signature = paymentResponse.razorpay_signature;

      const response = await axios.post('http://localhost:8000/api/orders/userorder', orderData);

      if (response.status === 201) {
        setCart([]);
        navigate('/order-confirmation', { state: { cart, totalAmount: orderData.totalPrice, userDetails: { userEmail, phoneNumber, address } } });
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order');
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!userEmail || !phoneNumber || !address) {
      setError('Please provide all the required details');
      return;
    }

    const orderData = {
      userEmail,
      phoneNumber,
      address,
      totalPrice: cart.reduce((total, item) => total + item.total, 0),
      items: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    };

    handlePayment(orderData);
  };

  return (
    <div className="user-details-container">
      <h2>Enter Your Details</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handlePlaceOrder}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UserDetailsForm;
