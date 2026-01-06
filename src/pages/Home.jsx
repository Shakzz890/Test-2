import React, { useEffect, useState } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import { useLoader } from '../components/CutieLoader';
import MediaGrid from '../components/MediaGrid';
import HeroSlider from '../components/HeroSlider';

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
        <div className="bg-[#0f0f0f] min-h-screen pb-20">
            {/* Hero Slider */}
            {feeds.trending.length > 0 && <HeroSlider items={feeds.trending.slice(0, 5)} />}
            
            {/* Content Grids with Horizontal Scrolling */}
            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 space-y-4">
                <MediaGrid title="Upcoming Movies" items={feeds.upcoming} isHorizontal={true} />
                <MediaGrid title="Latest TV Shows" items={feeds.latestTv} isHorizontal={true} />
                <MediaGrid title="Trending K-Drama" items={feeds.kdrama} isHorizontal={true} />
                <MediaGrid title="Trending C-Drama" items={feeds.cdrama} isHorizontal={true} />
                <MediaGrid title="Popular Anime" items={feeds.anime} isHorizontal={true} />
            </div>
        </div>
    );
};

export default Home;
