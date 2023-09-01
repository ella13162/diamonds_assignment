const express = require('express');
const path = require("path")

const app = express();
const port = 4000;

// Set the views directory and the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render('home'); // Render the home.ejs
});

app.get("/contact", (req, res) => {
    res.render('contact'); // Render the contact.ejs
});

app.get("/clients", (req, res) => {
    res.render('clients'); // Render the clients.ejs
});

app.get("/login", (req, res) => {
    res.render('login'); // Render the login.ejs
});

app.get("/basket", (req, res) => {
    res.render('basket'); // Render the basket.ejs
});

app.get("/products", (req, res) => {
    res.render('products'); // Render the products.ejs
});

app.get('/error', (req, res) => {
    const errorMessage = 'Something went wrong!';
    res.render('error', { errorMessage });
});

app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
});
