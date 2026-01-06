// src/pages/Watch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SERVERS, PROVIDER_SANDBOX_POLICY } from '../config';
import { useTMDB } from '../hooks/useTMDB';
import Dropdown from '../components/Dropdown'; // Re-using from previous
import { ArrowLeft } from 'lucide-react';

const Watch = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { fetchSeason } = useTMDB();
    
    const type = params.get('type');
    const id = params.get('id');
    
    // State
    const [currentServer, setCurrentServer] = useState(0);
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [episodesList, setEpisodesList] = useState([]);
    const [tvData, setTvData] = useState(null);
    const [sandboxEnabled, setSandboxEnabled] = useState(() => localStorage.getItem("sandboxEnabled") !== "false");

    const iframeRef = useRef(null);

    // Initial Load & TV Data
    useEffect(() => {
        if(type === 'tv') {
            // Fetch TV details to get season count (simplified for brevity)
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=4eea503176528574efd91847b7a302cc`)
                .then(r => r.json())
                .then(data => {
                    setTvData(data);
                    // Load saved progress
                    const saved = JSON.parse(localStorage.getItem(`watch_${id}`));
                    if(saved) {
                        setSeason(saved.season);
                        setEpisode(saved.episode);
                    }
                });
        }
    }, [type, id]);

    // Fetch Episodes when season changes
    useEffect(() => {
        if(type === 'tv') {
            fetchSeason(id, season).then(setEpisodesList);
        }
    }, [type, id, season, fetchSeason]);

    // Save Progress
    useEffect(() => {
        localStorage.setItem(`watch_${id}`, JSON.stringify({ season, episode }));
        localStorage.setItem(`watched_${id}_${season}_${episode}`, "true");
    }, [id, season, episode]);

    // Handle Sandbox Logic
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
    }, [currentServer, sandboxEnabled]);

    const src = SERVERS[currentServer].getUrl(type, id, season, episode);

    return (
        <div className="h-screen bg-black flex flex-col">
            {/* Header Controls */}
            <div className="flex items-center justify-between p-4 bg-neutral-900 text-white z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-red-500">
                    <ArrowLeft size={20} /> Back
                </button>
                <div className="flex gap-4">
                    <Dropdown 
                        value={currentServer}
                        options={SERVERS.map((s, i) => ({ value: i, label: s.name }))}
                        onChange={setCurrentServer}
                    />
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input 
                            type="checkbox" 
                            checked={sandboxEnabled} 
                            onChange={(e) => {
                                setSandboxEnabled(e.target.checked);
                                localStorage.setItem("sandboxEnabled", e.target.checked);
                            }} 
                        />
                        Sandbox Mode
                    </label>
                </div>
            </div>

            {/* Player Container */}
            <div className="flex-1 relative bg-black">
                <iframe
                    ref={iframeRef}
                    key={`${currentServer}-${season}-${episode}-${sandboxEnabled}`} // Force re-render on change
                    src={src}
                    className="w-full h-full border-0"
                    allowFullScreen
                    title="Shakzz Player"
                />
            </div>

            {/* TV Controls Footer */}
            {type === 'tv' && tvData && (
                <div className="p-4 bg-neutral-900 flex gap-4 overflow-x-auto">
                    <select 
                        value={season} 
                        onChange={(e) => setSeason(Number(e.target.value))}
                        className="bg-neutral-800 text-white p-2 rounded"
                    >
                        {tvData.seasons?.map(s => (
                            <option key={s.id} value={s.season_number}>
                                {s.name} ({s.episode_count} eps)
                            </option>
                        ))}
                    </select>
                    
                    <select 
                        value={episode}
                        onChange={(e) => setEpisode(Number(e.target.value))}
                        className="bg-neutral-800 text-white p-2 rounded"
                    >
                        {episodesList.map(e => (
                            <option key={e.id} value={e.episode_number}>
                                Episode {e.episode_number}: {e.name}
                            </option>
                        ))}
                    </select>
                    
                    <button 
                        className="bg-neutral-700 px-4 py-2 rounded text-white"
                        onClick={() => setEpisode(prev => prev + 1)}
                        disabled={episode >= episodesList.length}
                    >
                        Next Episode
                    </button>
                </div>
            )}
        </div>
    );
};

export default Watch;
