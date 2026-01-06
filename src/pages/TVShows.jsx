import React, { useState, useEffect } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import MediaGrid from '../components/MediaGrid';
import Dropdown from '../components/Dropdown';
import { useLoader } from '../components/CutieLoader';

const TVShows = () => {
  const { fetchDiscoverTV, tvGenres } = useTMDB();
  const loader = useLoader();
  
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const years = [{ value: "", label: "All Years" }, ...Array.from({ length: 30 }, (_, i) => {
      const y = new Date().getFullYear() - i;
      return { value: String(y), label: String(y) };
  })];

  const genreOptions = [{ value: "", label: "All Genres" }];
  if (tvGenres) {
      tvGenres.forEach((name, id) => genreOptions.push({ value: String(id), label: name }));
  }

  const loadShows = async (reset = false) => {
    if (reset) loader.show("Filtering...");
    try {
      const p = reset ? 1 : page;
      const data = await fetchDiscoverTV({ 
        page: p, 
        first_air_date_year: year || undefined, 
        with_genres: genre || undefined 
      });
      
      setShows(prev => reset ? data.results : [...prev, ...data.results]);
      setPage(p + 1);
      setHasMore(p < data.total_pages);
    } catch (e) {
      console.error(e);
    } finally {
      loader.hide();
    }
  };

  useEffect(() => {
    loadShows(true);
  }, [year, genre]);

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">TV Shows</h1>
          <p className="text-white/60">Explore popular series</p>
        </div>
        <div className="flex gap-3">
          <div className="w-32">
            <Dropdown value={year} options={years} onChange={(v) => setYear(String(v))} />
          </div>
          <div className="w-40">
            <Dropdown value={genre} options={genreOptions} onChange={(v) => setGenre(String(v))} />
          </div>
        </div>
      </div>

      <MediaGrid items={shows} />

      {hasMore && (
        <div className="text-center py-8">
          <button onClick={() => loadShows(false)} className="bg-red-700 px-6 py-2 rounded-full hover:bg-red-800 transition">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TVShows;
