import React from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTER_URL } from '../config';

const MediaGrid = ({ title, items, isHorizontal = false }) => {
  const navigate = useNavigate();

  if (!items || items.length === 0) return null;

  const handleClick = (item) => {
      const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
      navigate(`/details?type=${type}&id=${item.id}`);
  };

  return (
    <div className="row">
      {title && (
        <h2>
            <span className="section-indicator"></span> {title} 
            <i className="fa-solid fa-chevron-right"></i>
        </h2>
      )}
      
      {/* Logic: If Horizontal, use .list, else use .grid-list from CSS */}
      <div className={isHorizontal ? "list" : "grid-list"}>
        {items.map((item) => (
          <div key={item.id} className="movie-card" onClick={() => handleClick(item)} tabIndex="0">
            <div className="badge-overlay">HD</div>
            <img 
              src={item.poster_path ? `${POSTER_URL}${item.poster_path}` : '/logo.png'} 
              loading="lazy" 
              onError={(e) => e.target.src='/logo.png'}
              alt={item.title}
            />
            <div className="card-title">{item.title || item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
