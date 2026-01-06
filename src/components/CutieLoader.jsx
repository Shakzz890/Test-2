// src/components/CutieLoader.jsx
import React, { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export const CutieLoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("Loading...");

    const show = (msg = "Loading...") => {
        setMessage(msg);
        setLoading(true);
    };

    const hide = () => {
        setTimeout(() => setLoading(false), 500); // 500ms fade out delay
    };

    return (
        <LoaderContext.Provider value={{ show, hide }}>
            {children}
            {loading && (
                <div id="preloader" className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500">
                    <div className="w-[50px] h-[50px] border-4 border-[#2f2f2f] border-t-red-700 rounded-full animate-spin mb-4"></div>
                    <p className="text-white/60 text-sm animate-pulse">{message}</p>
                </div>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => useContext(LoaderContext);
