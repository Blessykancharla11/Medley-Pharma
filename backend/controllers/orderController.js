// controllers/orderController.js
const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const { userId, items } = req.body;
  try {
    const newOrder = new Order({ userId, items });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: 'Failed to place order' });
  }
};

const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching orders' });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
};


