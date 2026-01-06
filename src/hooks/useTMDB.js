// src/hooks/useTMDB.js
import { useCallback } from 'react';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../config';

export const useTMDB = () => {
    const fetchFromTMDB = useCallback(async (endpoint, params = {}) => {
        const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
        url.searchParams.append('api_key', TMDB_API_KEY);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        const res = await fetch(url);
        return await res.json();
    }, []);

    // Specific Home Page Feeds
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

    const fetchDetails = useCallback(async (type, id) => {
        const [details, recommendations] = await Promise.all([
            fetchFromTMDB(`/${type}/${id}`),
            fetchFromTMDB(`/${type}/${id}/recommendations`, { page: 1 })
        ]);
        
        // If TV, fetch seasons separately if needed, but details usually has season info
        return { ...details, recommendations: recommendations.results || [] };
    }, [fetchFromTMDB]);

    const fetchSeason = useCallback(async (tvId, seasonNum) => {
        const data = await fetchFromTMDB(`/tv/${tvId}/season/${seasonNum}`);
        return data.episodes || [];
    }, [fetchFromTMDB]);

    const searchMulti = useCallback(async (query) => {
        const data = await fetchFromTMDB('/search/multi', { query });
        return data.results || [];
    }, [fetchFromTMDB]);

    return { fetchHomeFeeds, fetchDetails, fetchSeason, searchMulti };
};
