import { useEffect, useRef } from 'react';
import PageHeroSection from '../components/sections/PageHeroSection';
import DownloadAppCTA from '../components/sections/DownloadAppCTA';
import PartnersSection from '../components/sections/PartnersSection';
import ContactCTA from '../components/sections/ContactCTA';

export default function Download() {
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={pageRef} className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION ── */}
      <PageHeroSection
        contentMiniBar="TÉLÉCHARGEZ NOTRE APPLICATION"
        firstTitle="Un réseau de livraison structuré"
        secondTitle="pour aller vite, et bien."
        description="Que vous soyez un particulier, un e-commerçant ou une entreprise, profitez du meilleur réseau de coursiers de Dakar directement depuis votre téléphone."
        watermark="APP"
      />

      {/* ── 2. DOWNLOAD CTA SECTION ── */}
      <DownloadAppCTA
        theme="white"
        watermark="Télécharger"
        subtitle="Rejoignez nous !"
        title="Votre livraison express au bout"
        highlight="des doigts."
        description="Téléchargez gratuitement l’application DEM sur iPhone et Android. Commandez, suivez votre coursier en direct sur la carte et payez en toute sécurité."
        id="download"
      />

      {/* ── 3. PARTENAIRES ── */}
      <PartnersSection />

      {/* ── 4. CONTACT ── */}
      <ContactCTA
              theme="cyan-deep"
              watermark="CONTACT"
              subtitle="Contactez-nous"
              title="Faites le premier pas vers"
              highlight="l'excellence."
              description="Que vous soyez un particulier, un commerçant ou une entreprise, profitez d'un réseau de livraison structuré pour aller vite, et bien."
              primaryBtnText="Prendre contact"
              primaryBtnLink="/contact"
              primaryBtnIcon="arrow"
              
            />
      
    </div>
  );
}
