const express = require('express');
const mongoose = require('mongoose');
const { Product } = require('./models');

const app = express();
const port = 4000;

mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('product', { products });
});

app.get('/basket', (req, res) => {
  // Logic to retrieve basket items from database
  const basketItems = []; // Replace with actual logic
  res.render('basket', { basketItems });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
