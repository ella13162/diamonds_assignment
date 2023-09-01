Step 1:

Adjusting all files and index.js to ejs format:
    example:
        "
        home.html => home.ejs
        "

        "
        ---js
        app.get("/contact", (req, res) => {
        res.sendFile(path.resolve(__dirname, "contact"));
        });
        ---
        "
