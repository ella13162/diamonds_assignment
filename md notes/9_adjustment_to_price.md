# Step 1:
adding ID="price" to price-section and updating buttons for navbar Products and Jewellery section See More so when Customer clik on it it will take him/her to dispaly of the products.

--- js
<a href="#price" class="price_btn">See More</a>
<li> <a href="#price">Products</a> </li>
---

# Step 2:
Trying to display products in the container next to each other by adding grid in the home page code and adding css style grid.

--- js
<div class="price_container">
            <div class="product-grid">
            <!-- product container -->
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
         </div>
---

and css style:

--- css
 .product-grid {
     display: grid;
     grid-template-columns: reapeat(auto-fill, minmax(300px, 1fr));
     gap: 20 px;
   }
---

*** unfortunately this did not work ***