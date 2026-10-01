import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function PageHeroSection({
    contentMiniBar,
    firstTitle,
    secondTitle,
    watermark = 'DEM',
    buttonText,
    buttonLink = '#',
}) {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Label slide in from left
            gsap.fromTo('[data-hero="label"]',
                { xPercent: -6, opacity: 0 },
                { xPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.1 }
            );

            // H1 — chaque mot monte depuis overflow hidden
            const h1 = sectionRef.current?.querySelector('[data-hero="h1"]');
            if (h1 && h1.textContent.trim()) {
                const words = h1.textContent.trim().split(/\s+/);
                h1.innerHTML = words
                    .map(w =>
                        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
                        `<span class="hero-word" style="display:inline-block;">${w}&nbsp;</span>` +
                        `</span>`
                    ).join('');
                gsap.fromTo(h1.querySelectorAll('.hero-word'),
                    { yPercent: 110 },
                    { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.05, delay: 0.25 }
                );
            }

            // H2 curtain reveal
            const h2 = sectionRef.current?.querySelector('[data-hero="h2"]');
            if (h2 && h2.textContent.trim()) {
                const words = h2.textContent.trim().split(/\s+/);
                h2.innerHTML = words
                    .map(w =>
                        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
                        `<span class="hero-word-2" style="display:inline-block;">${w}&nbsp;</span>` +
                        `</span>`
                    ).join('');
                gsap.fromTo(h2.querySelectorAll('.hero-word-2'),
                    { yPercent: 110, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 1.0, ease: 'expo.out', stagger: 0.03, delay: 0.45 }
                );
            }

            // Ligne décorative se dessine
            gsap.fromTo('[data-hero="line"]',
                { scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 1.2, ease: 'expo.inOut', delay: 0.6 }
            );

            // Bouton fade in
            const btn = sectionRef.current?.querySelector('[data-hero="btn"]');
            if (btn) {
                gsap.fromTo(btn,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out', delay: 0.7 }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20 text-black relative overflow-hidden flex flex-col justify-center border-b border-slate-100"
        >
            {/* Filigrane géant en bg */}
            <div
                className="absolute right-0 top-0 h-full flex items-center pointer-events-none select-none overflow-hidden max-w-[65vw] sm:max-w-none"
                aria-hidden="true"
            >
                <span
                    className="text-[clamp(4.5rem,14vw,18rem)] font-black uppercase font-['DM_Sans',sans-serif] leading-none translate-x-[10%] sm:translate-x-0"
                    style={{ color: 'rgba(0,134,200,0.035)', letterSpacing: '-0.04em' }}
                >
                    {watermark}
                </span>
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">

                {/* Label section */}
                {contentMiniBar && (
                    <div className="mb-3 sm:mb-5">
                        <div className="inline-flex items-center gap-2.5 sm:gap-3 flex-wrap">
                            {/* Ligne décorative */}
                            <div
                                data-hero="line"
                                className="w-7 sm:w-10 h-[2px] bg-[#0086C8] shrink-0"
                            />
                            <span
                                data-hero="label"
                                className="font-['Raleway',sans-serif] uppercase font-bold text-[10.5px] sm:text-xs tracking-[0.14em] sm:tracking-widest text-[#0086C8] break-words"
                            >
                                {contentMiniBar}
                            </span>
                        </div>
                    </div>
                )}

                {/* Titre principal — split word curtain */}
                <h1
                    data-hero="h1"
                    className="font-extrabold text-[28px] sm:text-4xl md:text-6xl lg:text-7xl mb-3 sm:mb-5 md:mb-6 max-w-[850px] leading-[1.12] sm:leading-[1.05] font-['DM_Sans',sans-serif] text-black tracking-tight break-words"
                >
                    {firstTitle}
                </h1>

                {/* Sous-titre — curtain reveal */}
                {secondTitle && (
                    <h2
                        data-hero="h2"
                        className="text-sm sm:text-lg md:text-2xl text-slate-500 max-w-[700px] font-normal font-['Raleway',sans-serif] leading-relaxed"
                    >
                        {secondTitle}
                    </h2>
                )}

                {/* Bouton Optionnel */}
                {buttonText && (
                    <div data-hero="btn" className="mt-8 sm:mt-10">
                        <Link
                            to={buttonLink}
                            className="inline-flex items-center justify-center gap-3 bg-[#021520] hover:bg-[#0086C8] text-white px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300"
                        >
                            <span className='text-white'>
                                {buttonText}
                            </span>

                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
}
