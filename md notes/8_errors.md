# Step 1:

Errors should be handle within the code: 

While server nmp starts there is an error:

---
[nodemon] starting node index.js
C: \Users \ella1 \OneDrive\Dokumenty \Solent_University \YEAR 2\Advance Database \assesment \Diamonds_shop\node _modules \express\lib\router \route. js: 211 throw new Error (msg) ;
Error: Route. get () requires a callback function but got a [object object]
at Route. <computed> [as get] (C: \Users \el lai\OneDrive\Dokumenty\Solent_University\VEAR2\Advance Database \as sesment \Diamonds shop \node modules \express \lib\router \route. js: 211:15) at app.<computed> [as get] (C: \users \ella1\OneDrive \ Dokumenty\Solent University\YEAR 2\Advance Database\assesment\Diamonds shop \node modules \express \lib\application. is:499:19)
at Object. <anonymous› (C: \Users \ella1 \OneDrive \Dokumenty \Solent University\YEAR 2\Advance Database \assesment \Diamonds shop\index. js:69:5)
at Module. compile (node: internal/modules/cjs/loader: 1256:14)
at Module.
extensions..is (node: internal/modules/cis/loader: 1310:10)
at Module. Load (node: internal/modules/cis/loader: 1119: 32) at Module. load (node: internal/modules /cis/loader: 960:12) at Function.executeUserEntrvPoint [as runMain] (node: internal/modules/run main: 81:12) at node: internal/main/run main module: 23:47
Node. is v18.17.0
[nodemon] app crashed - waiting for file changes before starting...
---

After checking route.js by cliking on error route. error was related with the path in that case index.js suppose to be check for any errors in the code.

--- js
app.get('/', homeController.renderHome);
app.get('/products/:id', productController.renderProduct);
app.get('/contact', (req, res) => res.render('contact'));
app.get('/login', userController.renderLogin);
app.post('/checklogin', userController.checkLogin);
app.post('/savecredentials', userController.saveCredentials);
app.get('/basket', basketController);

// User registration and login routes
app.get('/login', userController.renderLogin);
app.post('/login', userController.checkLogin);
app.post('/register', userController.saveCredentials);

// Basket products add
app.get('/basket', basketController.renderBasket); // Use renderBasket function
app.post('/basket/add', basketController.addToBasket); // Add a product to the basket
app.post('/basket/remove', basketController.removeFromBasket); // Remove a product from the basket


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
---
As we had created controllers looks like that.
Checking Controllers:
in homeController:
---

    res.render('home', { products, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
};
---
was changed for:
---
    res.render('/', { products, totalPrice });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
};
---
however there is still ERROR for path.