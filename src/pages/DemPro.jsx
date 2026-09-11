import { useState } from 'react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
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


      {/* ── 3. AVANTAGES DEM PRO : CE QUE VOUS GAGNEZ ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="CE QUE VOUS GAGNEZ AVEC DEM PRO" />
            <SectionHeading
              align="left"
              title="Transformez votre logistique en"
              highlight="accélérateur de ventes"
              subtitle="Avantages Business & E-commerce"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
              Passer à un compte <strong>DEM Pro</strong>, c’est libérer votre business des contraintes de livraison, sécuriser vos encaissements et offrir à vos clients une expérience d’achat moderne et digne des plus grandes marques.
            </p>
          </div>

          {/* Grille des 6 Avantages Clés Awwwards (Sharp & Minimaliste) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black/10 divide-y md:divide-y-0 divide-black/10 bg-white">
            
            {/* Avantage 1 */}
            <div className="p-8 lg:p-10 flex flex-col justify-between border-b md:border-r border-black/10 hover:bg-slate-50 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                    /01 · Gain de temps
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                    Zéro appel
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  Expéditions groupées & programmées
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Fini la perte de temps à négocier chaque course au téléphone. Enregistrez jusqu’à 8 livraisons simultanées ou planifiez vos envois plusieurs jours à l'avance en un clic.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                  Bénéfice direct :
                </span>
                <span className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                  +3h gagnées par jour
                </span>
              </div>
            </div>

            {/* Avantage 2 */}
            <div className="p-8 lg:p-10 flex flex-col justify-between border-b lg:border-r border-black/10 hover:bg-slate-50 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                    /02 · Trésorerie
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                    24h chrono
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  Encaissement COD & Reversement 24h
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Nos livreurs encaissent vos fonds à la livraison (Espèces, Wave ou OM). L’argent est crédité sur votre Wallet DEM Pro et reversé sous 24h ouvrées sur votre compte.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                  Bénéfice direct :
                </span>
                <span className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                  0 risque d'impayé
                </span>
              </div>
            </div>

            {/* Avantage 3 */}
            <div className="p-8 lg:p-10 flex flex-col justify-between border-b border-black/10 hover:bg-slate-50 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                    /03 · Vente en ligne
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                    Mini-Boutique
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  Lien de commande & Catalogue digital
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Créez vos catalogues produits avec prix et stocks. Partagez votre lien de commande sur Instagram, TikTok ou WhatsApp pour que vos clients achètent en toute autonomie.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                  Bénéfice direct :
                </span>
                <span className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                  +40% de conversion
                </span>
              </div>
            </div>

            {/* Avantage 4 */}
            <div className="p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 hover:bg-slate-50 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                    /04 · Crédibilité
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                    Image de marque
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  Factures automatiques & NINEA
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Émettez automatiquement après chaque vente des factures professionnelles avec votre logo et vos mentions légales pour rassurer vos clients et simplifier votre comptabilité.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                  Bénéfice direct :
                </span>
                <span className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                  Comptabilité simplifiée
                </span>
              </div>
            </div>

            {/* Avantage 5 */}
            <div className="p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 lg:border-r border-black/10 hover:bg-slate-50 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                    /05 · Sécurité & Suivi
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                    Live GPS & OTP
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  Traçabilité temps réel & Preuve OTP
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Offrez à vos acheteurs un lien de suivi en direct sur la carte. La livraison est validée par code de sécurité ou signature, éliminant les contestations et litiges.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                  Bénéfice direct :
                </span>
                <span className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                  -30% de retours colis
                </span>
              </div>
            </div>

            {/* Avantage 6 */}
            <div className="p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                    /06 · Croissance
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                    CRM & Analytics
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                  CRM Clients & Rapports d'activité
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Identifiez vos meilleurs clients, suivez la courbe de vos ventes par semaine et exportez facilement vos données (CSV/PDF) pour piloter votre croissance avec précision.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                  Bénéfice direct :
                </span>
                <span className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                  Fidélisation maximale
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. TARIFICATION & TABLEAU COMPARATIF DEM PRO (AWWWARDS) ── */}
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
