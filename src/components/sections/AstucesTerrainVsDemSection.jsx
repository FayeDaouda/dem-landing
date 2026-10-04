import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import {
  Clock,
  Calendar,
  MapPin,
  Navigation,
  Coins,
  Wallet,
  CloudRain,
  Compass,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AstucesTerrainVsDemSection() {
  const sectionRef = useRef(null);

  const comparisons = [
    {
      num: "01",
      topic: "Gestion du temps & trafic",
      dakar: {
        title: "ANTICIPEZ LES HEURES DE POINTE",
        desc: "Le matin et en fin de journée, les grands axes sont chargés. Partez un peu plus tôt, ou décalez vos trajets quand c'est possible.",
        icon: Clock
      },
      dem: {
        title: "PROGRAMMEZ VOS LIVRAISONS",
        desc: "Depuis votre compte Pro, programmez à l'avance les envois qui ne pressent pas, et évitez les créneaux chargés.",
        icon: Calendar
      }
    },
    {
      num: "02",
      topic: "Localisation & Adressage",
      dakar: {
        title: "DONNEZ UN REPÈRE CLAIR",
        desc: "À Dakar, un bon repère vaut mieux qu'une longue explication : « en face de la pharmacie », « derrière la mosquée ». Le chauffeur ou le coursier vous trouve du premier coup.",
        icon: MapPin
      },
      dem: {
        title: "AJOUTEZ UN REPÈRE À VOTRE ADRESSE",
        desc: "Précisez-le directement dans l'app : votre coursier arrive sans avoir besoin de vous appeler.",
        icon: Navigation
      }
    },
    {
      num: "03",
      topic: "Paiement & Monnaie",
      dakar: {
        title: "PRÉVOYEZ LA MONNAIE",
        desc: "Billet trop gros, pas de monnaie : c'est l'une des tensions les plus courantes. Préparez l'appoint ou payez par mobile money quand c'est possible.",
        icon: Coins
      },
      dem: {
        title: "PAYEZ EN MOBILE MONEY",
        desc: "Dans l'app DEM, payez en mobile money ou en espèces : vous choisissez, sans mauvaise surprise.",
        icon: Wallet
      }
    },
    {
      num: "04",
      topic: "Météo & Imprévus",
      dakar: {
        title: "PENDANT L'HIVERNAGE, PRUDENCE",
        desc: "Après une grosse pluie, certaines rues sont inondées. Ralentissez, évitez les flaques profondes et prévoyez plus de temps pour vos trajets.",
        icon: CloudRain
      },
      dem: {
        title: "SUIVEZ VOTRE COURSE EN TEMPS RÉEL",
        desc: "Pluie, bouchons, imprévus : suivez votre coursier sur la carte et partagez le lien de suivi à votre destinataire.",
        icon: Compass
      }
    },
    {
      num: "05",
      topic: "Sécurité & Assistance",
      dakar: {
        title: "LA SÉCURITÉ D'ABORD",
        desc: "Casque attaché à moto, ceinture en voiture, téléphone rangé en roulant : quelques secondes qui peuvent tout changer.",
        icon: ShieldCheck
      },
      dem: {
        title: "UNE QUESTION ? ÉCRIVEZ À ADJA",
        desc: "Adja, notre assistant IA, répond en quelques secondes, et un membre de l'équipe prend le relais si besoin.",
        icon: Sparkles
      }
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Heading split curtain ──
      const headings = sectionRef.current.querySelectorAll('[data-tv="heading"]');
      headings.forEach(heading => {
        const words = heading.textContent.trim().split(/\s+/);
        heading.innerHTML = words.map(w =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span style="display:inline-block;" class="tv-word">${w}</span>` +
          `</span>`
        ).join(' ');
        gsap.fromTo(heading.querySelectorAll('.tv-word'),
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045,
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true }
          }
        );
      });

      // ── Headers colonnes : curtain expand ──
      gsap.fromTo('[data-tv="col-header"]',
        { y: 40, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
          duration: 1.0, ease: 'expo.out', stagger: 0.15,
          scrollTrigger: { trigger: '[data-tv="table"]', start: 'top 82%', once: true }
        }
      );

      // ── Lignes comparaison : alternance gauche/droite ──
      sectionRef.current.querySelectorAll('[data-tv="row"]').forEach((row) => {
        const leftCol = row.querySelector('[data-tv-col="left"]');
        const rightCol = row.querySelector('[data-tv-col="right"]');

        if (leftCol) {
          gsap.fromTo(leftCol,
            { x: -60, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
            {
              x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)',
              duration: 1.0, ease: 'expo.out',
              scrollTrigger: { trigger: row, start: 'top 88%', once: true }
            }
          );
        }
        if (rightCol) {
          gsap.fromTo(rightCol,
            { x: 60, opacity: 0, clipPath: 'inset(0 0 0 100%)' },
            {
              x: 0, opacity: 1, clipPath: 'inset(0 0 0 0%)',
              duration: 1.0, ease: 'expo.out', delay: 0.1,
              scrollTrigger: { trigger: row, start: 'top 88%', once: true }
            }
          );
        }
      });

      // ── Numéros de ligne ──
      gsap.fromTo('[data-tv="num"]',
        { scale: 0.6, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1,
          scrollTrigger: { trigger: '[data-tv="table"]', start: 'top 82%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-slate-50 font-['DM_Sans',sans-serif] scroll-mt-14" id="bloc-astuces">
      <div className="max-w-[1400px] mx-auto">

        {/* En-tête de section */}
        <div className="mb-16">
          <MiniTitleWithBar content="3 · ASTUCES" />

          {/* Titre animé */}
          <div className="mt-4 overflow-hidden">
            <h2
              data-tv="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-dark leading-[1.05] tracking-tight"
            >
              BIEN CIRCULER DANS DAKAR,
            </h2>
            <h2
              data-tv="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-[#0086C8] leading-[1.05] tracking-tight"
            >
              MIEUX UTILISER L'APP DEM.
            </h2>
          </div>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
            Des conseils concrets pour fluidifier vos déplacements dans la capitale et tirer le meilleur parti des fonctionnalités de l'application DEM au quotidien.
          </p>
        </div>

        {/* Tableau comparatif / Face-à-face */}
        <div data-tv="table" className="border border-black/10 bg-white overflow-hidden shadow-sm">

          {/* Header 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10">

            {/* Colonne Gauche : ASTUCES DAKAR */}
            <div data-tv="col-header" className="p-8 lg:p-10 bg-slate-100/70">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#021520] font-['DM_Sans',sans-serif] px-2 py-0.5 bg-slate-200 border border-slate-300">
                  ASTUCES DAKAR
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif] mb-2">
                BIEN CIRCULER DANS DAKAR
              </h3>
              <p className="text-sm text-slate-600 font-['Poppins',sans-serif] m-0">
                Des conseils pour tous : chauffeurs de taxi ou de VTC, coursiers et particuliers.
              </p>
            </div>

            {/* Colonne Droite : ASTUCES APP DEM */}
            <div data-tv="col-header" className="p-8 lg:p-10 bg-cyan/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0086C8] font-['DM_Sans',sans-serif] px-2 py-0.5 bg-cyan/20 border border-cyan/30">
                  ASTUCES APP DEM
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif] mb-2">
                BIEN UTILISER L'APP DEM
              </h3>
              <p className="text-sm text-slate-700 font-['Poppins',sans-serif] m-0 font-medium">
                Quelques réflexes pour envoyer, suivre et recevoir sans stress.
              </p>
            </div>

          </div>

          {/* Lignes de comparaison / Conseils en miroir */}
          <div className="divide-y divide-black/10">
            {comparisons.map((row, idx) => {
              const DakarIcon = row.dakar.icon;
              const DemIcon = row.dem.icon;

              return (
                <div
                  key={idx}
                  data-tv="row"
                  className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/10 group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Côté Gauche - Astuces Dakar */}
                  <div data-tv-col="left" className="p-6 sm:p-8 lg:p-10 flex items-start gap-4 sm:gap-5 bg-white relative">
                    <span
                      data-tv="num"
                      className="absolute top-4 right-4 text-[11px] font-mono font-bold text-slate-200 select-none"
                    >
                      {row.num}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-slate-100 text-[#021520] flex items-center justify-center shrink-0 border border-slate-200">
                      <DakarIcon size={20} />
                    </div>
                    <div className="flex-1">
                      
                      <h4 className="text-base sm:text-lg font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                        {row.dakar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                        {row.dakar.desc}
                      </p>
                    </div>
                  </div>

                  {/* Côté Droit - Astuces App DEM */}
                  <div data-tv-col="right" className="p-6 sm:p-8 lg:p-10 flex items-start gap-4 sm:gap-5 bg-cyan/[0.02] border-t lg:border-t-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-cyan/20 text-[#0086C8] flex items-center justify-center shrink-0 border border-cyan/30">
                      <DemIcon size={20} />
                    </div>
                    <div className="flex-1">
                      
                      <h4 className="text-base sm:text-lg font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                        {row.dem.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-['Poppins',sans-serif] m-0">
                        {row.dem.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
