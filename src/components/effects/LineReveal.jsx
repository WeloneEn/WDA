import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * LineReveal — Horizontal line that draws itself on scroll.
 * Gives tactile newspaper section-divider feel.
 */
export const LineReveal = ({
    className = '',
    direction = 'left',
    thickness = 1,
    color = 'rgba(17, 17, 17, 0.12)',
    duration = 1.2,
    start = 'top 90%',
}) => {
    const lineRef = useRef(null);

    useEffect(() => {
        const el = lineRef.current;
        if (!el) return;

        gsap.set(el, {
            scaleX: 0,
            transformOrigin: direction === 'left' ? 'left center' : direction === 'right' ? 'right center' : 'center center',
        });

        gsap.to(el, {
            scaleX: 1,
            duration: duration,
            ease: 'power3.inOut',
            scrollTrigger: {
                trigger: el,
                start: start,
                toggleActions: 'play none none none',
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [direction, duration, start]);

    return (
        <div
            ref={lineRef}
            className={className}
            style={{
                height: `${thickness}px`,
                backgroundColor: color,
                width: '100%',
                willChange: 'transform',
            }}
        />
    );
};
