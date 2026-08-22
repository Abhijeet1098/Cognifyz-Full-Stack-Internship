const express = require("express");

const app = express();

const PORT = 3000;

// Serve static files from public folder
app.use(express.static("public"));

// Use EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./Views");

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Task 3 server running at http://localhost:${PORT}`);
});