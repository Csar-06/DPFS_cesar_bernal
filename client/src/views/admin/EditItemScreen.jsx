import React, { useState } from 'react';

const EditItem = ({ product, onSubmit }) => {
    
    const [newName, setNewName] = useState(product?.newName || '');
    const [newDescription, setNewDescription] = useState(product?.newDescription || '');
    const [category, setCategory] = useState(product?.category || '');
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
        onSubmit({ newName, newDescription, image, category, colors });
    };

    return (
        <div className="container mx-auto mt-16 p-4 flex flex-col items-center">

            <h1 className="text-2xl font-bold mb-4">{product ? 'Editar Producto' : 'Modificar Producto'}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="newName" className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                    <input
                        type="text"
                        id="newName"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="newDescription" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        id="newDescription"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows="4"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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
}

export default EditItem;
