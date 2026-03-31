import React, { useEffect, useRef } from 'react';
import { MY_INFO } from '../../data/constants';
import { TextReveal } from '../effects/TextReveal';
import { LineReveal } from '../effects/LineReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Manifesto = () => {
    const sectionRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const el = rightRef.current;
        if (!el) return;

        gsap.fromTo(el, { y: 60 }, {
            y: -30, ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        });

        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === sectionRef.current) st.kill(); }); };
    }, []);

    return (
        <section id="manifesto" className="relative z-20" ref={sectionRef}>
            <LineReveal thickness={1} color="rgba(26,26,26,0.15)" />
            
            <div className="grid grid-cols-1 md:grid-cols-3">
                {/* LEFT — Drop cap paragraph */}
                <div className="md:col-span-1 px-6 md:px-10 py-14 md:py-20 border-r border-[#1A1A1A]/15">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/30 block mb-8">О студии</span>
                    <div className="relative">
                        <span className="font-editorial text-[4.5em] leading-[0.75] float-left mr-3 mt-1 text-[#1A1A1A] select-none">М</span>
                        <TextReveal as="p" split="lines" className="font-editorial italic text-lg md:text-xl text-[#1A1A1A]/65 leading-[1.7]" start="top 85%">
                            ы не делаем шаблоны. Каждый проект — это ручная работа, где продуманный дизайн встречается с чистой архитектурой кода. Мы создаём сайты и приложения, которые удобны для людей и решают задачи бизнеса.
                        </TextReveal>
                    </div>
                </div>

                {/* RIGHT — BIG display headings */}
                <div className="md:col-span-2 px-6 md:px-10 py-14 md:py-20 flex flex-col justify-center" ref={rightRef}>
                    <TextReveal as="h2" split="words" className="font-editorial text-[8vw] md:text-[5.5vw] text-[#1A1A1A] leading-[1.0] tracking-[-0.02em] uppercase" stagger={0.08} start="top 80%">
                        Дизайн сайтов Разработка По всему миру.
                    </TextReveal>
                </div>
            </div>
        </section>
    );
};
