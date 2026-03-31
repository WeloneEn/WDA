import React from 'react';
import { MY_INFO } from '../../data/constants';
import { MagneticElement } from '../effects/MagneticElement';

export const Header = ({ isScrolled, introPhase }) => {
    return (
        <header className="w-full z-50 relative bg-[#D1D1C7]">
            {/* Masthead — Miranda style */}
            <div className={`flex items-center justify-between px-6 md:px-10 py-5 md:py-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${introPhase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                {/* Left: Location */}
                <MagneticElement strength={0.2} className="w-[120px] md:w-[180px]">
                    <span className="text-[11px] md:text-xs tracking-[0.05em] text-[#1A1A1A]/50">
                        Россия, Мир
                    </span>
                </MagneticElement>

                {/* Center: Brand */}
                <MagneticElement strength={0.15}>
                    <a href="#" className="font-editorial italic text-xl md:text-2xl text-[#1A1A1A] text-center leading-none select-none hover:text-[#C24B31] transition-colors duration-300">
                        Welone Digital Atelier
                    </a>
                </MagneticElement>

                {/* Right: CTA */}
                <MagneticElement strength={0.25} className="w-[120px] md:w-[180px] flex justify-end">
                    <a 
                        href={`mailto:${MY_INFO.email}`}
                        className="text-[10px] md:text-[11px] uppercase tracking-[0.12em] text-[#1A1A1A]/50 hover:text-[#C24B31] transition-colors duration-300"
                    >
                        Написать нам
                    </a>
                </MagneticElement>
            </div>

            {/* Hairline divider */}
            <div 
                className="mx-0 h-[1px] bg-[#1A1A1A]/20 origin-left transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: introPhase >= 2 ? 'scaleX(1)' : 'scaleX(0)' }}
            />
        </header>
    );
};
