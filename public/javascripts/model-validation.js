document.addEventListener("DOMContentLoaded", async () => {
    const modelViewer = document.querySelector("model-viewer");
    const fallbackImage = document.getElementById("fallback-image");
    const modelUrl = modelViewer.getAttribute("src");

    try {
        const response = await fetch(modelUrl, { method: "HEAD" });

        if (!response.ok) {
            // Si el archivo no existe (404), oculta el model-viewer y muestra la imagen
            modelViewer.style.display = "none";
            fallbackImage.style.display = "block";
        }
    } catch (error) {
        console.error("Error al cargar el modelo 3D:", error);
        modelViewer.style.display = "none";
        fallbackImage.style.display = "block";
    }
});
