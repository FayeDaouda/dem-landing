import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Package, User, Truck, Home, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading.jsx';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const WAYPOINTS = [
  {
    id: 'start',
    step: '01',
    label: 'Expéditeur',
    tag: 'Étape 01 · Prise de commande',
    titleMain: 'Création &',
    titleHighlight: 'Prise en Charge',
    desc: "L'expéditeur indique l'adresse de départ et d'arrivée sur l'application. La course est diffusée immédiatement aux livreurs les plus proches pour une affectation ultra-rapide.",
    features: ['Géolocalisation précise', 'Colis sécurisé', 'Attribution en < 30s'],
    Icon: User,
  },
  {
    id: 'livreur',
    step: '02',
    label: 'Livreur DEM',
    tag: 'Étape 02 · En transit',
    titleMain: 'Acheminement',
    titleHighlight: 'Express',
    desc: 'Le coursier récupère le paquet et se met en route. Vous suivez chaque mètre de sa progression en temps réel sur la carte interactive avec heure d’arrivée estimée.',
    features: ['Suivi GPS en direct', 'Itinéraire optimisé', 'Notification instantanée'],
    Icon: Truck,
  },
  {
    id: 'arrive',
    step: '03',
    label: 'Destinataire',
    tag: 'Étape 03 · Destination finale',
    titleMain: 'Remise en',
    titleHighlight: 'Main Propre',
    desc: 'Arrivée à destination dans un délai record. Remise sécurisée au destinataire avec validation instantanée et signature numérique sur votre smartphone.',
    features: ['Confirmation sécurisée', 'Notation du service', 'Reçu instantané'],
    Icon: Home,
  },
];

export default function DeliveryJourney() {
  const ctxRef = useRef(null);

  const buildTimeline = useCallback(() => {
    // Revert previous context
    if (ctxRef.current) ctxRef.current.revert();

    ctxRef.current = gsap.context(() => {
      const box = document.querySelector('.dj-box');
      if (!box) return;

      const boxRect = box.getBoundingClientRect();

      // All waypoint containers except the starting one
      const containers = gsap.utils.toArray('.dj-container:not(.dj-initial)');

      const points = containers.map((container) => {
        const marker = container.querySelector('.dj-marker') || container;
        const r = marker.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - (boxRect.left + boxRect.width / 2),
          y: r.top + r.height / 2 - (boxRect.top + boxRect.height / 2),
        };
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.dj-main',
          start: 'top 70%',
          end: 'bottom 75%',
          scrub: 1.2,
        },
      });

      tl.to('.dj-box', {
        duration: 1,
        ease: 'none',
        motionPath: {
          path: points,
          curviness: 1.2,
        },
      });
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(buildTimeline, 150);
    window.addEventListener('resize', buildTimeline);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', buildTimeline);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, [buildTimeline]);

  return (
    <section className="relative w-full py-24 px-6 lg:px-16 overflow-hidden" style={{ background: '#021520' }}>
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(rgba(0,210,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient background glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,210,255,0.06) 0%, rgba(2,21,32,0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-24">
        <SectionHeading
          title="Le parcours de votre"
          highlight="colis"
          subtitle="Suivi en direct"
          titleColor="text-white"
          highlightClassName="text-[#00D2FF]"
          scriptColor="text-[#00D2FF]"
          titleSize="text-3xl md:text-5xl lg:text-6xl"
          subtitleSize="text-2xl md:text-3xl lg:text-4xl"
        />
        <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          De la commande à la remise en main propre, suivez chaque étape en toute transparence.
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div className="dj-main relative max-w-6xl mx-auto flex flex-col gap-24 md:gap-32 w-full">
        {WAYPOINTS.map((wp, index) => {
          const { Icon } = wp;
          const isStart = index === 0;
          const isEnd = index === WAYPOINTS.length - 1;
          const isEven = index % 2 === 0; // index 0 & 2 -> Waypoint Left | index 1 -> Waypoint Right

          return (
            <div
              key={wp.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center w-full"
            >
              {/* Waypoint Column (Left for 01/03, Right for 02) */}
              <div
                className={`md:col-span-4 flex justify-center ${
                  isEven ? 'md:justify-start md:order-1' : 'md:justify-end md:order-2'
                }`}
              >
                <div className={`dj-container relative ${isStart ? 'dj-initial' : ''}`}>
                  {/* Waypoint visual marker - NO ROUNDED */}
                  <div
                    className="dj-marker flex flex-col items-center justify-center p-6 backdrop-blur-xl transition-all duration-300 group"
                    style={{
                      width: 170,
                      height: 170,
                      background: 'rgba(10, 34, 51, 0.85)',
                      border: isEnd
                        ? '2px dashed rgba(0, 224, 140, 0.6)'
                        : '2px dashed rgba(0, 210, 255, 0.4)',
                    }}
                  >
                    <div
                      className="flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        width: 60,
                        height: 60,
                        background: isEnd
                          ? 'rgba(0, 224, 140, 0.15)'
                          : 'rgba(0, 210, 255, 0.12)',
                        border: isEnd
                          ? '1px solid rgba(0, 224, 140, 0.4)'
                          : '1px solid rgba(0, 210, 255, 0.3)',
                        boxShadow: isEnd
                          ? '0 0 20px rgba(0,224,140,0.25)'
                          : '0 0 20px rgba(0,210,255,0.2)',
                      }}
                    >
                      <Icon
                        size={30}
                        style={{
                          color: isEnd ? '#00E08C' : '#00D2FF',
                        }}
                      />
                    </div>
                    <span
                      className="text-sm font-bold tracking-wide uppercase"
                      style={{ color: isEnd ? '#00E08C' : '#FFFFFF' }}
                    >
                      {wp.label}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                      Étape {wp.step}
                    </span>
                  </div>

                  {/* The moving animated package - NO ROUNDED */}
                  {isStart && (
                    <div
                      className="dj-box absolute"
                      style={{
                        width: 64,
                        height: 64,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: '#00D2FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow:
                          '0 0 35px rgba(0, 210, 255, 0.9), 0 0 70px rgba(0, 210, 255, 0.4)',
                        zIndex: 50,
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      <Package size={32} className="text-[#021520]" strokeWidth={2.4} />
                    </div>
                  )}
                </div>
              </div>

              {/* Description Column (Right for 01/03, Left for 02) */}
              <div
                className={`md:col-span-8 flex flex-col justify-center ${
                  isEven ? 'md:order-2' : 'md:order-1'
                }`}
              >
                <div className="w-full">
                  <div className="mb-2">
                    <span
                      className={`inline-block font-mono text-xs font-bold uppercase tracking-widest ${
                        isEnd ? 'text-[#00E08C]' : 'text-[#00D2FF]'
                      }`}
                    >
                      {wp.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase text-white mb-3 tracking-tight">
                    {wp.titleMain}{' '}
                    <span className={isEnd ? 'text-[#00E08C]' : 'text-[#00D2FF]'}>
                      {wp.titleHighlight}
                    </span>
                  </h3>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
                    {wp.desc}
                  </p>

                  {/* Key Features / Bullet points - NO ROUNDED */}
                  <div className="flex flex-wrap gap-3">
                    {wp.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-white/[0.03] border border-white/10"
                      >
                        <CheckCircle2 size={14} className={isEnd ? 'text-[#00E08C]' : 'text-[#00D2FF]'} />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
