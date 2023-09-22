const { Product } = require('../models/products');

exports.renderHome = async (req, res) => {
  // Logic to fetch products from the database
  try {
    const products = await Product.find();
    res.render('home', { products });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
};