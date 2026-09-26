import { useEffect } from 'react';
import useIsDesktop from '../hooks/useIsDesktop';
import useScrollReveal from '../hooks/useScrollReveal';
import ServicesHero from '../components/sections/ServicesHero.jsx';
import ServiceElement from '../components/sections/ServiceElement.jsx';
import PiliersSection from '../components/sections/PiliersSection.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import { servicesData } from '../data/servicesData.js';

export default function Services() {
  const isDesktop = useIsDesktop();
  useScrollReveal(isDesktop);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white text-[#021520] min-h-screen selection:bg-[#00D2FF] selection:text-[#021520]">
      
      {/* ── 1. HERO DÉDIÉ : PHRASE D'ENTRÉE & ACCÈS DIRECT AUX 5 SERVICES ── */}
      <div data-header-theme="black">
        <ServicesHero services={servicesData} />
      </div>

      {/* ── 2. LES 5 SERVICES DEM AVEC SCROLL PIN HEADER GSAP ── */}
      <section data-header-theme="black" className="w-full bg-white">
        {servicesData.map((service) => (
          <ServiceElement
            key={service.id}
            {...service}
          />
        ))}
      </section>

      

      {/* ── 4. SECTION CTA PERSONNALISÉ SERVICES ── */}
      <div data-header-theme="white">
        <ContactCTA
          theme="cyan-light"
          watermark="SERVICES"
          title="Une formule de livraison adaptée à"
          highlight="votre activité."
          subtitle="Conseil & Déploiement"
          description="Nos experts en logistique urbaine configurent la solution idéale pour votre flux d'envois : courses ponctuelles, tournées e-commerce ou coursiers dédiés."
          secondaryBtnText="Contacter l'équipe"
          secondaryBtnLink="/contact"
          bullets={[
            "Devis personnalisé sans engagement sous 24h",
            "Intégration API & Liens d'achats digitaux",
            "Couverture intégrale de Dakar & banlieue"
          ]}
        />
      </div>

    </div>
  );
}
