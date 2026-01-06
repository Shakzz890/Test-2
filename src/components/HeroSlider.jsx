import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSlider = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const BACKDROP_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;
  const item = items[current];

  const handlePlay = () => {
    const type = item.media_type || (item.first_air_date ? 'tv' : 'movie');
    navigate(`/details?type=${type}&id=${item.id}`);
  };

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden mb-10 group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${BACKDROP_URL}${item.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 md:bottom-12 flex flex-col items-start gap-4 z-10">
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
          Trending #{current + 1}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight drop-shadow-lg">
          {item.title || item.name}
        </h1>
        <p className="text-neutral-300 line-clamp-3 max-w-xl text-sm md:text-base drop-shadow-md hidden md:block">
          {item.overview}
        </p>
        <div className="flex gap-3 mt-2">
          <button 
            onClick={handlePlay}
            className="bg-white text-black px-6 py-2.5 rounded font-bold flex items-center gap-2 hover:bg-neutral-200 transition-colors"
          >
            <i className="fa-solid fa-play"></i> View Info
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-20">
        {items.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'w-6 bg-red-600' : 'w-2 bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
