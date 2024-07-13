// Frontend code for placing an order
import axios from 'axios';

const placeOrder = async (orderData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/orders', orderData);
    return response.data; // Assuming the backend returns some data upon successful order placement
  } catch (error) {
    console.error('Error placing order:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
};

export default placeOrder;
