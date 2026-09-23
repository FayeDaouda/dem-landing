import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SolutionPoint from '../components/sections/SolutionPoint.jsx';

gsap.registerPlugin(ScrollTrigger);

const SOLUTION_POINTS = [
  {
    number: "01",
    category: "Algorithme & Cartographie",
    title: "Dispatch Intelligent & Routage Contextuel Dakarois",
    description: "Loin des logiciels importés inopérants sans numérotation de rue, le moteur DEM intègre les repères visuels dakarois et contourne dynamiquement les goulots d'étranglement de la VDN, de la Corniche et de l'autoroute.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Dispatch intelligent et carte interactive"
  },
  {
    number: "02",
    category: "Paiement & Confiance",
    title: "Sécurisation Cash on Delivery & Traçabilité OTP",
    description: "Finies les disparitions d'espèces et les contestations de livraison. Chaque colis remis fait l'objet d'une confirmation par code OTP sécurisé. Les sommes collectées sont automatiquement reversées sur vos comptes Wave ou Orange Money sous 24h.",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Sécurisation Cash on Delivery Wave Orange Money"
  },
  {
    number: "03",
    category: "L'Humain au Guidon",
    title: "Flotte Professionnalisée & Équipements Normés",
    description: "Nos coursiers sont les ambassadeurs de votre marque auprès de vos clients finaux. Ils disposent d'équipements de protection complets, de caissons isothermes étanches, d'une formation rigoureuse et d'une rémunération hebdomadaire garantie et transparente.",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Coursier professionnel équipé DEM"
  },
  {
    number: "04",
    category: "Outils Entreprises",
    title: "Portail DEM Pro & Intégration E-Commerce",
    description: "Un espace unique pour piloter l'ensemble de vos expéditions : déclenchement de courses groupées en quelques clics, partage du lien de suivi GPS au client final, tarification dégressive transparente et facturation mensuelle simplifiée.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85",
    imageAlt: "Portail Marchand et intégration API"
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
                  Dakar figure parmi les métropoles les plus bouillonnantes d'Afrique de l'Ouest. Ses commerçants créent, ses boutiques vendent sur les réseaux sociaux et sa population consomme à toute allure. Pourtant, un blocage structurel persistait : <strong>l'absence totale d'organisation de la mobilité du dernier kilomètre</strong>.
                </p>
                <p>
                  Pour les commerçants, chaque envoi était une loterie. Absence d'adressage standardisé, retards chroniques de plusieurs heures, coursiers informels introuvables au téléphone et litiges récurrents sur les encaissements en espèces : le commerce dakarois subissait une perte massive de confiance et de chiffre d'affaires.
                </p>
                <p>
                  Il ne manquait pas de motos à Dakar : il manquait un cadre technologique rigoureux, une infrastructure de paiement sécurisée et une considération humaine pour relier ces maillons essentiels de la ville.
                </p>
              </div>
            </div>

            {/* Colonne Droite : Image illustrant le constat avec parallaxe étagée */}
            <div className="lg:col-span-6 relative mt-8 lg:mt-0 pb-16 sm:pb-24">
              <div className="relative w-full">

                {/* Image Principale avec rideau */}
                <div
                  className="parallax-item relative z-10 w-full aspect-[4/5] bg-slate-200 border border-black/10 shadow-2xl overflow-hidden h-curtain-wrapper"
                  data-speed="0.1"
                  data-direction="up"
                  data-curtain-origin="right"
                >
                  <img
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1000&auto=format&fit=crop&q=85"
                    alt="Circulation et logistique Dakar"
                    className="h-curtain-img w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 will-change-transform"
                  />
                  <div className="h-curtain-panel absolute inset-0 z-20 pointer-events-none bg-[#0086C8]" />
                  <div className="absolute top-4 left-4 z-30 bg-[#021520]/90 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-white border border-white/20">
                    FIG. 01 — RÉALITÉ URBAINE
                  </div>
                </div>

                {/* Image Secondaire Superposée en Parallaxe */}
                <div
                  className="parallax-item absolute -bottom-12 right-0 sm:-right-6 w-2/3 aspect-[3/4] bg-[#021520] border-4 border-white shadow-2xl z-20 overflow-hidden"
                  data-speed="0.25"
                  data-direction="up"
                >
                  <img
                    src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop&q=85"
                    alt="Le défi de la mobilité sur le terrain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white z-30">
                    <span className="font-serif italic text-xs block mb-0.5 text-[#00D2FF]">
                      Terrain & Réalité
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Le défi de la synchronisation
                    </span>
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
              Face à la faillite d'un modèle artisanal et fragmenté, DEM a été créé avec une mission claire : transformer la mobilité urbaine dakaroise en une infrastructure technologique fiable, prédictible et humaine. Notre cap s'articule autour de trois piliers fondamentaux.
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
                  Bâtir le système d'exploitation de la mobilité commerciale en Afrique de l'Ouest. Un écosystème où chaque commerçant, de la créatrice indépendante au grand compte de distribution, dispose instantanément de la puissance logistique des leaders mondiaux.
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
                  Devenir le réflexe incontournable de la livraison Same-Day à Dakar et dans la sous-région, avec un standard de 99,4% de réussite, des délais garantis de 20 à 45 minutes et une digitalisation absolue de tous les flux financiers.
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
                  Développer des algorithmes contextuels adaptés à la réalité dakaroise, équiper et valoriser nos motocyclistes, garantir des reversements Cash on Delivery sous 24h via Wave et Orange Money, et connecter les marchands par API directe.
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
              Dakar concentre près de 25% de la population nationale et 80% des activités économiques du Sénégal sur une presqu'île exiguë de 550 km². Cette configuration géographique unique fait de la mobilité urbaine le défi central et le principal levier de compétitivité de la métropole.
            </p>
          </div>

          {/* Grille des 3 dimensions du potentiel à Dakar (bordures nettes, sans arrondi) */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.02]">

            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-xl text-[#00D2FF] block mb-4">
                  01 · Saturation & Géographie
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-4">
                  La Presqu'île en entonnoir
                </h3>
                <p className="text-sm text-white/70 font-['Poppins',sans-serif] leading-relaxed mb-6">
                  Avec des axes routiers majeurs régulièrement saturés, le transport deux-roues structuré et synchronisé est la seule solution capable de garantir des flux rapides et constants entre le Plateau, les Almadies, la banlieue et Diamniadio.
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
                  Des milliers de commerces indépendants réalisent l'essentiel de leurs ventes via WhatsApp, Instagram et TikTok. Ce commerce informel dynamique exige une logistique instantanée pour transformer les intentions d'achat en ventes livrées.
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
                  La généralisation des paiements mobiles (Wave, Orange Money) permet pour la première fois de synchroniser le déplacement physique du colis et le transfert instantané de valeur, éliminant les frictions d'espèces.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════════════════
          BLOC 5 — CLÔTURE (UNE PHRASE MARKETING EN GUISE D'ACCROCHE FINALE)
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        id="cloture"
        data-header-theme="black"
        className="w-full py-28 lg:py-44 px-6 lg:px-16 bg-[#010D14] text-white border-t border-white/10 relative overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto text-center relative z-10">

          <blockquote className="text-3xl sm:text-5xl lg:text-7xl font-black uppercase tracking-tight leading-[1.05] text-white max-w-5xl mx-auto">
            « Nous ne déplaçons pas seulement des colis : <br className="hidden sm:inline" />
            <span className="text-[#00D2FF]">
              nous synchronisons
            </span>{' '}
            le pouls économique <br className="hidden sm:inline" />
            et humain de <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>Dakar.</span> »
          </blockquote>

          <div className="w-16 h-[2px] bg-[#00D2FF] mx-auto mt-12" />

        </div>
      </section>

    </div>
  );
}
