const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static("public"));

// EJS configuration
app.set("view engine", "ejs");
app.set("views", "./Views");

// Temporary server-side storage
let students = [
    {
        id: 1,
        name: "Abhijeet",
        email: "abhijeet@example.com",
        course: "Computer Science"
    }
];


// ==============================
// Frontend
// ==============================

app.get("/", (req, res) => {
    res.render("index");
});


// ==============================
// REST API - READ ALL
// GET /api/students
// ==============================

app.get("/api/students", (req, res) => {

    res.json(students);

});


// ==============================
// REST API - READ ONE
// GET /api/students/:id
// ==============================

app.get("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student not found."
        });

    }

    res.json(student);

});


// ==============================
// REST API - CREATE
// POST /api/students
// ==============================

app.post("/api/students", (req, res) => {

    const { name, email, course } = req.body;

    if (!name || !email || !course) {

        return res.status(400).json({
            message: "Name, email and course are required."
        });

    }

    const newStudent = {

        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,

        name: name.trim(),
        email: email.trim(),
        course: course.trim()

    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully.",
        student: newStudent
    });

});


// ==============================
// REST API - UPDATE
// PUT /api/students/:id
// ==============================

app.put("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {

        return res.status(404).json({
            message: "Student not found."
        });

    }

    const { name, email, course } = req.body;

    if (!name || !email || !course) {

        return res.status(400).json({
            message: "Name, email and course are required."
        });

    }

    student.name = name.trim();
    student.email = email.trim();
    student.course = course.trim();

    res.json({
        message: "Student updated successfully.",
        student: student
    });

});


// ==============================
// REST API - DELETE
// DELETE /api/students/:id
// ==============================

app.delete("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const studentIndex =
        students.findIndex(student => student.id === id);

    if (studentIndex === -1) {

        return res.status(404).json({
            message: "Student not found."
        });

    }

    const deletedStudent =
        students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully.",
        student: deletedStudent[0]
    });

});


// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {

    console.log(
        `Task 5 server running at http://localhost:${PORT}`
    );

});