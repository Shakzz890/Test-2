import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoader } from './CutieLoader';

const MediaGrid = ({ title, items, onItemClick, onRemove, isWatchlist, isHorizontal = false }) => {
  const navigate = useNavigate();
  const loader = useLoader();
  const POSTER_URL = "https://image.tmdb.org/t/p/w300";

  if (!items || items.length === 0) return null;

  const handleClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    } else {
      loader.show("Opening...");
      setTimeout(() => {
        const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
        navigate(`/details?type=${type}&id=${item.id}`);
        loader.hide();
      }, 500);
    }
  };

  // Determine container class based on layout type
  const containerClass = isHorizontal 
    ? "list" // Uses the horizontal scroll CSS you provided
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4";

  return (
    <div className="row">
      {title && (
        <h2 className="text-2xl font-bold mb-5 text-white flex items-center">
          <span className="section-indicator"></span> {title} <i className="fa-solid fa-chevron-right ml-2 text-sm text-gray-500"></i>
        </h2>
      )}
      <div className={containerClass}>
        {items.map((item) => (
          <div key={item.id} className="movie-card" onClick={() => handleClick(item)}>
            <div className="badge-overlay">HD</div>
            <img 
              src={item.poster_path ? `${POSTER_URL}${item.poster_path}` : '/logo.png'} 
              alt={item.title || item.name}
              loading="lazy"
              onError={(e) => e.target.src = '/logo.png'}
            />
            <div className="card-title">
              {item.title || item.name}
            </div>
            
            {/* Watchlist Remove Button */}
            {isWatchlist && (
              <button 
                onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                className="absolute top-2 left-2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors z-20"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
