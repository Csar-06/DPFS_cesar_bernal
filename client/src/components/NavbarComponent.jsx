import React from 'react';
import { NavLink } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <nav className='fixed w-full m-0 top-0 z-10'>

            <div className='flex justify-center items-baseline m-2 rounded-lg backdrop-blur-sm z-50 bg-slate-300 bg-opacity-50'>

                <NavLink to="/" className='font-bold text-2xl cursor-pointer m-2'>
                    NEXXUS
                </NavLink>

                <ul className="w-1/6 flex justify-evenly font-medium">
                    <NavLink to="/items">Productos</NavLink>
                    <NavLink to="/cart">Cart</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </ul>
            </div>
        </nav>

    );
}

export default NavbarComponent;
