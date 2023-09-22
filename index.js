const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 4000;
const User = require('./models/users');

// Inport Controllers
const homeController = require('./controllers/homeController'); // Import the homeController
const productController = require('./controllers/productController'); // Import the productController
const userController = require('./controllers/userController');// Import the userController

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
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))

global.loggedIn = null;
global.userType = null;


app.use("*", (req,res,next)=>{
  // console.log("Session middleware")
  loggedIn = req.session.userId;
  userType = req.session.userType;
  next();
})

/* 
Public folder serves the statis files like css, js, pics etc. We will create a public folder and put all our statis files there.
Just add the below middlewear that let the express which folder contains the static files
*/

// Set view engine and static folder
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
const ejs = require('ejs')
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

/*
// To receive the parameter, we need to install the body-parser package
 npm install body-parser
const bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
*/

// Routes

/*
app.get('/', (req, res) => {
 // const products = await Product.find();
 // console.log(products);
 // res.render('products', { products: products });
// console.log("hi")
 res.render('home');
});

app.get('/products/:id', async (req, res) => {
  try {
    const products = await Product.findById(req.params.id); // Retrieve the product by its ID
    res.render('products', { products: products});
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { errorMessage: 'No such product!' });
  }
});

app.get('/contact', (req, res) => {
  res.render('contact');
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
*/
app.get('/', homeController.renderHome);
app.get('/products/:id', productController.renderProduct);
app.get('/contact', (req, res) => res.render('contact'));
app.get('/login', userController.renderLogin);
app.post('/checklogin', userController.checkLogin);
app.post('/savecredentials', userController.saveCredentials);
app.get('/basket', (req, res) => {
  // Logic to retrieve basket items from database
  const basketItems = [];
  res.render('basket', { basketItems });
});

// User registration and login routes
app.get('/login', userController.renderLogin);
app.post('/login', userController.checkLogin);
app.post('/register', userController.saveCredentials);

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
