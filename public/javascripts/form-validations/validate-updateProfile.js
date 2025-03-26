document.getElementById("edit-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let isValid = true;
    const errorMessages = document.querySelectorAll(".err");
    errorMessages.forEach(msg => msg.textContent = ""); // Limpiar mensajes previos

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();

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

    if (isValid) {
        alert("Form submitted successfully!");
        this.submit(); // Enviar formulario si todo está correcto
    }
});

function showError(inputId, message) {
   
    document.querySelector(`#${inputId} + .err`).textContent = message;
    document.querySelector(`#${inputId} + .err`).style.display = 'block';
}