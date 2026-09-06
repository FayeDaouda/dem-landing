import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import StoryChapter from '../components/sections/StoryChapter.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

gsap.registerPlugin(ScrollTrigger);

const IngredientsDetailSection = () => (
  <section className="relative z-10 mb-14 flex max-w-[120rem] mx-auto items-center justify-center bg-[#021520] lg:my-24 lg:px-[64px] rounded-3xl overflow-hidden border border-white/[0.06]">
    <div className="relative mx-6 my-12 grid grid-cols-1 items-center gap-8 text-center lg:mx-0 lg:my-16 lg:grid-cols-12 lg:gap-20 lg:text-left">
      <div className="relative row-start-2 aspect-square lg:col-span-6 lg:row-start-auto overflow-hidden rounded-2xl">
        <img 
          alt="Opérations de livraison DEM" 
          loading="lazy" 
          src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85" 
          className="absolute inset-0 h-full w-full object-cover shadow-2xl" 
        />
        <div className="absolute inset-0 border border-cyan/30 rounded-2xl pointer-events-none" />
      </div>
      <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7 text-white">
        <div className="relative mt-16 flex flex-col gap-8 md:mt-4 lg:-mt-4">
          <div className="relative flex w-full flex-col-reverse lg:text-start text-center mb-4">
            <h2 className="uppercase font-bold text-4xl lg:text-6xl text-balance block">
              Le secret de <em className="not-italic text-cyan">nos opérations</em>
            </h2>
            <span className="w-full font-serif rotate-[-2deg] lg:text-start text-center text-cyan mb-3 xl:-mb-2 text-4xl lg:text-5xl block italic">
              L'exigence absolue
            </span>
          </div>
          <p className="text-white/80 leading-relaxed text-base md:text-lg">
            Chez DEM (Delivery Express Mobility), nous croyons obstinément que la vitesse n'a de valeur que si elle s'accompagne d'une précision totale. Face aux défis de circulation dakaroise, nous déployons une technologie connectée en temps réel combinée à une rigueur humaine sans faille.
          </p>
        </div>
        <div className="grid gap-x-14 gap-y-8 md:grid-cols-2 text-left">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-cyan">Dispatch millimétré</h3>
            <p className="text-balance text-sm text-white/70 leading-relaxed">
              Notre algorithme prédictif attribue chaque course au livreur le plus proche pour une prise en charge en moins de 10 minutes chrono.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-cyan">Flotte qualifiée</h3>
            <p className="text-balance text-sm text-white/70 leading-relaxed">
              Chaque coursier est rigoureusement sélectionné, formé à l'éco-conduite et au respect méticuleux des marchandises confiées.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-cyan">Traçabilité continue</h3>
            <p className="text-balance text-sm text-white/70 leading-relaxed">
              Localisation GPS en temps réel, notifications automatiques et signature par code OTP pour sécuriser chaque étape.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold text-cyan">Reversement garanti</h3>
            <p className="text-balance text-sm text-white/70 leading-relaxed">
              Une gestion sans friction du Cash on Delivery (COD) avec reversement sous 24h sur Wave ou Orange Money.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function LaMaison() {
  const manifestoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (manifestoRef.current) {
        gsap.from(manifestoRef.current, {
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 80,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full bg-[#021520] text-white min-h-screen font-sans overflow-x-clip">
      
      {/* ── Top Hero Fullscreen ── */}
      <section 
        className="relative w-full flex justify-center items-center overflow-hidden" 
        style={{ height: "calc(100vh - 80px)" }}
      >
        <img
          alt="DEM Livraison Express Dakar"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85"
          style={{
            transition: "opacity 0.8s ease",
            opacity: videoLoaded ? 0 : 1,
          }}
        />
        
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-[#021520]/75 z-[1]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full">
          <h1 className="text-balance text-4xl leading-[1.1] text-white sm:text-[60px] md:text-7xl font-black uppercase block tracking-tight">
            DES TRAJETS PRÉCIS.<br />
            UNE VITESSE RECORD.<br />
            <em style={{ color: 'var(--cyan, #00D2FF)', fontStyle: 'normal' }}>UNE EXCELLENCE.</em>
          </h1>

          <button 
            onClick={scrollToContent}
            className="absolute bottom-[5svh] md:bottom-10 cursor-pointer" 
            tabIndex={0} 
            aria-label="Faites défiler vers le bas pour explorer l'histoire DEM"
          >
            <div className="relative flex items-center justify-center gap-3 animate-bounce" aria-hidden="true">
              <div className="relative h-[48px] w-[48px] flex items-center justify-center overflow-hidden border border-solid border-white/50 bg-black/40 backdrop-blur-sm text-white rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex uppercase z-10 pointer-events-none">
          {/* Bandeau de piliers animés */}
          <div className="hidden w-full pb-6 md:flex opacity-80 mix-blend-overlay">
            <div className="flex w-full flex-1 items-center px-10">
              <h2 className="font-bold text-4xl xl:text-[80px] text-white tracking-wider">RAPIDITÉ</h2>
              <div className="mx-[20px] h-[3px] flex-1 xl:mx-[48px] bg-white"></div>
              <h2 className="font-bold text-4xl xl:text-[80px] text-white tracking-wider">TRAÇABILITÉ</h2>
              <div className="mx-[20px] h-[3px] flex-1 xl:mx-[48px] bg-white"></div>
              <h2 className="font-bold text-4xl xl:text-[80px] text-white tracking-wider">IMPACT</h2>
            </div>
          </div>
        </div>
      </section>

      {/* ── Page Hero Section ── */}
      <PageHeroSection
        contentMiniBar="L'ÂME DE LA MAISON"
        firstTitle="Plus qu'une plateforme,"
        secondTitle="Une révolution de la mobilité et de la livraison urbaine à Dakar."
      />

      {/* ── Chapitre 1: L'Origine ── */}
      <StoryChapter
        chapterNumber="CHAPITRE I"
        title="L'Origine du Mouvement"
        subtitle="La genèse d'une ambition"
        image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&auto=format&fit=crop&q=85"
        content={[
          "Tout a commencé dans le tumulte des artères de Dakar : des retards constants, un manque d'informations fiables sur l'acheminement des colis et des commerçants ralentis dans leur essor quotidien.",
          "Fascinés par le potentiel de la technologie pour transformer le quotidien, nous avons conçu DEM (Delivery Express Mobility) comme un pont fluide entre les marchands, les particuliers et des livreurs formés à l'excellence.",
          "Chaque course DEM porte en elle cette promesse fondatrice : offrir une expérience de livraison transparente, respectueuse du temps de chacun et profondément humaine."
        ]}
      />

      {/* ── Chapitre 2: Dakar ── */}
      <StoryChapter
        chapterNumber="CHAPITRE II"
        title="Dakar dans les Veines"
        subtitle="Le souffle de la ville"
        image="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85"
        reverse={true}
        darkTheme={true}
        content={[
          "Dakar n'est pas seulement notre ville de lancement ; c'est notre moteur. De la presqu'île du Plateau aux ruelles animées des Parcelles, de la corniche des Almadies aux carrefours de Pikine et Guédiawaye, notre réseau vit au diapason de la capitale.",
          "Nous puisons dans cette énergie unique pour concevoir des algorithmes qui contournent les embouteillages et relient les quartiers en un temps record de moins de 45 minutes.",
          "Faire appel à DEM, c'est soutenir une infrastructure locale robuste, conçue par et pour les acteurs du dynamisme sénégalais."
        ]}
      />

      {/* ── Chapitre 3: L'Artisanat / L'Opérationnel ── */}
      <StoryChapter
        chapterNumber="CHAPITRE III"
        title="La Rigueur du Terrain"
        subtitle="L'éloge de la précision"
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=85"
        content={[
          "Dans un univers logistique souvent impersonnel, nous faisons le choix du soin et de la responsabilité. Chaque colis confié est traité avec la même exigence qu'un objet précieux.",
          "Nos livreurs et chefs de flotte ne sont pas de simples numéros : ce sont les ambassadeurs de vos marques, formés à la courtoisie, à la sécurité routière et à l'usage des outils numériques.",
          "L'excellence n'est pas un hasard, c'est une discipline quotidienne qui bâtit une confiance inaltérable entre acheteurs et vendeurs."
        ]}
      />

      {/* ── Valeurs Incarnées ── */}
      <section className="bg-[#021520] py-24 border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex w-full flex-col-reverse pt-5">
            <h2 className="uppercase font-bold text-balance text-3xl lg:text-6xl block text-white">
              Nos Valeurs<em className="not-italic text-cyan"> Incarnées.</em>
            </h2>
            <span className="w-full rotate-[-2deg] font-serif text-cyan -mb-2 xl:-mb-4 text-3xl lg:text-5xl italic">
              Esprit DEM
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
            {[
              { 
                label: 'Excellence', 
                img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=85', 
                desc: "Une ponctualité stricte et un suivi millimétré. Nous respectons nos engagements à la minute près." 
              },
              { 
                label: 'Authenticité', 
                img: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=85', 
                desc: "Des solutions ancrées dans le tissu économique sénégalais, adaptées aux usages de paiement Wave et Cash." 
              },
              { 
                label: 'Traçabilité', 
                img: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&auto=format&fit=crop&q=85', 
                desc: "Transparence totale pour l'expéditeur et le destinataire grâce au tracking GPS en temps réel." 
              },
              { 
                label: 'Impact Humain', 
                img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=85', 
                desc: "Rémunération juste, couverture d'assistance et valorisation du métier de coursier urbain." 
              }
            ].map((v, i) => (
              <div key={i} className="flex flex-col gap-6 group">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl relative shadow-xl">
                  <img 
                    src={v.img} 
                    alt={v.label} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-cyan font-serif text-2xl">0{i+1}.</span>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white">{v.label}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifeste (Section pleine couleur) ── */}
      <section className="bg-[#0086C8] py-32 lg:py-48 text-[#021520]" ref={manifestoRef}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative flex w-full flex-col-reverse pt-5">
            <h2 className="uppercase font-black text-balance text-3xl lg:text-6xl block text-white">
              Notre<em className="not-italic text-[#021520]"> Manifeste</em>
            </h2>
            <span className="w-full rotate-[-2deg] font-serif text-white -mb-2 xl:-mb-4 text-3xl lg:text-5xl italic">
              Esprit DEM
            </span>
          </div>
          <blockquote className="text-3xl lg:text-5xl font-serif italic text-white/95 leading-tight mb-12 mt-6">
            "Nous ne faisons pas que livrer des colis. <br/>
            <span className="text-[#021520] font-sans font-bold not-italic uppercase tracking-tight block my-2 text-2xl lg:text-4xl">
              Nous fluidifions les échanges d'une métropole.
            </span>
            Nous rapprochons les commerçants de leurs clients, <br/>
            avec vitesse, dignité et confiance."
          </blockquote>
          <div className="w-20 h-[2px] bg-white mx-auto mb-8" />
          <p className="uppercase tracking-[0.3em] text-xs text-white/80 font-bold">
            — L'Équipe Fondatrice DEM
          </p>
        </div>
      </section>

      {/* ── Les Secrets de Confection / Opérations ── */}
      <div className="px-6">
        <IngredientsDetailSection />
      </div>

      {/* ── Chapitre 4: L'Héritage / L'Écho du Réseau ── */}
      <StoryChapter
        chapterNumber="CHAPITRE IV"
        title="L'Écho du Réseau"
        subtitle="Un impact sans frontières"
        image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=85"
        reverse={true}
        darkTheme={false}
        content={[
          "Aujourd'hui, DEM s'impose comme le partenaire privilégié des boutiques en ligne, des restaurants et des acteurs institutionnels à Dakar.",
          "Mais peu importe l'échelle de notre croissance, nous restons fidèles à notre ADN : l'agilité, la transparence financière et le soutien sans réserve à notre flotte de coursiers.",
          "L'aventure logistique ne fait que commencer. Chaque nouveau commerçant, chaque nouvelle livraison est une opportunité de réinventer la ville ensemble."
        ]}
      />

      {/* Gallery for L'Echo du Monde */}
      <section className="bg-white py-20 overflow-hidden text-[#021520]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&auto=format&fit=crop&q=85" 
                alt="DEM Réseau Dakar" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                loading="lazy"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl md:translate-y-12">
              <img 
                src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85" 
                alt="DEM Logistique" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                loading="lazy"
              />
            </div>
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85" 
                alt="DEM Impact" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Chiffres Clés ── */}
      <section className="bg-[#021520] py-24 text-white border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex w-full text-center flex-col-reverse pt-5">
            <h2 className="uppercase font-bold text-balance text-3xl lg:text-6xl block text-white">
              Réalisations <em className="not-italic text-cyan">Clés</em>
            </h2>
            <span className="w-full rotate-[-2deg] font-serif text-cyan -mb-2 xl:-mb-4 text-3xl lg:text-5xl italic">
              Notre histoire en chiffres
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 mt-16">
            {[
              { num: '7j/7', label: "Service continu sans interruption" },
              { num: '< 45m', label: 'Délai moyen record à Dakar' },
              { num: '100%', label: "Traçabilité GPS en direct" },
              { num: '500+', label: 'Courses opérées chaque jour' }
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl lg:text-7xl font-serif text-cyan mb-2 group-hover:scale-110 transition-transform duration-500 font-bold">{s.num}</div>
                <div className="text-[10px] lg:text-xs uppercase tracking-[0.3em] text-white/60 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final / Info ── */}
      <ContactCTA
        theme="white"
        watermark="MAISON"
        title="Rejoignez la nouvelle vision de la"
        highlight="mobilité urbaine."
        subtitle="L'Aventure DEM"
        description="Que ce soit pour expédier vos commandes quotidiennes, devenir coursier partenaire ou intégrer votre flotte, chaque collaboration commence par une histoire."
        primaryBtnText="Explorer les services"
        primaryBtnLink="/services"
        primaryBtnIcon="arrow"
        secondaryBtnText="Écrire à la Maison"
        secondaryBtnLink="/contact"
        bullets={[
          "Présent sur l'ensemble de Dakar",
          "Technologie développée localement",
          "Support & accompagnement 7j/7"
        ]}
      />

    </div>
  );
}
