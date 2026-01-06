import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';

const Navbar = ({ onSearch, searchResults, isSearching }) => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const navigate = useNavigate();

  // Watchlist count listener
  useEffect(() => {
    const updateCount = () => {
      const list = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlistCount(list.length);
    };
    updateCount();
    window.addEventListener("watchlist-update", updateCount);
    return () => window.removeEventListener("watchlist-update", updateCount);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch?.(val);
  };

  const handleSelect = (item) => {
    const type = item.media_type === "tv" ? "tv" : "movie";
    navigate(`/details?type=${type}&id=${item.id}`);
    setQuery("");
    setShowSearch(false);
  };

  const navClass = ({ isActive }) => `
    relative px-4 py-3 text-base rounded-lg transition-all duration-300
    ${isActive ? "text-white font-semibold bg-red-600/10" : "text-white/60 hover:text-white"}
  `;

  return (
    <nav className={`fixed top-0 w-full z-[1000] px-4 py-4 transition-all ${scrolled ? "bg-black/90" : ""}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO SECTION - CHANGED BACK TO TEXT */}
        <NavLink to="/" className="no-underline">
          <div className="logo-text">
            SHAKZZ<span style={{ color: '#e50914' }}>TV</span>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/tv-shows" className={navClass}>TV Shows</NavLink>
          <NavLink to="/movies" className={navClass}>Movies</NavLink>
          <NavLink to="/watchlist" className={navClass}>
            Watchlist
            {watchlistCount > 0 && (
              <span className="ml-2 bg-red-700 text-white text-sm rounded-full px-1.5">{watchlistCount}</span>
            )}
          </NavLink>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex relative w-[300px]">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            onFocus={() => setShowSearch(true)}
            onBlur={() => setTimeout(() => setShowSearch(false), 200)}
            className="w-full rounded-full bg-white/10 border border-white/30 px-4 py-2.5 outline-none focus:border-red-700 text-white"
          />
          {showSearch && query && (
            <SearchResults 
              results={searchResults} 
              loading={isSearching} 
              onSelect={handleSelect} 
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
