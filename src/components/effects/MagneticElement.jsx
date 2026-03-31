import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * MagneticElement — Element follows cursor with a magnetic pull effect.
 * Used for navigation links, CTA buttons. Miranda-signature effect.
 * 
 * @param {number} strength - Pull strength (0.3 = 30% of cursor offset)
 * @param {string} as - HTML element tag
 */
export const MagneticElement = ({
    children,
    className = '',
    strength = 0.3,
    as: Tag = 'div',
    ...props
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Only on desktop
        if (window.innerWidth < 768) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = el.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = (clientX - centerX) * strength;
            const deltaY = (clientY - centerY) * strength;

            gsap.to(el, {
                x: deltaX,
                y: deltaY,
                duration: 0.5,
                ease: 'power3.out',
            });
        };

        const handleMouseLeave = () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.4)',
            });
        };

        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return (
        <Tag ref={ref} className={className} {...props}>
            {children}
        </Tag>
    );
};
