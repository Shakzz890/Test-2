import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import SearchResults from './SearchResults';

const Navbar = ({ onSearch, searchResults, isSearching }) => {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Watchlist Count
  useEffect(() => {
    const updateCount = () => {
      const list = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlistCount(list.length);
    };
    updateCount();
    window.addEventListener("watchlist-update", updateCount);
    return () => window.removeEventListener("watchlist-update", updateCount);
  }, []);

  // Click Outside to Close Search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const navLinkClass = ({ isActive }) => 
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive 
      ? "bg-white/10 text-white font-bold" 
      : "text-neutral-400 hover:text-white"
    }`;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-4 md:px-8 py-4 ${scrolled ? "bg-[#0f0f0f]/95 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center h-10">
          
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2 group">
             <div className="text-2xl font-black tracking-tighter text-white group-hover:scale-105 transition-transform">
               SHAKZZ<span className="text-[#e50914]">TV</span>
             </div>
          </NavLink>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-2 bg-[#1a1a1a] p-1 rounded-full border border-white/10">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/movies" className={navLinkClass}>Movies</NavLink>
            <NavLink to="/tv-shows" className={navLinkClass}>TV Shows</NavLink>
            <NavLink to="/watchlist" className={navLinkClass}>
              Watchlist
              {watchlistCount > 0 && (
                <span className="ml-2 bg-[#e50914] text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {watchlistCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* SEARCH & MOBILE TOGGLE */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block" ref={searchRef}>
              <div className={`flex items-center bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-1.5 transition-all ${showSearch ? 'w-64 border-[#e50914]' : 'w-40 hover:border-white/30'}`}>
                <Search size={16} className="text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={handleSearch}
                  onFocus={() => setShowSearch(true)}
                  className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-neutral-500"
                />
              </div>
              {showSearch && query && (
                <SearchResults results={searchResults} onSelect={handleSelect} />
              )}
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0f0f0f] pt-20 px-6 animate-slideDown">
          <div className="flex flex-col gap-4 text-center">
             <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white mb-4 outline-none focus:border-[#e50914]"
              />
              {query && <div className="max-h-60 overflow-y-auto mb-4"><SearchResults results={searchResults} onSelect={handleSelect} /></div>}
              
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-white py-2 border-b border-white/5">Home</NavLink>
              <NavLink to="/movies" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-white py-2 border-b border-white/5">Movies</NavLink>
              <NavLink to="/tv-shows" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-white py-2 border-b border-white/5">TV Shows</NavLink>
              <NavLink to="/watchlist" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium text-white py-2">
                Watchlist ({watchlistCount})
              </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
