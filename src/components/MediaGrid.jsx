import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoader } from './CutieLoader';
import { POSTER_BASE_URL } from '../config';

const MediaGrid = ({ title, items, onItemClick, onRemove, isWatchlist, isHorizontal }) => {
  const navigate = useNavigate();
  const loader = useLoader();

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
    <div className="row">
      {title && (
        <h2 className="text-xl font-bold mb-4 text-white flex items-center">
          <span className="section-indicator mr-2"></span> 
          {title} 
          <i className="fa-solid fa-chevron-right ml-2 text-sm text-gray-500"></i>
        </h2>
      )}
      
      {/* If isHorizontal is true, use 'list' (from RedFlix CSS).
         Otherwise use a standard grid class.
      */}
      <div className={isHorizontal ? "list" : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-2"}>
        {items.map((item) => (
          <div key={item.id} className="movie-card" onClick={() => handleClick(item)}>
            <div className="badge-overlay">HD</div>
            <img 
              src={item.poster_path ? `${POSTER_BASE_URL}${item.poster_path}` : '/logo.png'} 
              alt={item.title || item.name}
              loading="lazy"
              onError={(e) => e.target.src = '/logo.png'}
            />
            <div className="card-title">
              {item.title || item.name}
            </div>
            {isWatchlist && (
              <button onClick={(e) => {e.stopPropagation(); onRemove(item.id)}} className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full z-10">
                <i className="fa fa-times"></i>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
