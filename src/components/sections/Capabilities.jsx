import React, { useEffect, useRef } from 'react';
import { TextReveal } from '../effects/TextReveal';
import { LineReveal } from '../effects/LineReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    { id: '01', title: 'Дизайн и брендинг', desc: 'Создаём визуальный образ, которому хочется доверять. Логотип, шрифты, цвета — всё работает как единая система.' },
    { id: '02', title: 'Сайты и магазины', desc: 'От лаконичных визиток до полноценных интернет-магазинов. Красиво, быстро и удобно на любом устройстве.' },
    { id: '03', title: 'Мобильная версия', desc: 'Больше половины людей заходят с телефона. Мы проектируем мобильную версию не «потом», а в первую очередь.' },
    { id: '04', title: 'Поддержка и развитие', desc: 'После запуска мы не пропадаем. Помогаем развивать продукт, добавлять новые функции и следить за стабильностью.' }
];

export const Capabilities = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rows = section.querySelectorAll('.capability-row');
        rows.forEach((row, idx) => {
            gsap.fromTo(row, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: idx * 0.08,
                scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' },
            });
        });
        const numbers = section.querySelectorAll('.service-number');
        numbers.forEach((num) => {
            gsap.fromTo(num, { scale: 0.5, opacity: 0 }, {
                scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)',
                scrollTrigger: { trigger: num, start: 'top 90%', toggleActions: 'play none none none' },
            });
        });
        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger && section.contains(st.trigger)) st.kill(); }); };
    }, []);

    return (
        <section id="capabilities" className="py-16 md:py-28 px-6 md:px-10 relative z-20" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12 md:mb-20">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/30 block mb-4">Что мы делаем</span>
                    <TextReveal as="h2" split="words" className="font-editorial text-4xl md:text-5xl lg:text-6xl italic text-[#1A1A1A] leading-[1.1]" stagger={0.06}>
                        Наши возможности.
                    </TextReveal>
                </div>
                <LineReveal thickness={1} color="rgba(26,26,26,0.15)" />
                <div className="flex flex-col">
                    {SERVICES.map((service, idx) => (
                        <div key={idx} className="capability-row group border-b border-[#1A1A1A]/10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-6 hover:bg-[#1A1A1A]/[0.02] transition-all duration-[600ms] cursor-default">
                            <div className="flex items-center gap-6 md:gap-10 md:col-span-7">
                                <span className="service-number font-editorial italic text-3xl md:text-5xl text-[#1A1A1A]/10 group-hover:text-[#C24B31]/30 transition-colors duration-500 shrink-0">{service.id}</span>
                                <h3 className="text-lg md:text-2xl tracking-tight text-[#1A1A1A] group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
                            </div>
                            <div className="md:col-span-5">
                                <p className="text-[#1A1A1A]/45 text-sm md:text-base leading-[1.7] max-w-md">{service.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
