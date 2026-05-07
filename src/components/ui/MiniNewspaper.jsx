import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { NEWSPAPER_CONTENT } from '../../data/newspaperContent';

/**
 * InteractiveNewspaper — Сложенная газета "Atelier Times"
 * 
 * Closed: Лежит в Hero под лёгким углом, показывает «дразнящие обрывки» (Зейгарник).
 * Hover: Микро-подъём + призыв "Unfold the story".
 * Expanded: Полноэкранный overlay с газетным разворотом (швейцарская типографика).
 * 
 * Психология:
 *   - Zeigarnik: Обрезанный заголовок → мозг хочет «завершить».
 *   - Endowment: Физическое усилие клика → ценность контента выше.
 *   - Scarcity:  «Edition 1 of 1» → эксклюзив.
 */
export const MiniNewspaper = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const cardRef = useRef(null);
    const overlayRef = useRef(null);
    const contentRef = useRef(null);

    // ═══ OPEN ═══
    const handleOpen = useCallback(() => {
        if (isAnimating || isExpanded) return;
        setIsAnimating(true);
        setIsExpanded(true);
    }, [isAnimating, isExpanded]);

    // ═══ CLOSE ═══
    const handleClose = useCallback(() => {
        if (isAnimating || !isExpanded) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsExpanded(false);
                setIsAnimating(false);
            }
        });

        tl.to(contentRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.35,
            ease: 'power2.in',
        });
        tl.to(overlayRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
        }, '-=0.15');
    }, [isAnimating, isExpanded]);

    // ═══ ANIMATE IN + SCROLL ISOLATION ═══
    useEffect(() => {
        if (!isExpanded || !overlayRef.current || !contentRef.current) return;

        const overlay = overlayRef.current;

        // 1. Freeze Lenis smooth scroll engine
        window.__lenis?.stop();

        // 2. Block wheel events from reaching Lenis's handler on `window`.
        //    Lenis uses addEventListener('wheel', ..., { passive: false }) on window
        //    and calls event.preventDefault() even when stopped.
        //    stopPropagation() prevents the event from bubbling to window,
        //    so the browser handles native scroll inside the overlay instead.
        const blockLenisWheel = (e) => {
            e.stopPropagation();
        };
        overlay.addEventListener('wheel', blockLenisWheel, { passive: true });
        overlay.addEventListener('touchmove', blockLenisWheel, { passive: true });

        // 3. GSAP entrance animation
        gsap.set(overlay, { opacity: 0 });
        gsap.set(contentRef.current, { opacity: 0, y: 60, rotateX: 8 });

        const tl = gsap.timeline({
            onComplete: () => setIsAnimating(false),
        });

        tl.to(overlay, {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
        });
        tl.to(contentRef.current, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.2');

        // Cleanup
        return () => {
            overlay.removeEventListener('wheel', blockLenisWheel);
            overlay.removeEventListener('touchmove', blockLenisWheel);
            window.__lenis?.start();
        };
    }, [isExpanded]);

    // ═══ ESC key ═══
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape' && isExpanded) handleClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isExpanded, handleClose]);

    // ═══ CARD HOVER ANIMATION ═══
    const handleMouseEnter = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            y: -6,
            rotate: 0,
            boxShadow: '0 20px 50px rgba(26,26,26,0.15), 0 8px 20px rgba(26,26,26,0.08)',
            duration: 0.5,
            ease: 'power3.out',
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            y: 0,
            rotate: -1.5,
            boxShadow: '0 4px 16px rgba(26,26,26,0.06)',
            duration: 0.6,
            ease: 'power3.out',
        });
    };

    return (
        <>
            {/* ═══════════════════════════════════
                CLOSED STATE — Сложенная газета
                ═══════════════════════════════════ */}
            <div
                ref={cardRef}
                onClick={handleOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group w-full max-w-[340px] md:max-w-[380px] bg-[#e8e4d9] border border-[#1A1A1A]/20 cursor-pointer transform -rotate-[1.5deg] transition-[border-color] duration-300 hover:border-[#1A1A1A]/40 relative select-none"
                style={{ 
                    boxShadow: '0 4px 16px rgba(26,26,26,0.06)',
                    perspective: '800px',
                }}
            >
                {/* Fold shadow — имитация сгиба */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#1A1A1A]/8 to-transparent pointer-events-none z-10" />

                {/* Header */}
                <div className="px-5 pt-4 pb-2 border-b border-[#1A1A1A]/15">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[7px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/35">{NEWSPAPER_CONTENT.issue}</span>
                        <span className="text-[7px] font-sans uppercase tracking-[0.2em] text-[#1A1A1A]/35">{NEWSPAPER_CONTENT.date}</span>
                    </div>
                    <div className="text-center border-t border-b border-[#1A1A1A]/10 py-2">
                        <span className="font-editorial text-xl md:text-2xl italic text-[#1A1A1A] leading-none">Atelier Times</span>
                    </div>
                    <div className="flex justify-between items-center mt-1.5">
                        <span className="text-[6px] font-sans uppercase tracking-[0.25em] text-[#C24B31]/60">Archival Record</span>
                        <span className="text-[6px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/25">Edition 1 of 1</span>
                    </div>
                </div>

                {/* Teaser content — «обрывки» (Зейгарник) */}
                <div className="px-5 py-4">
                    <h3 className="font-editorial text-lg md:text-xl leading-[1.1] text-[#1A1A1A] mb-2 overflow-hidden" style={{ maxHeight: '2.4em' }}>
                        {NEWSPAPER_CONTENT.headline}
                    </h3>
                    <p className="text-[9px] font-sans leading-[1.6] text-[#1A1A1A]/40 overflow-hidden" style={{ maxHeight: '2.8em' }}>
                        {NEWSPAPER_CONTENT.subheadline}
                    </p>
                    {/* Градиент обрезки — мозг дорисовывает продолжение */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#e8e4d9] to-transparent pointer-events-none" />
                </div>

                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#e8e4d9]/60 backdrop-blur-[1px] z-20">
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#1A1A1A]/70 border border-[#1A1A1A]/20 px-4 py-2">
                        Unfold the story
                    </span>
                </div>
            </div>

            {/* ═══════════════════════════════════
                EXPANDED STATE — Полноэкранный разворот (React Portal)
                Архитектура: overlay = scrollable container,
                газета = обычный блок внутри. Скролл колёсиком
                работает в ЛЮБОЙ точке экрана (Swiss Watch Rule #3).
                ═══════════════════════════════════ */}
            {isExpanded && createPortal(
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[99999] overflow-y-auto overflow-x-hidden"
                    onClick={(e) => { if (e.target === e.currentTarget || e.target.dataset.backdrop) handleClose(); }}
                    style={{ overscrollBehavior: 'contain' }}
                >
                    {/* Backdrop — кликабельный для закрытия */}
                    <div data-backdrop="true" className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-md" />
                    <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%)' }} />

                    {/* Close button — Elegant Pill (fixed, всегда видна) */}
                    <button
                        onClick={handleClose}
                        className="group fixed top-6 right-6 md:top-10 md:right-10 z-[100000] flex items-center gap-2 text-[#D1D1C7]/60 hover:text-[#D1D1C7] transition-all duration-300 cursor-pointer bg-transparent border-none p-3"
                        aria-label="Close newspaper"
                    >
                        <span className="text-[10px] uppercase tracking-widest border border-[#D1D1C7]/20 px-3 py-1.5 rounded-full group-hover:border-[#D1D1C7]/50 transition-colors">Close</span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <line x1="6" y1="6" x2="18" y2="18" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                        </svg>
                    </button>

                    {/* Newspaper — обычный блок, скроллится вместе с overlay */}
                    <div className="relative z-10 flex justify-center py-[6vh] md:py-[8vh] min-h-full">
                        <div
                            ref={contentRef}
                            lang="en"
                            className="relative w-[94vw] max-w-[960px] bg-[#e8e4d9] mx-auto border border-[#1A1A1A]/10 shadow-[0_40px_100px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.05)] self-start"
                            style={{ transformOrigin: 'center 15%' }}
                        >
                            {/* ——— NEWSPAPER HEADER ——— */}
                            <div className="px-6 md:px-12 pt-10 md:pt-14 pb-4">
                                <div className="flex justify-between items-center mb-4 border-b border-[#1A1A1A]/20 pb-2">
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/40">{NEWSPAPER_CONTENT.issue}</span>
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#C24B31]/70 font-bold">Archival Record</span>
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#1A1A1A]/40">Edition 1 of 1</span>
                                </div>
                                <div className="text-center border-t-[4px] border-b-[1px] border-[#1A1A1A] py-6 mb-4">
                                    <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl italic text-[#1A1A1A] leading-[0.8] tracking-[-0.02em]">Atelier Times</h2>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#1A1A1A]/20 pb-4">
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50">{NEWSPAPER_CONTENT.date}</span>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50">Welone Digital Atelier, Worldwide</span>
                                </div>
                            </div>

                            {/* ——— HEADLINE ——— */}
                            <div className="px-6 md:px-12 py-8 md:py-10 border-b-2 border-[#1A1A1A]">
                                <h3 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[0.95] tracking-[-0.02em] mb-6 block w-full text-center">
                                    {NEWSPAPER_CONTENT.headline}
                                </h3>
                                <p className="font-editorial italic text-xl md:text-2xl text-[#1A1A1A]/60 leading-[1.6] max-w-[700px] mx-auto text-center">
                                    {NEWSPAPER_CONTENT.subheadline}
                                </p>
                            </div>

                            {/* ——— ARTICLES GRID ——— */}
                            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/20 px-6 md:px-12 py-8 md:py-12 bg-[#e8e4d9]/40">
                                {NEWSPAPER_CONTENT.articles.map((article, idx) => (
                                    <article key={idx} className="md:px-6 py-8 md:py-0 first:md:pl-0 last:md:pr-0">
                                        <h4 className="font-sans font-bold text-[11px] uppercase tracking-[0.15em] text-[#1A1A1A] mb-5 pb-3 border-b border-[#1A1A1A]/20">
                                            {article.title}
                                        </h4>
                                        <p className="text-[13px] md:text-[14px] font-sans leading-[1.8] text-[#1A1A1A]/85 text-justify hyphens-auto
                                                        first-letter:font-editorial first-letter:text-5xl first-letter:leading-[0.7] first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-[#1A1A1A]">
                                            {article.content}
                                        </p>
                                    </article>
                                ))}
                            </div>

                            {/* ——— FOOTER LINE ——— */}
                            <div className="px-6 md:px-12 py-5 border-t-[3px] border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center bg-[#1A1A1A] text-[#D1D1C7]">
                                <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.3em] opacity-50 text-center mb-2 sm:mb-0">
                                    Strictly Confidential — Internal Circulation Only
                                </span>
                                <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-[0.3em] opacity-40">
                                    Page 1 / 1
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            , document.body)}
        </>
    );
};
