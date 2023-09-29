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

# Step 3:
Adjusting home page code to dispaly products for odd id numbers of the prodcuts and even numbers of the products desire effect of displaying products next to each other was acheived by creating table and adjusting the code for products id:

odd products:
--- js
<table>
   <tr>
      <td>
         <div class="product-grid">
            <!-- Odd product container -->
            <% products.forEach(product => { %>
               <% if (product.product_id % 2 === 1) { %>
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
               <% } %>
            <% }); %>
         </div>
      </td>
   <td>
---

and the same for even prodcuts:
--- js
<!-- Even product container -->
<% products.forEach(product => { %>
<% if (product.product_id % 2 === 0) { %>
<div class="product-box">
<!-- the rest of the code -->
</table>
---



# Step 4:
Adjusting style css for products:

--- css
/* style for the price section */
.price_section {
     background-color: #f9f9f9;
     padding: 50px 0;
}

.price_container {
     margin-top: 20px;
}

.product-grid {
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
}

.product-box {
     background-color: #fff;
     border: 1px solid #ddd;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
     padding: 20px;
     margin-bottom: 20px;
     width: calc(50% - 20px);
     transition: transform 0.3s;
}

.product-box:hover {
     transform: translateY(-5px);
}

.product-details p {
     margin: 0;
     padding: 0;
}

.product-box img {
     max-width: 100%;
     height: auto;
}

.product-box a {
     display: inline-block;
     background-color: #fff700a6;
     color: #fff;
     text-decoration: none;
     padding: 10px 20px;
     margin-top: 10px;
     border-radius: 5px;
     transition: background-color 0.3s;
}

.product-box a:hover {
     background-color: #fff700a6;
}
---