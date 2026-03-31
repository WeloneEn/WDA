import React, { useState } from 'react';
import { MY_INFO } from '../../data/constants';
import { MagneticElement } from '../effects/MagneticElement';

export const FloatingContact = ({ isVisible }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`contact-float ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <MagneticElement strength={0.15}>
                <div className="relative">
                    {expanded && (
                        <div className="absolute bottom-full right-0 mb-3 bg-[#1A1A1A] text-[#D1D1C7] p-5 min-w-[220px] torn-edge"
                            style={{ animation: 'fadeInUp 0.3s ease forwards' }}>
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#D1D1C7]/35 block mb-3">Связаться</span>
                            <a href={`mailto:${MY_INFO.email}`} className="block font-editorial italic text-base text-[#D1D1C7] hover:text-[#C24B31] transition-colors mb-2">{MY_INFO.email}</a>
                            {MY_INFO.socials.map((s, i) => (
                                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="block text-xs text-[#D1D1C7]/55 hover:text-[#C24B31] transition-colors py-0.5">{s.name} ↗</a>
                            ))}
                        </div>
                    )}
                    <button onClick={() => setExpanded(!expanded)}
                        className="group bg-[#1A1A1A] text-[#D1D1C7] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-500 border-none outline-none cursor-pointer"
                        aria-label="Связаться">
                        <span className={`font-editorial italic text-xl md:text-2xl transition-transform duration-300 select-none ${expanded ? 'rotate-45' : ''}`}>✦</span>
                    </button>
                </div>
            </MagneticElement>
            <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
};
