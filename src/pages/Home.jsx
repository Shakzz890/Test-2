// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import { useLoader } from '../components/CutieLoader';
import MediaGrid from '../components/MediaGrid'; // Reuse from previous
import HeroSlider from '../components/HeroSlider'; // Reuse from previous

const Home = () => {
    const { fetchHomeFeeds } = useTMDB();
    const loader = useLoader();
    const [feeds, setFeeds] = useState({
        trending: [], upcoming: [], latestTv: [], kdrama: [], cdrama: [], anime: []
    });

    useEffect(() => {
        const load = async () => {
            loader.show("Fetching content...");
            try {
                const data = await fetchHomeFeeds();
                setFeeds(data);
            } catch (e) {
                console.error(e);
            } finally {
                loader.hide();
            }
        };
        load();
    }, [fetchHomeFeeds]);

    return (
        <div className="bg-background min-h-screen pb-20">
            {feeds.trending.length > 0 && <HeroSlider items={feeds.trending.slice(0, 5)} />}
            
            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 space-y-12">
                <MediaGrid title="Upcoming Movies" items={feeds.upcoming} />
                <MediaGrid title="Latest TV Shows" items={feeds.latestTv} />
                <MediaGrid title="Trending K-Drama" items={feeds.kdrama} />
                <MediaGrid title="Trending C-Drama" items={feeds.cdrama} />
                <MediaGrid title="Popular Anime" items={feeds.anime} />
            </div>
        </div>
    );
};

export default Home;
