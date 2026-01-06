// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CutieLoaderProvider } from './components/CutieLoader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Details from './pages/Details';
import LiveTV from './pages/LiveTV';
import Watchlist from './pages/Watchlist';

const App = () => {
    return (
        <CutieLoaderProvider>
            <BrowserRouter>
                <div className="bg-[#141414] text-white min-h-screen font-sans selection:bg-red-700 selection:text-white">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/live" element={<LiveTV />} />
                        <Route path="/movies" element={<Navigate to="/" />} /> {/* Placeholder for now */}
                        <Route path="/tv-shows" element={<Navigate to="/" />} />
                        <Route path="/watchlist" element={<Watchlist />} />
                        <Route path="/details" element={<Details />} />
                        <Route path="/watch" element={<Watch />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </CutieLoaderProvider>
    );
};

export default App;
