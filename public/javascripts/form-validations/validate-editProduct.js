

document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    const form = event.target;
    const errorMessages = document.querySelectorAll(".err");
    errorMessages.forEach(msg => msg.textContent = ""); // Limpiar mensajes previos

    const brand = document.getElementById("brand").value.trim();
    console.log(brand);

    const model = document.getElementById("model").value.trim();

    const fileInput = document.getElementById("image");
    const file = fileInput.files[0];

    const stock = document.getElementById("stock").value.trim();
    const price = document.getElementById("price").value.trim();
    const color = document.getElementById("colors").value.trim();

    // Validar marca
    if (!brand) {
        showError("brand", "Brand name is required");
        isValid = false;
    } else {
        document.querySelector(`#brand + .err`).style.display = 'none';
    }

    // Validar modelo
    if (!model) {
        showError("model", "Model name is required");
        isValid = false;
    }else {
        document.querySelector(`#model + .err`).style.display = 'none';
    }

    // Validar precio
    if (!stock || parseInt(stock) < 0) {
        showError("stock", "Product stock is required");
        isValid = false;
    }else {
        document.querySelector(`#stock + .err`).style.display = 'none';
    }

    // Validar precio
    if (!price || parseFloat(price) < 0) {
        showError("price", "Product price is required");
        isValid = false;
    }else {
        document.querySelector(`#price + .err`).style.display = 'none';
    }

    // Confirmar contraseña
    if (!color) {
        showError("colors", "Product color is required");
        isValid = false;
    }else {
        document.querySelector(`#colors + .err`).style.display = 'none';
    }

    if (isValid) {
        console.log("Form submitted successfully!");
        form.submit(); // Enviar formulario si todo está correcto
    }   
})


const showError = (inputId, message) => {

    document.querySelector(`#${inputId} + .err`).textContent = message;
    document.querySelector(`#${inputId} + .err`).style.display = 'block';
}