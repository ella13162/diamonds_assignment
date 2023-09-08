const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const { Product } = require('./models/products');
const { Users } = require('./models/users');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/DIAMOND_SHOP', {
  useNewUrlParser: true,
 // useUnifiedTopology: true,
});

// express session 
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));


// Set view engine and static folder
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
const ejs = require('ejs')
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));


// Routes
app.get('/', (req, res) => {
 // const products = await Product.find();
 // console.log(products);
 // res.render('products', { products: products });
// console.log("hi")
 res.render('home');
});

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Retrieve the product by its ID
    res.render('product', { product: product });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { errorMessage: 'No such product!' });
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

app.post('/checklogin', [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('login', { errors: errors.array() });
  }
  const { email, password } = req.body;
  // Fetch user from database, then:
  const hashedPassword = await bcrypt.hash(password, 10); // compare this, not save it
  // bcrypt.compare(password, hashedPasswordFromDB);
});

// Register
app.post('/savecredentials', async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword
  });

  await user.save();

  req.session.userId = user._id;

  res.redirect('/');
});

app.get('/basket', (req, res) => {
  // Logic to retrieve basket items from database
  const basketItems = []; 
  res.render('basket', { basketItems });
});

// Error Routes
// app.use((req, res) => {
//   res.status(404).render('error', { errorMessage: 'Page not found' });
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).render('error', { errorMessage: 'Something broke!' });
// });

// Start server
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
