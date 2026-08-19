const form = document.getElementById("studentForm");

form.addEventListener("submit", function (event) {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const age = document.getElementById("age").value.trim();
    const course = document.getElementById("course").value.trim();
    const phone = document.getElementById("phone").value.trim();

    let errors = [];

    // Name validation
    if (name === "") {
        errors.push("Name is required.");
    }

    // Email validation
    if (email === "") {
        errors.push("Email is required.");
    } else if (!email.includes("@")) {
        errors.push("Please enter a valid email address.");
    }

    // Age validation
    if (age === "") {
        errors.push("Age is required.");
    } else if (age < 18 || age > 60) {
        errors.push("Age must be between 18 and 60.");
    }

    // Course validation
    if (course === "") {
        errors.push("Course is required.");
    }

    // Phone validation
    if (phone === "") {
        errors.push("Phone number is required.");
    } else if (!/^\d{10}$/.test(phone)) {
        errors.push("Phone number must contain exactly 10 digits.");
    }

    // Stop form submission if there are errors
    if (errors.length > 0) {
        event.preventDefault();

        alert(errors.join("\n"));
    }
});