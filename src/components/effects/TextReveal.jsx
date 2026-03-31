import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * TextReveal — Animates text line-by-line or word-by-word on scroll.
 * Wrap your heading/text in this component.
 * 
 * @param {string} as - HTML tag ('h1', 'h2', 'p', 'span')
 * @param {'lines'|'words'} split - Split mode
 * @param {string} className - CSS classes
 * @param {number} stagger - Delay between items
 * @param {string} start - ScrollTrigger start position
 */
export const TextReveal = ({
    children,
    as: Tag = 'div',
    split = 'words',
    className = '',
    stagger = 0.04,
    start = 'top 85%',
    delay = 0,
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        // Get the text content
        const text = el.textContent;
        if (!text) return;

        if (split === 'words') {
            // Split text into words, preserving HTML structure
            const words = text.split(/\s+/).filter(Boolean);
            el.innerHTML = '';
            words.forEach((word, i) => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.overflow = 'hidden';
                wordSpan.style.verticalAlign = 'top';

                const inner = document.createElement('span');
                inner.textContent = word;
                inner.style.display = 'inline-block';
                inner.style.transform = 'translateY(110%)';
                inner.classList.add('reveal-word');

                wordSpan.appendChild(inner);
                el.appendChild(wordSpan);

                if (i < words.length - 1) {
                    el.appendChild(document.createTextNode(' '));
                }
            });

            const revealWords = el.querySelectorAll('.reveal-word');

            gsap.to(revealWords, {
                y: 0,
                duration: 0.9,
                stagger: stagger,
                ease: 'power3.out',
                delay: delay,
                scrollTrigger: {
                    trigger: el,
                    start: start,
                    toggleActions: 'play none none none',
                },
            });
        } else {
            // Line-by-line: treat direct children or line breaks
            el.style.overflow = 'hidden';
            const originalY = '100%';

            gsap.set(el, { y: originalY, opacity: 0 });
            gsap.to(el, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                delay: delay,
                scrollTrigger: {
                    trigger: el,
                    start: start,
                    toggleActions: 'play none none none',
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === el) st.kill();
            });
        };
    }, [split, stagger, start, delay]);

    return (
        <Tag ref={containerRef} className={className}>
            {children}
        </Tag>
    );
};
