import React, { useState } from 'react';
import { MY_INFO } from '../../data/constants';

export const FloatingContact = ({ isVisible }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`contact-float ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative">
                {expanded && (
                    <div className="absolute bottom-full right-0 mb-3 bg-[#1A1A1A] text-[#D1D1C7] p-6 min-w-[240px] torn-edge shadow-[4px_4px_0_rgba(194,75,49,1)]"
                        style={{ animation: 'fadeInUp 0.3s ease forwards' }}>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#D1D1C7]/35 block mb-4">Reach Out</span>
                        <a href={`mailto:${MY_INFO.email}`} className="block font-editorial italic text-lg text-[#D1D1C7] hover:text-[#C24B31] transition-colors mb-3 border-b border-[#D1D1C7]/10 pb-3">{MY_INFO.email}</a>
                        {MY_INFO.socials.map((s, i) => (
                            <a key={i} href={s.url} target="_blank" rel="noreferrer" className="block text-xs uppercase tracking-widest text-[#D1D1C7]/60 hover:text-[#C24B31] transition-colors py-1.5">{s.name} ↗</a>
                        ))}
                    </div>
                )}
                <button onClick={() => setExpanded(!expanded)}
                    className="group bg-[#e8e4d9] text-[#1A1A1A] px-5 py-3 md:px-6 md:py-3.5 flex items-center justify-center border-2 border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#e8e4d9] transition-all duration-300 cursor-pointer shadow-[4px_4px_0_rgba(26,26,26,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                    aria-label="Reach Out">
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-bold select-none whitespace-nowrap">
                        {expanded ? 'Close ✕' : 'Contact'}
                    </span>
                </button>
            </div>
            <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
};
