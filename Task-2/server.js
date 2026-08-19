const express = require("express");

const app = express();

const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static("public"));

// Use EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./Views");

// Temporary storage
const students = [];

// Home page
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {

    const { name, email, age, course, phone } = req.body;

    let errors = [];

    // Name validation
    if (!name || name.trim() === "") {
        errors.push("Name is required.");
    }

    // Email validation
    if (!email || email.trim() === "") {
        errors.push("Email is required.");
    } else if (!email.includes("@")) {
        errors.push("Please enter a valid email address.");
    }

    // Age validation
    if (!age) {
        errors.push("Age is required.");
    } else if (age < 18 || age > 60) {
        errors.push("Age must be between 18 and 60.");
    }

    // Course validation
    if (!course || course.trim() === "") {
        errors.push("Course is required.");
    }

    // Phone validation
    if (!phone || phone.trim() === "") {
        errors.push("Phone number is required.");
    } else if (!/^\d{10}$/.test(phone)) {
        errors.push("Phone number must contain exactly 10 digits.");
    }

    // If validation fails
    if (errors.length > 0) {
        return res.status(400).send(`
            <h1>Validation Failed</h1>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join("")}
            </ul>
            <a href="/">Go Back</a>
        `);
    }

    // Store valid data temporarily
    students.push({
        name: name.trim(),
        email: email.trim(),
        age: Number(age),
        course: course.trim(),
        phone: phone.trim()
    });

  
    res.redirect("/students");
});

app.get("/students", (req, res) => {
    res.render("students", {
        students: students
    });
});

app.listen(PORT, () => {
    console.log(`Task 2 server running at http://localhost:${PORT}`);
});