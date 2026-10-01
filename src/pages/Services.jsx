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
          watermark="CONSEIL & DÉPLOIEMENT"
          title="Une formule de livraison adaptée à"
          highlight="CHACUN."
          subtitle="Conseil & Déploiement"
          description="Particulier, commerçant, entreprise, coursier ou chef de flotte : chez DEM, chacun a sa formule. Dites-nous qui vous êtes et ce dont vous avez besoin, notre équipe vous oriente vers la solution qui vous correspond."
          secondaryBtnText="Contactez nous"
          secondaryBtnLink="/contact"
          bullets={[
            "Un accompagnement personnalisé, sans engagement",
            "Une formule pour chaque profil : particulier, pro, entreprise, coursier ou chef de flotte",
            "Une équipe basée à Dakar, qui connaît le terrain",
            "Des coursiers formés et équipés",
            "Zéro commission pour les coursiers"
          ]}
        />
      </div>

    </div>
  );
}
