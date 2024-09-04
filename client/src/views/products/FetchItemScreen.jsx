// ItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const FetchItemScreen = () => {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        console.log(response);

        setItems(response.data);

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

  return (
    <div>
      <div className='mt-5 mx-2 pt-5'>
        <h1 className='w-1/2 mt-5 pt-10 m-auto text-center font-bold text-5xl'>Item List</h1>
        <ul className='mt-6 flex justify-center'>
          {items.map(item => (
            <NavLink to={`/items/${item.id}`} key={item.id} className='m-2 my-2 h-96 flex rounded-lg bg-slate-200 transition-transform hover:scale-105'>
              <li className='mb-4 flex flex-col justify-between'>
                <img src={item.image} alt={item.object} className='rounded-lg' style={{ width: '250px', height: '250px' }} />
                <h2 className=' ml-3 my-3 text-xl font-semibold '>{item.brand}  {item.model}</h2>
                <p className='w-1/2 ml-3 text-2xl font-bold align-text-bottom'>${item.price}</p>
              </li>
            </NavLink>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default FetchItemScreen;
