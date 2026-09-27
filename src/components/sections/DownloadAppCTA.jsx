import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Smartphone } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function DownloadAppCTA({
  theme = 'white',
  watermark = 'DOWNLOAD',
  subtitle = 'Application Mobile',
  title = 'Votre livraison express au bout',
  highlight = 'des doigts.',
  description = `Téléchargez gratuitement l'application DEM sur iOS et Android. Commandez en 30 secondes, suivez votre coursier en direct sur la carte et payez en toute sécurité.`,
  bullets = [],
  id = 'download',
}) {
  const sectionRef = useRef(null);

  const isCyanDeep = theme === 'cyan-deep';
  const isLight = theme === 'white' || theme === 'light';

  let bgClass = 'bg-white text-dark border-slate-200';
  let watermarkClass = 'text-slate-900/[0.04]';
  let descClass = 'text-slate-600';
  let highlightColor = 'var(--color-cyan-2, #0086C8)';
  let highlightClassName = 'text-[#0086C8]';
  let scriptColor = 'text-[#0086C8]';

  if (isCyanDeep) {
    bgClass = 'bg-cyan-deep text-white border-white/[0.08]';
    watermarkClass = 'text-white/[0.03]';
    descClass = 'text-slate-200';
    highlightColor = 'var(--cyan, #00D2FF)';
    highlightClassName = 'text-[#00D2FF]';
    scriptColor = 'text-[#00D2FF]';
  } else if (!isLight) {
    bgClass = 'bg-[#021520] text-white border-white/[0.08]';
    watermarkClass = 'text-white/[0.03]';
    descClass = 'text-slate-300';
    highlightColor = 'var(--cyan, #00D2FF)';
    highlightClassName = 'text-[#00D2FF]';
    scriptColor = 'text-[#00D2FF]';
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sec = sectionRef.current;

      // ── Filigrane : scale depuis 1.4 + reveal ──
      gsap.fromTo('[data-dl="watermark"]',
        { scale: 1.4, clipPath: 'inset(0 50% 0 50%)' },
        {
          scale: 1, clipPath: 'inset(0 0% 0 0%)',
          duration: 1.6, ease: 'expo.out',
          scrollTrigger: { trigger: sec, start: 'top 85%', once: true }
        }
      );

      // ── Titre : slide curtain sur le wrapper (sans toucher au HTML interne) ──
      gsap.fromTo('[data-dl="heading-wrap"]',
        { y: 60, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: sec, start: 'top 82%', once: true }
        }
      );


      // ── Description : line by line reveal ──
      gsap.fromTo('[data-dl="desc"]',
        { y: 40, clipPath: 'inset(0 0 100% 0)', skewY: 1 },
        {
          y: 0, clipPath: 'inset(0 0 0% 0)', skewY: 0,
          duration: 1.0, ease: 'expo.out', delay: 0.2,
          scrollTrigger: { trigger: '[data-dl="desc"]', start: 'top 88%', once: true }
        }
      );

      // ── Bullets : stagger curtain depuis bas ──
      gsap.fromTo('[data-dl="bullet"]',
        { y: 30, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 0.75, ease: 'expo.out',
          stagger: { amount: 0.5, from: 'start' },
          scrollTrigger: { trigger: '[data-dl="bullets"]', start: 'top 85%', once: true }
        }
      );

      // ── Boutons : slide up + expand depuis centre ──
      gsap.fromTo('[data-dl="btn"]',
        { y: 50, clipPath: 'inset(0 50% 0 50%)', scale: 0.92 },
        {
          y: 0, clipPath: 'inset(0 0% 0 0%)', scale: 1,
          duration: 0.45, ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-dl="btns"]', start: 'top 90%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full py-20 md:py-32 px-6 overflow-hidden border-t font-['DM_Sans',sans-serif] ${bgClass}`}
    >
      {/* ── 1. FILIGRANE GÉANT ANIMÉ ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          data-dl="watermark"
          className={`font-black text-[17vw] leading-none uppercase tracking-tighter whitespace-nowrap font-['DM_Sans',sans-serif] ${watermarkClass}`}
        >
          {watermark}
        </span>
      </div>

      {/* ── 2. CONTENU PRINCIPAL CENTRÉ ── */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Titre avec sous-titre cursif — style original */}
        <div data-dl="heading-wrap">
          <SectionHeading
            align="center"
            title={title}
            highlight={highlight}
            subtitle={subtitle}
            titleColor={isLight ? 'text-dark' : 'text-white'}
            highlightColor={highlightColor}
            highlightClassName={highlightClassName}
            scriptColor={scriptColor}
            titleSize="text-3xl md:text-5xl lg:text-6xl"
            subtitleSize="text-xl md:text-2xl lg:text-3xl"
            className="mb-6"
          />
        </div>

        {/* Description */}
        <p
          data-dl="desc"
          className={`${descClass} text-base md:text-lg max-w-2xl leading-relaxed mb-6 font-['Poppins',sans-serif]`}
        >
          {description}
        </p>

        {/* Bullets */}
        {bullets && bullets.length > 0 && (
          <div data-dl="bullets" className="w-full max-w-3xl my-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {bullets.map((text, idx) => (
                <div
                  key={idx}
                  data-dl="bullet"
                  className={`flex items-start gap-3 p-3.5 border transition-colors ${isLight
                      ? 'bg-slate-50/90 border-slate-200 hover:bg-slate-100/90 text-dark'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white/90'
                    }`}
                >
                  <span
                    className={`shrink-0 mt-0.5 p-1 ${isLight ? 'text-[#0086C8] bg-cyan/15' : 'text-cyan bg-cyan/20'}`}
                  >
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-xs sm:text-sm font-medium font-['Poppins',sans-serif] leading-snug">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 3. BOUTONS DE TÉLÉCHARGEMENT ── */}
        <div data-dl="btns" className="flex flex-wrap items-center justify-center gap-4 mt-8">

          {/* Bouton App Store */}
          <a
            data-dl="btn"
            href="https://apps.apple.com/us/app/dem-livraison/id6764724342"
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center justify-between gap-4 px-7 py-4 min-w-[220px] transition-all duration-300 rounded-none border shadow-sm cursor-pointer ${isLight
                ? 'bg-[#021520] text-white hover:bg-[#0086C8] border-[#021520]'
                : 'bg-white/[0.06] text-white hover:bg-[#0086C8] hover:text-white border-white/20'
              }`}
          >
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 fill-current shrink-0 text-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.09.65-2.73 1.4-.56.65-.99 1.72-.94 2.76 1.07.08 2.05-.54 2.66-1.29z" />
              </svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/70 font-['Raleway',sans-serif]">
                  Disponible sur
                </span>
                <span className="text-sm text-white font-black tracking-tight font-['DM_Sans',sans-serif]">
                  App Store
                </span>
              </div>
            </div>
            <ArrowRight size={16} className="text-white/80 group-hover:translate-x-1 transition-transform shrink-0" />
          </a>

          {/* Bouton Google Play */}
          <a
            data-dl="btn"
            href="https://play.google.com/store/apps/details?id=sn.dem.demapp"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-between gap-4 px-7 py-4 min-w-[220px] bg-[#00D2FF] text-[#021520] hover:bg-white hover:text-[#021520] hover:border-white transition-all duration-300 rounded-none border border-[#00D2FF] shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <svg className="w-6 h-6 fill-current shrink-0 text-[#021520] transition-colors" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.951V2.765c.137-.36.357-.69.609-.951zm11.597 11.597l2.368 2.368-12.78 7.378 10.412-9.746zm0-2.822L4.794.843l12.78 7.379-2.368 2.367zm1.414 1.411l3.774 2.18c1.07.618 1.07 1.626 0 2.244l-3.774 2.18-2.122-2.122 2.122-2.482z" />
              </svg>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#021520]/70 font-['Raleway',sans-serif] transition-colors">
                  Disponible sur
                </span>
                <span className="text-sm font-black tracking-tight font-['DM_Sans',sans-serif]">
                  Google Play
                </span>
              </div>
            </div>
            <ArrowRight size={16} className="text-[#021520] group-hover:translate-x-1 transition-all shrink-0" />
          </a>

        </div>

      </div>
    </section>
  );
}
