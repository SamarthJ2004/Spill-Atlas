import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from '../images/logo 1.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" width={50} />
          <h1><Link to="/">Spill Atlas</Link></h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/team">Team</Link></li>
          <button className='login-btn' onClick={handleLoginClick}>Login</button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
