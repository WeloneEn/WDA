import React, { useState, useEffect } from 'react';
import { CookieBanner } from '../components/ui/CookieBanner';
import { SmoothScrollProvider } from '../components/effects/SmoothScrollProvider';
import { FloatingContact } from '../components/ui/FloatingContact';

// Sections
import { Header } from '../components/sections/Header';
import { Hero } from '../components/sections/Hero';
import { Manifesto } from '../components/sections/Manifesto';
import { FeaturedShowcase } from '../components/sections/FeaturedShowcase';
import { Capabilities } from '../components/sections/Capabilities';
import { ProjectsArchive } from '../components/sections/ProjectsArchive';
import { Principles } from '../components/sections/Principles';
import { Footer } from '../components/sections/Footer';

export const Home = () => {
    const [introPhase, setIntroPhase] = useState(0);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('wda_intro_seen');
        if (hasSeenIntro) {
            setIsInitialLoad(false);
            setIntroPhase(4);
        } else {
            setIsInitialLoad(true);
            const t1 = setTimeout(() => setIntroPhase(1), 100);
            const t2 = setTimeout(() => setIntroPhase(2), 600);
            const t3 = setTimeout(() => setIntroPhase(3), 1200);
            const t4 = setTimeout(() => {
                setIntroPhase(4);
                sessionStorage.setItem('wda_intro_seen', 'true');
            }, 2200);
            return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (introPhase < 4) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [introPhase]);

    return (
        <>
            {/* NO custom cursor — native cursor is better for UX */}

            {/* Overlay — тёплый бумажный, гаснет при «падении» */}
            <div className={`fixed inset-0 z-[90] bg-[#D1D1C7] transition-opacity duration-[800ms] ${introPhase >= 2 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}></div>

            {/* Smooth scroll + newspaper-drop + paper grain texture */}
            <SmoothScrollProvider>
                <div className={`paper-grain ${isInitialLoad && introPhase >= 2 ? 'newspaper-drop' : ''}`}>
                    <Header isScrolled={isScrolled} introPhase={introPhase} />
                    <Hero introPhase={introPhase} />
                    <Manifesto />
                    <FeaturedShowcase />
                    <Capabilities />
                    <Principles />
                    <ProjectsArchive />
                    <Footer />
                </div>
            </SmoothScrollProvider>

            {/* Floating contact — always accessible */}
            <FloatingContact isVisible={introPhase >= 4} />

            <CookieBanner />
        </>
    );
};
