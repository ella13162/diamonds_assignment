# Step 1:
Find CSS template that will suit the dataset and project.

# Step 2: 
Project initialization:
    Initialise project using **npm init** command. This will create the package.json file.
    
    npm init ~y is for default values

# Step 3:
Create **index.js** file.

# Step 3:
Create http server by writing the following code in index.js
This code task is to crete Server with request and response method that will be assign to the server number 3000.

---- javascript
const http = require("http")
const server = http.createServer((req, res) =>{
    console.log(req.url)
    if (req.url == "/")
        res.end("Welcome to Diamond Shop!")
    else if (req.url == "/contact")
        res.end("This is our contact page")
    else if (req.url == "/clients")
        res.end("This is our clients reviews page")
    else{
        res.end("Sorry page not found")
}
})
server.listen(3000)    
----


