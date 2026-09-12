import { useState } from 'react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import PricingDemPro from '../components/sections/PricingDemPro.jsx';

export default function DemPro() {
  const [selectedPlan, setSelectedPlan] = useState('business');

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION AWWWARDS ── */}
      <PageHeroSection
        contentMiniBar="SOLUTIONS E-COMMERCE & GRANDS COMPTES"
        firstTitle="Propulsez la logistique de votre business plus facilement."
        secondTitle="Livraison Same-Day, reversement COD sous 24h et intégration e-commerce fluide partout à Dakar."
      />

      {/* ── 2. BANDEAU DE MÉTRIQUES B2B (NO GRADIENT, NO ROUNDED) ── */}
      <section className="border-t border-b border-black/10 bg-dark text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { num: "< 2h", label: "Délai moyen Same-Day", sub: "Expédition et remise le jour même à vos clients" },
            { num: "24h", label: "Reversement COD garanti", sub: "Collecte des fonds et virement direct Wave / OM" },
            { num: "100%", label: "Traçabilité & Preuve OTP", sub: "Signature numérique et code de validation" },
            { num: "-30%", label: "Taux de retour colis", sub: "Grâce aux notifications SMS et au géoguidage" }
          ].map((item, idx) => (
            <div key={idx} className="p-8 lg:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <span className="font-['DM_Sans',sans-serif] font-black text-4xl lg:text-5xl text-cyan mb-3 block">
                {item.num}
              </span>
              <div>
                <h3 className="uppercase text-xs font-bold tracking-widest text-white mb-1 font-['Raleway',sans-serif]">
                  {item.label}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed m-0">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. TARIFICATION, AVANTAGES & TABLEAU COMPARATIF DEM PRO (AWWWARDS) ── */}
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
