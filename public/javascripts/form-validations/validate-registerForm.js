document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let isValid = true;
    const errorMessages = document.querySelectorAll(".err");
    errorMessages.forEach(msg => msg.textContent = ""); // Limpiar mensajes previos

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validar nombre
    if (!firstName || firstName.length > 25) {
        showError("firstName", "First name is required (max 25 chars)");
        isValid = false;
    } else{
        document.querySelector(`#firstName + .err`).style.display = 'none';
    }

    // Validar apellido
    if (!lastName || lastName.length > 35) {
        showError("lastName", "Last name is required (max 35 chars)");
        isValid = false;
    }else{
        document.querySelector(`#lastName + .err`).style.display = 'none';
    }

    // Validar email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError("email", "Invalid email format");
        isValid = false;
    }else{
        document.querySelector(`#email + .err`).style.display = 'none';
    }

    // Validar contraseña
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        showError("password", "Password must have at least 8 chars, an uppercase letter, a number & a special char");
        isValid = false;
    }else{
        document.querySelector(`#password + .err`).style.display = 'none';
    }

    // Confirmar contraseña
    if (confirmPassword !== password) {
        showError("confirmPassword", "Passwords do not match");
        isValid = false;
    }else{
        document.querySelector(`#confirmPassword + .err`).style.display = 'none';
    }

    if (isValid) {
        alert("Form submitted successfully!");
        this.submit(); // Enviar formulario si todo está correcto
    }
});

function showError(inputId, message) {
   
    document.querySelector(`#${inputId} + .err`).textContent = message;
    document.querySelector(`#${inputId} + .err`).style.display = 'block';
}