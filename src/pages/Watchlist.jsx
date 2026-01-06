import React, { useEffect, useState } from 'react';
import MediaGrid from '../components/MediaGrid';

const Watchlist = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setItems(saved);
  }, []);

  const handleRemove = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("watchlist-update"));
  };

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        {items.length > 0 && (
          <button 
            onClick={() => { setItems([]); localStorage.removeItem("watchlist"); window.dispatchEvent(new Event("watchlist-update")); }}
            className="text-sm text-red-500 hover:text-red-400"
          >
            Clear All
          </button>
        )}
      </div>
      
      {items.length > 0 ? (
        <MediaGrid items={items} isWatchlist={true} onRemove={handleRemove} />
      ) : (
        <div className="text-center py-20 text-neutral-500">
          <i className="fa-regular fa-bookmark text-4xl mb-4"></i>
          <p>Your watchlist is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
