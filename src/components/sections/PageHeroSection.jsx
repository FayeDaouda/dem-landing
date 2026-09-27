import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageHeroSection({
    contentMiniBar,
    firstTitle,
    secondTitle,
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
            const h1 = sectionRef.current.querySelector('[data-hero="h1"]');
            if (h1) {
                const words = h1.textContent.trim().split(' ');
                h1.innerHTML = words
                    .map(w =>
                        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
                        `<span class="hero-word" style="display:inline-block;">${w}&nbsp;</span>` +
                        `</span>`
                    ).join('');
                gsap.fromTo(h1.querySelectorAll('.hero-word'),
                    { yPercent: 110 },
                    { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06, delay: 0.25 }
                );
            }

            // H2 curtain reveal
            const h2 = sectionRef.current.querySelector('[data-hero="h2"]');
            if (h2) {
                const words = h2.textContent.trim().split(' ');
                h2.innerHTML = words
                    .map(w =>
                        `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
                        `<span class="hero-word-2" style="display:inline-block;">${w}&nbsp;</span>` +
                        `</span>`
                    ).join('');
                gsap.fromTo(h2.querySelectorAll('.hero-word-2'),
                    { yPercent: 110, opacity: 0 },
                    { yPercent: 0, opacity: 1, duration: 1.0, ease: 'expo.out', stagger: 0.04, delay: 0.55 }
                );
            }

            // Ligne décorative se dessine
            gsap.fromTo('[data-hero="line"]',
                { scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 1.2, ease: 'expo.inOut', delay: 0.6 }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-white pt-32 min-h-[60vh] text-black relative overflow-hidden">

            {/* Filigrane géant en bg */}
            <div
                className="absolute right-0 top-0 h-full flex items-center pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
            >
                <span
                    className="text-[clamp(6rem,18vw,20rem)] font-black uppercase font-['DM_Sans',sans-serif] leading-none"
                    style={{ color: 'rgba(0,134,200,0.04)', letterSpacing: '-0.04em' }}
                >
                    PRO
                </span>
            </div>

            <div className="mx-6 lg:mx-12 relative z-10">
                <div className="w-full px-4 sm:px-6 lg:px-8">

                    {/* Label section */}
                    <div className="mt-4 mb-6">
                        <div className="inline-flex items-center gap-3">
                            {/* Ligne décorative */}
                            <div
                                data-hero="line"
                                className="w-10 h-[2px] bg-[#0086C8]"
                            />
                            <span
                                data-hero="label"
                                className="font-['Raleway',sans-serif] uppercase font-bold text-xs tracking-widest text-[#0086C8]"
                            >
                                {contentMiniBar}
                            </span>
                        </div>
                    </div>

                    {/* Titre principal — split word curtain */}
                    <h1
                        data-hero="h1"
                        className="font-extrabold text-4xl sm:text-5xl md:text-7xl mb-8 max-w-[800px] leading-[1.05] font-['DM_Sans',sans-serif] text-black tracking-tight"
                    >
                        {firstTitle}
                    </h1>

                    {/* Sous-titre — curtain reveal */}
                    <h2
                        data-hero="h2"
                        className="text-xl md:text-2xl lg:text-3xl text-slate-500 max-w-[700px] font-normal font-['Raleway',sans-serif] leading-relaxed"
                    >
                        {secondTitle}
                    </h2>

                </div>
            </div>
        </section>
    );
}
