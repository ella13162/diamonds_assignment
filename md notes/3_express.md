# Step 1: 
Installing **express** command:
    
    'npm install express' command write in terminal.

    When express is installed file packadge-lock.json is created, the same as new folded node_module with necessary files.

# Step 2:
Installing **nodeman** command:

    'npm install nodemon --save-dev' command write in terminal.

    When nodeman version developmnet is installed it allows to proceed with changes without restaring the server all the time. Nodeman packadge automatically restart server.

    In the packadge.json in section 'script' add:
    "start" : "nodemon index.js"

After script edit and changes are saved. It is important to start server with:

    'npm start'

# Step 3:
Create an express project.

In index.js write code:

---js

const express = require("express")
const app = express()

---
    //where app is my server.

---js

app.listen(4000, () =>{
    console.log("Server start on port: 4000")
})

---
    // app will start listen on port 4000

Previous code that was in the index.js file has to be comment out as it was a code that worked before express was installed.

# Step 4:

Index.js editing code:

---js
const express = require('express');
const path = require('path'); // Import the path module

const app = express();
const port = 4000;

app.get("/", (req, res) => {
        /*
     res.json({
         name: "diamonds_shop"
     })
    */
    res.sendFile(path.resolve(__dirname, "home.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.resolve(__dirname, "contact.html"));
});

app.get("/clients", (req, res) => {
    res.sendFile(path.resolve(__dirname, "clients.html"));
});

app.get("/error", (req, res) => {
    res.sendFile(path.resolve(__dirname, "error.html"));
});

app.listen(port, () => {
    console.log(`Server start on port: ${port}`);
});
---

As in this stage port 4000 getting and sending each files: home, clients, contact, basket, login, product and error.