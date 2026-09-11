import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function NotreHistoire() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Effet Parallaxe fluide sur les éléments marqués data-speed
      const parallaxItems = document.querySelectorAll('.parallax-item');
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

      // Révélation en fondu des titres et paragraphes éditoriaux
      const fadeElements = document.querySelectorAll('.magazine-reveal');
      fadeElements.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-white text-[#021520] min-h-screen font-['DM_Sans',sans-serif] selection:bg-[#00D2FF] selection:text-[#021520] overflow-x-clip">
      
      {/* ── 1. EN-TÊTE ÉDITORIAL MAGAZINE (COVER HERO) ── */}
      <section className="relative w-full bg-[#021520] text-white pt-32 pb-24 lg:pt-40 lg:pb-36 px-6 lg:px-16 border-b border-white/10 overflow-hidden">
        {/* Lignes de repères éditoriales en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none grid grid-cols-6 divide-x divide-white">
          <div /><div /><div /><div /><div /><div />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          {/* Header Bar Magazine */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6 mb-12 text-xs uppercase tracking-[0.25em] font-semibold text-white/60 font-['DM_Sans',sans-serif]">
            <span>REVUE OFFICIELLE DEM · VOL. 01</span>
            <span className="text-[#00D2FF]">DAKAR, SÉNÉGAL</span>
            <span>CHRONIQUES DE LA MOBILITÉ URBAINE</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#00D2FF] block mb-4 font-light">
                La Genèse & Le Mouvement
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tight leading-[0.95] text-white">
                RÉINVENTER LE POULS <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>
                  DE LA VILLE.
                </span>
              </h1>
            </div>

            <div className="lg:col-span-4 border-l lg:border-l border-white/15 pl-0 lg:pl-8 pt-4 lg:pt-0">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-['Poppins',sans-serif] m-0">
                L’histoire de DEM (Delivery Express Mobility) est celle d'un refus : le refus de la résignation face aux embouteillages, aux retards chroniques et à la précarité de la logistique du dernier kilomètre à Dakar.
              </p>
              <div className="mt-8 flex items-center gap-4 text-xs tracking-widest uppercase font-bold text-[#00D2FF]">
                <span>01. CONSTAT</span>
                <span>·</span>
                <span>02. VISION</span>
                <span>·</span>
                <span>03. MISSION</span>
                <span>·</span>
                <span>04. VALEURS</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ── 2. PARTIE 01 : LE CONSTAT (SECTION AVEC IMAGES EN PARALLAXE DÉBORDANTE) ── */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-16 border-b border-black/10 bg-white" id="constat">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Colonne Gauche : L'Analyse & Le Texte Éditorial */}
            <div className="lg:col-span-6 magazine-reveal flex flex-col justify-between">
              <div>
                <MiniTitleWithBar content="01 · L'ÉTAT DES LIEUX" />
                
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#021520] tracking-tight leading-none mt-4 mb-6">
                  Le constat d'un système <br />
                  <span className="font-serif italic font-normal text-[#0086C8] lowercase">à bout de souffle.</span>
                </h2>

                <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed font-['Poppins',sans-serif] mt-8">
                  <p>
                    Dakar est l'une des métropoles les plus dynamiques d'Afrique de l'Ouest. Ses commerçants innovent, ses créateurs vendent sur les réseaux sociaux et sa population consomme à toute allure. Pourtant, un goulet d'étranglement persistait : <strong>la livraison du dernier kilomètre</strong>.
                  </p>
                  
                  {/* Citation Éditoriale Encadrée */}
                  <blockquote className="p-6 bg-slate-50 border-l-4 border-[#0086C8] my-8 font-serif italic text-xl sm:text-2xl text-[#021520] leading-snug">
                    « Perte de colis, livreurs introuvables au téléphone, délais aléatoires de plus de 4 heures et encaissements en espèces non sécurisés... Le commerce dakarois méritait mieux. »
                  </blockquote>

                  <p>
                    Pour les e-commerçants et les boutiques physiques, chaque expédition était une loterie. Pour les coursiers, les conditions étaient rudes, sans couverture, sans matériel adapté et sans visibilité sur leurs revenus.
                  </p>
                  <p className="font-semibold text-[#021520]">
                    Il ne manquait pas de motos à Dakar : il manquait une technologie intelligente, une organisation rigoureuse et une considération humaine pour relier ces maillons.
                  </p>
                </div>

                {/* Métriques du Constat */}
                <div className="grid grid-cols-2 gap-4 pt-10 border-t border-black/10 mt-10">
                  <div className="p-5 border border-black/10 bg-slate-50">
                    <span className="font-['DM_Sans',sans-serif] text-3xl sm:text-4xl font-black text-[#0086C8] block mb-1">
                      +4h
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-600 block">
                      Délai moyen antérieur sans DEM
                    </span>
                  </div>
                  <div className="p-5 border border-black/10 bg-slate-50">
                    <span className="font-['DM_Sans',sans-serif] text-3xl sm:text-4xl font-black text-[#0086C8] block mb-1">
                      35%
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-600 block">
                      Taux d'échec ou d'annulation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Composition d'Images en Parallaxe Étagée (Débordant vers le bas) */}
            <div className="lg:col-span-6 relative mt-12 lg:mt-0 pb-16 lg:pb-32">
              <div className="relative w-full">
                
                {/* Image 1 : Grande image principale (Le trafic / La ville) */}
                <div 
                  className="parallax-item relative z-10 w-full aspect-[4/5] bg-slate-200 border border-black/10 shadow-2xl overflow-hidden"
                  data-speed="0.1"
                  data-direction="up"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&auto=format&fit=crop&q=85" 
                    alt="Circulation et logistique Dakar"
                    className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#021520] text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1.5">
                    FIG. 01 — DAKAR EXPRESS
                  </div>
                </div>

                {/* Image 2 : Image décalée en superposition inférieure droite (pousse à scroller vers le bas) */}
                <div 
                  className="parallax-item absolute -bottom-20 right-[-10px] sm:-right-8 w-3/4 sm:w-2/3 aspect-[3/4] bg-[#021520] border-4 border-white shadow-2xl z-20 overflow-hidden"
                  data-speed="0.25"
                  data-direction="up"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop&q=85" 
                    alt="Coursier DEM sur le terrain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                    <span className="font-serif italic text-xs text-[#00D2FF] block mb-0.5">Terrain & Réalité</span>
                    <span className="text-xs font-bold uppercase tracking-wider block">Le défi de la ponctualité</span>
                  </div>
                </div>

                {/* Cartouche d'accroche flottant */}
                <div 
                  className="parallax-item absolute top-1/3 -left-6 sm:-left-10 bg-[#00D2FF] text-[#021520] p-4 sm:p-6 shadow-xl z-30 max-w-[220px] border border-black/10"
                  data-speed="0.18"
                  data-direction="down"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
                    POINT D'INFLEXION
                  </span>
                  <p className="text-xs font-black uppercase leading-tight m-0 font-['DM_Sans',sans-serif]">
                    Passer du désordre à la synchronisation temps réel.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── 3. PARTIE 02 : LA VISION (INFRASTRUCTURE & HORIZON) ── */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-16 border-b border-white/10 bg-[#021520] text-white overflow-hidden" id="vision">
        {/* Halo cyan décoratif */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D2FF]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Colonne Gauche : Composition Visuelle Parallaxe Inverse */}
            <div className="lg:col-span-6 order-2 lg:order-1 relative pb-16 lg:pb-24">
              <div className="relative w-full">
                
                {/* Image Principale Vision */}
                <div 
                  className="parallax-item relative z-10 w-full aspect-[16/11] bg-black border border-white/15 shadow-2xl overflow-hidden"
                  data-speed="0.12"
                  data-direction="up"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85" 
                    alt="Technologie et vision DEM"
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-cyan text-[#021520] text-[10px] font-mono tracking-widest uppercase px-3 py-1 font-bold">
                    HORIZON TECH · TEMPS RÉEL
                  </div>
                </div>

                {/* Deuxième image décalée qui mord sur le bas */}
                <div 
                  className="parallax-item absolute -bottom-16 -left-4 sm:-left-8 w-2/3 aspect-square bg-[#0086C8] border-4 border-[#021520] shadow-2xl z-20 overflow-hidden"
                  data-speed="0.22"
                  data-direction="down"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=800&auto=format&fit=crop&q=85" 
                    alt="Supervision télématique"
                    className="w-full h-full object-cover mix-blend-multiply opacity-80"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-[#021520] via-transparent to-transparent">
                    <span className="text-3xl font-black text-[#00D2FF] font-['DM_Sans',sans-serif]">100%</span>
                    <span className="text-xs uppercase tracking-wider text-white font-bold">Flotte connectée par GPS</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Colonne Droite : Texte Vision */}
            <div className="lg:col-span-6 order-1 lg:order-2 magazine-reveal">
              <span className="font-serif italic text-lg sm:text-xl font-light text-[#00D2FF] block mb-2">
                02 · Le Futur de la Logistique
              </span>
              
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none text-white mb-6">
                Bâtir l'autoroute <br />
                <span className="font-serif italic font-normal text-[#00D2FF] lowercase">numérique du dernier kilomètre.</span>
              </h2>

              <div className="space-y-6 text-base sm:text-lg text-white/80 leading-relaxed font-['Poppins',sans-serif] mt-8">
                <p>
                  Notre vision dépasse la simple livraison à moto. Nous construisons le <strong>système d'exploitation de la mobilité commerciale</strong> en Afrique de l'Ouest.
                </p>
                <p>
                  Un réseau où chaque commerce, de la boutique de quartier au grand compte e-commerce, dispose de la même puissance d'expédition que les géants mondiaux : dispatch instantané, intégration API directe, encaissement dématérialisé et transparence totale à chaque coin de rue.
                </p>
              </div>

              {/* 3 Piliers de la Vision */}
              <div className="space-y-4 pt-8 border-t border-white/10 mt-8">
                {[
                  { title: "Fluidité Urbaine", desc: "Algorithmes de routage intelligents contournant les points de congestion." },
                  { title: "Inclusion Financière", desc: "Digitalisation intégrale des flux Cash on Delivery via Wave & Orange Money." },
                  { title: "Expansion Régionale", desc: "Un modèle réplicable pensé pour les grandes capitales d'Afrique de l'Ouest." }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white/[0.03] border border-white/10">
                    <span className="font-serif italic text-lg text-[#00D2FF]">0{i+1}.</span>
                    <div>
                      <h4 className="text-sm font-bold uppercase text-white font-['DM_Sans',sans-serif]">{item.title}</h4>
                      <p className="text-xs text-white/60 m-0 font-['Poppins',sans-serif]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ── 4. PARTIE 03 : NOTRE MISSION (ENGAGEMENT & IMPACT CONCRET) ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 border-b border-black/10 bg-slate-50" id="mission">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16 magazine-reveal">
            <MiniTitleWithBar content="03 · NOTRE RAISON D'ÊTRE" />
            <SectionHeading
              align="left"
              title="Une mission claire :"
              highlight="servir ceux qui font avancer la ville"
              subtitle="Ce qui nous anime chaque matin"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          {/* Grille 3 Piliers de la Mission (Style Carte Magazine) */}
          <div className="grid grid-cols-1 md:grid-cols-3 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">
            
            {/* Mission 1 */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8] mb-6 block">
                  /01 · Pour les Marchands
                </span>
                <h3 className="text-2xl font-bold uppercase text-[#021520] mb-4 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  Accélérer vos ventes sans friction
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                  Permettre à chaque entrepreneur de livrer ses clients en <strong>moins de 20 à 45 minutes</strong>, avec un reversement des fonds sous 24h et une image de marque irréprochable.
                </p>
              </div>
              <div className="pt-8 border-t border-slate-100 mt-8 text-xs font-bold uppercase tracking-wider text-[#0086C8]">
                Livraison Same-Day & Créneaux garantis
              </div>
            </div>

            {/* Mission 2 */}
            <div className="p-8 lg:p-12 flex flex-col justify-between bg-[#021520] text-white">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-[#00D2FF] mb-6 block">
                  /02 · Pour les Coursiers
                </span>
                <h3 className="text-2xl font-bold uppercase text-white mb-4 font-['DM_Sans',sans-serif]">
                  Dignité, sécurité & revenus justes
                </h3>
                <p className="text-sm text-white/80 leading-relaxed font-['Poppins',sans-serif]">
                  Valoriser le métier de coursier avec des équipements de protection, une couverture d'assistance et des paiements hebdomadaires garantis sans aucun frais caché.
                </p>
              </div>
              <div className="pt-8 border-t border-white/10 mt-8 text-xs font-bold uppercase tracking-wider text-[#00D2FF]">
                100% des gains reversés chaque semaine
              </div>
            </div>

            {/* Mission 3 */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8] mb-6 block">
                  /03 · Pour les Clients
                </span>
                <h3 className="text-2xl font-bold uppercase text-[#021520] mb-4 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  Une confiance totale à chaque colis
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                  Offrir au consommateur final le suivi GPS en direct de sa commande, la validation sécurisée par code OTP et un accueil chaleureux et professionnel.
                </p>
              </div>
              <div className="pt-8 border-t border-slate-100 mt-8 text-xs font-bold uppercase tracking-wider text-[#0086C8]">
                Suivi transparent 7j/7
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── 5. PARTIE 04 : NOS VALEURS (LE MANIFESTE EN 4 PRINCIPES) ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 border-b border-black/10 bg-white" id="valeurs">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16 magazine-reveal">
            <MiniTitleWithBar content="04 · NOTRE ADN" />
            <SectionHeading
              align="left"
              title="Quatre valeurs non négociables"
              highlight="qui guident nos choix"
              subtitle="L'éthique opérationnelle DEM"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">
            {[
              {
                num: "01",
                name: "Excellence & Ponctualité",
                desc: "Chaque minute compte. Nous mesurons nos trajets au décimètre et respectons nos promesses horaires avec une discipline d'horloger.",
                tag: "Précision"
              },
              {
                num: "02",
                name: "Transparence & Intégrité",
                desc: "Traçabilité GPS en temps réel, zéro frais dissimulés et reversement rigoureux du Cash on Delivery sous 24 heures chrono.",
                tag: "Confiance"
              },
              {
                num: "03",
                name: "Impact Humain & Dignité",
                desc: "Derrière chaque guidon, un travailleur digne. Nous investissons dans la sécurité, la formation continue et l'écoute de nos coursiers.",
                tag: "Respect"
              },
              {
                num: "04",
                name: "Innovation Continue",
                desc: "Nous développons nos propres outils technologiques adaptés aux réalités du terrain sénégalais et aux usages locaux.",
                tag: "Technologie"
              }
            ].map((val, idx) => (
              <div key={idx} className="p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-serif italic text-2xl font-light text-[#0086C8]">
                      /{val.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                      {val.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase text-[#021520] mb-3 font-['DM_Sans',sans-serif]">
                    {val.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                    {val.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 text-xs font-bold text-[#021520] uppercase tracking-wider">
                  Valeur fondamentale
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ── 6. MANIFESTE ÉDITORIAL & CHIFFRES CLÉS ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 bg-[#021520] text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto text-center magazine-reveal relative z-10">
          
          <span className="font-serif italic text-2xl sm:text-3xl text-[#00D2FF] block mb-4">
            Le Manifeste DEM
          </span>

          <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif italic text-white leading-tight mb-12">
            « Nous ne faisons pas que transporter des colis d'un point A à un point B. <br className="hidden sm:inline" />
            <span className="text-[#00D2FF] font-sans font-black uppercase not-italic block my-3 text-xl sm:text-3xl lg:text-4xl">
              Nous synchronisons le commerce et la vie d'une métropole.
            </span>
            Avec vitesse, rigueur et respect. »
          </blockquote>

          <div className="w-16 h-[2px] bg-[#00D2FF] mx-auto mb-16" />

          {/* Bandeau de chiffres */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
            {[
              { num: "~20 min", label: "Délai moyen par course à Dakar" },
              { num: "24h", label: "Reversement COD garanti Wave / OM" },
              { num: "100%", label: "Traçabilité GPS & Code OTP" },
              { num: "500+", label: "Courses opérées chaque jour" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <span className="font-['DM_Sans',sans-serif] text-3xl sm:text-5xl font-black text-[#00D2FF] block mb-2">
                  {stat.num}
                </span>
                <span className="text-xs uppercase tracking-widest text-white/60 font-semibold block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ── 7. CTA CONTACT & REJOINDRE L'AVENTURE ── */}
      <ContactCTA
        theme="cyan-deep"
        watermark="HISTOIRE"
        subtitle="Écrivons la suite ensemble"
        title="Rejoignez la nouvelle ère de"
        highlight="la logistique sénégalaise."
        description="Que vous soyez un marchand souhaitant accélérer ses livraisons, un coursier cherchant des revenus dignes ou un investisseur de flotte, DEM est votre partenaire de référence."
        primaryBtnText="Découvrir nos solutions Pro"
        primaryBtnLink="/dem-pro"
        primaryBtnIcon="arrow"
        secondaryBtnText="Devenir Coursier"
        secondaryBtnLink="/coursiers"
        secondaryBtnIcon="external"
      />

    </div>
  );
}
