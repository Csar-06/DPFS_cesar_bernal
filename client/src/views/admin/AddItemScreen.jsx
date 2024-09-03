import React, { useState } from 'react';

const AddItem = ({ product, onSubmit }) => {
    const [brand, setBrand] = useState(product?.brand || '');
    const [model, setModel] = useState(product?.model || '');
    const [description, setDescription] = useState(product?.description || '');
    const [image, setImage] = useState(product?.image || '');
    const [quantity, setQuantity] = useState(product?.quantity || '');
    const [price, setPrice] = useState(product?.price || '');
    const [colors, setColors] = useState(product?.colors || []);
    const [newColor, setNewColor] = useState('');

    const handleAddColor = () => {
        if (newColor) {
            setColors([...colors, newColor]);
            setNewColor('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            brand,
            model,
            description, 
            image, 
            quantity, 
            price,
            colors
        });
    };

    return (
        <div className="container mx-auto mt-16 p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">
                {product ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                    <input
                        type="text"
                        id="brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                        type="text"
                        id="model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="4"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen URL</label>
                    <input
                        type="text"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="colors" className="block text-sm font-medium text-gray-700">Colores</label>
                    <div className="flex mb-2">
                        <input
                            type="text"
                            value={newColor}
                            onChange={(e) => setNewColor(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Añadir color"
                        />
                        <button
                            type="button"
                            onClick={handleAddColor}
                            className="ml-2 px-3 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600"
                        >
                            Añadir
                        </button>
                    </div>
                    <ul className="list-disc pl-5">
                        {colors.map((color, index) => (
                            <li key={index} className="text-gray-700">{color}</li>
                        ))}
                    </ul>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600"
                        >
                        {product ? 'Actualizar Producto' : 'Crear Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
