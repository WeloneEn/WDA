import React, { useState, useEffect, useCallback } from 'react';
import { CookieBanner } from '../components/ui/CookieBanner';
import { SmoothScrollProvider } from '../components/effects/SmoothScrollProvider';
import { FloatingContact } from '../components/ui/FloatingContact';
import { VintageCountdown } from '../components/effects/VintageCountdown';
import { FilmGrainOverlay } from '../components/effects/FilmGrainOverlay';

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
    const [showCountdown, setShowCountdown] = useState(false);
    const [projectorFocus, setProjectorFocus] = useState(false);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem('wda_intro_seen');
        if (hasSeenIntro) {
            // Пропускаем прелоадер при повторных визитах
            setIsInitialLoad(false);
            setIntroPhase(4);
            setShowCountdown(false);
        } else {
            setIsInitialLoad(true);
            setShowCountdown(true);
        }
    }, []);

    // Callback: отсчёт завершён → запуск «фокусировки проектора»
    const handleCountdownComplete = useCallback(() => {
        setShowCountdown(false);
        setProjectorFocus(true);
        sessionStorage.setItem('wda_intro_seen', 'true');

        // Фаза 1 → Header появляется
        setIntroPhase(2);

        // Фаза 2 → снимаем блюр, контент появляется
        const t1 = setTimeout(() => {
            setProjectorFocus(false);
            setIntroPhase(3);
        }, 500);

        // Фаза 3 → всё готово
        const t2 = setTimeout(() => {
            setIntroPhase(4);
        }, 1400);

        return () => { clearTimeout(t1); clearTimeout(t2); };
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
            {/* Кинематографический прелоадер — обратный отсчёт */}
            {showCountdown && (
                <VintageCountdown onComplete={handleCountdownComplete} />
            )}

            {/* NO custom cursor — native cursor is better for UX */}

            {/* Smooth scroll + newspaper-drop + paper grain texture */}
            <SmoothScrollProvider>
                <div 
                    className={`paper-grain transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${isInitialLoad && introPhase < 2 ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'}`}
                    style={{
                        /* Эффект «фокусировки проектора» — блюр сходит на нет */
                        filter: projectorFocus ? 'blur(4px) brightness(1.15)' : 'blur(0px) brightness(1)',
                    }}
                >
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

            {/* Пленочное зерно — глобальный overlay */}
            <FilmGrainOverlay intensity={0.035} />

            {/* Floating contact — always accessible */}
            <FloatingContact isVisible={introPhase >= 4} />

            <CookieBanner />
        </>
    );
};
