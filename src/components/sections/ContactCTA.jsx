import React from 'react';
import { ArrowRight, PhoneCall, Download } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading.jsx';

export default function ContactCTA({ 
  theme = 'dark',
  watermark = 'CONTACT',
  title = "Faites le premier pas vers",
  highlight = "l'excellence.",
  subtitle = "Contactez-nous",
  description = "Que vous soyez un particulier, un commerçant ou une entreprise, profitez du réseau de livraison le plus rapide et fiable de Dakar.",
  primaryBtnText = "Télécharger l'application",
  primaryBtnLink = "#download",
  primaryBtnIcon = "download",
  secondaryBtnText = "Prendre contact",
  secondaryBtnLink = "mailto:contact@dem.sn",
  bullets = [
    "Support client 7j/7",
    "Dakar & banlieue",
    "Prise en charge instantanée"
  ]
}) {
  const isLight = theme === 'white' || theme === 'light';

  return (
    <section 
      className={`relative w-full py-24 md:py-32 px-6 overflow-hidden border-t ${
        isLight 
          ? 'bg-white text-[#021520] border-slate-200' 
          : 'bg-[#021520] text-white border-white/[0.08]'
      }`}
    >
      {/* Giant Typographic Background Watermark */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span 
          className={`font-black text-[16vw] leading-none uppercase tracking-tighter whitespace-nowrap ${
            isLight ? 'text-slate-900/[0.04]' : 'text-white/[0.03]'
          }`}
        >
          {watermark}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <SectionHeading
          title={title}
          highlight={highlight}
          subtitle={subtitle}
          titleColor={isLight ? "text-[#021520]" : "text-white"}
          highlightClassName={isLight ? "text-[#0086C8]" : "text-[#00D2FF]"}
          scriptColor={isLight ? "text-[#0086C8]" : "text-[#00D2FF]"}
          titleSize="text-3xl md:text-5xl lg:text-6xl"
          subtitleSize="text-xl md:text-2xl lg:text-3xl"
          className="mb-6"
        />

        <p className={`${isLight ? 'text-slate-600' : 'text-slate-300'} text-base md:text-lg max-w-2xl leading-relaxed mb-10 font-['Poppins',sans-serif]`}>
          {description}
        </p>

        {/* Buttons (Sharp rounded-none) */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={primaryBtnLink}
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-xs sm:text-sm tracking-wider uppercase text-[#021520] bg-[#00D2FF] hover:bg-[#0086C8] hover:text-white transition-all duration-300 rounded-none border border-[#00D2FF]"
          >
            {primaryBtnIcon === 'download' ? <Download size={18} /> : null}
            <span>{primaryBtnText}</span>
            <ArrowRight size={16} />
          </a>

          <a
            href={secondaryBtnLink}
            className={`inline-flex items-center gap-3 px-8 py-4 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-none ${
              isLight
                ? 'text-[#021520] bg-slate-100 border border-slate-300 hover:bg-slate-200'
                : 'text-white bg-white/[0.04] border border-white/20 hover:border-[#00D2FF]/60 hover:bg-white/[0.08]'
            }`}
          >
            <PhoneCall size={18} className="text-[#0086C8]" />
            <span>{secondaryBtnText}</span>
          </a>
        </div>

        {/* Trust bullet footer */}
        {bullets && bullets.length > 0 && (
          <div 
            className={`mt-14 pt-8 border-t flex flex-wrap justify-center items-center gap-6 md:gap-8 text-xs font-semibold uppercase tracking-wider ${
              isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.08] text-slate-400'
            }`}
          >
            {bullets.map((bullet, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>·</span>}
                <span className="flex items-center gap-2">
                  {idx === 0 && <span className="w-2 h-2 bg-[#00E08C] animate-pulse" />}
                  {bullet}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
