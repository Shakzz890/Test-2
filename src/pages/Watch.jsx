import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SERVERS, PROVIDER_SANDBOX_POLICY } from '../config';
import { useTMDB } from '../hooks/useTMDB';

const Watch = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const { fetchSeason } = useTMDB();
    
    const type = params.get('type');
    const id = params.get('id');
    
    const [currentServer, setCurrentServer] = useState(0); // Index of server
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [episodesList, setEpisodesList] = useState([]);
    
    // Sandbox Logic
    const [sandboxEnabled, setSandboxEnabled] = useState(() => localStorage.getItem("sandboxEnabled") !== "false");
    const iframeRef = useRef(null);

    // Initial Load
    useEffect(() => {
        if(type === 'tv') {
            fetchSeason(id, season).then(setEpisodesList);
            // Load saved progress
            const saved = JSON.parse(localStorage.getItem(`watch_${id}`));
            if(saved) { setSeason(saved.season); setEpisode(saved.episode); }
        }
    }, [type, id]);

    // Handle Sandbox Attribute
    useEffect(() => {
        const serverValue = SERVERS[currentServer].value;
        const policy = PROVIDER_SANDBOX_POLICY[serverValue];
        
        if (iframeRef.current) {
            if (sandboxEnabled && policy) {
                iframeRef.current.setAttribute("sandbox", policy);
            } else {
                iframeRef.current.removeAttribute("sandbox");
            }
        }
    }, [currentServer, sandboxEnabled]);

    // Construct URL
    const activeServer = SERVERS[currentServer];
    let src = '';
    // Note: This logic mirrors your original script exactly
    if(activeServer.value === 'vidsrc.to') src = `https://vidsrc.to/embed/${type}/${id}${type==='tv'?`/${season}/${episode}`:''}`;
    else if(activeServer.value === 'vidsrc.me') src = type==='tv' ? `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}` : `https://vidsrc.me/embed/movie?tmdb=${id}`;
    // ... add logic for other servers based on your script.js if needed ...
    else src = activeServer.getUrl ? activeServer.getUrl(type, id, season, episode) : `https://vidsrc.to/embed/${type}/${id}`;

    return (
        <div id="detail-view" style={{display:'flex', flexDirection:'column', height:'100vh', background:'#000'}}>
             <div className="player-container" style={{display:'block', flex:1}}>
                <div className="server-select-container">
                    <button onClick={() => navigate(-1)} style={{color:'white', background:'none', border:'none', fontSize:'20px'}}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    
                    <select 
                        onChange={(e) => setCurrentServer(Number(e.target.value))}
                        style={{background:'#111', color:'#fff', padding:'5px', border:'1px solid #333'}}
                    >
                        {SERVERS.map((s, i) => <option key={i} value={i}>{s.name}</option>)}
                    </select>

                    <div className="sandbox-toggle-wrapper">
                        <span className="sandbox-label">Sandbox</span>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={sandboxEnabled} 
                                onChange={(e) => {
                                    setSandboxEnabled(e.target.checked);
                                    localStorage.setItem("sandboxEnabled", e.target.checked);
                                }}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

                <div className="iframe-wrapper" style={{height:'100%', paddingBottom:0}}>
                     <iframe 
                        ref={iframeRef}
                        src={src} 
                        allowFullScreen 
                        style={{width:'100%', height:'100%', border:0}}
                     ></iframe>
                </div>

                {type === 'tv' && (
                    <div className="episode-grid" style={{padding:'10px', height:'100px', overflowY:'auto'}}>
                        {episodesList.map(ep => (
                            <button 
                                key={ep.id} 
                                className={`ep-btn ${ep.episode_number === episode ? 'active' : ''}`}
                                onClick={() => setEpisode(ep.episode_number)}
                            >
                                {ep.episode_number}
                            </button>
                        ))}
                    </div>
                )}
             </div>
        </div>
    );
};

export default Watch;
