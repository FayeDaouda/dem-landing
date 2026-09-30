import { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CheckCircle2, User, Check } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading.jsx';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/**
 * LivreurTopDown — Vue aérienne (top-down) détaillée d'une moto électrique DEM
 * avec son coursier au guidon (casque profilé, blouson avec logo DEM,
 * guidon, caisson de livraison avec logo DEM et jauge batterie, feu stop LED).
 */
function LivreurTopDown({ size = 95 }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 120 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Faisceau lumineux avant projeté sur la route */}
        <linearGradient id="beam-grad-hero" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#00D2FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00D2FF" stopOpacity="0" />
        </linearGradient>

        {/* Dégradé carrosserie moto DEM */}
        <linearGradient id="moto-body-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b283e" />
          <stop offset="50%" stopColor="#041724" />
          <stop offset="100%" stopColor="#020d14" />
        </linearGradient>

        {/* Dégradé blouson coursier */}
        <linearGradient id="rider-jacket-hero" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e4361" />
          <stop offset="100%" stopColor="#051f2e" />
        </linearGradient>

        {/* Dégradé casque */}
        <radialGradient id="helmet-grad-hero" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#1e5270" />
          <stop offset="70%" stopColor="#071d2b" />
          <stop offset="100%" stopColor="#020e16" />
        </radialGradient>
      </defs>

      <polygon
        points="60,35 5,-20 115,-20"
        fill="url(#beam-grad-hero)"
        style={{ pointerEvents: 'none' }}
      />

      <g>
        {/* ================= ROUE AVANT ================= */}
        <rect x="54" y="16" width="12" height="30" rx="6" fill="#080d12" stroke="#1c2b36" strokeWidth="1.5" />
        <line x1="60" y1="20" x2="60" y2="42" stroke="#00D2FF" strokeWidth="1.5" opacity="0.6" strokeDasharray="3 2" />

        {/* Garde-boue avant */}
        <path d="M52 28 C52 22, 68 22, 68 28 L66 40 C66 40, 54 40, 54 40 Z" fill="#00D2FF" opacity="0.85" />

        {/* Fourche avant */}
        <line x1="48" y1="36" x2="55" y2="44" stroke="#486577" strokeWidth="3" strokeLinecap="round" />
        <line x1="72" y1="36" x2="65" y2="44" stroke="#486577" strokeWidth="3" strokeLinecap="round" />

        {/* ================= GUIDON & RÉTROVISEURS ================= */}
        <path d="M28 44 Q60 48 92 44" stroke="#162834" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M28 44 Q60 48 92 44" stroke="#00D2FF" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.9" />

        {/* Poignées */}
        <rect x="22" y="41" width="10" height="6" rx="2" fill="#02080c" stroke="#00D2FF" strokeWidth="1" />
        <rect x="88" y="41" width="10" height="6" rx="2" fill="#02080c" stroke="#00D2FF" strokeWidth="1" />

        {/* Rétroviseurs */}
        <rect x="16" y="36" width="7" height="4" rx="1.5" fill="#0086C8" stroke="#00D2FF" strokeWidth="0.8" />
        <line x1="23" y1="39" x2="26" y2="43" stroke="#486577" strokeWidth="1.5" />
        <rect x="97" y="36" width="7" height="4" rx="1.5" fill="#0086C8" stroke="#00D2FF" strokeWidth="0.8" />
        <line x1="97" y1="39" x2="94" y2="43" stroke="#486577" strokeWidth="1.5" />

        {/* Phare LED central avant */}
        <ellipse cx="60" cy="38" rx="10" ry="4" fill="rgba(0, 210, 255, 0.4)" />
        <ellipse cx="60" cy="38" rx="8" ry="3.2" fill="#FFFFFF" />
        <ellipse cx="60" cy="38" rx="5" ry="1.8" fill="#00D2FF" />

        {/* ================= CHÂSSIS & CARÉNAGE MOTO ================= */}
        <path
          d="M48 46 L72 46 L76 90 L68 140 L52 140 L44 90 Z"
          fill="url(#moto-body-hero)"
          stroke="#00D2FF"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Accents racing cyan */}
        <path d="M46 54 L44 80 L48 84 L50 56 Z" fill="#00D2FF" opacity="0.85" />
        <path d="M74 54 L76 80 L72 84 L70 56 Z" fill="#00D2FF" opacity="0.85" />

        {/* Repose-pieds */}
        <rect x="38" y="85" width="6" height="12" rx="2" fill="#0e1f2b" stroke="#00D2FF" strokeWidth="0.8" />
        <rect x="76" y="85" width="6" height="12" rx="2" fill="#0e1f2b" stroke="#00D2FF" strokeWidth="0.8" />

        {/* ================= COURSIER (PILOTE) ================= */}
        {/* Bras gauche */}
        <path
          d="M42 74 C34 70, 26 58, 28 46"
          stroke="url(#rider-jacket-hero)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M36 66 C32 60, 28 54, 29 48" stroke="#00D2FF" strokeWidth="2" fill="none" opacity="0.95" />

        {/* Bras droit */}
        <path
          d="M78 74 C86 70, 94 58, 92 46"
          stroke="url(#rider-jacket-hero)"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M84 66 C88 60, 92 54, 91 48" stroke="#00D2FF" strokeWidth="2" fill="none" opacity="0.95" />

        {/* Gants noirs au guidon */}
        <ellipse cx="28" cy="44" rx="4.5" ry="4.5" fill="#07151e" stroke="#00D2FF" strokeWidth="0.8" />
        <ellipse cx="92" cy="44" rx="4.5" ry="4.5" fill="#07151e" stroke="#00D2FF" strokeWidth="0.8" />

        {/* Épaules et buste du coursier */}
        <ellipse cx="60" cy="80" rx="22" ry="16" fill="url(#rider-jacket-hero)" stroke="#00D2FF" strokeWidth="0.8" strokeOpacity="0.4" />
        <ellipse cx="43" cy="78" rx="3.5" ry="6" fill="#00D2FF" opacity="0.85" />
        <ellipse cx="77" cy="78" rx="3.5" ry="6" fill="#00D2FF" opacity="0.85" />

        {/* Dos du blouson avec logo DEM */}
        <text
          x="60"
          y="94"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="7.5"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.5"
          opacity="0.9"
        >
          DEM
        </text>

        {/* Casque du coursier */}
        <ellipse cx="60" cy="67" rx="14" ry="16" fill="url(#helmet-grad-hero)" stroke="#00D2FF" strokeWidth="1.2" />

        {/* Visière profilée avant */}
        <path
          d="M50 56 Q60 51 70 56 Q60 59 50 56"
          fill="#00D2FF"
          opacity="0.95"
        />

        {/* Bande racing centrale */}
        <path d="M58 52 L62 52 L62 82 L58 82 Z" fill="#00D2FF" opacity="0.8" />
        <path d="M59.5 52 L60.5 52 L60.5 82 L59.5 82 Z" fill="#FFFFFF" opacity="0.95" />

        {/* ================= CAISSON DE LIVRAISON ARRIÈRE ================= */}
        <rect
          x="40"
          y="105"
          width="40"
          height="34"
          rx="5"
          fill="#051926"
          stroke="#00D2FF"
          strokeWidth="1.5"
        />
        <rect
          x="43"
          y="108"
          width="34"
          height="28"
          rx="3"
          fill="#020e17"
          stroke="rgba(0,210,255,0.3)"
          strokeWidth="1"
        />
        <text
          x="60"
          y="123"
          textAnchor="middle"
          fill="#00D2FF"
          fontSize="10"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1"
        >
          DEM
        </text>
        <rect x="49" y="128" width="22" height="3.5" rx="1.5" fill="#000000" stroke="rgba(0,224,140,0.5)" strokeWidth="0.6" />
        <rect x="50" y="129" width="16" height="1.5" rx="0.7" fill="#00E08C" />

        {/* ================= ROUE ARRIÈRE & FEU STOP ================= */}
        <rect x="54" y="142" width="12" height="28" rx="6" fill="#080d12" stroke="#1c2b36" strokeWidth="1.5" />
        <line x1="60" y1="145" x2="60" y2="166" stroke="#486577" strokeWidth="1.5" strokeDasharray="3 2" />
        <rect x="50" y="138" width="20" height="7" rx="3.5" fill="rgba(255,51,75,0.4)" />
        <rect x="52" y="140" width="16" height="3" rx="1.5" fill="#FF334B" />
      </g>
    </svg>
  );
}

const WAYPOINTS = [
  {
    id: 'client',
    label: 'Expéditeur',
    tag: 'Prise en charge & Collecte',
    titleMain: 'Le coursier récupère',
    titleHighlight: 'votre colis',
    desc: "En quelques secondes sur l'application DEM, la commande est validée. Le coursier le plus proche en patrouille est instantanément assigné et file à l'adresse de départ pour la collecte immédiate.",
    color: '#00D2FF',
    isLast: false,
    markerOnRight: true,
  },
  {
    id: 'destinataire',
    label: 'Destinataire',
    tag: 'Acheminement & Remise sécurisée',
    titleMain: 'Livraison confirmée',
    titleHighlight: 'par code OTP',
    desc: "Le coursier DEM achemine le colis jusqu'au destinataire via l'itinéraire le plus rapide. Arrivé à destination, la remise en main propre est sécurisée par code OTP confidentiel.",
    color: '#00E08C',
    isLast: true,
    markerOnRight: false,
  },
];

function generatePathString(sectionRect, mainRect, m0Rect, m1Rect, r0Rect, r1Rect) {
  const isDesktop = window.innerWidth >= 768;

  // Distance entre le haut de .dj-main et le haut de <section>
  const mainOffsetFromSectionTop = mainRect.top - sectionRect.top;

  // c0 : Point de départ caché DANS la hero section (au-dessus du bord supérieur de DeliveryJourney)
  const startY = -mainOffsetFromSectionTop - (isDesktop ? 270 : 190);

  // X de c0 : aligné avec le marqueur Client (m0Rect)
  const startX = m0Rect.left - mainRect.left + m0Rect.width / 2;

  const c0 = {
    x: startX,
    y: startY,
  };

  // c1 : Le Client (sur la droite en row 0)
  const c1 = {
    x: m0Rect.left - mainRect.left + m0Rect.width / 2,
    y: m0Rect.top - mainRect.top + m0Rect.height / 2,
  };

  // c2 : Le Destinataire (sur la gauche en row 1)
  const c2 = {
    x: m1Rect.left - mainRect.left + m1Rect.width / 2,
    y: m1Rect.top - mainRect.top + m1Rect.height / 2,
  };

  if (!isDesktop) {
    return `M ${c0.x} ${c0.y} L ${c0.x} 0 C ${c0.x} ${c1.y / 2}, ${c1.x} ${c1.y / 2}, ${c1.x} ${c1.y} C ${c1.x} ${(c1.y + c2.y) / 2}, ${c2.x} ${(c1.y + c2.y) / 2}, ${c2.x} ${c2.y}`;
  }

  // Corridor entre Row 0 (Client) et Row 1 (Destinataire)
  const corridorY = (r0Rect.bottom - mainRect.top + r1Rect.top - mainRect.top) / 2;

  // Tracé fluide :
  return `
    M ${c0.x} ${c0.y}
    L ${c0.x} ${-mainOffsetFromSectionTop + 40}
    C ${c0.x} ${c1.y - 120}, ${c1.x} ${c1.y - 70}, ${c1.x} ${c1.y}
    C ${c1.x} ${c1.y + 60}, ${c1.x - 40} ${corridorY}, ${c1.x - 120} ${corridorY}
    L ${c2.x + 120} ${corridorY}
    C ${c2.x + 40} ${corridorY}, ${c2.x} ${corridorY + 50}, ${c2.x} ${c2.y}
  `.replace(/\s+/g, ' ').trim();
}

export default function DeliveryJourney() {
  const sectionRef = useRef(null);
  const ctxRef = useRef(null);
  const [pathData, setPathData] = useState('');

  const buildTimeline = useCallback(() => {
    if (ctxRef.current) ctxRef.current.revert();

    const mainEl = document.querySelector('.dj-main');
    const m0 = document.querySelector('.dj-marker-0');
    const m1 = document.querySelector('.dj-marker-1');
    const r0 = document.querySelector('.dj-row-0');
    const r1 = document.querySelector('.dj-row-1');
    const box = document.querySelector('.dj-box');

    if (!sectionRef.current || !mainEl || !m0 || !m1 || !r0 || !r1 || !box) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const mainRect = mainEl.getBoundingClientRect();

    const m0Bounds = m0.getBoundingClientRect();
    const m1Bounds = m1.getBoundingClientRect();
    const r0Bounds = r0.getBoundingClientRect();
    const r1Bounds = r1.getBoundingClientRect();

    const d = generatePathString(sectionRect, mainRect, m0Bounds, m1Bounds, r0Bounds, r1Bounds);
    setPathData(d);

    const track = document.getElementById('dj-track');
    const trackBg = document.getElementById('dj-track-bg');
    if (track) track.setAttribute('d', d);
    if (trackBg) trackBg.setAttribute('d', d);

    // Calcul précis du ratio de parcours jusqu'au Client (c1)
    const c1Pos = {
      x: m0Bounds.left - mainRect.left + m0Bounds.width / 2,
      y: m0Bounds.top - mainRect.top + m0Bounds.height / 2,
    };

    let fractionC1 = 0.35;
    if (track && track.getTotalLength) {
      const totalLen = track.getTotalLength();
      let minDist = Infinity;
      let closestLen = 0;
      for (let i = 0; i <= 200; i++) {
        const len = (i / 200) * totalLen;
        const pt = track.getPointAtLength(len);
        const dist = Math.hypot(pt.x - c1Pos.x, pt.y - c1Pos.y);
        if (dist < minDist) {
          minDist = dist;
          closestLen = len;
        }
      }
      fractionC1 = closestLen / totalLen;
    }

    ctxRef.current = gsap.context(() => {
      // Timeline calée exactement sur le défilement de l'utilisateur
      // scrub: 0.6 garantit une réponse immédiate et souple au scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 80%',
          scrub: 0.6,
        },
      });

      // Étape 1 (45% du scroll vertical) :
      // La moto sort de la Hero, descend la route en haut à droite et arrive pile au Client (Row 0)
      tl.to('.dj-box', {
        duration: 0.45,
        ease: 'power1.inOut',
        motionPath: {
          path: '#dj-track',
          align: '#dj-track',
          alignOrigin: [0.5, 0.35],
          autoRotate: 90,
          start: 0,
          end: fractionC1,
        },
      });

      // Feedback visuel circulaire à l'arrivée au Client (collecte)
      tl.to('.dj-icon-avatar-0', {
        scale: 1.12,
        boxShadow: '0 0 40px rgba(0,210,255,0.7)',
        duration: 0.05,
        yoyo: true,
        repeat: 1,
      }, '-=0.05');

      // Étape 2 (55% du scroll vertical) :
      // La moto repart du Client, traverse le couloir Dakar et arrive au Destinataire (Row 1)
      tl.to('.dj-box', {
        duration: 0.55,
        ease: 'power1.out',
        motionPath: {
          path: '#dj-track',
          align: '#dj-track',
          alignOrigin: [0.5, 0.35],
          autoRotate: 90,
          start: fractionC1,
          end: 1,
        },
      });

      // Validation finale circulaire au Destinataire : pulsation de l'avatar et apparition du badge check
      tl.to('.dj-icon-avatar-1', {
        scale: 1.12,
        boxShadow: '0 0 45px rgba(0,224,140,0.8)',
        duration: 0.06,
      }, '-=0.06');

      tl.to('.dj-check-badge', {
        scale: 1,
        opacity: 1,
        duration: 0.08,
        ease: 'back.out(2.5)',
      }, '-=0.06');
    }, sectionRef);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(buildTimeline, 250);
    window.addEventListener('resize', buildTimeline);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', buildTimeline);
      if (ctxRef.current) ctxRef.current.revert();
    };
  }, [buildTimeline]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full py-24 px-6 lg:px-16 bg-cyan-deep"
      style={{ overflow: 'visible' }}
    >
      {/* Ambient background glow central */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,210,255,0.06) 0%, rgba(2,21,32,0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Texture grille / coordonnées GPS */}
      {/* <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #00D2FF 0px, #00D2FF 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #00D2FF 0px, #00D2FF 1px, transparent 1px, transparent 60px)',
        }}
      /> */}

      {/* Main Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-20">
        <SectionHeading
          title="La course de votre"
          highlight="coursier DEM"
          subtitle="Vue du ciel · Suivi en direct"
          titleColor="text-white"
          highlightClassName="text-[#00D2FF]"
          scriptColor="text-[#00D2FF]"
          titleSize="text-3xl md:text-5xl lg:text-6xl"
          subtitleSize="text-2xl md:text-3xl lg:text-4xl"
        />
        <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          En patrouille dans Dakar — votre coursier se déplace vers le client pour la collecte, puis file livrer le destinataire.
        </p>
      </div>

      {/* Main Layout */}
      <div className="dj-main relative max-w-6xl mx-auto flex flex-col gap-28 md:gap-36 w-full z-10">

        {/* SVG Circuit Path Overlay (s'étend au-delà du haut pour aller sous la hero section) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="dj-path-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0086C8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00E08C" stopOpacity="0.95" />
            </linearGradient>
            <filter id="dj-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Tracé invisible (sert de guide de trajectoire GSAP pour la moto) */}
          <path
            id="dj-track"
            d={pathData}
            fill="none"
            stroke="none"
            opacity="0"
          />
        </svg>

        {/* LE LIVREUR QUI SORT DE LA HERO SECTION ET PARCOURT LA ROUTE (FORMAT AGRANDI) */}
        <div
          className="dj-box absolute pointer-events-none"
          style={{
            width: 145,
            height: 218,
            top: 0,
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 35,
            transformOrigin: 'center 35%',
            willChange: 'transform',
          }}
        >
          {/* Fausse ombre performante avec radial-gradient au lieu d'un filtre CSS */}
          <div 
            className="absolute inset-0 translate-y-6 scale-90 opacity-80" 
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,210,255,0.3) 40%, rgba(0,0,0,0) 70%)' }} 
          />
          <div className="relative z-10">
            <LivreurTopDown size={145} />
          </div>
        </div>

        {WAYPOINTS.map((wp, index) => {
          const isEnd = wp.isLast;
          const isMarkerRight = wp.markerOnRight;

          return (
            <div
              key={wp.id}
              className={`dj-row-${index} grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center w-full relative z-40`}
            >
              {/* Colonne Marqueur */}
              <div
                className={`md:col-span-4 flex justify-center ${isMarkerRight ? 'md:justify-end md:order-2' : 'md:justify-start md:order-1'
                  }`}
              >
                <div className="dj-container relative z-40">
                  {/* Marqueur principal (100% circulaire, aucun fond carré) */}
                  <div
                    className={`dj-marker dj-marker-${index} flex flex-col items-center justify-center transition-all duration-300 group bg-transparent`}
                  >
                    {/* Grande Icône Personne avec Onde Radar Circulaire & Halo */}
                    <div className="relative mb-3 flex items-center justify-center">
                      {/* Onde Circulaire (Radar Ping en cercle) */}
                      <div
                        className="absolute -inset-2 rounded-full animate-ping pointer-events-none"
                        style={{
                          background: 'transparent',
                          border: `2px solid ${wp.color}`,
                          opacity: 0.35,
                          animationDuration: '2.5s',
                        }}
                      />

                      <div
                        className={`dj-icon-avatar-${index} w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative z-10`}
                        style={{
                          background: isEnd ? 'rgba(0, 224, 140, 0.12)' : 'rgba(0, 210, 255, 0.12)',
                          border: `2px solid ${isEnd ? 'rgba(0, 224, 140, 0.6)' : 'rgba(0, 210, 255, 0.6)'}`,
                          boxShadow: isEnd ? '0 0 35px rgba(0, 224, 140, 0.25)' : '0 0 35px rgba(0, 210, 255, 0.25)',
                          color: isEnd ? '#00E08C' : '#00D2FF',
                        }}
                      >
                        <User className="w-10 h-10 sm:w-12 sm:h-12" />
                      </div>

                      {/* Grand Badge Check au premier plan (au-dessus de la moto, non superposé) */}
                      {isEnd && (
                        <div
                          className="dj-check-badge absolute -bottom-2 -right-2 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#00E08C] text-[#021520] flex items-center justify-center shadow-[0_0_25px_rgba(0,224,140,0.85)] border-3 border-[#021520]"
                          style={{
                            transform: 'scale(0)',
                            opacity: 0,
                          }}
                        >
                          <Check className="w-6 h-6 sm:w-7 sm:h-7 stroke-[3.5]" />
                        </div>
                      )}
                    </div>

                    <span
                      className="text-sm font-black tracking-wider uppercase text-center"
                      style={{ color: isEnd ? '#00E08C' : '#FFFFFF' }}
                    >
                      {wp.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Colonne Description */}
              <div
                className={`md:col-span-8 flex flex-col justify-center ${isMarkerRight ? 'md:order-1' : 'md:order-2'
                  }`}
              >
                <div className="w-full">
                  <div className="mb-2">
                    <span
                      className={`inline-block font-serif italic text-lg sm:text-xl md:text-2xl font-light tracking-wide ${isEnd ? 'text-[#00E08C]' : 'text-[#00D2FF]'
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

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
