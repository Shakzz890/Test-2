import React from 'react';

const SearchResults = ({ results, onSelect }) => {
  if (!results.length) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-neutral-900 border border-neutral-800 rounded-b-lg shadow-xl max-h-96 overflow-y-auto z-50">
      {results.map((item) => (
        <div 
          key={item.id}
          onClick={() => onSelect(item)}
          className="flex items-center gap-3 p-3 hover:bg-neutral-800 cursor-pointer border-b border-neutral-800/50 last:border-0"
        >
          <img 
            src={item.poster_path ? `https://image.tmdb.org/t/p/w92${item.poster_path}` : '/logo.png'} 
            alt={item.title} 
            className="w-10 h-14 object-cover rounded bg-neutral-800"
          />
          <div>
            <h4 className="text-sm font-medium text-white line-clamp-1">{item.title || item.name}</h4>
            <span className="text-xs text-neutral-400 capitalize">
              {item.media_type} • {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0] || 'N/A'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
