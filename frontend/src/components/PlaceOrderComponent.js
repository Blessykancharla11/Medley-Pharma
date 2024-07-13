import React from 'react';
import placeOrder from './placeOrder'; // Correct import

const PlaceOrderComponent = ({ orderDetails }) => {
  const handlePlaceOrder = async () => {
    try {
      await placeOrder(orderDetails); // Call the function to place the order
      // Optionally, show a success message or redirect the user to a success page
      console.log('Order placed successfully!');
    } catch (error) {
      // Handle the error (e.g., show an error message to the user)
      console.error('Failed to place order:', error);
    }
  };

  return (
    <div>
      {/* Your component UI */}
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default PlaceOrderComponent;
