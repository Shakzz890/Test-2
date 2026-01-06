import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SERVERS, PROVIDER_SANDBOX_POLICY } from '../config';
import { useTMDB } from '../hooks/useTMDB';
import Dropdown from '../components/Dropdown';
import { ArrowLeft, MonitorPlay } from 'lucide-react';

const Watch = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { fetchSeason } = useTMDB();
    
    const type = params.get('type');
    const id = params.get('id');
    
    const [currentServer, setCurrentServer] = useState(() => Number(localStorage.getItem('currentServer')) || 0);
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [episodesList, setEpisodesList] = useState([]);
    const [mediaData, setMediaData] = useState(null);
    const [sandboxEnabled, setSandboxEnabled] = useState(() => {
        const saved = localStorage.getItem("sandboxEnabled");
        return saved !== null ? JSON.parse(saved) : true;
    });

    const iframeRef = useRef(null);

    // Persist Settings
    useEffect(() => {
        localStorage.setItem('currentServer', currentServer);
        localStorage.setItem('sandboxEnabled', JSON.stringify(sandboxEnabled));
    }, [currentServer, sandboxEnabled]);

    // Fetch Initial Data
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=4eea503176528574efd91847b7a302cc`)
            .then(r => r.json())
            .then(data => {
                setMediaData(data);
                // Load Watch Progress
                const savedProgress = JSON.parse(localStorage.getItem(`watch_${id}`));
                if (savedProgress) {
                    setSeason(savedProgress.season);
                    setEpisode(savedProgress.episode);
                }
            });
    }, [type, id]);

    // Fetch Episodes for TV
    useEffect(() => {
        if(type === 'tv') {
            fetchSeason(id, season).then(setEpisodesList);
        }
    }, [type, id, season]);

    // Save Progress
    useEffect(() => {
        localStorage.setItem(`watch_${id}`, JSON.stringify({ season, episode }));
    }, [id, season, episode]);

    // Apply Sandbox Policy
    useEffect(() => {
        const serverDomain = SERVERS[currentServer].domain;
        const policy = PROVIDER_SANDBOX_POLICY[serverDomain];
        
        if (iframeRef.current) {
            if (sandboxEnabled && policy) {
                iframeRef.current.setAttribute("sandbox", policy);
            } else {
                iframeRef.current.removeAttribute("sandbox");
            }
        }
    }, [currentServer, sandboxEnabled, iframeRef.current]);

    const src = SERVERS[currentServer].getUrl(type, id, season, episode);

    return (
        <div className="h-screen bg-black flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#111] border-b border-white/5 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft className="text-white" />
                    </button>
                    <div>
                        <h1 className="text-white font-bold text-lg md:text-xl truncate max-w-[200px] md:max-w-md">
                            {mediaData?.title || mediaData?.name || "Loading..."}
                        </h1>
                        {type === 'tv' && <p className="text-neutral-400 text-xs">S{season} : E{episode}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:block w-48">
                        <Dropdown 
                            value={currentServer}
                            options={SERVERS.map((s, i) => ({ value: i, label: s.name }))}
                            onChange={setCurrentServer}
                        />
                    </div>
                    <button 
                        onClick={() => setSandboxEnabled(!sandboxEnabled)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${sandboxEnabled ? 'bg-red-600 border-red-600 text-white' : 'bg-transparent border-neutral-600 text-neutral-400'}`}
                        title="Toggle Ad-Block / Sandbox"
                    >
                        {sandboxEnabled ? 'Sandbox ON' : 'Sandbox OFF'}
                    </button>
                </div>
            </div>

            {/* Video Player */}
            <div className="flex-1 relative bg-black w-full h-full">
                <iframe
                    ref={iframeRef}
                    key={`${currentServer}-${season}-${episode}-${sandboxEnabled}`}
                    src={src}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    allow="encrypted-media; fullscreen; picture-in-picture"
                />
            </div>

            {/* TV Episode Selector (Bottom) */}
            {type === 'tv' && episodesList.length > 0 && (
                <div className="h-24 bg-[#111] border-t border-white/5 p-4 overflow-x-auto flex gap-3 shrink-0 items-center">
                    {episodesList.map((ep) => {
                        const isWatched = localStorage.getItem(`watched_${id}_${season}_${ep.episode_number}`);
                        const isActive = ep.episode_number === episode;
                        
                        return (
                            <button
                                key={ep.id}
                                onClick={() => setEpisode(ep.episode_number)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                                    isActive 
                                    ? 'bg-[#e50914] text-white' 
                                    : 'bg-[#222] text-neutral-300 hover:bg-[#333]'
                                }`}
                            >
                                <span className="block">EP {ep.episode_number}</span>
                                {isWatched && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-green-500 rounded-full"></span>}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default Watch;
