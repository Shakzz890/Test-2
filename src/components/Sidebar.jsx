import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`} id="main-sidebar">
          <div className="sidebar-header">
              <span className="logo-text">SHAKZZ<span style={{color:'#e50914'}}>TV</span></span>
              <span className="close-sidebar" onClick={toggle}>×</span>
          </div>
          <div className="sidebar-menu">
              <NavLink to="/" onClick={toggle}><i className="fa-solid fa-house"></i> Home</NavLink>
              <NavLink to="/movies" onClick={toggle}><i className="fa-regular fa-compass"></i> Movies</NavLink>
              <NavLink to="/tv-shows" onClick={toggle}><i className="fa-solid fa-tv"></i> TV Shows</NavLink>
              <NavLink to="/live" onClick={toggle}><i className="fa-solid fa-broadcast-tower"></i> Live TV</NavLink>
              <NavLink to="/watchlist" onClick={toggle}><i className="fa-solid fa-bookmark"></i> Watchlist</NavLink>
          </div>
          <div className="sidebar-footer">
              <p>Shakzz TV © 2025</p>
          </div>
      </div>
      <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggle}></div>
    </>
  );
};

export default Sidebar;
