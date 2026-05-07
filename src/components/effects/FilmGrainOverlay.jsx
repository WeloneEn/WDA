import React, { useEffect, useRef } from 'react';

/**
 * FilmGrainOverlay — Анимированное пленочное зерно.
 * Использует SVG-фильтр feTurbulence для генерации шума,
 * `mix-blend-mode: overlay` для тонкого наложения, 
 * и CSS-анимацию для «живого» движения зерна.
 *
 * Дизайн-правила:
 * - Прозрачность 2-4% — едва заметное, но придаёт «аналоговость»
 * - Не искажает читаемость текста
 * - Оптимизирован через will-change для GPU-ускорения
 * - pointer-events: none — не блокирует интерактивность
 */
export const FilmGrainOverlay = ({ intensity = 0.035 }) => {
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);
    const lastFrameTimeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // Маленький размер canvas => GPU масштабирует. Экономия памяти.
        const GRAIN_SIZE = 128;
        canvas.width = GRAIN_SIZE;
        canvas.height = GRAIN_SIZE;

        // Целевой FPS для зерна (18fps — как настоящая плёнка)
        const TARGET_FPS = 18;
        const FRAME_INTERVAL = 1000 / TARGET_FPS;

        const drawGrain = (timestamp) => {
            // Тротлинг до 18fps
            const delta = timestamp - lastFrameTimeRef.current;
            if (delta < FRAME_INTERVAL) {
                animFrameRef.current = requestAnimationFrame(drawGrain);
                return;
            }
            lastFrameTimeRef.current = timestamp - (delta % FRAME_INTERVAL);

            const imageData = ctx.createImageData(GRAIN_SIZE, GRAIN_SIZE);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;       // R
                data[i + 1] = value;   // G
                data[i + 2] = value;   // B
                data[i + 3] = 12;      // Alpha — очень прозрачный
            }

            ctx.putImageData(imageData, 0, 0);
            animFrameRef.current = requestAnimationFrame(drawGrain);
        };

        animFrameRef.current = requestAnimationFrame(drawGrain);

        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{
                zIndex: 9999,
                mixBlendMode: 'overlay',
                opacity: intensity,
                imageRendering: 'pixelated',
                willChange: 'contents',
            }}
            aria-hidden="true"
        />
    );
};
