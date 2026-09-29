import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SolutionPoint from '../components/sections/SolutionPoint.jsx';
import coursierLambda from "../assets/img/coursierLambda2.jpg"
import PiliersSection from '../components/sections/PiliersSection.jsx';
import { piliersData } from '../data/servicesData.js';

gsap.registerPlugin(ScrollTrigger);

const SOLUTION_POINTS = [
  {
    number: "1",
    category: "Le Coursier au Centre",
    title: "Une profession, pas un plan B",
    description: "Chez DEM, le coursier est au cœur du modèle. C'est le premier maillon qu'on a structuré, avec des revenus transparents, un équipement de protection, une formation terrain et des outils de navigation adaptés à Dakar. Quand le coursier est respecté, toute la chaîne en profite.",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Coursier professionnel équipé DEM"
  },
  {
    number: "2",
    category: "L'Expérience Client",
    title: "SUIVI LIVE, PAIEMENT SÉCURISÉ ",
    description: "Suivez votre colis en temps réel sur la carte. Votre prix est connu dès la commande, et vous payez en ligne ou à la livraison, en toute confiance. À chaque étape, notre service client est à vos côtés en cas de besoin, de la commande jusqu'à la réception. Tout est clair, du départ à l'arrivée : une expérience au niveau des meilleurs, pensée pour Dakar.",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Expérience client suivi GPS et paiement sécurisé"
  },
  {
    number: "3",
    category: "DEM Pro · Entreprises & E-Commerce",
    title: "Portail marchand, catalogue digital et wallet instantané",
    description: "Un seul espace pour piloter toutes vos ventes et vos livraisons. Lancez plusieurs courses en un clic, partagez votre lien de commande sur vos réseaux, et laissez vos factures se générer automatiquement, avec votre logo et votre NINEA si vous le souhaitez. Tout pour vendre plus, sans vous prendre la tête.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Portail DEM Pro et intégration e-commerce"
  },
  {
    number: "4",
    category: "Chef de Flotte",
    title: "Structurez votre flotte, développez votre activité",
    description: "Vous gérez déjà des coursiers ? DEM vous donne le cadre pour professionnaliser votre activité : des pass prépayés dégressifs, un dispatch automatique et des revenus plus prévisibles. Avec votre compte DEM Chef de flotte, vous suivez la performance de chaque coursier à tout instant, sur téléphone, tablette ou ordinateur. Et nous formons vos coursiers à notre méthode de travail. Votre flotte devient une vraie entreprise logistique.",
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
        className="relative w-full pt-32 pb-12 lg:pt-40 lg:pb-32 px-6 lg:px-16 border-b border-black/10 bg-[#FAFCFD]"
      >
        <div className="max-w-[1400px] mx-auto">

          {/* Layout 2 colonnes : titre + texte à gauche / image à droite */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

            {/* Colonne Gauche : Titre + Texte constat DEM */}
            <div className="lg:col-span-6 space-y-6">
              <MiniTitleWithBar content="1 · LE CONSTAT" color="cyan-2" />

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-cyan-2 leading-[1.05]">
                DES MOTOS PARTOUT, <br className="hidden sm:inline" />
                <span className="text-dark-3">UN SYSTÈME STRUCTURÉ NULLE PART</span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 font-['Poppins',sans-serif] leading-relaxed pt-2">
                <p>
                  Dakar figure parmi les métropoles les plus dynamiques d'Afrique de l'Ouest. Le mobile money l'a prouvé : il a transformé notre façon de payer et d'encaisser.

                  Mais la logistique attend encore sa structuration. Les solutions de livraison existantes ont été pensées sans les coursiers : commissions élevées, paiements en retard, aucun suivi, un service client quasi absent.

                </p>
                <p>
                  Pour les pros, l'enjeu va plus loin. Chaque livraison porte leur nom. Sans professionnalisme, un seul retard suffit, et c'est leur marque que le client retient.

                </p>
                <p>
                  Il manquait un modèle qui structure le secteur et place enfin le coursier au centre : des revenus sécurisés, un vrai métier. Et un client qui en a enfin pour son argent.

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
                    Passer de l'anarchie urbaine à une logistique structurée
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Ligne de statistiques du Bloc 1 */}
          <div className="mt-8 border border-black/10 bg-[#021520] text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

              <div className="p-8 lg:p-10 flex flex-col justify-center text-left">
                <span className="font-['DM_Sans',sans-serif] text-4xl sm:text-6xl font-black text-[#00D2FF] block mb-2 tracking-tight">
                  +2h
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                  Délai moyen antérieur sans DEM
                </span>
              </div>

              <div className="p-8 lg:p-10 flex flex-col justify-center text-left">
                <span className="font-['DM_Sans',sans-serif] text-4xl sm:text-6xl font-black text-white block mb-2 tracking-tight">
                  &lt; 30%
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                  Taux de satisfaction client inférieur à 30%  sans DEM
                </span>
              </div>

              <div className="p-8 lg:p-10 flex flex-col justify-center text-left">
                <span className="font-['DM_Sans',sans-serif] text-4xl sm:text-6xl font-black text-[#0086C8] block mb-2 tracking-tight">
                  45%
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                  Taux moyen d'échec ou d'annulation sans DEM
                </span>
              </div>

            </div>
          </div>

          {/* En bas du bloc : 3 à 4 témoignages ressortis de l'étude de marché */}
          <div className="mt-2 pt-8 border-t border-black/10">
            <div className="mb-5">
              <span className="text-xs uppercase tracking-widest font-bold text-[#0086C8] block mb-2">
                Au contact des acteurs
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
                    1 · E-Commerçant physique & e-commerçant
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « Avant DEM, dès que tu n'arrivais pas à joindre le coursier, c'était le stress. Il arrivait en retard, et parfois le client finissait par annuler la commande. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Momar F.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Produits utilitaires</div>
                </div>
              </div>

              {/* Témoignage 2 */}
              <div className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#0086C8] mb-4">
                    2 · Consommateur
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « Le coursier qui m'appelle pour savoir où je suis alors qu'il a ma localisation, celui qui n'a pas la monnaie et me dit de me débrouiller, ou celui qui me fait décaler mon programme parce qu'il fait d'autres courses en même temps… Franchement, ça fatiguait. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Oumou D.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Acheteuse active, Plateau</div>
                </div>
              </div>


              {/* Témoignage 3 */}
              <div className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#0086C8] mb-4">
                    3 · Restaurateur
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « Avant, livrer un plat chaud à Dakar, c'était compliqué. Le coursier enchaînait plusieurs courses avant de passer chez nous, l'adresse était mal comprise, et le repas arrivait froid. Parfois, le client refusait même de payer. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Aïssatou S.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Traiteur, Ouakam</div>
                </div>
              </div>

              {/* Témoignage 4 */}
              <div className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#0086C8] mb-4">
                    4 · Coursier
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-slate-800 leading-snug mb-6">
                    « On roulait dix heures par jour, sans contrat, sans tenue de pluie ni casque correct. Et vu les prix, chaque course, il fallait la négocier. »
                  </blockquote>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#021520]">Demba B.</div>
                  <div className="text-[11px] text-slate-500 font-['Poppins',sans-serif]">Coursier Moto (ex-informel)</div>
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
            <MiniTitleWithBar content="2 · NOTRE CAP STRATÉGIQUE" color="cyan-2" />

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-cyan-deep tracking-tight leading-[1.08] mt-4 mb-6">
              Vision, ambition <br />& actions
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-['Poppins',sans-serif] leading-relaxed">
              DEM est né avec une mission claire : structurer la mobilité urbaine à Dakar. Une technologie fiable, des revenus sécurisés, du respect à chaque étape. Notre cap repose sur trois piliers.
            </p>
          </div>

          {/* Piliers stratégiques en escalier alterné gauche / droite */}
          <div className="relative space-y-12 lg:space-y-16">

            {/* Connecteur central en filigrane (visible sur grand écran) */}
            <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-[1px] bg-gradient-to-b from-[#0086C8]/10 via-[#0086C8]/30 to-[#0086C8]/10 -translate-x-1/2 pointer-events-none" />

            {/* ── PALIER 01 : NOTRE VISION (Aligné à GAUCHE) ── */}
            <div className="relative flex justify-start">
              <div className="w-full lg:w-[68%] xl:w-[62%] relative bg-white border border-black/10 border-l-4 border-l-[#0086C8] p-8 sm:p-10 lg:p-12 shadow-sm hover:shadow-xl hover:border-black/20 transition-all duration-300 group overflow-hidden">
                {/* Numéro géant en filigrane */}
                <span className="absolute -top-4 right-4 text-7xl sm:text-9xl font-serif italic text-slate-100 select-none pointer-events-none group-hover:text-[#0086C8]/10 transition-colors">
                  VISION
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-serif italic text-xl sm:text-2xl text-[#0086C8] font-normal">
                      1 · Notre Vision
                    </span>

                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#021520] tracking-tight leading-snug mb-4">
                    Structurer un écosystème de mobilité de référence en Afrique de l'Ouest
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    Un modèle où chacun y gagne. Le coursier roule avec des outils dignes de ce nom et garde ce qu'il gagne. Le commerçant et l'e-commerçant livrent sans craindre pour leur image. Le client reçoit ce qu'il a commandé, à l'heure. Chez DEM, un service de qualité n'est pas un luxe. C'est le minimum.
                  </p>


                </div>
              </div>
            </div>



            {/* ── PALIER 02 : NOTRE AMBITION (Aligné à DROITE) ── */}
            <div className="relative flex justify-end">
              <div className="w-full lg:w-[68%] xl:w-[62%] relative bg-white border border-black/10 border-r-4 border-r-[#0086C8] p-8 sm:p-10 lg:p-12 shadow-sm hover:shadow-xl hover:border-black/20 transition-all duration-300 group overflow-hidden">
                {/* Numéro géant en filigrane */}
                <span className="absolute -top-4 left-4 text-7xl sm:text-9xl font-serif italic text-slate-100 select-none pointer-events-none group-hover:text-[#0086C8]/10 transition-colors">
                  AMBITION
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-serif italic text-xl sm:text-2xl text-[#0086C8] font-normal">
                      2 · Notre Ambition
                    </span>

                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#021520] tracking-tight leading-snug mb-4">
                    Devenir le partenaire logistique sur lequel on peut compter, à Dakar et en Afrique subsaharienne
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    Prouver qu'un coursier bien équipé et justement rémunéré livre mieux. Notre standard d'excellence : des délais de 10 à 25 minutes et une digitalisation intégrale de la logistique.
                  </p>


                </div>
              </div>
            </div>



            {/* ── PALIER 03 : NOS ACTIONS (Aligné à GAUCHE) ── */}
            <div className="relative flex justify-start">
              <div className="w-full lg:w-[68%] xl:w-[62%] relative bg-white border border-black/10 border-l-4 border-l-[#0086C8] p-8 sm:p-10 lg:p-12 shadow-sm hover:shadow-xl hover:border-black/20 transition-all duration-300 group overflow-hidden">
                {/* Numéro géant en filigrane */}
                <span className="absolute -top-4 right-4 text-7xl sm:text-9xl font-serif italic text-slate-100 select-none pointer-events-none group-hover:text-[#0086C8]/10 transition-colors">
                  ACTIONS
                </span>

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-serif italic text-xl sm:text-2xl text-[#0086C8] font-normal">
                      3 · Nos Actions
                    </span>

                  </div>

                  <h3 className="text-xl sm:text-2xl font-black uppercase text-[#021520] tracking-tight leading-snug mb-4">
                    Une technologie et un système pensés pour le terrain africain
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    Nous avons créé une app pensée pour le terrain. Elle connaît les quartiers, les adresses et les prix par zone.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    Autour d'elle, nous avons bâti un système complet. Chaque acteur y bénéficie d'un suivi personnalisé. L'app et le système fonctionnent en parfaite synergie. Ce qui se passe dans l'app se vit sur le terrain.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    Nous formons et équipons chaque coursier avant qu'il roule. Son matériel est de qualité et homologué.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    Avec DEM Pro, le commerçant gère ses ventes et ses livraisons. Son image est entre de bonnes mains.
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    Pour le client, tout est simple. Quelques clics, un prix connu tout de suite, une course suivie en temps réel.
                  </p>


                </div>
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
            <MiniTitleWithBar content="3 · NOTRE RÉPONSE TECHNOLOGIQUE & OPÉRATIONNELLE" color="cyan-2" />
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

      {/* ── 3. LES 4 PILIERS D'EXCELLENCE DEM (DONT LE SERVICE CLIENT) ── */}
      <section data-header-theme="white">
        <PiliersSection piliers={piliersData} />
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 4 — LE POTENTIEL DE LA MOBILITÉ URBAINE À DAKAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="potentiel-dakar"
        data-header-theme="white"
        className="w-full py-24 lg:py-36 px-6 lg:px-16 bg-white text-[#021520] border-b border-black/10 relative overflow-hidden"
      >

        <div className="max-w-[1400px] mx-auto relative z-10">

          <div className="max-w-3xl mb-16">
            <MiniTitleWithBar content="4 · PERSPECTIVES & DÉVELOPPEMENT" color="cyan-2" />

            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight text-[#021520] leading-[1.05] mt-4 mb-6">
              Le potentiel de la mobilité <br className="hidden sm:inline" />
              <span className="text-[#0086C8]">urbaine à Dakar</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 font-['Poppins',sans-serif] leading-relaxed">
              Dakar concentre près de 25% de la population nationale et 80% des activités économiques du Sénégal sur une presqu'île de 550 km². Cette densité crée une demande massive de livraison. Pour les coursiers, c'est à la fois une opportunité immense et un défi quotidien que DEM transforme en levier de croissance.
            </p>
          </div>

          {/* Grille des 3 dimensions du potentiel à Dakar */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">

            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="font-serif italic text-xl text-[#0086C8] block mb-4">
                  1 · Saturation & Géographie
                </span>
                <h3 className="text-xl font-bold uppercase text-[#021520] mb-4">
                  La presqu'île en entonnoir
                </h3>
                <p className="text-sm text-slate-600 font-['Poppins',sans-serif] leading-relaxed mb-6">
                  Axes saturés, embouteillages chroniques : le deux-roues reste le seul moyen de garantir des flux rapides entre le Plateau, les Almadies, la banlieue et Diamniadio. Les coursiers qui maîtrisent ce terrain sont la colonne vertébrale de la logistique dakaroise.
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="font-serif italic text-xl text-[#0086C8] block mb-4">
                  2 · Commerce Numérique
                </span>
                <h3 className="text-xl font-bold uppercase text-[#021520] mb-4">
                  L'explosion du Social Commerce
                </h3>
                <p className="text-sm text-slate-600 font-['Poppins',sans-serif] leading-relaxed mb-6">
                  Des milliers de commerces vendent via WhatsApp, Instagram et TikTok. Chaque vente doit être livrée dans l'heure. Pour le coursier, c'est un volume de courses en croissance constante, à condition d'avoir les bons outils pour le capter.
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="font-serif italic text-xl text-[#0086C8] block mb-4">
                  3 · Fintech & Inclusion
                </span>
                <h3 className="text-xl font-bold uppercase text-[#021520] mb-4">
                  L'interconnexion Mobile Money
                </h3>
                <p className="text-sm text-slate-600 font-['Poppins',sans-serif] leading-relaxed mb-6">
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
