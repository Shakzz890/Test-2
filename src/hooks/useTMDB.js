import { useState, useEffect, useCallback } from 'react';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../config';

export const useTMDB = () => {
    const [movieGenres, setMovieGenres] = useState(new Map());
    const [tvGenres, setTvGenres] = useState(new Map());

    const fetchFromTMDB = useCallback(async (endpoint, params = {}) => {
        const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
        url.searchParams.append('api_key', TMDB_API_KEY);
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined) {
                url.searchParams.append(key, params[key]);
            }
        });
        
        const res = await fetch(url);
        return await res.json();
    }, []);

    // 1. Fetch Genres on Mount (Required for Filters)
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const [movieG, tvG] = await Promise.all([
                    fetchFromTMDB('/genre/movie/list'),
                    fetchFromTMDB('/genre/tv/list')
                ]);
                
                // Convert to Map for easier lookup: id -> name
                setMovieGenres(new Map(movieG.genres.map(g => [g.id, g.name])));
                setTvGenres(new Map(tvG.genres.map(g => [g.id, g.name])));
            } catch (e) {
                console.error("Failed to fetch genres", e);
            }
        };
        fetchGenres();
    }, [fetchFromTMDB]);

    // 2. Home Page Feeds
    const fetchHomeFeeds = useCallback(async () => {
        const [trending, upcoming, latestTv, kdrama, cdrama, anime] = await Promise.all([
            fetchFromTMDB('/trending/all/week'),
            fetchFromTMDB('/movie/upcoming', { region: 'US' }),
            fetchFromTMDB('/tv/on_the_air', { sort_by: 'popularity.desc' }),
            fetchFromTMDB('/discover/tv', { with_original_language: 'ko', with_origin_country: 'KR', sort_by: 'popularity.desc' }),
            fetchFromTMDB('/discover/tv', { with_original_language: 'zh', with_origin_country: 'CN', sort_by: 'popularity.desc' }),
            fetchFromTMDB('/discover/tv', { with_genres: '16', with_original_language: 'ja', sort_by: 'popularity.desc' })
        ]);

        return {
            trending: trending.results || [],
            upcoming: upcoming.results || [],
            latestTv: latestTv.results || [],
            kdrama: kdrama.results || [],
            cdrama: cdrama.results || [],
            anime: anime.results || []
        };
    }, [fetchFromTMDB]);

    // 3. Details & Seasons
    const fetchDetails = useCallback(async (type, id) => {
        const [details, recommendations] = await Promise.all([
            fetchFromTMDB(`/${type}/${id}`),
            fetchFromTMDB(`/${type}/${id}/recommendations`, { page: 1 })
        ]);
        return { ...details, recommendations: recommendations.results || [] };
    }, [fetchFromTMDB]);

    const fetchSeason = useCallback(async (tvId, seasonNum) => {
        const data = await fetchFromTMDB(`/tv/${tvId}/season/${seasonNum}`);
        return data.episodes || [];
    }, [fetchFromTMDB]);

    // 4. Search
    const searchMulti = useCallback(async (query) => {
        const data = await fetchFromTMDB('/search/multi', { query });
        return data.results || [];
    }, [fetchFromTMDB]);

    // 5. Discover (Required for Movies/TV Pages)
    const fetchDiscoverMovies = useCallback(async (params) => {
        return await fetchFromTMDB('/discover/movie', { 
            sort_by: 'popularity.desc', 
            include_adult: false,
            ...params 
        });
    }, [fetchFromTMDB]);

    const fetchDiscoverTV = useCallback(async (params) => {
        return await fetchFromTMDB('/discover/tv', { 
            sort_by: 'popularity.desc', 
            include_adult: false,
            ...params 
        });
    }, [fetchFromTMDB]);

    return { 
        fetchHomeFeeds, 
        fetchDetails, 
        fetchSeason, 
        searchMulti,
        fetchDiscoverMovies, // 👈 Added
        fetchDiscoverTV,     // 👈 Added
        movieGenres,         // 👈 Added
        tvGenres             // 👈 Added
    };
};
