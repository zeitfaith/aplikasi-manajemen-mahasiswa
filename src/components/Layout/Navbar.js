import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {isAuthenticated && (
          <>
            <li className="navbar-item">
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                Dashboard
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/statistik" className={({ isActive }) => isActive ? 'active' : ''}>
                Statistik
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/profil" className={({ isActive }) => isActive ? 'active' : ''}>
                Profil
              </NavLink>
            </li>
            <li className="navbar-item logout">
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        )}
        {!isAuthenticated && (
          <>
            <li className="navbar-item">
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Login
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
