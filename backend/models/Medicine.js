const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  expiry:{
    type: Date,
    required:true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Medicine', MedicineSchema);
