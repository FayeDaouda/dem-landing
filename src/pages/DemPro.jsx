import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import DemProInterfaceGallery from '../components/sections/DemProInterfaceGallery.jsx';
import AvantagesDemProSection from '../components/sections/AvantagesDemProSection.jsx';
import TerrainVsDemSection from '../components/sections/TerrainVsDemSection.jsx';
import PricingDemPro from '../components/sections/PricingDemPro.jsx';
import AncragePricingSection from '../components/sections/AncragePricingSection.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function DemPro() {
  const [selectedPlan, setSelectedPlan] = useState('business');
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION (PHRASE F RETENUE) ── */}
      <PageHeroSection
        contentMiniBar="DEM PRO · LA SOLUTION DES VRAIS PROS"
        firstTitle="Organisez mieux, vendez plus."
        secondTitle="Avec DEM Pro, vous gérez vos ventes et vos livraisons au même endroit. Moins de temps perdu, des clients mieux servis, et une image à la hauteur de votre marque."
        watermark="DEM PRO"
        buttonText={"Voir nos formules"}
        buttonLink={"/dem-pro/#tarifs"}
      />

      {/* ── 1b. APERÇU DE L'APPLICATION DEM PRO (5 CAPTURES D'ÉCRAN) ── */}
      <DemProInterfaceGallery />

      {/* ── 2. CE QUE VOUS GAGNEZ AVEC DEM PRO (AVANTAGES DU COMPTE) ── */}
      <AvantagesDemProSection />


      {/* ── 4. LES OFFRES DEM PRO (STARTER / BUSINESS / PREMIUM) & TABLEAU COMPARATIF ── */}
      <PricingDemPro onSelectPlan={(plan) => setSelectedPlan(plan)} />

      {/* ── 3. COMPARATIF EN 2 COLONNES : PROBLÈMES TERRAIN VS SOLUTIONS DEM ── */}
      <TerrainVsDemSection />
      
      {/* ── 4b. MÉCANIQUE D'ANCRAGE ── */}
      <AncragePricingSection />

      {/* ── 5. SECTION TÉLÉCHARGEMENT & ONBOARDING DEM PRO ── */}
      <DownloadAppCTA
        theme="white"
        watermark="DEM PRO"
        subtitle="N'attendez pas !"
        title="Rejoignez les marques qui"
        highlight="collaborent avec DEM."
        description="Téléchargez l’application DEM sur iOS ou Android, sélectionnez le profil « DEM Pro / Entreprise » lors de votre inscription et accédez immédiatement à votre portail d'expédition."
        bullets={[
          "Sélectionnez le profil « DEM Pro » lors de la création de votre compte",
          "Accès immédiat à la grille tarifaire professionnelle dégressive",
          "Encaissements : Cash reversé par nos coursiers ou Mobile Money instantané sur votre Wallet Pro",
          "Gestion des expéditions multiples et suivi en direct"
        ]}
        id="download"
      />

      {/* ── 6. SECTION INFO & CTA PERSONNALISÉ DEM PRO (PARAMÉTRABLE) ── */}
      {/* <ContactCTA
        theme="cyan-deep"
        watermark="DEM PRO"
        subtitle="Accélérez vos ventes"
        title="Propulsez votre marque avec"
        highlight="la logistique d'élite."
        description="Offrez à vos clients l'expérience de livraison Same-Day la plus rapide et fiable de Dakar. Déléguez vos expéditions, sécurisez vos encaissements COD et fidélisez vos acheteurs dès aujourd'hui."
        primaryBtnText="Télécharger l'App DEM"
        primaryBtnLink="#download"
        primaryBtnIcon="download"
      /> */}

    </div>
  );
}
