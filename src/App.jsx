import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CutieLoaderProvider } from './components/CutieLoader';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Watch from './pages/Watch';
import Details from './pages/Details';
import LiveTV from './pages/LiveTV';
import Watchlist from './pages/Watchlist';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <CutieLoaderProvider>
            <BrowserRouter>
                <div className="app-container">
                    <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
                    <Navbar toggleSidebar={toggleSidebar} />
                    
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/live" element={<LiveTV />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/tv-shows" element={<TVShows />} />
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
