import React, { useState, useEffect } from 'react';

const COOKIE_KEY = 'wda_cookie_consent';

export const CookieBanner = () => {
    const [visible, setVisible] = useState(false);
    const [crumpling, setCrumpling] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem(COOKIE_KEY);
        if (!consent) {
            // Delay so it appears after the newspaper-drop animation
            const timer = setTimeout(() => setVisible(true), 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const dismiss = (value) => {
        localStorage.setItem(COOKIE_KEY, value);
        setCrumpling(true);
        // Remove from DOM after crumple animation
        setTimeout(() => setVisible(false), 900);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-[180] transition-all duration-700 
            ${crumpling ? 'crumple-out' : 'translate-y-0 opacity-100'}
            ${!crumpling && visible ? '' : ''}`}
            role="alert"
            aria-live="polite"
            style={{
                transformOrigin: 'center bottom'
            }}
        >
            {/* Газетный купон с неровными краями */}
            <div className="torn-edge bg-[#e8e4d9] border-2 border-dashed border-[#111111]/30 p-6 md:p-7 shadow-[4px_4px_0_rgba(0,0,0,0.08)] relative">
                
                {/* Ретро-штамп */}
                <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full border-2 border-[#111111]/40 flex items-center justify-center bg-[#e8e4d9] rotate-[-12deg]">
                    <span className="text-[6px] font-sans font-black uppercase tracking-wider text-[#111111]/60 text-center leading-[1.1]">
                        {new Date().getFullYear()}<br/>INFO
                    </span>
                </div>

                {/* Заголовок в газетном стиле */}
                <p className="font-editorial text-base md:text-lg italic text-[#111111] mb-1 leading-tight">
                    Персональные данные
                </p>
                <div className="w-full h-[1px] bg-[#111111]/20 mb-3"></div>

                <p className="text-[11px] text-[#111111]/70 leading-relaxed mb-5 font-sans">
                    Мы используем файлы cookie для улучшения работы сайта в соответствии с 152-ФЗ.{' '}
                    <a href="/privacy-policy" className="text-[#111111] underline underline-offset-2 decoration-[#111111]/30 hover:decoration-[#111111] transition-all">
                        Политика конфиденциальности
                    </a>
                </p>

                {/* Кнопки — стилизованы под газетные рубрики */}
                <div className="flex gap-3">
                    <button
                        onClick={() => dismiss('accepted')}
                        className="flex-1 py-2.5 bg-[#111111] text-[#f0ece1] text-[10px] font-sans font-bold tracking-[0.15em] uppercase border-2 border-[#111111] hover:bg-transparent hover:text-[#111111] transition-all duration-300 cursor-pointer"
                    >
                        Принять ✓
                    </button>
                    <button
                        onClick={() => dismiss('rejected')}
                        className="flex-1 py-2.5 bg-transparent border-2 border-[#111111]/30 text-[#111111]/60 text-[10px] font-sans font-bold tracking-[0.15em] uppercase hover:border-[#111111] hover:text-[#111111] transition-all duration-300 cursor-pointer"
                    >
                        Отклонить
                    </button>
                </div>

                {/* Декоративная пунктирная линия "вырежи купон" */}
                <div className="absolute -bottom-1 left-4 right-4 border-b border-dashed border-[#111111]/15"></div>
            </div>
        </div>
    );
};
