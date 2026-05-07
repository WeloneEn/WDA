import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

/**
 * VintageCountdown — Кинематографический прелоадер.
 * Показывает классический обратный отсчёт (3..2..1) в стиле
 * киноплёнки 35mm, затем «включает проектор» — сайт обретает
 * фокус через эффект расфокусировки/засветки.
 *
 * Дизайн-правила:
 * - Цвета строго из палитры (#1A1A1A, #D1D1C7, #C24B31)
 * - Премиальная сдержанность: аналоговые эффекты тонкие, не кричащие
 * - Закон Хика: минимум визуального шума, только один фокус внимания
 */
export const VintageCountdown = ({ onComplete }) => {
    const containerRef = useRef(null);
    const numberRef = useRef(null);
    const circleRef = useRef(null);
    const scratchesRef = useRef(null);
    const flashRef = useRef(null);
    const tlRef = useRef(null);
    const [currentNumber, setCurrentNumber] = useState(3);
    const [isVisible, setIsVisible] = useState(true);

    // Генерируем статичные царапины один раз при монтировании
    const scratches = useRef(
        Array.from({ length: 6 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            width: `${0.5 + Math.random() * 1}px`,
            height: `${30 + Math.random() * 70}%`,
            top: `${Math.random() * 30}%`,
            opacity: 0.08 + Math.random() * 0.12,
            animDelay: Math.random() * 0.5,
        }))
    ).current;

    const handleComplete = useCallback(() => {
        setIsVisible(false);
        onComplete?.();
    }, [onComplete]);

    useEffect(() => {
        const container = containerRef.current;
        const numberEl = numberRef.current;
        const circleEl = circleRef.current;
        const scratchesEl = scratchesRef.current;
        const flashEl = flashRef.current;

        if (!container || !numberEl || !circleEl || !flashEl) return;

        const tl = gsap.timeline({
            onComplete: handleComplete,
        });
        tlRef.current = tl;

        // Фаза 0: «Прогрев проектора» — экран мерцает
        tl.fromTo(container, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.3, ease: 'power2.in' }
        );

        // Лёгкое дрожание (gate weave) на протяжении всего отсчёта
        tl.to(container, {
            x: '+=1', y: '+=0.5', duration: 0.08,
            repeat: 30, yoyo: true, ease: 'none',
        }, 0);

        // Царапины мерцают
        if (scratchesEl) {
            tl.fromTo(scratchesEl, 
                { opacity: 0.6 }, 
                { opacity: 0.15, duration: 0.15, repeat: 15, yoyo: true, ease: 'none' }, 
                0
            );
        }

        // Фаза 1: Цифра «3»
        const countdownStep = (num, startTime) => {
            // Появление цифры
            tl.call(() => setCurrentNumber(num), [], startTime);

            // Кольцо вращается (как секундная стрелка на пленке)
            tl.fromTo(circleEl,
                { rotation: -90, strokeDashoffset: 283 },
                { strokeDashoffset: 0, rotation: -90, duration: 0.7, ease: 'power1.inOut' },
                startTime
            );

            // Цифра появляется с лёгким «хлопком»
            tl.fromTo(numberEl,
                { scale: 1.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.15, ease: 'power3.out' },
                startTime
            );

            // Цифра исчезает
            tl.to(numberEl,
                { opacity: 0, scale: 0.85, duration: 0.12, ease: 'power2.in' },
                startTime + 0.7
            );

            // Мерцание фона между цифрами
            tl.to(container,
                { backgroundColor: 'rgba(26,26,26,0.85)', duration: 0.04, yoyo: true, repeat: 1 },
                startTime + 0.75
            );
        };

        countdownStep(3, 0.3);
        countdownStep(2, 1.15);
        countdownStep(1, 2.0);

        // Фаза 2: Вспышка «засветки плёнки» (Film Burn)
        const burnStart = 2.75;

        tl.to(flashEl, {
            opacity: 1, duration: 0.12, ease: 'power2.in',
        }, burnStart);

        // Белая засветка расширяется и гаснет
        tl.to(flashEl, {
            opacity: 0, duration: 0.6, ease: 'power2.out',
            backgroundColor: '#D1D1C7',
        }, burnStart + 0.15);

        // Контейнер прячется
        tl.to(container, {
            opacity: 0, duration: 0.4, ease: 'power2.out',
        }, burnStart + 0.25);

        return () => {
            tl.kill();
        };
    }, [handleComplete]);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: '#1A1A1A' }}
        >
            {/* Виньетка по краям — эффект проектора */}
            <div 
                className="absolute inset-0 pointer-events-none" 
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }}
            />

            {/* Вертикальные царапины на плёнке */}
            <div ref={scratchesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
                {scratches.map((s) => (
                    <div
                        key={s.id}
                        className="absolute"
                        style={{
                            left: s.left,
                            top: s.top,
                            width: s.width,
                            height: s.height,
                            backgroundColor: `rgba(209,209,199,${s.opacity})`,
                        }}
                    />
                ))}
            </div>

            {/* Круг с обратным отсчётом */}
            <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] flex items-center justify-center">
                {/* SVG-круг (кольцо прогресса) */}
                <svg 
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                >
                    {/* Фоновое кольцо */}
                    <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="rgba(209,209,199,0.1)"
                        strokeWidth="1.5"
                    />
                    {/* Анимированное кольцо прогресса */}
                    <circle
                        ref={circleRef}
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="#D1D1C7"
                        strokeWidth="1.5"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        strokeLinecap="round"
                        style={{ transformOrigin: '50% 50%' }}
                    />
                    {/* Перекрестие — классический маркер киноплёнки */}
                    <line x1="50" y1="10" x2="50" y2="20" stroke="rgba(209,209,199,0.15)" strokeWidth="0.5" />
                    <line x1="50" y1="80" x2="50" y2="90" stroke="rgba(209,209,199,0.15)" strokeWidth="0.5" />
                    <line x1="10" y1="50" x2="20" y2="50" stroke="rgba(209,209,199,0.15)" strokeWidth="0.5" />
                    <line x1="80" y1="50" x2="90" y2="50" stroke="rgba(209,209,199,0.15)" strokeWidth="0.5" />
                </svg>

                {/* Цифра */}
                <span
                    ref={numberRef}
                    className="font-editorial text-[4rem] md:text-[5rem] text-[#D1D1C7] leading-none select-none"
                    style={{ opacity: 0 }}
                >
                    {currentNumber}
                </span>
            </div>

            {/* Перфорация 35mm — верх */}
            <div className="absolute top-0 left-0 right-0 h-6 md:h-8 flex items-center justify-between px-2 pointer-events-none overflow-hidden">
                {Array.from({ length: 24 }, (_, i) => (
                    <div key={`top-${i}`} className="w-2 h-3 md:w-2.5 md:h-4 rounded-[1px] bg-[#D1D1C7]/8 shrink-0" />
                ))}
            </div>

            {/* Перфорация 35mm — низ */}
            <div className="absolute bottom-0 left-0 right-0 h-6 md:h-8 flex items-center justify-between px-2 pointer-events-none overflow-hidden">
                {Array.from({ length: 24 }, (_, i) => (
                    <div key={`bot-${i}`} className="w-2 h-3 md:w-2.5 md:h-4 rounded-[1px] bg-[#D1D1C7]/8 shrink-0" />
                ))}
            </div>

            {/* Засветка / Film Burn */}
            <div
                ref={flashRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    opacity: 0,
                    background: 'radial-gradient(ellipse at center, rgba(194,75,49,0.4) 0%, rgba(209,209,199,0.9) 60%, #D1D1C7 100%)',
                }}
            />
        </div>
    );
};
