import React, { useEffect, useRef } from 'react';
import { TextReveal } from '../effects/TextReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Principles = () => {
    const sectionRef = useRef(null);
    const principlesData = [
        { num: '01', title: 'Качество', text: 'Пишем так, чтобы другой разработчик мог легко разобраться. Никаких «костылей» — только продуманные решения.' },
        { num: '02', title: 'Внимание к деталям', text: 'Каждая кнопка, каждый отступ, каждая анимация — всё выверено. Интерфейс работает так же хорошо, как и выглядит.' },
        { num: '03', title: 'Честность', text: 'Вы всегда знаете, на каком этапе проект. Понятные сроки, регулярные показы и открытое общение.' },
        { num: '04', title: 'Скорость', text: 'Сайт должен открываться быстро. Мы оптимизируем всё — от изображений до кода.' }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const cards = section.querySelectorAll('.principle-card');
        cards.forEach((card, idx) => {
            gsap.fromTo(card, { y: 80, opacity: 0, rotateX: 8 }, {
                y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power3.out', delay: idx * 0.1,
                scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
            });
        });
        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger && section.contains(st.trigger)) st.kill(); }); };
    }, []);

    return (
        <section className="py-16 md:py-28 px-6 md:px-10 relative z-20" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12 md:mb-20">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/30 block mb-4">Принципы</span>
                    <TextReveal as="h2" split="words" className="font-editorial text-4xl md:text-5xl lg:text-6xl italic text-[#1A1A1A] leading-[1.1]" stagger={0.06}>
                        Как мы работаем.
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
