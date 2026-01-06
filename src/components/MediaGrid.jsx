import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoader } from './CutieLoader';

const MediaGrid = ({ title, items, onItemClick, onRemove, isWatchlist }) => {
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

  return (
    <div className="py-4">
      {title && <h2 className="text-2xl font-bold mb-5 text-white border-l-4 border-red-600 pl-3">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item.id} className="relative group cursor-pointer" onClick={() => handleClick(item)}>
            <div className="aspect-[2/3] rounded-lg overflow-hidden bg-neutral-800 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-900/20">
              <img 
                src={item.poster_path ? `${POSTER_URL}${item.poster_path}` : '/logo.png'} 
                alt={item.title || item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Watchlist Remove Button */}
              {isWatchlist && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              )}
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium truncate text-white group-hover:text-red-500 transition-colors">
                {item.title || item.name}
              </h3>
              <p className="text-xs text-neutral-400">
                {item.release_date ? item.release_date.split('-')[0] : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
