const { trace } = require("../../../routes/products");

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    const form = event.target;
    const errorMessages = document.querySelectorAll(".err");
    errorMessages.forEach(msg => msg.textContent = ""); // Limpiar mensajes previos

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    //Validación de Logueo
    if (!email || !password) {
        showError("password", "Invalid User or Password");
        isValid = false;
    } else {
        document.querySelector(`#password + .err`).style.display = 'none';
    }
    // Validar email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showError("password", "Invalid User or Password");
        isValid = false;
    }else{
            document.querySelector(`#password + .err`).style.display = 'none';
        }
        
        // Validar contraseña
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        showError("password", "Invalid User or Password");
        isValid = false;
    }else{
        document.querySelector(`#password + .err`).style.display = 'none';
    }

    if (isValid) {
        form.submit(); // Enviar formulario si todo está correcto
    }
});

function showError(inputId, message) {

    document.querySelector(`#${inputId} + .err`).textContent = message;
    document.querySelector(`#${inputId} + .err`).style.display = 'block';
}