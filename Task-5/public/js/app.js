const studentForm =
    document.getElementById("studentForm");

const studentList =
    document.getElementById("studentList");

const message =
    document.getElementById("message");

const refreshButton =
    document.getElementById("refreshButton");


// ==============================
// Fetch Students
// ==============================

async function loadStudents() {

    try {

        const response =
            await fetch("/api/students");

        const students =
            await response.json();

        displayStudents(students);

    } catch (error) {

        studentList.innerHTML =
            "<p>Unable to load students.</p>";

        console.error(error);

    }

}


// ==============================
// Display Students
// ==============================

function displayStudents(students) {

    if (students.length === 0) {

        studentList.innerHTML =
            "<p>No students found.</p>";

        return;

    }


    studentList.innerHTML =
        students.map(student => `

            <div class="student">

                <div>

                    <h3>${student.name}</h3>

                    <p>
                        Email: ${student.email}
                    </p>

                    <p>
                        Course: ${student.course}
                    </p>

                </div>


                <div class="actions">

                    <button
                        onclick="updateStudent(${student.id})"
                    >
                        Edit
                    </button>

                    <button
                        onclick="deleteStudent(${student.id})"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `).join("");

}


// ==============================
// Add Student
// ==============================

studentForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const course =
            document.getElementById("course").value;


        try {

            const response =
                await fetch("/api/students", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        course
                    })

                });


            const data =
                await response.json();


            if (!response.ok) {

                message.textContent =
                    data.message;

                return;

            }


            message.textContent =
                "Student added successfully!";


            message.className = "success";


            studentForm.reset();


            loadStudents();


        } catch (error) {

            message.textContent =
                "Something went wrong.";

            console.error(error);

        }

    }
);


// ==============================
// Delete Student
// ==============================

async function deleteStudent(id) {

    const confirmed =
        confirm("Are you sure you want to delete this student?");


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(`/api/students/${id}`, {

                method: "DELETE"

            });


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;

        }


        loadStudents();

    } catch (error) {

        console.error(error);

    }

}


// ==============================
// Update Student
// ==============================

async function updateStudent(id) {

    const name =
        prompt("Enter new student name:");

    if (!name) {
        return;
    }


    const email =
        prompt("Enter new email:");

    if (!email) {
        return;
    }


    const course =
        prompt("Enter new course:");

    if (!course) {
        return;
    }


    try {

        const response =
            await fetch(`/api/students/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    course
                })

            });


        const data =
            await response.json();


        if (!response.ok) {

            alert(data.message);

            return;

        }


        loadStudents();

    } catch (error) {

        console.error(error);

    }

}


// ==============================
// Refresh
// ==============================

refreshButton.addEventListener(
    "click",
    loadStudents
);


// ==============================
// Initial Load
// ==============================

loadStudents();