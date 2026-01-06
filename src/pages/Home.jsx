import React, { useEffect, useState } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import MediaGrid from '../components/MediaGrid';
import HeroSlider from '../components/HeroSlider';
import { useLoader } from '../components/CutieLoader';

const Home = () => {
    const { fetchHomeFeeds } = useTMDB();
    const loader = useLoader();
    const [feeds, setFeeds] = useState({
        trending: [], upcoming: [], latestTv: [], kdrama: [], cdrama: [], anime: []
    });

    useEffect(() => {
        const load = async () => {
            loader.show("Initializing...");
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
        <div id="home-view">
            {/* Slider */}
            {feeds.trending.length > 0 && <HeroSlider items={feeds.trending.slice(0, 5)} />}

            {/* Horizontal Lists - Exactly matching your script categories */}
            <MediaGrid title="Latest Updates" items={feeds.latestTv} isHorizontal={true} />
            <MediaGrid title="Top K-Drama" items={feeds.kdrama} isHorizontal={true} />
            <MediaGrid title="Top C-Drama" items={feeds.cdrama} isHorizontal={true} />
            <MediaGrid title="Trending Movies" items={feeds.trending} isHorizontal={true} />
            <MediaGrid title="Popular Anime" items={feeds.anime} isHorizontal={true} />
            <MediaGrid title="Upcoming Releases" items={feeds.upcoming} isHorizontal={true} />

            <footer className="footer">
                <p>Shakzz TV © 2025.</p>
            </footer>
        </div>
    );
};

export default Home;
