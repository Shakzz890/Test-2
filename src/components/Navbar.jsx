import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';

const Navbar = ({ onSearch, searchResults, isSearching }) => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleSelect = (item) => {
    const type = item.media_type === "tv" ? "tv" : "movie";
    navigate(`/details?type=${type}&id=${item.id}`);
    setQuery("");
    setShowSearch(false);
  };

  return (
    <div className={`navbar ${scrolled ? "bg-black" : ""}`} style={{background: scrolled ? '#000' : 'transparent', transition:'0.3s'}}>
      <div className="nav-left">
          {/* Hamburger only visible on small screens handled via CSS usually, 
              but for now we just show it */}
          <div className="hamburger" style={{marginRight:'15px'}}>
            <i className="fa-solid fa-bars"></i>
          </div>
          
          {/* TEXT LOGO - Exact RedFlix Style */}
          <NavLink to="/" style={{textDecoration:'none'}}>
            <span className="logo-text">
              SHAKZZ<span style={{color:'#e50914'}}>TV</span>
            </span>
          </NavLink>
      </div>

      <div className="nav-right">
          <div className="search-trigger" onClick={() => setShowSearch(!showSearch)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          
          {/* Search Input Dropdown */}
          {showSearch && (
             <div style={{position:'absolute', top:'60px', right:'20px', width:'250px', background:'#1a1a1a', padding:'10px', borderRadius:'8px', zIndex:2000}}>
               <input 
                 autoFocus
                 type="text" 
                 placeholder="Search..." 
                 value={query}
                 onChange={handleSearch}
                 style={{width:'100%', padding:'8px', background:'#333', border:'none', color:'white', borderRadius:'4px'}}
               />
               {query && <SearchResults results={searchResults} onSelect={handleSelect} />}
             </div>
          )}

          <div className="auth-wrapper">
             <div className="login-btn">
                 <i className="fa-regular fa-user"></i> <span style={{fontSize:'13px', marginLeft:'5px'}}>Sign In</span>
             </div>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
