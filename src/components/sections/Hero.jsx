import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MY_INFO, MY_PROJECTS } from '../../data/constants';
import { ParallaxImage } from '../effects/ParallaxImage';
import { MiniNewspaper } from '../ui/MiniNewspaper';
import { TextReveal } from '../effects/TextReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = ({ introPhase }) => {
    const leftProject = MY_PROJECTS[0];
    const rightProject = MY_PROJECTS[1];
    const brandRef = useRef(null);
    const lettersRef = useRef([]);
    const stampRef = useRef(null);
    const subtitleRef = useRef(null);
    const mouseRafRef = useRef(null);

    const WELONE_LETTERS = ['W', 'E', 'L', 'O', 'N', 'E'];

    /* ── Mouse parallax on letters ── */
    const handleMouseMove = useCallback((e) => {
        if (!stampRef.current) return;
        if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current);

        mouseRafRef.current = requestAnimationFrame(() => {
            const rect = stampRef.current.getBoundingClientRect();
            const mx = (e.clientX - rect.left) / rect.width - 0.5;
            const my = (e.clientY - rect.top) / rect.height - 0.5;

            lettersRef.current.filter(Boolean).forEach((letter, i) => {
                const depth = 1 + (i % 3) * 0.4;
                gsap.to(letter, {
                    x: mx * 10 * depth,
                    y: my * 5 * depth,
                    duration: 0.9,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            });
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        lettersRef.current.filter(Boolean).forEach((letter) => {
            gsap.to(letter, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
        });
    }, []);

    /* ── Scroll-based scale for brand container ── */
    useEffect(() => {
        const el = brandRef.current;
        if (!el) return;

        const anim = gsap.fromTo(el, { scale: 0.92, opacity: 0.6 }, {
            scale: 1, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 40%', scrub: 0.5 },
        });

        return () => { anim.scrollTrigger?.kill(); anim.kill(); };
    }, []);

    /* ── Letter-by-letter reveal + subtitle ── */
    useEffect(() => {
        const letters = lettersRef.current.filter(Boolean);
        if (letters.length === 0) return;

        gsap.set(letters, { y: '110%', opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stampRef.current,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
        });

        tl.to(letters, {
            y: '0%',
            opacity: 1,
            duration: 1.1,
            stagger: 0.07,
            ease: 'power4.out',
        });

        if (subtitleRef.current) {
            tl.fromTo(subtitleRef.current,
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
                '-=0.5'
            );
        }

        return () => { tl.kill(); };
    }, []);

    /* ── Cleanup RAF on unmount ── */
    useEffect(() => {
        return () => { if (mouseRafRef.current) cancelAnimationFrame(mouseRafRef.current); };
    }, []);

    return (
        <section className="relative z-10 w-full flex flex-col overflow-hidden bg-[#D1D1C7]">
            {/* 3-COLUMN NEWSPAPER GRID */}
            <div className={`grid grid-cols-1 md:grid-cols-3 transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-200 ${introPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* LEFT — Project 1 */}
                <div className="hidden md:block px-7 pt-8 pb-10 relative border-r border-[#1A1A1A]/15">
                    <Link to={`/showcase/${leftProject.slug}`} className="group block">
                        <ParallaxImage src={leftProject.image} alt={leftProject.title} speed={15} className="cinematic-hover w-full aspect-[4/3] mb-5" imgClassName="project-card-image" />
                        <h3 className="text-sm uppercase tracking-[0.05em] text-[#1A1A1A] mb-2 flex items-center gap-2">
                            {leftProject.title}
                            <span className="inline-block px-2 py-0.5 bg-[#C24B31] text-[#D1D1C7] text-[8px] font-bold uppercase tracking-wider">New</span>
                        </h3>
                        <p className="font-editorial italic text-base md:text-lg text-[#1A1A1A]/55 leading-relaxed">{leftProject.description}</p>
                    </Link>
                </div>

                {/* CENTER — Editor's Mini Newspaper */}
                <div className="newspaper-bound flex flex-col items-center justify-center px-6 md:px-10 py-16 md:py-20 text-center border-r border-[#1A1A1A]/15 relative">
                    <MiniNewspaper />
                </div>

                {/* RIGHT — Project 2 */}
                <div className="hidden md:block px-7 pt-8 pb-10 relative">
                    <Link to={`/showcase/${rightProject.slug}`} className="group block">
                        <ParallaxImage src={rightProject.image} alt={rightProject.title} speed={15} className="cinematic-hover w-full aspect-[4/3] mb-5" imgClassName="project-card-image" />
                        <h3 className="text-sm uppercase tracking-[0.05em] text-[#1A1A1A] mb-2 flex items-center gap-2">
                            {rightProject.title}
                            <span className="inline-block px-2 py-0.5 bg-[#C24B31] text-[#D1D1C7] text-[8px] font-bold uppercase tracking-wider">New</span>
                        </h3>
                        <p className="font-editorial italic text-base md:text-lg text-[#1A1A1A]/55 leading-relaxed">{rightProject.description}</p>
                    </Link>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                MASSIVE BRAND BLOCK — MIRANDA EDITORIAL STYLE (ENHANCED)
                Edge-to-edge typography, letter reveal, mouse parallax
               ═══════════════════════════════════════════════════════ */}
            <div
                className={`w-full px-3 md:px-5 pb-8 transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-500 ${introPhase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                ref={brandRef}
            >
                <div
                    ref={stampRef}
                    className="w-full bg-[#1A1A1A] flex flex-col outline outline-1 outline-[#1A1A1A] outline-offset-[6px] relative overflow-hidden brand-stamp cursor-default"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Corner ornaments — editorial framing */}
                    <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#D1D1C7]/8 pointer-events-none" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#D1D1C7]/8 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#D1D1C7]/8 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#D1D1C7]/8 pointer-events-none" />

                    {/* WELONE — Dramatic Miranda Typography */}
                    <div className="flex items-center justify-center w-full relative">
                        <h1
                            className="font-editorial text-[#D1D1C7] select-none whitespace-nowrap uppercase flex justify-center items-center"
                            style={{
                                fontSize: 'clamp(5.5rem, 22vw, 34rem)',
                                lineHeight: '0.75',
                                letterSpacing: '-0.06em',
                                transform: 'scaleY(2.3) scaleX(0.8)',
                                transformOrigin: 'center',
                                paddingTop: '0.6em',
                                paddingBottom: '0.55em',
                            }}
                        >
                            {WELONE_LETTERS.map((letter, i) => (
                                <span
                                    key={i}
                                    ref={el => lettersRef.current[i] = el}
                                    className="inline-block brand-letter"
                                    style={{
                                        marginRight: i < WELONE_LETTERS.length - 1 ? '-0.04em' : '0',
                                        display: 'inline-block',
                                        willChange: 'transform',
                                    }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </h1>
                    </div>

                    {/* SUBTITLE — Integrated footer of the stamp */}
                    <div
                        ref={subtitleRef}
                        className="w-full border-t border-[#D1D1C7]/12 px-5 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto"
                    >
                        <span className="font-editorial italic text-2xl md:text-4xl text-[#D1D1C7] tracking-[0.02em]">Digital Atelier</span>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#D1D1C7]/35 font-sans">Est. 2024</span>
                            <span className="w-[1px] h-3 bg-[#D1D1C7]/12 hidden md:block" />
                            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#D1D1C7]/35 font-sans">Design & Development</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
