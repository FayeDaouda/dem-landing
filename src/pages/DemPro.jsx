import { useState } from 'react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import AvantagesDemProSection from '../components/sections/AvantagesDemProSection.jsx';
import TerrainVsDemSection from '../components/sections/TerrainVsDemSection.jsx';
import PricingDemPro from '../components/sections/PricingDemPro.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function DemPro() {
  const [selectedPlan, setSelectedPlan] = useState('business');

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION (PHRASE F RETENUE) ── */}
      <PageHeroSection
        contentMiniBar="SOLUTIONS ENTREPRISES & E-COMMERCE"
        firstTitle="Organisez mieux, vendez plus."
        secondTitle="DEM Pro, votre logistique nouvelle génération."
      />

      {/* ── 2. CE QUE VOUS GAGNEZ AVEC DEM PRO (AVANTAGES DU COMPTE) ── */}
      <AvantagesDemProSection />

      {/* ── 3. COMPARATIF EN 2 COLONNES : PROBLÈMES TERRAIN VS SOLUTIONS DEM ── */}
      <TerrainVsDemSection />

      {/* ── 4. LES OFFRES DEM PRO (STARTER / BUSINESS / PREMIUM) & TABLEAU COMPARATIF ── */}
      <PricingDemPro onSelectPlan={(plan) => setSelectedPlan(plan)} />

      {/* ── 5. SECTION TÉLÉCHARGEMENT & ONBOARDING DEM PRO ── */}
      <DownloadAppCTA
        theme="white"
        watermark="DEM PRO"
        subtitle="Application Marchands & Entreprises"
        title="Rejoignez les marques qui"
        highlight="livrent avec DEM."
        description="Téléchargez l’application DEM sur iOS ou Android, sélectionnez le profil « DEM Pro / Entreprise » lors de votre inscription et accédez immédiatement à votre portail d'expédition."
        bullets={[
          "Sélectionnez le profil « DEM Pro » lors de la création de votre compte",
          "Accès immédiat à la grille tarifaire professionnelle dégressive",
          "Encaissement Cash on Delivery & reversements Wave/OM sous 24h",
          "Gestion des expéditions multiples et suivi GPS en direct"
        ]}
        id="download"
      />

      {/* ── 6. SECTION INFO & CTA PERSONNALISÉ DEM PRO (PARAMÉTRABLE) ── */}
      <ContactCTA
        theme="cyan-deep"
        watermark="DEM PRO"
        subtitle="Accélérez vos ventes"
        title="Propulsez votre marque avec"
        highlight="la logistique d'élite."
        description="Offrez à vos clients l'expérience de livraison Same-Day la plus rapide et fiable de Dakar. Déléguez vos expéditions, sécurisez vos encaissements COD et fidélisez vos acheteurs dès aujourd'hui."
        primaryBtnText="Télécharger l'App DEM"
        primaryBtnLink="#download"
        primaryBtnIcon="download"
      />

    </div>
  );
}
