import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '../atoms/SectionHeading.jsx';

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_DEM_SERVICES = [
  {
    slug: 'express-45min',
    title: '< 45 min Chrono',
    category: 'Vitesse & Fiabilité',
    badge: 'Point à Point',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop',
    description: 'Une course sans détour. Votre colis est récupéré et livré en moins de 45 minutes, partout à Dakar.',
  },
  {
    slug: 'tracabilite-gps',
    title: '100% Traçabilité',
    category: 'Technologie Connectée',
    badge: 'GPS en Direct',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop',
    description: 'Suivez votre coursier en temps réel sur la carte et soyez informé à chaque étape de la course grâce aux notifications. Partagez le lien de suivi à votre destinataire, et une fois le colis remis, le coursier peut envoyer une photo comme preuve de livraison.',
  },
  {
    slug: 'impact-social',
    title: 'Revenus & Dignité',
    category: 'Impact Social',
    badge: 'Chauffeurs & Flotte',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop',
    description: 'Des revenus justes pour nos coursiers. Ils gardent 100 % de leurs courses, sont formés, équipés en matériel homologué, et accompagnés par une équipe à leurs côtés à chaque course.',
  },
  {
    slug: 'solution-entreprises',
    title: 'Solution Business',
    category: 'B2B & E-Commerce',
    badge: 'Portail Pro & API',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    description: 'Programmez vos expéditions régulières, encaissez en mobile money et retrouvez toutes vos factures au même endroit, depuis votre compte DEM Pro.',
  },
];

export const HorizontalGallery = ({ services = DEFAULT_DEM_SERVICES, theme = 'dark' }) => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isLight = theme === 'white' || theme === 'light';

  const zones = (services || DEFAULT_DEM_SERVICES).map((item, index) => ({
    id: item.slug,
    title: item.title,
    subtitle: item.category || 'Service DEM',
    badge: item.badge || `Pilier 0${index + 1}`,
    image: item.image,
    description: item.description || '',
  }));

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

      const tween = gsap.to(scrollContainer, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      return () => {
        tween.kill();
      };
    });

    return () => mm.revert();
  }, { scope: containerRef, dependencies: [services] });

  return (
    <section
      ref={containerRef}
      className={`min-h-screen md:h-screen overflow-hidden relative px-6 md:px-0 py-16 md:py-0 border-t border-b transition-colors duration-300 ${isLight
          ? 'bg-white text-[#021520] border-slate-200'
          : 'bg-[#021520] text-white border-white/[0.06]'
        }`}
    >
      {/* Grille décorative en arrière-plan */}
      <div
        className={`absolute inset-0 pointer-events-none ${isLight ? 'opacity-40' : 'opacity-10'}`}
        style={{
          backgroundImage: isLight
            ? `linear-gradient(rgba(0,134,200,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,134,200,0.08) 1px, transparent 1px)`
            : `linear-gradient(rgba(0,210,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div ref={scrollContainerRef} className="h-full flex flex-col md:flex-row md:flex-nowrap items-center w-full md:w-max px-4 md:px-[8vw] gap-10 md:gap-0">

        {/* Bloc Titre / Intro */}
        <div className="w-full md:w-[38vw] shrink-0 md:pr-16 md:mx-12 mb-10 md:mb-0">
          <SectionHeading
            align="left"
            title="Les piliers de"
            highlight="notre service"
            subtitle="Nos Engagements"
            titleColor={isLight ? "text-[#021520]" : "text-white"}
            highlightClassName={isLight ? "text-[#0086C8]" : "text-[#00D2FF]"}
            scriptColor={isLight ? "text-[#0086C8]" : "text-[#00D2FF]"}
            titleSize="text-4xl md:text-6xl"
            subtitleSize="text-xl md:text-2xl"
            className="mb-4"
          />
          <p className={`${isLight ? 'text-slate-600' : 'text-slate-400'} mb-8 text-base md:text-lg leading-relaxed`}>
            Une technologie de pointe combinée à un réseau humain rigoureux pour délivrer l'excellence logistique au Sénégal.
          </p>
          <a
            href="download"
            className={`inline-flex items-center gap-3 px-6 py-3 font-bold text-sm tracking-wide uppercase transition-all duration-300 text-white ${isLight
                ? ' bg-[#021520] hover:bg-[#0086C8] shadow-lg'
                : 'text-white bg-[#00D2FF]/10 border border-[#00D2FF]/30 hover:bg-[#00D2FF]/20 shadow-[0_0_20px_rgba(0,210,255,0.15)]'
              }`}
          >
            <span className='text-white'>Télécharger l'application</span>
          </a>
        </div>

        {/* Cartes horizontales */}
        {zones.map((zone, index) => (
          <div
            key={zone.id}
            className="w-full md:w-[50vw] h-[52vh] md:h-[68vh] shrink-0 md:mx-10 relative flex items-center group"
            style={{ transformOrigin: "bottom center" }}
          >
            {/* Typographie verticale sur la gauche */}
            <div
              className={`absolute bottom-10 -rotate-180 [writing-mode:vertical-rl] text-[6rem] font-black uppercase tracking-tighter select-none hidden md:block ${isLight ? 'text-slate-900/[0.05]' : 'text-white/[0.04]'
                }`}
            >
              DEM 0{index + 1}
            </div>

            {/* Carte */}
            <div
              className={`relative w-full h-full z-10 overflow-hidden md:mr-12 block transition-all duration-500 ${isLight
                  ? 'border border-slate-200 bg-[#021520] shadow-2xl hover:border-[#0086C8]/60'
                  : 'border border-white/10 bg-[#0A2233]/70 backdrop-blur-md hover:border-[#00D2FF]/50'
                }`}
            >
              <img
                src={zone.image}
                alt={zone.title}
                className="w-full h-full object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-[#021520]/80 p-6 md:p-10 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                  <div className="py-1 px-3 uppercase text-[11px] font-bold tracking-wider text-[#00D2FF] bg-[#00D2FF]/10 border border-[#00D2FF]/30">
                    <span>{zone.subtitle}</span>
                  </div>

                  
                </div>

                <div>
                  <h3 className="text-2xl md:text-4xl font-black uppercase text-white mb-3 tracking-tight">
                    {zone.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-xl">
                    {zone.description}
                  </p>
                  <div className="w-16 h-0.5 bg-[#00D2FF] mt-6" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="hidden md:block w-[15vw] shrink-0" />
      </div>
    </section>
  );
};

export default HorizontalGallery;
