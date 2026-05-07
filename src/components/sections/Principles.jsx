import React, { useEffect, useRef } from 'react';
import { TextReveal } from '../effects/TextReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Principles = () => {
    const sectionRef = useRef(null);
    const principlesData = [
        { num: '01', title: 'Quality', text: 'We write code so another developer can easily understand it. No shortcuts — only thoughtful, robust solutions.' },
        { num: '02', title: 'Attention to Detail', text: 'Every button, every margin, every animation — meticulously calibrated. The interface works exactly as well as it looks.' },
        { num: '03', title: 'Transparency', text: 'You always know what stage the project is at. Clear deadlines, regular updates, and open communication.' },
        { num: '04', title: 'Speed', text: 'A website must load fast. We optimize everything — from images to the underlying codebase.' }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const createdAnims = [];
        const cards = section.querySelectorAll('.principle-card');
        cards.forEach((card, idx) => {
            const anim = gsap.fromTo(card, { y: 80, opacity: 0, rotateX: 8 }, {
                y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out', delay: idx * 0.1,
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
            });
            createdAnims.push(anim);
        });
        return () => { createdAnims.forEach(a => { a.scrollTrigger?.kill(); a.kill(); }); };
    }, []);

    return (
        <section className="py-16 md:py-28 px-6 md:px-10 relative z-20" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12 md:mb-20">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/30 block mb-4">Principles</span>
                    <TextReveal as="h2" split="words" className="font-editorial text-4xl md:text-5xl lg:text-6xl italic text-[#1A1A1A] leading-[1.1]" stagger={0.06}>
                        How we work.
                    </TextReveal>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A1A]/10">
                    {principlesData.map((item, idx) => (
                        <div key={idx} className="principle-card bg-[#D1D1C7] p-6 sm:p-8 lg:p-12 hover:bg-[#C8C8BD] transition-all duration-[600ms] group cursor-default" style={{ perspective: '800px' }}>
                            <span className="font-editorial italic text-2xl md:text-3xl text-[#1A1A1A]/10 group-hover:text-[#C24B31]/25 transition-colors duration-500 block mb-6">{item.num}</span>
                            <h3 className="text-lg md:text-xl text-[#1A1A1A] mb-3 leading-tight group-hover:translate-x-1 transition-transform duration-500">{item.title}</h3>
                            <p className="text-[#1A1A1A]/40 text-sm leading-[1.8]">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
