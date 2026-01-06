import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import SearchResults from './SearchResults';

// 👇 ADD THIS LINE to import your image
import logoImg from '../Shakzz.jpg'; 

const Navbar = ({ onSearch, searchResults, isSearching }) => {
  // ... (keep your existing state code) ...

  return (
    <nav className="...">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="w-[100px]">
          {/* 👇 CHANGE THIS to use the imported logo */}
          <img src={logoImg} alt="MSTREAM" className="object-contain" />
        </NavLink>

        {/* ... rest of your navbar code ... */}
      </div>
    </nav>
  );
};

export default Navbar;
