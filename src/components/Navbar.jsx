import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';

const Navbar = ({ onSearch, searchResults, isSearching }) => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = () => {
      const list = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlistCount(list.length);
    };
    updateCount();
    window.addEventListener("watchlist-update", updateCount);
    return () => window.removeEventListener("watchlist-update", updateCount);
  }, []);

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
    <nav className={`navbar ${scrolled ? "bg-black/90" : ""}`}>
      <div className="nav-left">
        {/* HAMBURGER (Mobile) */}
        <div className="hamburger md:hidden block mr-4">
          <i className="fa-solid fa-bars"></i>
        </div>
        
        {/* LOGO - TEXT STYLE (Matches RedFlix) */}
        <NavLink to="/" className="no-underline">
          <div className="logo-text">
            SHAKZZ<span style={{ color: '#e50914' }}>TV</span>
          </div>
        </NavLink>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6 ml-8">
        <NavLink to="/" className="text-gray-300 hover:text-white font-medium text-sm">Home</NavLink>
        <NavLink to="/movies" className="text-gray-300 hover:text-white font-medium text-sm">Movies</NavLink>
        <NavLink to="/tv-shows" className="text-gray-300 hover:text-white font-medium text-sm">TV Shows</NavLink>
        <NavLink to="/watchlist" className="text-gray-300 hover:text-white font-medium text-sm relative">
          Watchlist
          {watchlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {watchlistCount}
            </span>
          )}
        </NavLink>
      </div>

      <div className="nav-right relative">
        <div className="search-trigger" onClick={() => setShowSearch(!showSearch)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        
        {showSearch && (
           <div className="absolute top-10 right-0 w-64 bg-neutral-900 border border-neutral-700 rounded p-2 z-50">
             <input 
               autoFocus
               type="text" 
               placeholder="Search..." 
               className="w-full bg-transparent text-white outline-none"
               value={query}
               onChange={handleSearch}
             />
             {query && <SearchResults results={searchResults} onSelect={handleSelect} />}
           </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
