const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { Product } = require('./models/models');

const app = express();
const port = process.env.PORT || 4000;

// Database connection
mongoose.connect('mongodb://localhost:27017/DIAMOND_SHOP', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set view engine and static folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('products', { products });
});

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Retrieve the product by its ID
    res.render('product', { product: product });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { errorMessage: 'Something broke!' });
  }
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/clients', (req, res) => {
  res.render('clients');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/basket', (req, res) => {
  // Logic to retrieve basket items from database
  const basketItems = []; // Replace with actual logic
  res.render('basket', { basketItems });
});

// Error Routes
app.use((req, res) => {
  res.status(404).render('error', { errorMessage: 'Page not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { errorMessage: 'Something broke!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
