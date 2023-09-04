# Step 1:

Adjusting all files and index.js to ejs format:
    example:
        
        >home.html => home.ejs
             
        ---js
        app.get("/contact", (req, res) => {
        res.sendFile(path.resolve(__dirname, "contact"));
        });
        ---
    
# Step 2:

Creating layouts folder where will be located my headers, footers and scripts which will help in case any future necessary edits.

