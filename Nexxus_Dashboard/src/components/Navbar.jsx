import React from "react";
import { Link } from "react-router-dom";
import "../../public/css/Navbar.css"; // Asegúrate de mover los estilos de navbar a este archivo

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">NEXXUS</Link>
        <ul className="nav-links">
          <li><Link to="/http://localhost:5173/">Dashboard</Link></li>
          <li><Link to="http://localhost:3000/products">Manage Products</Link></li>

          {user ? (
            <li className="dropdown">
              <div className="dropdown-toggle">
                <img
                  src={ user.avatar != '' 
                    ? `http://localhost:3000/${user.avatar}` 
                    : "http://localhost:3000/uploads/user_avatar/user.png"}
                  alt='Profile Picture'
                  className="user-avatar"
                />
              </div>
              <ul className="dropdown-menu">
                <li><Link to="http://localhost:3000/users/profile">Profile</Link></li>
                <li><Link to="http://localhost:3000/users/logout">Log out</Link></li>
              </ul>
            </li>
          ) : (
            <>
              <li><Link to="http://localhost:3000/users/login">Login</Link></li>
              <li><Link to="/users/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
