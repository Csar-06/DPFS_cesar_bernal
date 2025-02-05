document.addEventListener("DOMContentLoaded", () => {
    moveEmailLabel();
    movePasswordLabel();
    movePasswordValidationLabel();
});

// Función para mover el label del email
function moveEmailLabel() {
    const label = document.getElementById("emailLabel");
    const email = document.getElementById("email");

    if (!label || !email) return;

    email.addEventListener("focus", () => {
        label.style.top = "0px";
        label.style.left = "0px";
        label.style.color = "#020617";
    });

    email.addEventListener("blur", () => {
        if (!email.value) {
            label.style.top = "3rem";
            label.style.left = "1rem";
            label.style.color = "rgb(107 114 128)";
        }
    });
}

// Función para mover el label de la contraseña
function movePasswordLabel() {
    const label = document.getElementById("passwordLabel");
    const password = document.getElementById("password");
    

    if (!label || !password) return;

    password.addEventListener("focus", () => {
        label.style.top = "0px";
        label.style.left = "0px";
        label.style.color = "#020617";
    });

    password.addEventListener("blur", () => {
        if (!password.value) {
            label.style.top = "3rem";
            label.style.left = "1rem";
            label.style.color = "rgb(107 114 128)";
        }
    });
}

// Función para mover el label de la validación de contraseña
function movePasswordValidationLabel() {
    const label = document.getElementById("passwordValidationLabel");
    
    const password = document.getElementById("confirmPassword");

    if (!label || !password) return;

    password.addEventListener("focus", () => {
        label.style.top = "0px";
        label.style.left = "0px";
        label.style.color = "#020617";
    });

    password.addEventListener("blur", () => {
        if (!password.value) {
            label.style.top = "3rem";
            label.style.left = "1rem";
            label.style.color = "rgb(107 114 128)";
        }
    });
}
