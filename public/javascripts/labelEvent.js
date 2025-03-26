    document.addEventListener("DOMContentLoaded", () => {

    moveLabel();
});

//Función para mover labels en formularios
function moveLabel() {
    const labels = Array.from(document.querySelectorAll(".register-label, .login-label"));
    const inputs = Array.from(document.querySelectorAll(".register-input, .login-input"));

    const matchedPairs = labels.map((label, index) => {
        return inputs[index] ? { label, input: inputs[index] } : null;
    }).filter(pair => pair !== null);

    console.log(matchedPairs);

    matchedPairs.forEach(mp => {
        // console.log(mp.input.id);
        // console.log(mp.input.value);

        if (!mp.label || !mp.input) return;

        mp.input.addEventListener("focus", () => {
            mp.label.style.top = "0px";
            mp.label.style.left = "0px";
            mp.label.style.color = "#020617";
        });

        mp.input.addEventListener("blur", () => {
            if (!mp.input.value) {
                mp.label.style.top = "3rem";
                mp.label.style.left = "1rem";
                mp.label.style.color = "rgb(107 114 128)";
            }
        });

    })



}
