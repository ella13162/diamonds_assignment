const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: Number,
  carat: Number,
  cut: String,
  color: String,
  price: Number
});

const Product = mongoose.model('diamonds', productSchema, 'diamonds');

module.exports = { Product };
