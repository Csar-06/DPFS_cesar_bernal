import React, { useState } from 'react';
import image from '/vite.svg';
import Carousel from '../../components/CarouselComponent';
import FooterComponent from '../../components/FooterComponent';


const HomeScreen = () => {

    // const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTab, setCurrentTab] = useState(true);

    const toggleTab = () => {
        setCurrentTab(!currentTab)
    }

    const slides = [
        '/video/xlarge_2x.mp4',
        '/video/EDZN0157.mp4',
    ];




    return (
        <>
            {/* Sección de slider al iniciar la web */}
            <div className="m-2 -mt-0 relative top-16 rounded-lg w-cover h-fill overflow-hidden" style={{ height: `${90}vh` }}>
                {/* componente del slider */}
                <Carousel autoSlide={false}  >
                    {[...slides.map((s) => (
                        <video key={s} src={s} autoPlay muted loop />)),

                    ]}
                </Carousel>
            </div>

            {/* seccrión de Ofertas */}
            <section id='ofertas' className='mt-24 mb-6 m-2 max-w-full'>
                <h2 className='w-1/2 m-auto text-center text-4xl font-bold'> Utlimas Ofertas </h2>

                <div className='flex justify-around'>
                    {/* division de productos */}
                    <div className='w-full flex justify-center'>
                        {/* Producto en grande */}
                        <a href='item' id='item' className='group w-2/5 h-fill mt-11 p-3 bg-slate-300 rounded-xl flex flex-col justify-around items-center backdrop-blur-lg bg-opacity-50'>
                            <img src={image} id='img' alt="Product image" className='p-3 py-6 size-3/6 group-hover:scale-110 transition-transform' />
                            <label className='p-3 py-10 text-3xl font-bold   '>Producto 1</label>
                        </a>

                        {/*Productos en mosaico */}
                        <div className='flex flex-wrap w-1/2 mt-8 justify-center items-between'>

                            {/* mp1 */}
                            <a href='#ofertas' className='group mt-3 p-3 bg-slate-300 rounded-xl flex flex-col justify-around items-center backdrop-blur-lg bg-opacity-50 '
                                style={{ width: `${45}%` }}>
                                <img src={image} alt="Product image" className='p-3 py-6 size-3/6 group-hover:scale-110 transition-transform' />
                                <label className='p-3 py-10 text-2xl font-bold'>Producto 2</label>
                            </a>

                            <a href='#ofertas' className='group ml-3 mt-3 p-3 bg-slate-300 rounded-xl flex flex-col justify-around items-center backdrop-blur-lg bg-opacity-50'
                                style={{ width: `${45}%` }}>
                                <img src={image} alt="Product image" className='p-3 py-6 size-3/6 group-hover:scale-110 transition-transform' />
                                <label className='p-3 py-10 text-2xl font-bold'>Producto 3</label>
                            </a>

                            {/* mp3 */}
                            <a href='#ofertas' className='group  mt-3 p-3 bg-slate-300 rounded-xl flex flex-col justify-around items-center backdrop-blur-lg bg-opacity-50'
                                style={{ width: `${45}%` }}>
                                <img src={image} alt="Product image" className='p-3 py-6 size-3/6 group-hover:scale-110 transition-transform' />
                                <label className='p-3 py-10 text-2xl font-bold'>Producto 4</label>
                            </a>

                            <a href='#ofertas' className='group ml-3 mt-3 p-3 bg-slate-300 rounded-xl flex flex-col justify-around items-center backdrop-blur-lg bg-opacity-50'
                                style={{ width: `${45}%` }}>
                                <img src={image} alt="Product image" className='p-3 py-6 size-3/6 group-hover:scale-110 transition-transform' />
                                <label className='p-3 py-10 text-2xl font-bold'>Producto 5</label>
                            </a>
                        </div>

                        <div className='m-5 h-2/4 self-center'>
                            <ul className='flex flex-col items-center justify-around h-full'>
                                <li onClick={toggleTab} className={`p-2 text-center text-5xl mb-5 rounded-3xl ${currentTab ? 'bg-slate-200' : 'bg-transparent '}`}><a href="#ofertas">
                                    <ion-icon name="phone-portrait-outline"></ion-icon>
                                </a></li>
                                <li className={`p-2 text-center text-5xl mb-5 rounded-3xl`}><a href="#ofertas">
                                    <ion-icon name="headset-outline"></ion-icon>
                                </a></li>
                                <li className='p-2 text-center text-5xl mb-5 rounded-3xl'><a href="#ofertas">
                                    <ion-icon name="construct-outline"></ion-icon>
                                </a></li>
                                <li className='p-2 text-center text-5xl mb-5 rounded-3xl'><a href="#ofertas">
                                    <ion-icon name="color-wand-outline"></ion-icon>
                                </a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section >

            <FooterComponent />
        </>


    );
}

export default HomeScreen;
