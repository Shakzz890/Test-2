import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="navbar">
      <div className="nav-left">
          <div className="hamburger" onClick={toggleSidebar}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <Link to="/" className="logo-text" style={{textDecoration:'none'}}>
            SHAKZZ<span style={{color:'#e50914'}}>TV</span>
          </Link>
      </div>
      <div className="nav-right">
          <div className="search-trigger">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className="auth-wrapper">
             <div className="login-btn">
                 <i className="fa-regular fa-user"></i> <span>Sign In</span>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
