import React from 'react';
import { ArrowRight, PhoneCall, Download } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading.jsx';

export default function ContactCTA({ theme = 'dark' }) {
  const isLight = theme === 'white' || theme === 'light';

  return (
    <section 
      className={`relative w-full py-28 md:py-36 px-6 overflow-hidden border-t transition-colors duration-300 ${
        isLight 
          ? 'bg-white text-[#021520] border-slate-200' 
          : 'bg-[#021520] text-white border-white/[0.06]'
      }`}
    >
      {/* Giant Typographic Background Watermark */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span 
          className={`font-black text-[18vw] leading-none uppercase tracking-tighter whitespace-nowrap ${
            isLight ? 'text-slate-900/[0.04]' : 'text-white/[0.03]'
          }`}
        >
          CONTACT
        </span>
      </div>

      {/* Grid overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none ${isLight ? 'opacity-40' : 'opacity-10'}`}
        style={{
          backgroundImage: isLight
            ? `linear-gradient(rgba(0,134,200,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,200,0.08) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,210,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: isLight 
            ? 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, rgba(255,255,255,0) 70%)'
            : 'radial-gradient(circle, rgba(0,210,255,0.08) 0%, rgba(2,21,32,0) 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <SectionHeading
          title="Faites le premier pas vers"
          highlight="l'excellence."
          subtitle="Contactez-nous"
          titleColor={isLight ? "text-[#021520]" : "text-white"}
          highlightClassName={isLight ? "text-[#0086C8]" : "text-[#00D2FF]"}
          scriptColor={isLight ? "text-[#0086C8]" : "text-[#00D2FF]"}
          titleSize="text-4xl md:text-6xl lg:text-7xl"
          subtitleSize="text-2xl md:text-3xl lg:text-4xl"
          className="mb-6"
        />

        <p className={`${isLight ? 'text-slate-600' : 'text-slate-300'} text-base md:text-xl max-w-2xl leading-relaxed mb-10`}>
          Que vous soyez un particulier, un commerçant ou une entreprise, profitez du réseau de livraison le plus rapide et fiable de Dakar.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#download"
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-sm tracking-wider uppercase text-[#021520] bg-[#00D2FF] hover:bg-[#00B8E6] transition-all duration-300 shadow-[0_0_25px_rgba(0,210,255,0.35)]"
          >
            <Download size={18} />
            <span>Télécharger l'application</span>
            <ArrowRight size={16} />
          </a>

          <a
            href="mailto:contact@dem.sn"
            className={`inline-flex items-center gap-3 px-8 py-4 font-bold text-sm tracking-wider uppercase transition-all duration-300 ${
              isLight
                ? 'text-[#021520] bg-slate-100 border border-slate-300 hover:bg-slate-200'
                : 'text-white bg-white/[0.04] border border-white/20 hover:border-[#00D2FF]/60 hover:bg-white/[0.08] backdrop-blur-md'
            }`}
          >
            <PhoneCall size={18} className="text-[#0086C8]" />
            <span>Prendre contact</span>
          </a>
        </div>

        {/* Trust bullet footer */}
        <div 
          className={`mt-14 pt-8 border-t flex flex-wrap justify-center items-center gap-8 text-xs font-semibold uppercase tracking-wider ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-white/[0.08] text-slate-400'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00E08C] rounded-full animate-pulse" />
            Support client 7j/7
          </span>
          <span>·</span>
          <span>Dakar & banlieue</span>
          <span>·</span>
          <span>Prise en charge instantanée</span>
        </div>
      </div>
    </section>
  );
}
