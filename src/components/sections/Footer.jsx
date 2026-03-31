import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { MY_INFO } from '../../data/constants';
import { TextReveal } from '../effects/TextReveal';
import { LineReveal } from '../effects/LineReveal';
import { MagneticElement } from '../effects/MagneticElement';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: 'О нас', href: '#manifesto' },
    { label: 'Проекты', href: '#projects' },
    { label: 'Услуги', href: '#capabilities' },
];

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [copied, setCopied] = useState(false);
    const footerRef = useRef(null);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText(MY_INFO.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { window.location.href = `mailto:${MY_INFO.email}`; }
    };

    useEffect(() => {
        const el = footerRef.current;
        if (!el) return;
        const children = el.querySelectorAll('.footer-reveal');
        gsap.fromTo(children, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        });
        return () => { ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); }); };
    }, []);

    return (
        <>
            {/* Email CTA */}
            <section className="relative z-20 py-20 md:py-32 px-6 md:px-10 bg-[#D1D1C7]">
                <div className="max-w-[1400px] mx-auto">
                    <LineReveal thickness={1} color="rgba(26,26,26,0.12)" className="mb-16 md:mb-24" />
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#1A1A1A]/25 mb-6 text-center">Готовы обсудить проект?</p>
                    <MagneticElement strength={0.1} className="text-center">
                        <div className="cursor-pointer group" onClick={handleCopyEmail}>
                            <TextReveal as="h2" split="words" className="font-editorial text-[7vw] md:text-[5vw] lg:text-[4vw] italic text-[#1A1A1A] group-hover:text-[#C24B31] transition-colors duration-500 select-none" stagger={0.05}>
                                {MY_INFO.email}
                            </TextReveal>
                            <p className={`mt-4 text-center text-xs tracking-[0.2em] uppercase transition-all duration-300 ${copied ? 'text-[#C24B31]' : 'text-[#1A1A1A]/20 group-hover:text-[#1A1A1A]/45'}`}>
                                {copied ? (<><Check size={12} className="inline mr-2" />Скопировано!</>) : (<><Copy size={12} className="inline mr-2" />Нажмите, чтобы скопировать</>)}
                            </p>
                        </div>
                    </MagneticElement>
                </div>
            </section>

            {/* Marquee */}
            <section className="py-10 md:py-14 overflow-hidden bg-[#1A1A1A] text-[#D1D1C7] relative z-20">
                <div className="w-full flex whitespace-nowrap">
                    <div className="flex animate-marquee items-center">
                        {[1, 2, 3, 4].map((i) => (
                            <span key={i} className="font-editorial italic text-[8vw] mx-6 md:mx-10 inline-block opacity-80">
                                Бриф ➝ Концепт ➝ UI/UX ➝ Разработка ➝ Продукт ➝ Заявки
                                <span className="inline-block mx-6 md:mx-10 text-[#D1D1C7]/20">—</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-14 md:pt-20 pb-20 md:pb-28 px-6 md:px-10 relative z-40 bg-[#D1D1C7]" ref={footerRef}>
                <div className="max-w-[1400px] mx-auto">
                    <div className="footer-reveal grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-14 md:mb-20">
                        <div>
                            <MagneticElement strength={0.2}>
                                <a href={`mailto:${MY_INFO.email}`} className="group font-editorial text-3xl sm:text-4xl md:text-5xl italic text-[#1A1A1A] hover:text-[#C24B31] transition-colors duration-300 inline-flex items-center gap-3">
                                    Связаться
                                    <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#C24B31]" />
                                </a>
                            </MagneticElement>
                        </div>
                        <div className="flex flex-col justify-end">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/30 mb-2">Местоположение</span>
                            <span className="font-editorial italic text-xl text-[#1A1A1A]/65">{MY_INFO.location || 'По всему миру'}</span>
                        </div>
                    </div>
                    <LineReveal thickness={1} color="rgba(26,26,26,0.12)" />
                    <div className="pt-10">
                        <div className="footer-reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/25 block mb-4">Навигация</span>
                                <ul className="space-y-2.5">
                                    {NAV_LINKS.map((link, idx) => (
                                        <li key={idx}><a href={link.href} className="text-sm text-[#1A1A1A]/55 hover:text-[#C24B31] transition-colors duration-300">{link.label}</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/25 block mb-4">Соцсети</span>
                                <ul className="space-y-2.5">
                                    {MY_INFO.socials.map((social, idx) => (
                                        <li key={idx}><a href={social.url} target="_blank" rel="noreferrer" className="text-sm text-[#1A1A1A]/55 hover:text-[#C24B31] transition-colors duration-300">{social.name} ↗</a></li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/25 block mb-4">Контакты</span>
                                <ul className="space-y-2.5">
                                    <li><a href={`mailto:${MY_INFO.email}`} className="text-sm text-[#1A1A1A]/55 hover:text-[#C24B31] transition-colors">{MY_INFO.email}</a></li>
                                </ul>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A]/25 block mb-4">Юридическое</span>
                                <ul className="space-y-2.5">
                                    <li className="text-sm text-[#1A1A1A]/25">Политика конфиденциальности</li>
                                </ul>
                            </div>
                        </div>
                        <LineReveal thickness={1} color="rgba(26,26,26,0.06)" />
                        <div className="footer-reveal flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-8">
                            <span className="text-xs text-[#1A1A1A]/20 tracking-wider">{currentYear} © {MY_INFO.name}</span>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-[#1A1A1A]/20 tracking-wider hover:text-[#C24B31] transition-colors cursor-pointer bg-transparent border-none">↑ Наверх</button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
