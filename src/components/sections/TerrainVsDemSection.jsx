import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';
import { 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  UserX,
  UserCheck,
  Banknote,
  Wallet,
  MapPinOff,
  Navigation,
  PhoneOff,
  Zap,
  ShoppingBag,
  FileCheck2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TerrainVsDemSection() {
  const sectionRef = useRef(null);

  const scrollToPricing = () => {
    const el = document.getElementById('tarifs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const comparisons = [
    {
      num: "01",
      topic: "Qualité du coursier",
      problem: {
        title: "Livreurs non formés & retards imprévisibles",
        desc: "Coursiers indépendants sans engagement, joignables de manière aléatoire, retards chroniques et attitude négligée qui ternit l'image de votre marque.",
        icon: UserX
      },
      solution: {
        title: "Livreurs professionnels, formés & certifiés",
        desc: "Des coursiers formés aux standards du service client, habillés avec soin, ponctuels et respectueux, ambassadeurs fidèles de votre enseigne.",
        icon: UserCheck
      }
    },
    {
      num: "02",
      topic: "Gestion financière",
      problem: {
        title: "Encaissements COD opaques & trésorerie bloquée",
        desc: "L'argent liquide circule sans reçu ni traçabilité pendant des jours. Risques élevés de perte, d'impayés et réconciliations manuelles épuisantes.",
        icon: Banknote
      },
      solution: {
        title: "Reversements COD sous 24h & Wallet sécurisé",
        desc: "Encaissement sécurisé (Espèces, Wave, OM). Montants crédités immédiatement sur votre Wallet DEM Pro et reversés sous 24h ouvrées sur votre compte.",
        icon: Wallet
      }
    },
    {
      num: "03",
      topic: "Visibilité & litiges",
      problem: {
        title: "Zéro visibilité & contestations permanentes",
        desc: "Aucune géolocalisation. Vous passez vos journées à répondre « Où est ma commande ? », sans pouvoir prouver la remise effective du colis au client.",
        icon: MapPinOff
      },
      solution: {
        title: "Traçabilité GPS live & preuve par code OTP",
        desc: "Lien de suivi temps réel sur carte envoyé à l'acheteur. Remise sécurisée obligatoirement verrouillée par code secret OTP ou signature : 0 litige.",
        icon: Navigation
      }
    },
    {
      num: "04",
      topic: "Organisation opérationnelle",
      problem: {
        title: "Perte de temps épuisante au téléphone",
        desc: "Négocier chaque course au cas par cas, partager des repères approximatifs par messages vocaux WhatsApp et rappeler 5 livreurs différents.",
        icon: PhoneOff
      },
      solution: {
        title: "Expéditions groupées & programmées en 1 clic",
        desc: "Lancez jusqu'à 8 courses simultanées ou planifiez vos tournées sur toute la semaine depuis l'application, sans passer le moindre coup de fil.",
        icon: Zap
      }
    },
    {
      num: "05",
      topic: "Vente & administration",
      problem: {
        title: "Commandes manuelles & rupture de stock",
        desc: "Prise de commande éparpillée dans les DM Instagram et WhatsApp, pas de facturation conforme, erreurs d'adresses et pertes régulières de commandes.",
        icon: ShoppingBag
      },
      solution: {
        title: "Mini-boutique en ligne & facturation automatique",
        desc: "Lien de commande prêt à l'emploi avec gestion de stock en temps réel et émission instantanée de factures officielles portant votre logo et NINEA.",
        icon: FileCheck2
      }
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading split curtain ──
      const heading = sectionRef.current.querySelector('[data-tv="heading"]');
      if (heading) {
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
      }

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
      sectionRef.current.querySelectorAll('[data-tv="row"]').forEach((row, idx) => {
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

      // ── Numéros de ligne : scale reveal ──
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
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-slate-50 font-['DM_Sans',sans-serif]" id="comparatif-terrain">
      <div className="max-w-[1400px] mx-auto">
        
        {/* En-tête de section */}
        <div className="mb-16">
          <MiniTitleWithBar content="RÉALITÉ DU MARCHÉ VS EXPÉRIENCE DEM" />

          {/* Titre animé */}
          <div className="mt-4 overflow-hidden">
            <h2
              data-tv="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-dark leading-[1.05] tracking-tight"
            >
              Ce qui freine vos livraisons vs Le standard DEM Pro
            </h2>
          </div>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
            À Dakar et dans les métropoles africaines, la livraison informelle est le premier goulet d'étranglement des commerçants et e-commerçants. Découvrez concrètement le fossé qui sépare la débrouille quotidienne du standard professionnel DEM Pro.
          </p>
        </div>

        {/* Tableau comparatif */}
        <div data-tv="table" className="border border-black/10 bg-white overflow-hidden shadow-sm">
          
          {/* Header 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            
            <div data-tv="col-header" className="p-8 lg:p-10 bg-rose-50/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-rose-700 font-['DM_Sans',sans-serif]">
                  Le quotidien informel
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif] mb-2">
                Les frictions rencontrées sur le terrain
              </h3>
              <p className="text-sm text-slate-600 font-['Poppins',sans-serif] m-0">
                Ce qui vous coûte du temps, bloque votre trésorerie et détruit la confiance de vos acheteurs.
              </p>
            </div>

            <div data-tv="col-header" className="p-8 lg:p-10 bg-cyan/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0086C8] font-['DM_Sans',sans-serif]">
                  Avec DEM Pro 
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif] mb-2">
                Les solutions concrètes apportées par DEM
              </h3>
              <p className="text-sm text-slate-700 font-['Poppins',sans-serif] m-0 font-medium">
                Une infrastructure technologique et humaine pensée pour propulser vos ventes en toute sérénité.
              </p>
            </div>

          </div>

          {/* Lignes de comparaison */}
          <div className="divide-y divide-black/10">
            {comparisons.map((row, idx) => {
              const ProbIcon = row.problem.icon;
              const SolIcon = row.solution.icon;

              return (
                <div 
                  key={idx}
                  data-tv="row"
                  className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/10 group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Numéro de ligne – verticalement centré */}
                  {/* Côté Gauche - Problème Terrain */}
                  <div data-tv-col="left" className="p-6 sm:p-8 lg:p-10 flex items-start gap-4 sm:gap-5 bg-white relative">
                    <span
                      data-tv="num"
                      className="absolute top-4 right-4 text-[11px] font-mono font-bold text-slate-200 select-none"
                    >
                      {row.num}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                      <ProbIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1 font-['DM_Sans',sans-serif]">
                        {row.topic}
                      </p>
                      <h4 className="text-base sm:text-lg font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                        {row.problem.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                        {row.problem.desc}
                      </p>
                    </div>
                  </div>

                  {/* Côté Droit - Solution DEM */}
                  <div data-tv-col="right" className="p-6 sm:p-8 lg:p-10 flex items-start gap-4 sm:gap-5 bg-cyan/[0.02] border-t lg:border-t-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-cyan/20 text-[#0086C8] flex items-center justify-center shrink-0 border border-cyan/30">
                      <SolIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-[#0086C8] mb-1 font-['DM_Sans',sans-serif]">
                        Solution DEM
                      </p>
                      <h4 className="text-base sm:text-lg font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                        {row.solution.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-['Poppins',sans-serif] m-0">
                        {row.solution.desc}
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
