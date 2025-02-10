document.addEventListener("DOMContentLoaded", function () {
    const quantityElement = document.getElementById("quantity");
    const decreaseButton = document.getElementById("decrease");
    const increaseButton = document.getElementById("increase");
    
    let quantity = 1;
    
    decreaseButton.addEventListener("click", function () {
        if (quantity > 1) {
            quantity--;
            quantityElement.textContent = quantity;
        }
    });
    
    increaseButton.addEventListener("click", function () {
        quantity++;
        quantityElement.textContent = quantity;
    });
});