const { Product } = require('../models/products');

exports.renderProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('error', { errorMessage: 'Product not found' });
    }
    res.render('product', { product });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
};