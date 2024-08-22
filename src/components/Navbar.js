import React from 'react';
import "../styles/Navbar.css";
import logo from '../images/logo 1.png';
const Navbar = () => {

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" width={50} />
          <h1><a href='\'>Spill Atlas</a></h1>
        </div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#team">Team</a></li>
          <button className='login-btn'><a href='\login'>Login</a></button>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;