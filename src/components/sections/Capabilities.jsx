import React, { useEffect, useRef } from 'react';
import { TextReveal } from '../effects/TextReveal';
import { LineReveal } from '../effects/LineReveal';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    { id: '01', title: 'Design & Branding', desc: 'We craft a visual identity that inspires trust. Logos, typography, and colors — everything works as a unified system.' },
    { id: '02', title: 'Websites & Stores', desc: 'From sleek landing pages to full-scale e-commerce platforms. Beautiful, fast, and user-friendly on every device.' },
    { id: '03', title: 'Mobile-First', desc: 'More than half of your users are on mobile. We design the mobile experience upfront, not as an afterthought.' },
    { id: '04', title: 'Support & Growth', desc: 'We don’t disappear after launch. We help you scale the product, add new features, and maintain stability.' }
];

export const Capabilities = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const createdAnims = [];
        const rows = section.querySelectorAll('.capability-row');
        rows.forEach((row, idx) => {
            const anim = gsap.fromTo(row, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: idx * 0.08,
                scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' },
            });
            createdAnims.push(anim);
        });
        const numbers = section.querySelectorAll('.service-number');
        numbers.forEach((num) => {
            const anim = gsap.fromTo(num, { scale: 0.5, opacity: 0 }, {
                scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)',
                scrollTrigger: { trigger: num, start: 'top 90%', toggleActions: 'play none none none' },
            });
            createdAnims.push(anim);
        });
        return () => { createdAnims.forEach(a => { a.scrollTrigger?.kill(); a.kill(); }); };
    }, []);

    return (
        <section id="capabilities" className="py-16 md:py-28 px-6 md:px-10 relative z-20" ref={sectionRef}>
            <div className="max-w-[1400px] mx-auto">
                <div className="mb-12 md:mb-20">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/30 block mb-4">What We Do</span>
                    <TextReveal as="h2" split="words" className="font-editorial text-4xl md:text-5xl lg:text-6xl italic text-[#1A1A1A] leading-[1.1]" stagger={0.06}>
                        Our capabilities.
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
