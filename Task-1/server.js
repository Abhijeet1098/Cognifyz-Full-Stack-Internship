const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const course = req.body.course;

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Course:", course);

    res.render("success", {
        name: name,
        email: email,
        course: course
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});