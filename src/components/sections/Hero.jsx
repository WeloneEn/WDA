import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MY_INFO, MY_PROJECTS } from '../../data/constants';
import { ParallaxImage } from '../effects/ParallaxImage';
import { TextReveal } from '../effects/TextReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ introPhase }) => {
    const leftProject = MY_PROJECTS[0];
    const rightProject = MY_PROJECTS[1];
    const brandRef = useRef(null);

    useEffect(() => {
        const el = brandRef.current;
        if (!el) return;

        gsap.fromTo(el, { scale: 0.9, opacity: 0.7 }, {
            scale: 1, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 30%', scrub: 0.5 },
        });

        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); };
    }, []);

    return (
        <section className="relative z-10 w-full flex flex-col overflow-hidden bg-[#D1D1C7]">
            {/* 3-COLUMN NEWSPAPER GRID */}
            <div className={`grid grid-cols-1 md:grid-cols-3 transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-200 ${introPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* LEFT — Project 1 */}
                <div className="hidden md:block px-7 pt-8 pb-10 relative border-r border-[#1A1A1A]/15">
                    <Link to={`/showcase/${leftProject.slug}`} className="group block">
                        <ParallaxImage src={leftProject.image} alt={leftProject.title} speed={15} className="w-full aspect-[4/3] mb-5" imgClassName="project-card-image" />
                        <h3 className="text-sm uppercase tracking-[0.05em] text-[#1A1A1A] mb-2 flex items-center gap-2">
                            {leftProject.title}
                            <span className="inline-block px-2 py-0.5 bg-[#C24B31] text-[#D1D1C7] text-[8px] font-bold uppercase tracking-wider">New</span>
                        </h3>
                        <p className="font-editorial italic text-sm text-[#1A1A1A]/55 leading-relaxed">{leftProject.description}</p>
                    </Link>
                </div>

                {/* CENTER — Editorial heading */}
                <div className="flex flex-col items-center justify-center px-6 md:px-10 py-16 md:py-20 text-center border-r border-[#1A1A1A]/15">
                    <TextReveal as="h2" split="words" className="font-editorial text-3xl md:text-4xl lg:text-[2.8rem] text-[#1A1A1A] leading-[1.2] mb-6 italic" stagger={0.06} start="top 90%" delay={introPhase < 4 ? 1.5 : 0}>
                        Избранные работы последних лет — от идеи до кода.
                    </TextReveal>
                    <p className="font-editorial italic text-sm text-[#1A1A1A]/30 mt-4">
                        <span className="not-italic uppercase text-[10px] tracking-[0.15em] text-[#C24B31]">Совет!</span> Листайте вниз
                    </p>
                </div>

                {/* RIGHT — Project 2 */}
                <div className="hidden md:block px-7 pt-8 pb-10 relative">
                    <Link to={`/showcase/${rightProject.slug}`} className="group block">
                        <ParallaxImage src={rightProject.image} alt={rightProject.title} speed={15} className="w-full aspect-[4/3] mb-5" imgClassName="project-card-image" />
                        <h3 className="text-sm uppercase tracking-[0.05em] text-[#1A1A1A] mb-2 flex items-center gap-2">
                            {rightProject.title}
                            <span className="inline-block px-2 py-0.5 bg-[#C24B31] text-[#D1D1C7] text-[8px] font-bold uppercase tracking-wider">New</span>
                        </h3>
                        <p className="font-editorial italic text-sm text-[#1A1A1A]/55 leading-relaxed">{rightProject.description}</p>
                    </Link>
                </div>
            </div>

            {/* MASSIVE BRAND NAME */}
            <div ref={brandRef} className={`w-full bg-[#1A1A1A] py-10 md:py-16 overflow-hidden transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-500 ${introPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <h1 className="font-editorial text-[20vw] md:text-[18vw] text-[#D1D1C7]/90 leading-[0.85] text-center tracking-[-0.03em] select-none whitespace-nowrap">
                    WELONE
                </h1>
            </div>

            {/* SUBTITLE ROW */}
            <div className={`w-full bg-[#1A1A1A] border-t border-[#D1D1C7]/10 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-700 ${introPhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <span className="font-editorial italic text-lg md:text-2xl text-[#D1D1C7]/50">Digital Atelier</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D1D1C7]/30">Дизайн & Разработка · {new Date().getFullYear()}</span>
            </div>
        </section>
    );
};
