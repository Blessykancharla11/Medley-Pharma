const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 8000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/user', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connection established');
})
.catch((err) => {
  console.log('Error connecting to MongoDB:', err.message);
});

app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/medicines', medicineRoutes);

app.listen(PORT, () => {
  console.log(`App is serving on port ${PORT}`);
});
