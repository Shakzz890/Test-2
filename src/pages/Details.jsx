import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTMDB } from '../hooks/useTMDB';
import { useLoader } from '../components/CutieLoader';
import { Play, Bookmark, BookmarkCheck, Star } from 'lucide-react';
import MediaGrid from '../components/MediaGrid';
import { IMG_BASE_URL, POSTER_BASE_URL } from '../config';

const Details = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { fetchDetails } = useTMDB();
  const loader = useLoader();

  const type = params.get("type");
  const id = params.get("id");

  const [data, setData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load Data
  useEffect(() => {
    if (!type || !id) return;

    const loadData = async () => {
      setLoading(true);
      loader.show("Fetching details...");
      try {
        const detailsData = await fetchDetails(type, id);
        setData(detailsData);
        setRecommendations(detailsData.recommendations?.slice(0, 12) || []);
        
        // Check Watchlist status
        const savedList = JSON.parse(localStorage.getItem("watchlist")) || [];
        setInWatchlist(savedList.some(item => item.id === Number(id)));
      } catch (error) {
        console.error("Failed to load details:", error);
      } finally {
        setLoading(false);
        loader.hide();
      }
    };

    loadData();
    window.scrollTo(0, 0); // Reset scroll to top
  }, [type, id, fetchDetails, loader]);

  // Handle Watchlist Toggle
  const toggleWatchlist = () => {
    const savedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    let newList;

    if (inWatchlist) {
      newList = savedList.filter(item => item.id !== Number(id));
    } else {
      const newItem = {
        id: Number(id),
        title: data.title || data.name,
        poster_path: data.poster_path,
        release_date: data.release_date || data.first_air_date,
        vote_average: data.vote_average,
        media_type: type
      };
      newList = [newItem, ...savedList];
    }

    localStorage.setItem("watchlist", JSON.stringify(newList));
    setInWatchlist(!inWatchlist);
    
    // Dispatch event so Navbar updates count immediately
    window.dispatchEvent(new Event("watchlist-update"));
  };

  const handlePlay = () => {
    navigate(`/watch?type=${type}&id=${id}`);
  };

  if (loading) return <div className="h-screen bg-black"></div>;
  if (!data) return <div className="text-white text-center pt-20">Content not found.</div>;

  const title = data.title || data.name;
  const date = data.release_date || data.first_air_date;
  const year = date ? date.split('-')[0] : 'N/A';

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Backdrop Section */}
      <div className="relative w-full h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-10" />
        <img 
          src={data.backdrop_path ? `${IMG_BASE_URL}${data.backdrop_path}` : `${POSTER_BASE_URL}${data.poster_path}`} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Layer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-80 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          
          {/* Poster Card (Hidden on mobile usually, visible on desktop) */}
          <div className="hidden md:block w-[300px] shrink-0 rounded-lg overflow-hidden shadow-2xl shadow-black/50">
            <img 
              src={data.poster_path ? `${POSTER_BASE_URL}${data.poster_path}` : '/logo.png'} 
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Details Info */}
          <div className="flex-1 flex flex-col justify-end pb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
            
            {/* Meta Data Row */}
            <div className="flex items-center gap-4 text-sm md:text-base mb-6 text-gray-300">
              <span className="bg-white/20 px-2 py-1 rounded text-white">{year}</span>
              <span className="capitalize border border-white/30 px-2 py-1 rounded">{type === 'tv' ? 'TV Series' : 'Movie'}</span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="font-bold">{data.vote_average?.toFixed(1)}</span>
              </div>
              <span>{data.runtime || data.episode_run_time?.[0]} min</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {data.genres?.map(genre => (
                <span key={genre.id} className="text-xs md:text-sm px-3 py-1 bg-neutral-800 rounded-full text-gray-300 border border-neutral-700">
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8 max-w-3xl">
              <h3 className="text-lg font-semibold mb-2 text-gray-200">Overview</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base line-clamp-4 md:line-clamp-none">
                {data.overview}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handlePlay}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play size={20} fill="currentColor" /> 
                Play Now
              </button>
              
              <button 
                onClick={toggleWatchlist}
                className={`px-8 py-3 rounded font-bold flex items-center gap-2 transition-all border ${
                  inWatchlist 
                    ? 'bg-white text-black border-white hover:bg-gray-200' 
                    : 'bg-transparent text-white border-gray-500 hover:border-white hover:bg-white/10'
                }`}
              >
                {inWatchlist ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                {inWatchlist ? 'Saved' : 'My List'}
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-16 pb-20">
            <MediaGrid 
              title="You May Also Like" 
              items={recommendations} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
