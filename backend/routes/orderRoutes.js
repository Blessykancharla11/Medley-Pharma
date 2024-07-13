const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

const razorpay = new Razorpay({
  key_id: 'rzp_test_FlxkX9qnqEB5eP',
  key_secret: '9K97kbdQAdbfEGZypLXUOf8v',
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send('Some error occurred');
    }
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/userorder', async (req, res) => {
  try {
    const { userEmail, phoneNumber, address, totalPrice, items, paymentId, orderId, signature } = req.body;

    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto.createHmac('sha256', '9K97kbdQAdbfEGZypLXUOf8v').update(body.toString()).digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid signature' });
    }

    const order = new Order({ userEmail, phoneNumber, address, totalPrice, items });
    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to place order' });
  }
});

router.get('/user/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;
    const orders = await Order.find({ userEmail });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
