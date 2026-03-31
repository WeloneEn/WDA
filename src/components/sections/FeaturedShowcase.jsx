import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MY_PROJECTS } from '../../data/constants';
import { ParallaxImage } from '../effects/ParallaxImage';
import { TextReveal } from '../effects/TextReveal';
import { LineReveal } from '../effects/LineReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedShowcase = () => {
    const featured = MY_PROJECTS.filter(p => p.featured);
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const children = section.querySelectorAll('.showcase-card');
        gsap.fromTo(children, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' },
        });
        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === section) st.kill(); }); };
    }, []);

    return (
        <section id="projects" className="relative z-20" ref={sectionRef}>
            <LineReveal thickness={4} color="#1A1A1A" />

            <div className="grid grid-cols-1 md:grid-cols-3">
                {/* LEFT */}
                <div className="showcase-card px-6 md:px-10 py-14 md:py-20 border-r border-[#1A1A1A]/15">
                    <TextReveal as="h2" split="words" className="font-editorial text-3xl md:text-4xl uppercase text-[#1A1A1A] leading-[1.1] mb-6" stagger={0.06}>
                        Новые проекты
                    </TextReveal>
                    <p className="font-editorial italic text-lg md:text-xl text-[#1A1A1A]/55 leading-[1.6] mb-8">
                        Свежие работы — от дизайна до запуска.
                    </p>
                    <p className="font-editorial italic text-sm text-[#1A1A1A]/30">
                        <span className="not-italic uppercase text-[10px] tracking-[0.15em] text-[#C24B31]">Совет!</span> Нажмите на картинку
                    </p>
                </div>

                {/* CENTER — Featured project */}
                <div className="showcase-card px-6 md:px-10 py-14 md:py-20 border-r border-[#1A1A1A]/15">
                    {featured[0] && (
                        <Link to={`/showcase/${featured[0].slug}`} className="group block">
                            <ParallaxImage src={featured[0].image} alt={featured[0].title} speed={18} className="w-full aspect-[4/3] mb-5" imgClassName="project-card-image" />
                            <h3 className="text-base uppercase tracking-[0.05em] text-[#1A1A1A] mb-2">{featured[0].title}</h3>
                            <p className="font-editorial italic text-sm text-[#1A1A1A]/50 leading-[1.7]">{featured[0].description}</p>
                        </Link>
                    )}
                </div>

                {/* RIGHT — Big statement */}
                <div className="showcase-card px-6 md:px-10 py-14 md:py-20 flex flex-col">
                    <TextReveal as="h3" split="words" className="font-editorial text-[7vw] md:text-[3.5vw] text-[#1A1A1A] leading-[0.95] tracking-[-0.02em] uppercase mb-10" stagger={0.08}>
                        Думаем, Создаём, Запускаем
                    </TextReveal>
                    <div className="mt-auto relative">
                        <span className="font-editorial text-[4em] leading-[0.75] float-left mr-3 mt-1 text-[#1A1A1A] select-none border border-[#1A1A1A]/15 px-2">К</span>
                        <p className="font-editorial italic text-base md:text-lg text-[#1A1A1A]/55 leading-[1.7]">
                            аждый сайт создаётся через глубокое погружение в задачу. Мы проектируем, разрабатываем и запускаем продукты, которые приносят результат.
                        </p>
                    </div>
                </div>
            </div>

            {/* SECOND ROW */}
            {featured[1] && (
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#1A1A1A]/15">
                    <div className="md:col-span-2 px-6 md:px-10 py-10 border-r border-[#1A1A1A]/15">
                        <Link to={`/showcase/${featured[1].slug}`} className="group block">
                            <ParallaxImage src={featured[1].image} alt={featured[1].title} speed={12} className="w-full aspect-[16/9] mb-5" imgClassName="project-card-image" />
                        </Link>
                    </div>
                    <div className="showcase-card px-6 md:px-10 py-10 flex flex-col justify-end">
                        <h3 className="text-base uppercase tracking-[0.05em] text-[#1A1A1A] mb-2">{featured[1].title}</h3>
                        <p className="font-editorial italic text-sm text-[#1A1A1A]/50 leading-[1.7] mb-4">{featured[1].description}</p>
                        <span className="font-editorial italic text-xs text-[#1A1A1A]/25">{featured[1].category} · {featured[1].year}</span>
                    </div>
                </div>
            )}
        </section>
    );
};
