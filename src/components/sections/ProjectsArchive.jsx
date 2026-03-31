import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MY_PROJECTS } from '../../data/constants';
import { TextReveal } from '../effects/TextReveal';
import { LineReveal } from '../effects/LineReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsArchive = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rows = section.querySelectorAll('.archive-row');
        rows.forEach((row, idx) => {
            gsap.fromTo(row, { y: 30, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: idx * 0.06,
                scrollTrigger: { trigger: row, start: 'top 92%', toggleActions: 'play none none none' },
            });
            const img = row.querySelector('img');
            if (img) {
                gsap.fromTo(img, { scale: 1.15 }, {
                    scale: 1,
                    scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
                });
            }
        });
        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger && section.contains(st.trigger)) st.kill(); }); };
    }, []);

    return (
        <section id="archive" className="relative z-20" ref={sectionRef}>
            <div className="px-6 md:px-10"><LineReveal thickness={4} color="#1A1A1A" /></div>
            <div className="px-6 md:px-10 py-8 border-b border-[#1A1A1A]/15">
                <div className="flex items-center justify-between max-w-[1400px] mx-auto">
                    <TextReveal as="h2" split="words" className="font-editorial text-3xl md:text-4xl uppercase text-[#1A1A1A]" stagger={0.06}>Все работы</TextReveal>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/25">{MY_PROJECTS.length} проектов · Архив</span>
                </div>
            </div>
            <div className="max-w-[1400px] mx-auto">
                {MY_PROJECTS.map((project, idx) => (
                    <Link key={project.id} to={`/showcase/${project.slug}`}
                        className="archive-row group grid grid-cols-1 md:grid-cols-12 border-b border-[#1A1A1A]/10 hover:bg-[#1A1A1A]/[0.025] transition-all duration-[600ms]">
                        <div className="md:col-span-1 px-6 md:px-4 py-6 md:py-8 flex items-center border-r border-[#1A1A1A]/8">
                            <span className="font-editorial italic text-2xl md:text-3xl text-[#1A1A1A]/10 group-hover:text-[#C24B31]/35 transition-colors duration-500">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                        <div className="md:col-span-2 px-4 py-4 md:py-6 flex items-center border-r border-[#1A1A1A]/8">
                            <div className="w-full aspect-[3/2] overflow-hidden">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 grayscale group-hover:grayscale-0" />
                            </div>
                        </div>
                        <div className="md:col-span-3 px-6 py-4 md:py-8 flex items-center border-r border-[#1A1A1A]/8">
                            <h3 className="text-base md:text-lg text-[#1A1A1A] group-hover:text-[#C24B31] transition-colors duration-300">{project.title}</h3>
                        </div>
                        <div className="md:col-span-3 px-6 py-4 md:py-8 flex items-center border-r border-[#1A1A1A]/8">
                            <span className="font-editorial italic text-sm text-[#1A1A1A]/40">{project.category}</span>
                        </div>
                        <div className="md:col-span-1 px-4 py-4 md:py-8 flex items-center border-r border-[#1A1A1A]/8">
                            <span className="text-xs text-[#1A1A1A]/20">{project.year}</span>
                        </div>
                        <div className="md:col-span-2 px-6 py-4 md:py-8 flex items-center justify-end">
                            <span className="text-sm text-[#1A1A1A]/15 group-hover:text-[#C24B31] group-hover:translate-x-2 transition-all duration-300">Смотреть →</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
