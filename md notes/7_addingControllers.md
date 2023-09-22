# Step 1: Creating home controller

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

# Step 2: Creating product controller

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

# Step 3: Creating user controller:

const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { User } = require('../models/users');

exports.renderLogin = (req, res) => {
  res.render('login');
};

exports.checkLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('login', { errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).render('error', { errorMessage: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).render('error', { errorMessage: 'Incorrect password' });
      }

      // Set session data or redirect to a dashboard, etc.
      req.session.userId = user._id;
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { errorMessage: 'Internal Server Error' });
    }
  },
];

exports.saveCredentials = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    req.session.userId = user._id;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
};

# Step 4: update in index.js

// Inport Controllers
const homeController = require('./controllers/homeController'); // Import the homeController
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');


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

# Step 5: deleting products page and adding products to home page

*** adding style: ***

.product-container {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
   }
 
   /* Add CSS styles for individual product boxes */
   .product-box {
     width: 30%; /* Adjust the width as needed */
     margin: 0 0 20px 0; /* Add margin to separate products */
     padding: 10px;
     border: 1px solid #ddd;
     box-sizing: border-box; /* Ensure padding and border don't affect width */
   }
 
   /* Add CSS styles for product details */
   .product-details {
     margin-bottom: 10px;
   }
 
   /* Add CSS styles for product image */
   .product-box img {
     max-width: 100%;
     height: auto;
   }
 
   /* Add CSS styles for Buy Now link */
   .product-box a {
     display: block;
     text-align: center;
     background-color: #c2a802;
     color: #fff;
     padding: 10px;
     text-decoration: none;
     transition: background-color 0.3s ease;
   }
 
   .product-box a:hover {
     background-color: #c2a802;
   }

*** adding products to home: ***

         <!-- price section -->
      <section class="price_section layout_padding">
         <div class="container">
         <div class="heading_container">
            <h2>
               Our Jewellery Price
            </h2>
         </div>
         <div class="price_container">
            <!-- product container -->
            <% products.forEach(product => { %>
               <div class="product-box">
                  <div class="product-details">
                        <p>Product ID: <%= product.product_id %></p>
                        <p>Carat: <%= product.carat %></p>
                        <p>Cut: <%= product.cut %></p>
                        <p>Color: <%= product.color %></p>
                        <p>Price: $<%= (parseFloat(product.price) + 1000.00).toFixed(2) %></p>
                  </div>
                  <!-- product image here -->
                  <img src="/images/i-2.png" alt="<%= product.name %>">
                  <a href="#">Buy Now</a>
               </div>
            <% }); %>
            </div>
            <!-- end product container -->
         <div class="d-flex justify-content-center">
            <a href="" class="price_btn">
               See More
            </a>
         </div>
         </div>
      </section>
      <!-- end price section -->