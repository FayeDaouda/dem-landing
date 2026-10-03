import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';
import {
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
        title: "TENSIONS AVEC VOS CLIENTS & COURSES MAL GÉRÉES",
        desc: "Pas de monnaie au moment de payer, un ton déplacé, une course mal organisée : chaque incident à la livraison, c'est votre client qui le vit et votre marque qui en paie le prix.",
        icon: UserX
      },
      solution: {
        title: "DES COURSIERS FORMÉS & UNE ÉQUIPE QUI VEILLE",
        desc: "Des coursiers formés au service client : ponctuels, présentables et courtois, de vrais ambassadeurs de votre enseigne. Le client peut payer en mobile money, nos coursiers sont équipés pour rendre la monnaie, et en cas de souci, un agent DEM intervient directement pour le régler.",
        icon: UserCheck
      }
    },
    {
      num: "02",
      topic: "Gestion financière",
      problem: {
        title: "ENCAISSEMENTS FLOUS & TRÉSORERIE BLOQUÉE",
        desc: "L'argent des livraisons circule en liquide, sans reçu ni traçabilité, parfois pendant des jours. Résultat : des pertes, des impayés et des comptes à refaire à la main.",
        icon: Banknote
      },
      solution: {
        title: "ENCAISSEMENTS SÉCURISÉS & WALLET CRÉDITÉ INSTANTANÉMENT",
        desc: "Vos clients paient en mobile money, directement sur votre wallet DEM Pro, ou en espèces au coursier, qui vous les reverse directement après la course. Chaque paiement est sécurisé, tracé et visible à tout moment.",
        icon: Wallet
      }
    },
    {
      num: "03",
      topic: "SUIVI & LITIGES",
      problem: {
        title: "AUCUNE VISIBILITÉ & CONTESTATIONS À RÉPÉTITION",
        desc: "Impossible de savoir où est le coursier. Vous passez vos journées à répondre « ma commande est où ? », sans pouvoir prouver que le colis a bien été remis.",
        icon: MapPinOff
      },
      solution: {
        title: "SUIVI EN TEMPS RÉEL & HISTORIQUE COMPLET",
        desc: "Vous savez à chaque instant où se trouve le coursier, et vous pouvez envoyer à votre client un lien pour qu'il suive sa commande lui-même. Une fois le colis remis, le coursier peut envoyer une photo comme preuve. Et votre historique garde une trace claire de chaque commande : le jour, l'heure, le produit et le mode de paiement.",
        icon: Navigation
      }
    },
    {
      num: "04",
      topic: "Organisation opérationnelle",
      problem: {
        title: "DES HEURES PERDUES AU TÉLÉPHONE",
        desc: "Négocier le prix de chaque course, expliquer l'adresse en vocal WhatsApp, rappeler plusieurs coursiers pour en trouver un de disponible.",
        icon: PhoneOff
      },
      solution: {
        title: "EXPÉDITIONS GROUPÉES & PROGRAMMÉES EN 1 CLIC",
        desc: "Préparez tranquillement vos commandes, puis lancez plusieurs courses d'un coup ou programmez vos livraisons à l'avance, directement depuis votre compte Pro. Le prix est fixé par zone, l'adresse est claire pour le coursier et vous suivez tout en temps réel. Vous restez concentré sur ce qui compte vraiment : faire grandir votre business.",
        icon: Zap
      }
    },
    {
      num: "05",
      topic: "Vente & administration",
      problem: {
        title: "COMMANDES ÉPARPILLÉES & GESTION ARCHAÏQUE",
        desc: "Des commandes qui arrivent de partout, dans les DM Instagram, TikTok, WhatsApp ou par appel, notées à la main sur un cahier ou dans un coin du téléphone, et qu'on finit par mélanger. Des clients qui attendent une réponse, des heures passées à tout recopier, et pas de vision précise sur ce qui a été vendu dans la journée, la semaine ou le mois.",
        icon: ShoppingBag
      },
      solution: {
        title: "MINI-BOUTIQUE EN LIGNE & FACTURATION AUTOMATIQUE",
        desc: "Un catalogue et un lien de commande prêts à partager sur Instagram, TikTok et WhatsApp : vos clients commandent tout seuls, chaque commande arrive rangée au même endroit et votre stock se met à jour automatiquement. Vos factures à votre logo se génèrent toutes seules, et vous suivez vos ventes jour après jour depuis votre compte Pro.",
        icon: FileCheck2
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
          <MiniTitleWithBar content="La valeur ajoutée DEM Pro" />

          {/* Titre animé */}
          <div className="mt-4 overflow-hidden">
            <h2
              data-tv="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-dark leading-[1.05] tracking-tight"
            >
              CE QUE VOUS VIVEZ,
            </h2>
            <h2
              data-tv="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-[#0086C8] leading-[1.05] tracking-tight"
            >
              CE QUE NOUS CHANGEONS.
            </h2>
          </div>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
            À Dakar, vendre, livrer, encaisser et suivre ses clients reste un vrai casse-tête pour les commerçants, les e-commerçants et les restaurateurs. <br />Voici, concrètement, l'écart entre la débrouille du quotidien et le standard professionnel <b>DEM Pro</b>.
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
                Ce qui vous coûte du temps, bloque votre trésorerie et détruit la confiance de vos clients.
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
