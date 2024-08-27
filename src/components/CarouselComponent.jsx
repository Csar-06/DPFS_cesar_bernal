import React, { useState, useEffect } from 'react';


const CarouselComponent = ({ children: slides, autoSlide = false, autoSlideInterval = 3000 }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        if (!autoSlide) return
        const slideInterval = setInterval(nextSlide, autoSlideInterval)
        return () => clearInterval(slideInterval)
    }, []);

    return (
        <div className=' overflow-hidden relative'>
            <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>{slides}</div>
            <div className='absolute m-2 inset-0 flex items-center justify-between' style={{ height: `${90}vh` }}>

                <button onClick={prevSlide} className="bg-white p-2 rounded-full">
                    <ion-icon name="caret-back-outline"></ion-icon>
                </button>
                <button onClick={nextSlide} className="bg-white p-2 rounded-full">
                    <ion-icon name="caret-forward-outline"></ion-icon>
                </button>

            </div>
            <div className='bottom-4 right-0 left-0'>
                <div className='flex items-center justify-center gap-2'>
                    {slides.map((_, i) => (
                        <div key={i} className={` transition-all w-3 h-3 bg-white rounded-full 
                            ${currentIndex === i ? "p-2" : "bg-opacity-50"}
                                `}

                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarouselComponent;
