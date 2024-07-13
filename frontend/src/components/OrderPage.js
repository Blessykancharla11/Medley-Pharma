import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate('/user-details');
  };

  return (
    <div className="order-container">
      <div className="order-card">
        <h2>Order Summary</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
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
                    <td>${item.price.toFixed(2)}</td>
                    <td>${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-right">Total Amount:</td>
                  <td>${cart.reduce((total, item) => total + item.total, 0).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        <button className="btn btn-primary btn-place-order" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
