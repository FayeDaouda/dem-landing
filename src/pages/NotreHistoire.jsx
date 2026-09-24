import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SolutionPoint from '../components/sections/SolutionPoint.jsx';
import coursierLambda from "../assets/coursierLambda1.png"
gsap.registerPlugin(ScrollTrigger);

const SOLUTION_POINTS = [
  {
    number: "01",
    category: "Le Coursier au Centre",
    title: "Une profession, pas un plan B",
    description: "Chez DEM, le coursier n'est pas un sous-traitant jetable. C'est le premier maillon qu'on a structuré : rémunération transparente et hebdomadaire, équipement de protection complet, caisson isotherme normé, formation terrain rigoureuse et outils de navigation adaptés à Dakar. Quand le livreur est valorisé, toute la chaîne en profite.",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Coursier professionnel équipé DEM"
  },
  {
    number: "02",
    category: "L'Expérience Client",
    title: "Suivi live, paiement sécurisé & preuve de remise",
    description: "Le client final suit son colis en temps réel sur la carte, paie en ligne ou à la livraison en toute confiance, et valide la réception par code OTP. Zéro zone d'ombre, zéro litige : une expérience d'achat digne des meilleurs standards mondiaux, adaptée à Dakar.",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Expérience client suivi GPS et paiement sécurisé"
  },
  {
    number: "03",
    category: "DEM Pro · Entreprises & E-Commerce",
    title: "Portail marchand, catalogue digital & reversements 24h",
    description: "Un espace unique pour piloter toutes vos expéditions : courses groupées en un clic, lien de commande partageable sur vos réseaux, encaissement COD sécurisé avec reversement sous 24h sur Wave ou Orange Money, et facturation automatique avec votre logo et NINEA.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Portail DEM Pro et intégration e-commerce"
  },
  {
    number: "04",
    category: "Chef de Flotte",
    title: "Structurez votre flotte, rentabilisez vos coursiers",
    description: "Vous gérez déjà des livreurs ? DEM vous donne le cadre pour professionnaliser votre activité : pass prépayés dégressifs, dispatch automatique, suivi de performance par coursier et revenus prévisibles. Transformez votre flotte informelle en véritable entreprise logistique.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Gestion de flotte et tableau de bord Chef de Flotte"
  }
];

export default function NotreHistoire() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // ── RIDEAU HORIZONTAL SUR LES IMAGES PRINCIPALES ──
      const curtainWrappers = el.querySelectorAll('.h-curtain-wrapper');
      curtainWrappers.forEach((wrapper) => {
        const curtain = wrapper.querySelector('.h-curtain-panel');
        const img = wrapper.querySelector('.h-curtain-img');
        const isLeft = wrapper.getAttribute('data-curtain-origin') === 'left';

        if (curtain) {
          gsap.to(curtain, {
            scaleX: 0,
            transformOrigin: isLeft ? 'left' : 'right',
            duration: 1.15,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 85%',
            },
          });
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15 },
            {
              scale: 1,
              duration: 1.25,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top 85%',
              },
            }
          );
        }
      });

      // ── PARALLAXE FLUIDE SUR LES ÉLÉMENTS MARQUÉS .parallax-item ──
      const parallaxItems = el.querySelectorAll('.parallax-item');
      parallaxItems.forEach((item) => {
        const speed = parseFloat(item.getAttribute('data-speed') || '0.15');
        const direction = item.getAttribute('data-direction') === 'down' ? 1 : -1;

        gsap.to(item, {
          y: direction * (window.innerHeight * speed),
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white text-[#021520] min-h-screen font-['DM_Sans',sans-serif] selection:bg-[#00D2FF] selection:text-[#021520] overflow-x-clip"
    >

      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 1 — LE CONSTAT
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="constat"
        data-header-theme="white"
        className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-16 border-b border-black/10 bg-[#FAFCFD]"
      >
        <div className="max-w-[1400px] mx-auto">

          {/* Layout 2 colonnes : titre + texte à gauche / image à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

            {/* Colonne Gauche : Titre + Texte constat DEM */}
            <div className="lg:col-span-6 space-y-6">
              <MiniTitleWithBar content="01 · LE CONSTAT" color="cyan-2" />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#021520] leading-[1.05]">
                LE CONSTAT D'UN SYSTÈME DE MOBILITÉ URBAINE <br className="hidden sm:inline" />
                <span className="text-[#0086C8]">NON STRUCTURÉ</span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 font-['Poppins',sans-serif] leading-relaxed pt-2">
                <p>
                  Dakar figure parmi les métropoles les plus dynamiques d'Afrique de l'Ouest. Ses commerçants innovent, ses boutiques vendent sur les réseaux sociaux et sa population consomme à toute vitesse. Des solutions de livraison existaient déjà, mais pour les coursiers, elles restaient <strong>un véritable casse-tête financier, pensé sans eux et rarement adapté à leur réalité</strong>.
                </p>
                <p>
                  Commissions trop élevées, reversements tardifs, aucune visibilité sur les gains de la journée, zéro couverture en cas de litige : les livreurs portaient le système sur leurs épaules sans en tirer un revenu juste. Côté commerçants, le résultat se faisait sentir, retards chroniques, coursiers démotivés, encaissements opaques et confiance client qui s'effritait à chaque colis.
                </p>
                <p>
                  Les motos ne manquaient pas à Dakar, et les plateformes non plus. Ce qui manquait, c'était un modèle qui prenne enfin en compte le coursier, qui sécurise ses revenus, simplifie son quotidien et transforme un métier subi en véritable profession.
                </p>
              </div>
            </div>

            {/* Colonne Droite : Image illustrant le constat avec parallaxe étagée */}
            <div className="lg:col-span-6 relative mt-8 lg:mt-0 pb-16 sm:pb-24">
              <div className="relative w-full">

                {/* Image Principale — Coursier lambda */}
                <div
                  className="parallax-item relative z-10 w-full aspect-[4/5] bg-slate-200 border border-black/10 shadow-2xl overflow-hidden h-curtain-wrapper"
                  data-speed="0.1"
                  data-direction="up"
                  data-curtain-origin="right"
                >
                  <img
                    src={coursierLambda}
                    alt="Coursier lambda à moto dans les rues de Dakar"
                    className="h-curtain-img w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 will-change-transform"
                  />
                  <div className="h-curtain-panel absolute inset-0 z-20 pointer-events-none bg-[#0086C8]" />
                  <div className="absolute top-4 left-4 z-30 bg-[#021520]/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                    FIG. 01 — RÉALITÉ URBAINE
                  </div>
                </div>

                {/* Badge Flottant en Parallaxe */}
                <div
                  className="parallax-item absolute top-1/4 -left-2 sm:-left-8 bg-[#00D2FF] text-[#021520] p-4 sm:p-6 shadow-xl z-30 max-w-[220px] border border-black/10"
                  data-speed="0.18"
                  data-direction="down"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
                    ÉTAT DES LIEUX
                  </span>
                  <p className="text-xs font-black uppercase leading-tight m-0 font-['DM_Sans',sans-serif]">
                    Passer de l'anarchie urbaine à la synchronisation en temps réel.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* En bas du bloc : 3 à 4 témoignages ressortis de l'étude de marché */}
          <div className="mt-2 pt-8 border-t border-black/10">
            <div className="mb-5">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0086C8] block mb-2">
                Enquête de Terrain · Dakar
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#021520] tracking-tight">
                Témoignages ressortis de l'étude de marché
              </h3>
            </div>

            {/* Grille des 4 témoignages (zéro arrondi, bordures nettes style magazine) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">

              {/* Témoignage 1 */}
              <div className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#0086C8] mb-4">
                    /01 · E-Commerce
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « Avant DEM, chaque livraison était une angoisse. Les coursiers ne répondaient plus, arrivaient avec 4 heures de retard, et les clientes finissaient par annuler la commande. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Aïssatou N.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Boutique Mode & Cosmétiques, Almadies</div>
                </div>
              </div>

              {/* Témoignage 2 */}
              <div className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#0086C8] mb-4">
                    /02 · Restauration
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « Livrer des repas chauds à Dakar tenait du miracle. Sans caisson étanche ni localisation précise, la nourriture arrivait froide et le client refusait d'encaisser. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Mamadou D.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Gérant d'enseigne, Plateau</div>
                </div>
              </div>

              {/* Témoignage 3 */}
              <div className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#0086C8] mb-4">
                    /03 · Consommateur
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « Le livreur qui m'appelle 5 fois pour demander "vous êtes vers où ?", qui n'a pas la monnaie sur 10 000 FCFA et qui se pointe quand je suis déjà repartie... C'était invivable. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Yacine S.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Acheteuse active, Mermoz</div>
                </div>
              </div>

              {/* Témoignage 4 */}
              <div className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#0086C8] mb-4">
                    /04 · Coursier
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « On roulait 12 heures par jour sans contrat, sans équipement de pluie ni casque sécurisé, à négocier chaque course sans garantie d'être payé en fin de semaine. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Ibrahima T.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Coursier Moto (ex-informel)</div>
                </div>
              </div>

            </div>

            {/* Ligne de statistiques du Bloc 1 */}
            <div className="mt-8 border border-black/10 bg-[#021520] text-white">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

                <div className="p-8 lg:p-10 flex flex-col justify-center text-left">
                  <span className="font-['DM_Sans',sans-serif] text-4xl sm:text-6xl font-black text-[#00D2FF] block mb-2 tracking-tight">
                    +4h
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                    Délai moyen antérieur sans DEM
                  </span>
                </div>

                <div className="p-8 lg:p-10 flex flex-col justify-center text-left">
                  <span className="font-['DM_Sans',sans-serif] text-4xl sm:text-6xl font-black text-white block mb-2 tracking-tight">
                    &lt; 25%
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                    Taux de satisfaction inférieur à 25%
                  </span>
                </div>

                <div className="p-8 lg:p-10 flex flex-col justify-center text-left">
                  <span className="font-['DM_Sans',sans-serif] text-4xl sm:text-6xl font-black text-[#0086C8] block mb-2 tracking-tight">
                    35%
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                    Taux moyen d'échec ou d'annulation
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 2 — NOTRE VISION, NOTRE AMBITION, NOS ACTIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="vision-ambition-actions"
        data-header-theme="white"
        className="w-full py-24 lg:py-36 px-6 lg:px-16 bg-white border-b border-black/10"
      >
        <div className="max-w-[1400px] mx-auto">

          {/* Petit texte de récap */}
          <div className="max-w-3xl mb-16">
            <MiniTitleWithBar content="02 · NOTRE CAP STRATÉGIQUE" color="cyan-2" />

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#021520] tracking-tight leading-[1.08] mt-4 mb-6">
              Notre Vision, notre ambition, nos actions
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-['Poppins',sans-serif] leading-relaxed">
              Face à un écosystème qui oubliait ceux qui le font tourner, DEM a été créé avec une mission claire : repenser la mobilité urbaine dakaroise en plaçant le coursier au centre — avec une infrastructure technologique fiable, des revenus sécurisés et une considération humaine à chaque maillon. Notre cap s'articule autour de trois piliers fondamentaux.
            </p>
          </div>

          {/* 3 points : Vision / Ambition / Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">

            {/* 1 pour la Vision */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="font-serif italic text-2xl font-light text-[#0086C8] mb-6 block">
                  /01 · Notre Vision
                </span>
                <p className="text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                  Bâtir le premier écosystème de mobilité commerciale en Afrique de l'Ouest qui valorise autant le coursier que le commerçant. Un modèle où chaque livreur dispose d'outils dignes de ce nom, et où chaque commerce, de la créatrice indépendante au grand compte, accède à une logistique de classe mondiale.
                </p>
              </div>
            </div>

            {/* 1 pour l'Ambition */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="font-serif italic text-2xl font-light text-[#0086C8] mb-6 block">
                  /02 · Notre Ambition
                </span>
                <p className="text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                  Devenir le réflexe incontournable de la livraison Same-Day à Dakar et dans la sous-région, en prouvant qu'un coursier bien équipé et justement rémunéré livre mieux. Notre standard : 99,4% de réussite, des délais de 20 à 45 minutes et une digitalisation totale des flux financiers.
                </p>
              </div>
            </div>

            {/* 1 pour les Actions */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="font-serif italic text-2xl font-light text-[#0086C8] mb-6 block">
                  /03 · Nos Actions
                </span>
                <p className="text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                  Développer des algorithmes contextuels adaptés à la réalité dakaroise, sécuriser les revenus de nos coursiers avec des reversements transparents sous 24h.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 3 — LA SOLUTION DEM (ALTERNANCE GAUCHE / DROITE STRICTE)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="solution-dem"
        data-header-theme="white"
        className="w-full py-24 lg:py-36 px-6 lg:px-16 bg-[#FAFCFD] border-b border-black/10"
      >
        <div className="max-w-[1400px] mx-auto">

          {/* Grand titre affiché : LA SOLUTION DEM */}
          <div className="max-w-3xl mb-24 lg:mb-32">
            <MiniTitleWithBar content="03 · NOTRE RÉPONSE TECHNOLOGIQUE & OPÉRATIONNELLE" color="cyan-2" />
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase text-[#021520] tracking-tight leading-none mt-4">
              LA SOLUTION <span className="text-[#0086C8]">DEM</span>
            </h2>
          </div>

          {/* 3 à 4 points max, chacun avec illustration, en alternance gauche/droite */}
          <div className="space-y-16 lg:space-y-24">
            {SOLUTION_POINTS.map((point, index) => (
              <SolutionPoint
                key={point.number}
                number={point.number}
                category={point.category}
                title={point.title}
                description={point.description}
                image={point.image}
                imageAlt={point.imageAlt}
                isReversed={index % 2 !== 0}
              />
            ))}
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 4 — LE POTENTIEL DE LA MOBILITÉ URBAINE À DAKAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="potentiel-dakar"
        data-header-theme="black"
        className="w-full py-24 lg:py-36 px-6 lg:px-16 bg-[#021520] text-white border-b border-white/10 relative overflow-hidden"
      >

        <div className="max-w-[1400px] mx-auto relative z-10">

          <div className="max-w-3xl mb-16">
            <MiniTitleWithBar content="04 · PERSPECTIVES & DÉVELOPPEMENT" color="cyan-glow" />

            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mt-4 mb-6">
              Le potentiel de la mobilité <br className="hidden sm:inline" />
              <span className="text-[#00D2FF]">urbaine à Dakar</span>
            </h2>

            <p className="text-base sm:text-lg text-white/80 font-['Poppins',sans-serif] leading-relaxed">
              Dakar concentre près de 25% de la population nationale et 80% des activités économiques du Sénégal sur une presqu'île de 550 km². Cette densité crée une demande massive de livraison. Pour les coursiers, c'est à la fois une opportunité immense et un défi quotidien que DEM transforme en levier de croissance.
            </p>
          </div>

          {/* Grille des 3 dimensions du potentiel à Dakar */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.02]">

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-xl text-[#00D2FF] block mb-4">
                  01 · Saturation & Géographie
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-4">
                  La presqu'île en entonnoir
                </h3>
                <p className="text-sm text-white/70 font-['Poppins',sans-serif] leading-relaxed mb-6">
                  Axes saturés, embouteillages chroniques : le deux-roues reste le seul moyen de garantir des flux rapides entre le Plateau, les Almadies, la banlieue et Diamniadio. Les coursiers qui maîtrisent ce terrain sont la colonne vertébrale de la logistique dakaroise.
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-xl text-[#00D2FF] block mb-4">
                  02 · Commerce Numérique
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-4">
                  L'explosion du Social Commerce
                </h3>
                <p className="text-sm text-white/70 font-['Poppins',sans-serif] leading-relaxed mb-6">
                  Des milliers de commerces vendent via WhatsApp, Instagram et TikTok. Chaque vente doit être livrée dans l'heure. Pour le coursier, c'est un volume de courses en croissance constante, à condition d'avoir les bons outils pour le capter.
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-xl text-[#00D2FF] block mb-4">
                  03 · Fintech & Inclusion
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-4">
                  L'interconnexion Mobile Money
                </h3>
                <p className="text-sm text-white/70 font-['Poppins',sans-serif] leading-relaxed mb-6">
                  Wave et Orange Money permettent enfin de synchroniser le déplacement du colis et le transfert d'argent. Pour le coursier, c'est la fin des litiges sur les espèces et la garantie d'être payé rapidement, sans intermédiaire opaque.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 5 — CLÔTURE
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="cloture"
        data-header-theme="black"
        className="w-full py-28 lg:py-44 px-6 lg:px-16 bg-[#010D14] text-white border-t border-white/10 relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto text-center relative z-10">

          <blockquote className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white max-w-5xl mx-auto">
            « Nous ne déplaçons pas seulement des colis. <br className="hidden sm:inline" />
            <span className="text-[#00D2FF]">
              Nous donnons aux coursiers
            </span>{' '}
            les moyens de transformer <br className="hidden sm:inline" />
            Dakar, <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>course après course.</span> »
          </blockquote>

          <div className="w-16 h-[2px] bg-[#00D2FF] mx-auto mt-12" />

        </div>
      </section>

    </div>
  );
}
