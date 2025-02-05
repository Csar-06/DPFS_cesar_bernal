document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    const autoSlideInterval = 3000; // 3 segundos
    let autoSlide;

    // Actualiza la posicion de los banners del carrusel
    function updateSlidePosition() {
        const isWideScreen = window.matchMedia("(min-width: 2560px)").matches;
        const multiplier = isWideScreen ? 50 : 100;
        const offset = -currentIndex * multiplier;
        carousel.style.transform = `translateX(${offset}%)`;
    }
    
    //Actualizar la posición si el usuario cambia el tamaño de la pantalla
    window.addEventListener("resize", updateSlidePosition);
    

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, autoSlideInterval);
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    nextButton.addEventListener("click", function () {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    prevButton.addEventListener("click", function () {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    startAutoSlide();
});
