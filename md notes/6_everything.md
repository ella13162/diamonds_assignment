# Step 1:
 update on connection to mongo db in index.js

        --- js
        const mongoose = require('mongoose');

        mongoose.connect('mongodb://127.0.0.1:27017/DIAMOND_SHOP', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        });

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
        console.log('Connected to MongoDB');
        });
        ---

# Step 2:
update on basket.ejs and product.ejs

Basket.ejs

--- js
<h1>Basket Page</h1>
    <ul id="basket-items">
        <% if (basketItems.length === 0) { %>
            <li>No items in the basket.</li>
            <% } else { %>
                <% let total = 0; %>
                <% basketItems.forEach(item => { %>
                    <li>
                        <img src="/images/i-2.png" alt="<%= item.name %>" 
                        Product ID: <%= item.product_id %>,
                        Carat: <%= item.carat %>,
                        Cut: <%= item.cut %>,
                        Color: <%= item.color %>,
                        Price: £<%= (parseFloat(item.price) + 1000.00).toFixed(2) %>,
                        Quantity: <%= item.quantity %>
                        <!-- Include a "Buy Again" button -->
                        <button onclick="buyAgain('<%= item.product_id %>')">Buy Again</button>
                    </li>
                <% total += parseFloat(item.price); %>
            <% }); %>
            <script>
                // Set the total price in the HTML using JavaScript
                document.getElementById("basket-total").textContent = "£" + (total + 1000.00).toFixed(2);
            </script>
        <% } %>
    </ul>
    <div>Total: £<span id="basket-total">0.00</span></div>
    <%- include('layouts/footer'); -%>
    <%- include('layouts/scripts'); -%>
    <script src="/js/basket.js"></script>
---

Product.ejs

        --- js
            <% products.forEach(product => { %>
            <div class="product-box">
                <div class="product-details">
                        <p>Product ID: <%= product.product_id %></p>
                        <p>Carat: <%= product.carat %></p>
                        <p>Cut: <%= product.cut %></p>
                        <p>Color: <%= product.color %></p>
                        <p>Price: £<%= (parseFloat(product.price) + 1000.00).toFixed(2) %></p>
                </div>
                <!-- product image here -->
                <img src="/images/i-2.png" alt="<%= product.name %>">
                <a href="/addToBasket?product_id=<%= product.product_id %>">Buy Now</a>
            </div>
            <% }); %>
            </div>

        ---

# Step 3:
 adjustments for login-register page

 for encryption password, validation and saving the details

 # Step 4:
 **install bcrypt:**
 >npm install bcrypt

 **install express validation:**
 >npm install express-validator

 **install express session:**
 > npm install express-session

 # Step 5:
 Update on index.js

--- js
    const bcrypt = require('bcryptjs');
    const { body, validationResult } = require('express-validator');
    const session = require('express-session');
    const app = express();
---

and:

--- js
    // express session 
    app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    //cookie: { secure: true }
    }))

    // Set global variable for user state
    global.loggedIn = null;
    global.userType = null;


    app.use("*", (req,res,next)=>{
    // console.log("Session middleware")
    loggedIn = req.session.userId;
    userType = req.session.userType;
    next();
    })
---