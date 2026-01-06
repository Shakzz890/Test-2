import React, { useState, useEffect } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import MediaGrid from '../components/MediaGrid';
import Dropdown from '../components/Dropdown';
import { useLoader } from '../components/CutieLoader';

const Movies = () => {
  const { fetchDiscoverMovies, movieGenres } = useTMDB(); // Ensure useTMDB has these!
  const loader = useLoader();
  
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [hasMore, setHasMore] = useState(true);

  // Generate Year Options
  const years = [{ value: "", label: "All Years" }, ...Array.from({ length: 30 }, (_, i) => {
      const y = new Date().getFullYear() - i;
      return { value: String(y), label: String(y) };
  })];

  // Generate Genre Options
  const genreOptions = [{ value: "", label: "All Genres" }];
  if (movieGenres) {
      movieGenres.forEach((name, id) => genreOptions.push({ value: String(id), label: name }));
  }

  // Fetch Movies
  const loadMovies = async (reset = false) => {
    if (reset) loader.show("Filtering...");
    try {
      const p = reset ? 1 : page;
      const data = await fetchDiscoverMovies({ 
        page: p, 
        primary_release_year: year || undefined, 
        with_genres: genre || undefined 
      });
      
      setMovies(prev => reset ? data.results : [...prev, ...data.results]);
      setPage(p + 1);
      setHasMore(p < data.total_pages);
    } catch (e) {
      console.error(e);
    } finally {
      loader.hide();
    }
  };

  // Initial Load & Filter Change
  useEffect(() => {
    loadMovies(true);
  }, [year, genre]);

  return (
    <div className="min-h-screen pt-24 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Movies</h1>
          <p className="text-white/60">Discover new movies</p>
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

      <MediaGrid items={movies} />

      {hasMore && (
        <div className="text-center py-8">
          <button onClick={() => loadMovies(false)} className="bg-red-700 px-6 py-2 rounded-full hover:bg-red-800 transition">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
