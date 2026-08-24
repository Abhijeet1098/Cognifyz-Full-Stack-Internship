const express = require("express");

const app = express();

const PORT = 3000;

// Serve static files
app.use(express.static("public"));

// Parse form/JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use EJS
app.set("view engine", "ejs");
app.set("views", "./Views");

// Main application page
app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Task 4 server running at http://localhost:${PORT}`);
});