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
            {feeds.trending.length > 0 && <HeroSlider items={feeds.trending.slice(0, 5)} />}
            
            <div className="max-w-[1600px] mx-auto px-4 -mt-6 md:-mt-12 relative z-20 space-y-8">
                <MediaGrid title="Latest Updates" items={feeds.latestTv} isHorizontal={true} />
                <MediaGrid title="Top K-Drama" items={feeds.kdrama} isHorizontal={true} />
                <MediaGrid title="Top C-Drama" items={feeds.cdrama} isHorizontal={true} />
                <MediaGrid title="Trending Movies" items={feeds.trending} isHorizontal={true} />
                <MediaGrid title="Popular Anime" items={feeds.anime} isHorizontal={true} />
                <MediaGrid title="Upcoming Releases" items={feeds.upcoming} isHorizontal={true} />
            </div>
            
            <footer className="mt-20 py-8 border-t border-white/5 text-center text-neutral-500 text-sm">
                <p>&copy; 2025 Shakzz TV. All rights reserved.</p>
                <p className="mt-2 text-xs">This site does not store any files on our server.</p>
            </footer>
        </div>
    );
};

export default Home;
