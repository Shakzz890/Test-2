// src/pages/LiveTV.jsx
import React, { useState, useEffect, useRef } from 'react';
import { PLACEHOLDER_IMG } from '../config';
import { channels, animeData } from '../data/channels';

const TABS = ["all", "favorites", "news", "entertainment", "movies", "sports", "documentary", "cartoons & animations", "anime tagalog dubbed"];

const LiveTV = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentChannel, setCurrentChannel] = useState(null);
    const [favs, setFavs] = useState(() => JSON.parse(localStorage.getItem("favoriteChannels") || "[]"));
    const playerContainerRef = useRef(null);

    // Initialize JWPlayer
    const setupPlayer = (channelKey) => {
        if (!window.jwplayer || !channels[channelKey]) return;
        
        const channel = channels[channelKey];
        setCurrentChannel(channel);
        localStorage.setItem("lastPlayedChannel", channelKey);

        const config = {
            autostart: true,
            width: "100%",
            height: "100%",
            stretching: "exactfit",
            file: channel.manifestUri,
            type: channel.type === "mp4" ? "mp4" : (channel.type === "hls" ? "hls" : "dash"),
        };

        // DRM Config
        if (channel.type === "clearkey" && channel.keyId && channel.key) {
            config.drm = { clearkey: { keyId: channel.keyId, key: channel.key } };
        } else if (channel.type === "widevine") {
            config.drm = { widevine: { url: channel.licenseServerUri || channel.key } };
        }

        window.jwplayer(playerContainerRef.current).setup(config);
    };

    // Toggle Favorite
    const toggleFav = (key, e) => {
        e.stopPropagation();
        let newFavs;
        if (favs.includes(key)) newFavs = favs.filter(k => k !== key);
        else newFavs = [...favs, key];
        
        setFavs(newFavs);
        localStorage.setItem("favoriteChannels", JSON.stringify(newFavs));
    };

    // Filter Logic
    const filteredChannels = Object.entries(channels).filter(([key, ch]) => {
        const matchesSearch = ch.name.toLowerCase().includes(searchQuery.toLowerCase());
        const group = ch.group || "live";
        const matchesTab = activeTab === "all" || 
                           (activeTab === "favorites" ? favs.includes(key) : 
                           (Array.isArray(group) ? group.includes(activeTab) : group === activeTab));
        return matchesSearch && matchesTab;
    });

    return (
        <div className="pt-20 min-h-screen bg-background flex flex-col lg:flex-row h-[calc(100vh-80px)]">
            
            {/* Player Section */}
            <div className="flex-1 bg-black relative min-h-[300px] lg:h-full">
                <div ref={playerContainerRef} className="w-full h-full"></div>
                {currentChannel && (
                    <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-white font-bold">
                        {currentChannel.name}
                    </div>
                )}
            </div>

            {/* Sidebar / Channel List */}
            <div className="w-full lg:w-[400px] bg-neutral-900 flex flex-col h-[50vh] lg:h-full border-l border-neutral-800">
                {/* Search & Tabs */}
                <div className="p-4 border-b border-neutral-800">
                    <input 
                        type="text" 
                        placeholder="Search Channels..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-800 text-white rounded px-3 py-2 mb-3 outline-none focus:ring-1 ring-red-600"
                    />
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {TABS.map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-1 rounded text-sm whitespace-nowrap capitalize transition-colors ${activeTab === tab ? "bg-red-700 text-white" : "bg-neutral-800 text-neutral-400 hover:text-white"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    <div className="text-xs text-neutral-500 px-2 mb-2">{filteredChannels.length} Channels</div>
                    {filteredChannels.map(([key, ch]) => (
                        <div 
                            key={key} 
                            onClick={() => setupPlayer(key)}
                            className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${currentChannel === ch ? "bg-red-900/30 border-l-2 border-red-600" : "hover:bg-neutral-800"}`}
                        >
                            <img src={ch.logo} alt={ch.name} className="w-10 h-10 object-contain rounded bg-black/20" onError={(e) => e.target.src = PLACEHOLDER_IMG} />
                            <span className="flex-1 text-sm font-medium text-white truncate">{ch.name}</span>
                            <button onClick={(e) => toggleFav(key, e)}>
                                <i className={`${favs.includes(key) ? 'fas' : 'far'} fa-star text-yellow-500`}></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveTV;
