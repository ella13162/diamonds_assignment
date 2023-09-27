const { Product } = require('../models/products');

// Render the basket page
exports.renderBasket = (req, res) => {
  console.log('Render Basket Function Called');
  // Retrieve basket items from the session
  const basketItems = req.session.basket || [];

  // Calculate total price 
  const totalPrice = basketItems.reduce((total, item) => total + item.price, 0);

  res.render('basket', { basketItems, totalPrice });
};

// Add a product to the basket
exports.addToBasket = async (req, res) => {
  try {
    // Parse product_id from the request body
    const { product_id } = req.body;

    // Find the product by its ID
    const product = await Product.findById(product_id);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Retrieve basket items from the session, or create an empty array
    const basketItems = req.session.basket || [];

    // Add the selected product to the basket
    basketItems.push(product);

    // Update the session with the modified basket
    req.session.basket = basketItems;

    return res.status(200).json({ message: 'Product added to basket' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Remove a product from the basket
exports.removeFromBasket = async (req, res) => {
  try {
    // Parse product_id from the request body
    const { product_id } = req.body;

    // Retrieve basket items from the session, or create an empty array
    const basketItems = req.session.basket || [];

    // Find the index of the product with the matching ID
    const productIndex = basketItems.findIndex(item => item._id === product_id);

    // Check if the product is in the basket
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in the basket' });
    }

    // Remove the product from the basket array
    basketItems.splice(productIndex, 1);

    // Update the session with the modified basket
    req.session.basket = basketItems;

    return res.status(200).json({ message: 'Product removed from basket' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
