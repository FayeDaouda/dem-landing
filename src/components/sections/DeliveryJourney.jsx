import { useEffect, useRef, useCallback, useState } from 'react';
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
    desc: "L'expéditeur indique l'adresse de départ et d'arrivée sur l'application. La course est diffusée immédiatement aux coursiers les plus proches pour une affectation ultra-rapide.",
    features: ['Géolocalisation précise', 'Colis sécurisé', 'Attribution en < 30s'],
    Icon: User,
  },
  {
    id: 'livreur',
    step: '02',
    label: 'Coursier DEM',
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

function generatePathString(mainRect, m1Rect, m2Rect, m3Rect, r1Rect, r2Rect, r3Rect) {
  const isDesktop = window.innerWidth >= 768;

  const c1 = {
    x: m1Rect.left - mainRect.left + m1Rect.width / 2,
    y: m1Rect.top - mainRect.top + m1Rect.height / 2,
  };
  const c3 = {
    x: m3Rect.left - mainRect.left + m3Rect.width / 2,
    y: m3Rect.top - mainRect.top + m3Rect.height / 2,
  };

  const m2 = {
    left: m2Rect.left - mainRect.left,
    right: m2Rect.right - mainRect.left,
    top: m2Rect.top - mainRect.top,
    bottom: m2Rect.bottom - mainRect.top,
  };

  if (!isDesktop) {
    const c2 = {
      x: m2.left + m2Rect.width / 2,
      y: m2.top + m2Rect.height / 2,
    };
    // Mobile : Courbe verticale fluide reliant directement les 3 cartes
    return `M ${c1.x} ${c1.y} C ${c1.x} ${(c1.y + c2.y) / 2}, ${c2.x} ${(c1.y + c2.y) / 2}, ${c2.x} ${c2.y} C ${c2.x} ${(c2.y + c3.y) / 2}, ${c3.x} ${(c2.y + c3.y) / 2}, ${c3.x} ${c3.y}`;
  }

  // Desktop : Contournement précis sans chevauchement du texte ni découpe de la carte 2
  // 1. Couloir supérieur (au-dessus de la carte 2 et en dessous de l'étape 1)
  const corridor1Y = Math.min(
    m2.top - 28,
    (r1Rect.bottom - mainRect.top + r2Rect.top - mainRect.top) / 2
  );

  // 2. Couloir inférieur (en dessous de la carte 2 et au-dessus de l'étape 3)
  const corridor2Y = Math.max(
    m2.bottom + 28,
    (r2Rect.bottom - mainRect.top + r3Rect.top - mainRect.top) / 2
  );

  // 3. Position X extérieure à droite de la carte 2 (marge nette de 45px pour ne jamais toucher la carte)
  const outerRightX = Math.min(mainRect.width - 16, m2.right + 45);
  const cornerRadius = 40;

  return `
    M ${c1.x} ${c1.y}
    C ${c1.x} ${corridor1Y - 15}, ${c1.x + 40} ${corridor1Y}, ${c1.x + 100} ${corridor1Y}
    L ${outerRightX - cornerRadius} ${corridor1Y}
    C ${outerRightX - 10} ${corridor1Y}, ${outerRightX} ${corridor1Y + 10}, ${outerRightX} ${corridor1Y + cornerRadius}
    L ${outerRightX} ${corridor2Y - cornerRadius}
    C ${outerRightX} ${corridor2Y - 10}, ${outerRightX - 10} ${corridor2Y}, ${outerRightX - cornerRadius} ${corridor2Y}
    L ${c3.x + 80} ${corridor2Y}
    C ${c3.x + 20} ${corridor2Y}, ${c3.x} ${corridor2Y + 20}, ${c3.x} ${c3.y}
  `.replace(/\s+/g, ' ').trim();
}

export default function DeliveryJourney() {
  const ctxRef = useRef(null);
  const [pathData, setPathData] = useState('');

  const buildTimeline = useCallback(() => {
    if (ctxRef.current) ctxRef.current.revert();

    const mainEl = document.querySelector('.dj-main');
    const m1 = document.querySelector('.dj-marker-0');
    const m2 = document.querySelector('.dj-marker-1');
    const m3 = document.querySelector('.dj-marker-2');
    const r1 = document.querySelector('.dj-row-0');
    const r2 = document.querySelector('.dj-row-1');
    const r3 = document.querySelector('.dj-row-2');
    const box = document.querySelector('.dj-box');

    if (!mainEl || !m1 || !m2 || !m3 || !r1 || !r2 || !r3 || !box) return;

    const mainRect = mainEl.getBoundingClientRect();
    const d = generatePathString(
      mainRect,
      m1.getBoundingClientRect(),
      m2.getBoundingClientRect(),
      m3.getBoundingClientRect(),
      r1.getBoundingClientRect(),
      r2.getBoundingClientRect(),
      r3.getBoundingClientRect()
    );

    setPathData(d);

    const track = document.getElementById('dj-track');
    const trackBg = document.getElementById('dj-track-bg');
    if (track) track.setAttribute('d', d);
    if (trackBg) trackBg.setAttribute('d', d);

    ctxRef.current = gsap.context(() => {
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
          path: '#dj-track',
          align: '#dj-track',
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      });
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(buildTimeline, 200);
    window.addEventListener('resize', buildTimeline);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', buildTimeline);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, [buildTimeline]);

  return (
    <section className="relative w-full py-24 px-6 lg:px-16 overflow-hidden bg-cyan-deep">


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
        {/* SVG Circuit Path Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="dj-path-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#0086C8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E08C" stopOpacity="0.9" />
            </linearGradient>
            <filter id="dj-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Halo lumineux arrière */}
          <path
            id="dj-track-bg"
            d={pathData}
            fill="none"
            stroke="#00D2FF"
            strokeWidth="6"
            strokeOpacity="0.15"
            filter="url(#dj-glow)"
          />

          {/* Ligne pointillée technologique */}
          <path
            id="dj-track"
            d={pathData}
            fill="none"
            stroke="url(#dj-path-grad)"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />
        </svg>

        {/* The moving animated package */}
        <div
          className="dj-box absolute pointer-events-none"
          style={{
            width: 56,
            height: 56,
            top: 0,
            left: 0,
            background: 'linear-gradient(135deg, #00D2FF, #0086C8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(0, 210, 255, 0.9), 0 0 60px rgba(0, 210, 255, 0.4)',
            zIndex: 30,
            border: '2px solid rgba(255, 255, 255, 0.9)',
          }}
        >
          <Package size={28} className="text-[#021520]" strokeWidth={2.4} />
        </div>

        {WAYPOINTS.map((wp, index) => {
          const { Icon } = wp;
          const isEnd = index === WAYPOINTS.length - 1;
          const isEven = index % 2 === 0; // index 0 & 2 -> Waypoint Left | index 1 -> Waypoint Right

          return (
            <div
              key={wp.id}
              className={`dj-row-${index} grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center w-full relative z-20`}
            >
              {/* Waypoint Column (Left for 01/03, Right for 02) */}
              <div
                className={`md:col-span-4 flex justify-center ${
                  isEven ? 'md:justify-start md:order-1' : 'md:justify-end md:order-2'
                }`}
              >
                <div className="dj-container relative">
                  {/* Waypoint visual marker - NO ROUNDED */}
                  <div
                    className={`dj-marker dj-marker-${index} flex flex-col items-center justify-center p-6 backdrop-blur-xl transition-all duration-300 group`}
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
                      className={`inline-block font-serif italic text-lg sm:text-xl md:text-2xl font-light tracking-wide ${
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
