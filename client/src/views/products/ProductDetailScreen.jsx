import React, { useState, useEffect } from 'react';
import '@google/model-viewer';
import ModelViewerComponent from '../../components/ModelViewerComponent';
import FooterComponent from '../../components/FooterComponent';
import axios from 'axios';
import { useParams } from 'react-router-dom';


// Pantalla de Detalle del producto
const ProductDetailScreen = () => {
    const { id } = useParams();// Obtener el parámetro de la URL
    const [quantity, setQuantity] = useState(1);
    const [item, setItem] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };


    useEffect(() => {
        axios.get(`http://localhost:5000/api/items/${id}`)
            .then(response => {
                console.log(response);

                setItem(response.data);

                setLoading(false);
            })
            .catch(error => {
                console.log(error);

                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!item) return <div>Product not found</div>;

    return (
        <div className="min-h-screen mt-16 flex flex-col">

            {/* Main Content */}
            <main className="flex flex-col items-center p-4">
                <div className="flex flex-col md:flex-row w-full max-w-4xl">

                    {/* Objeto 3d del dispositivo */}
                    <div className="h-fill w-full md:w-2/3  relative">
                        <ModelViewerComponent modelUrl={item.object} />
                    </div>

                    <div className="p-4">
                        {/* titulo y descripcion corta de producto */}
                        <h2 className="text-xl font-bold">{item.brand}</h2>
                        <p className="text-gray-700">{item.description}</p>
                        {/* div opciones de color  */}
                       
                        <div className="flex space-x-2 mt-4">
                            {item.colors.map(color => (
                                <div
                                    key={color}  // Añadir una clave única si los colores son únicos
                                    className={`w-6 h-6 bg-${color.toLowerCase()}-500 rounded-full cursor-pointer`}
                                ></div>
                            ))}
                        </div>


                        {/* cantidad de unidades */}
                        <div className="w-fit flex items-center mt-4  border-2 border-slate-950 rounded-lg">
                            <button onClick={() => handleQuantityChange(-1)} className=" px-2 py-1">-</button>
                            <span className="mx-2">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className=" px-2 py-1">+</button>
                        </div>
                        <div className="text-xl font-bold mt-4">${item.price}</div>
                        <div className="flex space-x-2 mt-4">
                            <button className="relative px-4 py-2 text-slate-950 border-2 border-slate-950 rounded-lg focus:outline-none group">
                                <span className="relative z-10">Add to Cart</span>
                                <span className="absolute bottom-2 left-2 w-0 h-0.5 bg-slate-950 transition-all duration-300 rounded-lg group-hover:w-24"></span>
                            </button>
                            <button className="bg-slate-950 relative px-4 py-2 text-slate-100 border-2 border-slate-950 rounded-lg focus:outline-none group">

                                <span className="relative z-10">Buy</span>
                                <span className="absolute bottom-2 left-3 w-0 h-0.5 bg-slate-100 transition-all duration-300 rounded-lg group-hover:w-9"></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Additional Content */}
                <div className="w-full max-w-4xl mt-8">
                    <div className="bg-gray-200 h-32 mb-4"></div>
                    <div className="flex space-x-4">
                        <div className="bg-gray-200 w-1/3 h-32"></div>
                        <div className="bg-gray-200 w-1/3 h-32"></div>
                        <div className="bg-gray-200 w-1/3 h-32"></div>
                    </div>
                </div>
            </main >

            <FooterComponent />
        </div >
    );
}

export default ProductDetailScreen;
