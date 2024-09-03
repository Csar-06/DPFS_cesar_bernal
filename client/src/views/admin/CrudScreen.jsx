import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AddItem from './AddItemScreen'; // Asegúrate de que la ruta sea correcta

const CrudApp = () => {
  const [data, setData] = useState([
    { id: 1, brand: 'Samsung', model: 'S22 Ultra', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, eius magni ullam corrupti assumenda non accusantium deleniti. Quos, impedit mollitia.', image: 'url-imagen', colors: ['red'], quantity: '5', price: '599.99' },
    // Agrega más datos aquí
  ]);

  const addItem = (newItem) => {
    // Genera un nuevo ID. Este ejemplo simplemente usa el próximo número en la secuencia.
    const nextId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const itemWithId = { ...newItem, id: nextId };
    setData([...data, itemWithId]);
  };

  const deleteItem = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <AddItem onSubmit={addItem} /> {/* Aquí se incluye el componente AddItem */}
      
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Brand</th>
            <th className="py-2">Model</th>
            <th className="py-2">Description</th>
            <th className="py-2">Image</th>
            <th className="py-2">Colors</th>
            <th className="py-2">Quantity</th>
            <th className="py-2">Price</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody className='h-3/4'>
          {data.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.brand}</td>
              <td className="border px-4 py-2">{item.model}</td>
              <td className="border px-4 py-2">{item.description.substring(0, 50) + '...'}</td>
              <td className="border px-4 py-2">{item.image}</td>
              <td className="border px-4 py-2">{item.colors.join(', ')}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">{item.price}</td>
              <td className="border px-4 py-2 flex justify-around">
                <button className="text-yellow-500 py-1 rounded-lg border-yellow-400 border-2 transition-colors hover:bg-yellow-400 hover:text-white">
                  <NavLink to="/admin/moditem" className="w-full px-2 py-2">
                    Mod
                  </NavLink>
                </button>
                <button className="text-red-500 px-2 py-1 rounded-lg border-red-500 border-2 transition-colors hover:bg-red-500 hover:text-white" onClick={() => deleteItem(item.id)}>
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudApp;
