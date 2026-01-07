import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoader } from './CutieLoader';
import { POSTER_URL } from '../config'; // Using global config

const MediaGrid = ({ title, items, onItemClick, onRemove, isWatchlist, isHorizontal = false }) => {
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
        <h2 style={{color:'white', marginBottom:'15px', fontSize:'20px', fontWeight:'bold'}}>
          <span className="section-indicator"></span> {title} 
          <i className="fa-solid fa-chevron-right" style={{marginLeft:'10px', fontSize:'14px', color:'#888'}}></i>
        </h2>
      )}
      
      {/* If isHorizontal is true, we use the "list" class from your CSS.
         If false (default), we use the "grid" classes for the Movies/TV pages.
      */}
      <div className={isHorizontal ? "list" : "results"}>
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
                style={{position:'absolute', top:'5px', left:'5px', background:'rgba(0,0,0,0.6)', color:'white', border:'none', borderRadius:'50%', width:'25px', height:'25px', zIndex:20}}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
