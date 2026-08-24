const app = document.getElementById("app");


// ==============================
// Registration Page
// ==============================

function showRegisterPage() {

    app.innerHTML = `

        <div class="form-container">

            <h1>Student Registration</h1>

            <p>
                Create your student profile by entering your details.
            </p>


            <form id="registrationForm">

                <!-- Name -->
                <div class="form-group">

                    <label for="name">
                        Full Name
                    </label>

                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your full name"
                    >

                    <div id="nameError" class="error"></div>

                </div>


                <!-- Email -->
                <div class="form-group">

                    <label for="email">
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                    >

                    <div id="emailError" class="error"></div>

                </div>


                <!-- Age -->
                <div class="form-group">

                    <label for="age">
                        Age
                    </label>

                    <input
                        type="number"
                        id="age"
                        placeholder="Enter your age"
                    >

                    <div id="ageError" class="error"></div>

                </div>


                <!-- Password -->
                <div class="form-group">

                    <label for="password">
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                    >

                    <div
                        id="passwordStrength"
                        class="password-strength"
                    >
                    </div>

                    <div id="passwordError" class="error"></div>

                </div>


                <!-- Confirm Password -->
                <div class="form-group">

                    <label for="confirmPassword">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Re-enter your password"
                    >

                    <div
                        id="confirmPasswordError"
                        class="error"
                    >
                    </div>

                </div>


                <button type="submit">
                    Create Profile
                </button>


                <div id="formMessage"></div>

            </form>

        </div>

    `;


    setupValidation();

}


// ==============================
// Form Validation
// ==============================

function setupValidation() {

    const form =
        document.getElementById("registrationForm");

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const age =
        document.getElementById("age");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");


    // Password strength
    password.addEventListener("input", function () {

        const value = password.value;

        const strength =
            document.getElementById("passwordStrength");

        if (value.length === 0) {

            strength.textContent = "";

        } else if (value.length < 6) {

            strength.textContent =
                "Password strength: Weak";

            strength.style.color = "#dc2626";

        } else if (
            value.length >= 6 &&
            !/[A-Z]/.test(value)
        ) {

            strength.textContent =
                "Password strength: Medium";

            strength.style.color = "#ca8a04";

        } else if (
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[0-9]/.test(value)
        ) {

            strength.textContent =
                "Password strength: Strong";

            strength.style.color = "#16a34a";

        } else {

            strength.textContent =
                "Password strength: Medium";

            strength.style.color = "#ca8a04";

        }

    });


    // Confirm password validation
    confirmPassword.addEventListener("input", function () {

        const error =
            document.getElementById("confirmPasswordError");

        if (
            confirmPassword.value !== password.value
        ) {

            error.textContent =
                "Passwords do not match.";

        } else {

            error.textContent = "";

        }

    });


    // Form submission
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let valid = true;


        // Clear previous messages
        document.getElementById("nameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("ageError").textContent = "";
        document.getElementById("passwordError").textContent = "";
        document.getElementById("confirmPasswordError").textContent = "";
        document.getElementById("formMessage").textContent = "";


        // Name
        if (name.value.trim() === "") {

            document.getElementById("nameError").textContent =
                "Full name is required.";

            valid = false;

        } else if (name.value.trim().length < 3) {

            document.getElementById("nameError").textContent =
                "Name must contain at least 3 characters.";

            valid = false;

        }


        // Email
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {

            document.getElementById("emailError").textContent =
                "Email is required.";

            valid = false;

        } else if (!emailPattern.test(email.value)) {

            document.getElementById("emailError").textContent =
                "Please enter a valid email address.";

            valid = false;

        }


        // Age
        const ageValue =
            Number(age.value);

        if (!age.value) {

            document.getElementById("ageError").textContent =
                "Age is required.";

            valid = false;

        } else if (ageValue < 18 || ageValue > 60) {

            document.getElementById("ageError").textContent =
                "Age must be between 18 and 60.";

            valid = false;

        }


        // Password
        const passwordValue =
            password.value;

        if (passwordValue.length < 8) {

            document.getElementById("passwordError").textContent =
                "Password must contain at least 8 characters.";

            valid = false;

        } else if (!/[A-Z]/.test(passwordValue)) {

            document.getElementById("passwordError").textContent =
                "Password must contain at least one uppercase letter.";

            valid = false;

        } else if (!/[a-z]/.test(passwordValue)) {

            document.getElementById("passwordError").textContent =
                "Password must contain at least one lowercase letter.";

            valid = false;

        } else if (!/[0-9]/.test(passwordValue)) {

            document.getElementById("passwordError").textContent =
                "Password must contain at least one number.";

            valid = false;

        } else if (!/[!@#$%^&*]/.test(passwordValue)) {

            document.getElementById("passwordError").textContent =
                "Password must contain at least one special character.";

            valid = false;

        }


        // Confirm password
        if (
            confirmPassword.value !== passwordValue
        ) {

            document.getElementById("confirmPasswordError").textContent =
                "Passwords do not match.";

            valid = false;

        }


        // Success
        if (valid) {

            const message =
                document.getElementById("formMessage");

            message.textContent =
                "Registration successful! Profile created.";

            message.className = "success";

        }

    });

}


// ==============================
// Initial Page
// ==============================

// ==============================
// Client-Side Routing
// ==============================

function showProfilePage() {

    app.innerHTML = `

        <div class="form-container">

            <h1>Student Profile</h1>

            <p>
                Your profile will appear here after registration.
            </p>

            <div class="success">
                Profile section loaded successfully.
            </div>

            <br>

            <button onclick="navigateTo('/')">
                Back to Registration
            </button>

        </div>

    `;
}


function showAboutPage() {

    app.innerHTML = `

        <div class="form-container">

            <h1>About Task 4</h1>

            <p>
                This project demonstrates complex form validation,
                dynamic DOM manipulation and client-side routing.
            </p>

            <p>
                Developed as part of the Cognifyz Full Stack
                Development Internship.
            </p>

            <br>

            <button onclick="navigateTo('/')">
                Back to Registration
            </button>

        </div>

    `;
}


// ==============================
// Router
// ==============================

function navigateTo(path) {

    history.pushState({}, "", path);

    route();

}


// ==============================
// Route Handler
// ==============================

function route() {

    const path = window.location.pathname;


    if (path === "/profile") {

        showProfilePage();

    } else if (path === "/about") {

        showAboutPage();

    } else {

        showRegisterPage();

    }

}


// ==============================
// Navigation Links
// ==============================

document.addEventListener("click", function (event) {

    const link = event.target.closest("[data-route]");

    if (!link) {
        return;
    }

    event.preventDefault();

    const path = link.getAttribute("data-route");

    navigateTo(path);

});


// Browser Back / Forward
window.addEventListener("popstate", route);


// Start Application
route();