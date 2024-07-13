import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewCart.css'; // Ensure this imports your correct CSS file

const ViewCart = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const totalAmount = cart.reduce((total, item) => total + item.total, 0);

  const handlePlaceOrder = () => {
    navigate('/user-details');
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    if (newQuantity <= item.stock) {
      updateQuantity(item._id, newQuantity);
    } else {
      alert('Quantity exceeds available stock');
    }
  };

  const handleRemoveFromCart = (itemId, quantity) => {
    removeFromCart(itemId);
    // Restore quantity to stock
    // Assuming you have a function like restoreStock in your props
    // You would call that function to restore stock here
    // restoreStock(itemId, quantity);
  };

  return (
    <div className="container cart-container"> {/* Ensure correct container class */}
      <h2>Order Summary</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="row cart-items"> {/* Ensure correct items container class */}
            {cart.map((item) => (
              <div className="col-md-4" key={item._id}>
                <div className="card mb-4 cart-item"> {/* Ensure correct item card class */}
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="card-img-top cart-item-image" // Ensure correct image class
                    />
                  )}
                  <div className="card-body cart-item-details"> {/* Ensure correct details class */}
                    <h5 className="card-title cart-item-title">{item.name}</h5>
                    <div className="cart-item-quantity"> {/* Ensure correct quantity class */}
                      <button
                        className="btn btn-sm quantity-btn decrement"
                        onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity} pcs</span>
                      <button
                        className="btn btn-sm quantity-btn increment"
                        onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="card-text cart-item-price">Total: ₹{item.total}</p> {/* Ensure correct total class */}
                    <button
                      className="btn btn-sm delete-btn"
                      onClick={() => handleRemoveFromCart(item._id, item.quantity)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3 className="total-amount">Total Amount: ₹{totalAmount}</h3> {/* Ensure correct total amount class */}
          <button className="btn btn-primary" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default ViewCart;