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
        <h1 className='w-1/2 mt-5 pt-10 m-auto text-center'>Item List</h1>
        <ul className='mt-6 flex justify-around'>
          {items.map(item => (
            <NavLink to={`/items/${item.id}`} key={item.id}>
              <li className='mb-4'>
                <img src={item.image} alt={item.object} style={{ width: '100px', height: '100px' }} />
                <h2>{item.brand}  {item.model}</h2>
                <p>${item.price}</p>
              </li>
            </NavLink>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default FetchItemScreen;
