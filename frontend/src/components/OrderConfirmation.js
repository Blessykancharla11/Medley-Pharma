import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount, userDetails } = location.state || { cart: [], totalAmount: 0, userDetails: {} };

  const handleGoBack = () => {
    navigate('/'); // Go back to the previous page
  };

  const handleCancelOrder = () => {
    alert('Order canceled'); // Placeholder for cancel order functionality
    // Implement cancel order logic as needed
  };

  return (
    <div className="order-confirmation-container">
      <h2>Order Placed Successfully!</h2>
      
      {/* User details box */}
      <div className="user-details-box">
        <h4>User Details</h4>
        <p>Email: {userDetails.userEmail}</p>
        <p>Phone Number: {userDetails.phoneNumber}</p>
        <p>Address: {userDetails.address}</p>
      </div>
      
      <h3>Order Summary</h3>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Each Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price.toFixed(2)}</td>
                <td>₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right">Total Amount:</td>
              <td>₹{totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button onClick={handleGoBack}>Go Back</button>
        <button onClick={handleCancelOrder}>Cancel Order</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
