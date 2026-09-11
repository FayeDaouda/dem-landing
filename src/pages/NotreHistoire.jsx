import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import EditorialStorySection from '../components/sections/EditorialStorySection.jsx';

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
          {/* <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6 mb-12 text-xs uppercase tracking-[0.25em] font-semibold text-white/60 font-['DM_Sans',sans-serif]">
            <span>REVUE OFFICIELLE DEM · VOL. 01</span>
            <span className="text-[#00D2FF]">DAKAR, SÉNÉGAL</span>
            <span>CHRONIQUES DE LA MOBILITÉ URBAINE</span>
          </div> */}

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
              {/* <div className="mt-8 flex items-center gap-4 text-xs tracking-widest uppercase font-bold text-[#00D2FF]">
                <span>01. CONSTAT</span>
                <span>·</span>
                <span>02. VISION</span>
                <span>·</span>
                <span>03. MISSION</span>
                <span>·</span>
                <span>04. VALEURS</span>
              </div> */}
            </div>
          </div>

        </div>
      </section>


      {/* ── 2. PARTIE 01 : LE CONSTAT (COMPOSANT ÉDITORIAL AVEC IMAGES EN PARALLAXE ÉTAGÉE) ── */}
      <EditorialStorySection
        id="constat"
        theme="light"
        imagePosition="right"
        chapterNumber="01 · L'ÉTAT DES LIEUX"
        title="Le constat d'un système"
        highlight="à bout de souffle."
        paragraphs={[
          "Dakar est l'une des métropoles les plus dynamiques d'Afrique de l'Ouest. Ses commerçants innovent, ses créateurs vendent sur les réseaux sociaux et sa population consomme à toute allure. Pourtant, un goulet d'étranglement persistait : la livraison du dernier kilomètre.",
          "Pour les e-commerçants et les boutiques physiques, chaque expédition était une loterie. Pour les coursiers, les conditions étaient rudes, sans couverture, sans matériel adapté et sans visibilité sur leurs revenus.",
          "Il ne manquait pas de motos à Dakar : il manquait une technologie intelligente, une organisation rigoureuse et une considération humaine pour relier ces maillons."
        ]}
        quote="« Perte de colis, livreurs introuvables au téléphone, délais aléatoires de plus de 4 heures et encaissements en espèces non sécurisés... Le commerce dakarois méritait mieux. »"
        metrics={[
          { value: "+4h", label: "Délai moyen antérieur sans DEM" },
          { value: "35%", label: "Taux d'échec ou d'annulation" }
        ]}
        mainImage={{
          src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&auto=format&fit=crop&q=85",
          alt: "Circulation et logistique Dakar",
          speed: "0.1",
          direction: "up",
          aspect: "aspect-[4/5]",
          tag: "FIG. 01 — DAKAR EXPRESS"
        }}
        secondaryImage={{
          src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop&q=85",
          alt: "Coursier DEM sur le terrain",
          speed: "0.25",
          direction: "up",
          aspect: "aspect-[3/4]",
          subtitle: "Terrain & Réalité",
          title: "Le défi de la ponctualité"
        }}
        floatingBadge={{
          tag: "POINT D'INFLEXION",
          text: "Passer du désordre à la synchronisation temps réel.",
          speed: "0.18",
          direction: "down"
        }}
      />

      {/* ── 3. PARTIE 02 : LA VISION (COMPOSANT ÉDITORIAL EN THÈME SOMBRE & DISPOSITION INVERSÉE) ── */}
      <EditorialStorySection
        id="vision"
        theme="dark"
        imagePosition="left"
        chapterNumber="02 · Le Futur de la Logistique"
        title="Bâtir l'autoroute"
        highlight="numérique du dernier kilomètre."
        paragraphs={[
          "Notre vision dépasse la simple livraison à moto. Nous construisons le système d'exploitation de la mobilité commerciale en Afrique de l'Ouest.",
          "Un réseau où chaque commerce, de la boutique de quartier au grand compte e-commerce, dispose de la même puissance d'expédition que les géants mondiaux : dispatch instantané, intégration API directe, encaissement dématérialisé et transparence totale à chaque coin de rue."
        ]}
        pillars={[
          { number: "01.", title: "Fluidité Urbaine", desc: "Algorithmes de routage intelligents contournant les points de congestion." },
          { number: "02.", title: "Inclusion Financière", desc: "Digitalisation intégrale des flux Cash on Delivery via Wave & Orange Money." },
          { number: "03.", title: "Expansion Régionale", desc: "Un modèle réplicable pensé pour les grandes capitales d'Afrique de l'Ouest." }
        ]}
        mainImage={{
          src: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85",
          alt: "Technologie et vision DEM",
          speed: "0.12",
          direction: "up",
          aspect: "aspect-[16/11]",
          tag: "HORIZON TECH · TEMPS RÉEL",
          grayscale: false
        }}
        secondaryImage={{
          src: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=800&auto=format&fit=crop&q=85",
          alt: "Supervision télématique",
          speed: "0.22",
          direction: "down",
          aspect: "aspect-square",
          subtitle: "100% Connecté",
          title: "Flotte connectée par GPS"
        }}
      />

      {/* ── 4. PARTIE 03 : LA TECHNOLOGIE (MOTEUR DE DISPATCH & GÉOGUIDAGE LOCAL) ── */}
      <EditorialStorySection
        id="technologie"
        theme="light"
        imagePosition="right"
        chapterNumber="03 · LE MOTEUR TECHNOLOGIQUE"
        title="Une plateforme conçue"
        highlight="pour la réalité du terrain dakarois."
        paragraphs={[
          "Loin des logiciels importés inadaptés aux spécificités de l'adressage local, DEM a développé sa propre pile logicielle de géocodage contextuel et d'optimisation d'itinéraires.",
          "Notre moteur prend en compte les repères visuels dakarois, contourne en direct les goulots d'étranglement de la VDN, de la corniche ou de l'autoroute à péage, et connecte instantanément chaque colis au motocycliste le mieux positionné.",
          "Chaque course bénéficie d'un suivi au mètre près sur carte interactive et d'un contrôle strict de la remise par code de sécurité OTP unique."
        ]}
        quote="« La technologie n'a de valeur que si elle résout les frictions du monde réel. À Dakar, chaque minute économisée dans le trafic est une victoire pour le commerce. »"
        metrics={[
          { value: "-25%", label: "Temps de trajet moyen réduit" },
          { value: "99.4%", label: "Taux de livraison avec succès OTP" }
        ]}
        mainImage={{
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=85",
          alt: "Supervision télématique et dispatch intelligent",
          speed: "0.1",
          direction: "up",
          aspect: "aspect-[4/5]",
          tag: "FIG. 03 — DISPATCH INTELLIGENT"
        }}
        secondaryImage={{
          src: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=85",
          alt: "Coursier connecté en direct",
          speed: "0.25",
          direction: "up",
          aspect: "aspect-[3/4]",
          subtitle: "Temps Réel",
          title: "Assignation en moins de 10 min"
        }}
        floatingBadge={{
          tag: "ALGORITHME LOCAL",
          text: "Prise en compte dynamique du trafic et des repères dakarois.",
          speed: "0.18",
          direction: "down"
        }}
      />

      {/* ── 5. PARTIE 04 : L'HUMAIN AU GUIDON (VALORISATION ET SÉCURITÉ DES COURSIERS) ── */}
      <EditorialStorySection
        id="humain"
        theme="dark"
        imagePosition="left"
        chapterNumber="04 · L'HUMAIN D'ABORD"
        title="Redonner toute sa fierté"
        highlight="au métier de coursier urbain."
        paragraphs={[
          "Chez DEM, nous sommes convaincus qu'il ne peut y avoir de service client d'élite sans une considération absolue pour ceux qui sillonnent la ville par tous les temps.",
          "Nos livreurs ne sont pas de simples identifiants sur un écran. Ce sont des partenaires valorisés, dotés d'équipements de sécurité certifiés, formés aux exigences du relationnel client et protégés par une couverture d'assistance.",
          "Chaque semaine, l'intégralité de leurs gains et pourboires est versée avec une rigueur absolue sur Wave ou Orange Money, sans aucuns frais occultes."
        ]}
        quote="« Un coursier respecté, équipé et équitablement rémunéré est le plus bel ambassadeur qu'une marque puisse envoyer chez ses clients. »"
        metrics={[
          { value: "100%", label: "Gains reversés chaque semaine" },
          { value: "4.9/5", label: "Satisfaction moyenne des coursiers" }
        ]}
        mainImage={{
          src: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85",
          alt: "Coursier DEM sur le terrain",
          speed: "0.12",
          direction: "up",
          aspect: "aspect-[16/11]",
          tag: "FIG. 04 — HÉROS DU QUOTIDIEN",
          grayscale: false
        }}
        secondaryImage={{
          src: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=800&auto=format&fit=crop&q=85",
          alt: "Équipement professionnel certifié",
          speed: "0.22",
          direction: "down",
          aspect: "aspect-square",
          subtitle: "Dignité & Sécurité",
          title: "Équipements pro & Caissons étanches"
        }}
        floatingBadge={{
          tag: "ENGAGEMENT SOCIAL",
          text: "Assurance accident, dotation complète et écoute 7j/7.",
          speed: "0.18",
          direction: "down",
          bg: "bg-[#0086C8]",
          textColor: "text-white"
        }}
      />

      {/* ── 6. PARTIE 05 : L'HORIZON RÉGIONAL (EXPANSION OUEST-AFRICAINE) ── */}
      <EditorialStorySection
        id="expansion"
        theme="light"
        imagePosition="right"
        chapterNumber="05 · L'HORIZON RÉGIONAL"
        title="Du Sénégal aux capitales"
        highlight="majeures d'Afrique de l'Ouest."
        paragraphs={[
          "Dakar est notre berceau et notre laboratoire d'excellence. Mais les défis que nous avons relevés ici résonnent avec la même urgence dans toute la sous-région.",
          "De la presqu'île dakaroise aux grands carrefours commerciaux ouest-africains, notre infrastructure a été conçue pour se déployer rapidement et offrir aux marques une expérience de livraison transfrontalière unifiée.",
          "Notre feuille de route vise à connecter commerçants et consommateurs avec les mêmes standards d'instantanéité, de sécurité COD et de transparence technologique."
        ]}
        pillars={[
          { number: "01.", title: "Dakar & Pôles Économiques", desc: "Couverture totale de Dakar, Diamniadio, Thiès, Mbour et la Petite-Côte." },
          { number: "02.", title: "Hubs Sous-Régionaux", desc: "Déploiement progressif des corridors logistiques vers Abidjan, Bamako et Conakry." },
          { number: "03.", title: "Standardisation B2B", desc: "API unique pour interconnecter les géants du e-commerce et de la distribution panafricaine." }
        ]}
        mainImage={{
          src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=85",
          alt: "Entrepôt et infrastructure logistique DEM",
          speed: "0.1",
          direction: "up",
          aspect: "aspect-[4/5]",
          tag: "FIG. 05 — SCALE & EXPANSION"
        }}
        secondaryImage={{
          src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=85",
          alt: "Flotte en expansion",
          speed: "0.25",
          direction: "up",
          aspect: "aspect-[3/4]",
          subtitle: "Réseau Ouest-Africain",
          title: "Le hub logistique unifié"
        }}
        floatingBadge={{
          tag: "HORIZON SCALE",
          text: "Connecter les métropoles africaines en un clic.",
          speed: "0.18",
          direction: "down"
        }}
      />

      {/* ── 7. PARTIE 06 : NOTRE MISSION (ENGAGEMENT & IMPACT CONCRET) ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 border-b border-black/10 bg-slate-50" id="mission">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16 magazine-reveal">
            <MiniTitleWithBar content="06 · NOTRE RAISON D'ÊTRE" />
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


      {/* ── 8. PARTIE 07 : NOS VALEURS (LE MANIFESTE EN 4 PRINCIPES) ── */}
      <section className="py-24 lg:py-36 px-6 lg:px-16 border-b border-black/10 bg-white" id="valeurs">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16 magazine-reveal">
            <MiniTitleWithBar content="07 · NOTRE ADN" />
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
