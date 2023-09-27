const { Product } = require('../models/products');

exports.renderHome = async (req, res) => {
  try {
    // Fetch products from the database
    const products = await Product.find();

    // Calculate the total price (for example, summing all product prices)
    const totalPrice = products.reduce((acc, product) => acc + product.price, 0);

    res.render('/', { products, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
};