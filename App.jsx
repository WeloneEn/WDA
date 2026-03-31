import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './src/pages/Home';
import { ProjectDetails } from './src/pages/ProjectDetails';

export default function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <div className="min-h-screen bg-[#D1D1C7] text-[#1A1A1A] overflow-x-hidden">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/showcase/:slug" element={<ProjectDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}