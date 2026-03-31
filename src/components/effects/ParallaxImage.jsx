import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxImage — Image moves slower/faster than its container on scroll.
 * Creates depth and a tactile, newspaper-like feel.
 * 
 * @param {string} src - Image source
 * @param {string} alt - Image alt text
 * @param {number} speed - Parallax intensity (default 20 = 20% offset)
 * @param {string} className - Additional CSS classes for the container
 */
export const ParallaxImage = ({
    src,
    alt,
    speed = 20,
    className = '',
    imgClassName = '',
    onClick,
    dataCursor,
}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const image = imageRef.current;
        if (!container || !image) return;

        // Set image to be taller than container to allow movement
        gsap.set(image, {
            yPercent: -speed / 2,
            scale: 1.15,
        });

        gsap.to(image, {
            yPercent: speed / 2,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === container) st.kill();
            });
        };
    }, [speed]);

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden ${className}`}
            onClick={onClick}
            data-cursor={dataCursor}
        >
            <img
                ref={imageRef}
                src={src}
                alt={alt}
                className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
            />
        </div>
    );
};
