import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Smartphone, Store, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function EssaiGratuitDemPro() {
  const [selectedProfile, setSelectedProfile] = useState('pro');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onboardingSteps = [
    {
      num: '1',
      title: "Téléchargez l’application DEM",
      desc: "Installez l’application DEM sur votre téléphone et ouvrez-la.",
      tag: "Étape 1"
    },
    {
      num: '2',
      title: "Renseignez votre numéro de téléphone",
      desc: "Entrez votre numéro afin de créer votre compte DEM.",
      tag: "Étape 2"
    },
    {
      num: '3',
      title: "Validez votre numéro",
      desc: "Un code OTP vous sera envoyé par SMS. Il devrait arriver dans les 30 secondes. Saisissez ce code dans l’application pour continuer.",
      tag: "Étape 3"
    },
    {
      num: '4',
      title: "Choisissez « DEM Pro »",
      desc: "Lors du choix de votre type de compte, sélectionnez DEM Pro pour accéder aux fonctionnalités destinées aux professionnels.",
      tag: "Étape 4"
    },
    {
      num: '5',
      title: "Renseignez les informations demandées",
      desc: "Complétez les informations concernant votre activité ou votre entreprise, puis envoyez votre demande.",
      tag: "Étape 5"
    },
    {
      num: '6',
      title: "Attendez la validation de votre compte",
      desc: "Notre équipe vérifie votre demande. La validation se fait généralement dans l’heure.",
      tag: "Étape 6"
    },
    {
      num: '7',
      title: "Demandez votre essai gratuit",
      desc: "Une fois votre compte DEM Pro validé, rendez-vous dans la section Business et demandez votre essai gratuit de 7 jours.",
      tag: "Étape 7 · 7 Jours Offerts",
      isHighlight: true
    }
  ];

  const profileOptions = [
    {
      id: 'particulier',
      name: 'Client Particulier',
      badge: 'Personnel',
      desc: "Pour les envois personnels, courses ponctuelles et livraisons entre particuliers.",
      benefits: ["Commande ponctuelle", "Paiement à la course", "Suivi GPS en direct"]
    },
    {
      id: 'pro',
      name: 'Marchand & Entreprise (DEM Pro)',
      badge: '7 JOURS BUSINESS OFFERTS',
      isPro: true,
      desc: "Pour les commerçants, boutiques en ligne, marques et entreprises qui vendent et livrent régulièrement.",
      benefits: [
        "Boutique en ligne intégrée avec lien unique",
        "Wallet Pro & encaissements Mobile Money",
        "Factures normalisées avec votre logo",
        "Tarifs préférentiels dégressifs dès la 1ère course",
        "Support prioritaire dédié 7j/7"
      ]
    },
    {
      id: 'flotte',
      name: 'Chef de Flotte & Partenaire',
      badge: 'Flotte Moto',
      desc: "Pour les propriétaires de flottes de motos qui souhaitent superviser leurs coursiers.",
      benefits: ["Dashboard de supervision temps réel", "Formules Pass Prépayés", "Suivi des gains de la flotte"]
    }
  ];

  return (
    <div className="w-full bg-white text-[#021520] min-h-screen font-['DM_Sans',sans-serif] selection:bg-[#00D2FF] selection:text-[#021520]">

      {/* ── 1. HERO SECTION DÉDIÉE ESSAI GRATUIT ── */}
      <PageHeroSection
        contentMiniBar="OFFRE DÉCOUVERTE DEM PRO · 7 JOURS OFFERTS"
        firstTitle="Testez DEM Pro Business gratuitement"
        secondTitle="pendant 7 jours entiers, sans engagement."
        watermark="ESSAI PRO"
      />

      {/* ── 2. SECTION ÉTAPES D'ONBOARDING (7 ÉTAPES) ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-14">
            {/* <MiniTitleWithBar content="PARCOURS D'ACTIVATION ÉTAPE PAR ÉTAPE" /> */}<SectionHeading
              align="left"
              title="COMMENT DÉMARRER VOTRE "
              highlight="ESSAI GRATUIT ?"
              subtitle="PARCOURS D'ACTIVATION ÉTAPE PAR ÉTAPE"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-['Poppins',sans-serif] max-w-3xl">
              Suivez ces 7 étapes simples pour activer vos 7 jours d'essai Business et profiter de toute la puissance de DEM Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {onboardingSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-7 sm:p-8 border transition-all duration-300 flex flex-col justify-between group relative ${
                  step.isHighlight
                    ? 'bg-gradient-to-br from-white via-white to-[#00D2FF]/15 border-[#0086C8] shadow-lg xl:col-span-2'
                    : 'bg-white border-black/10 hover:border-[#0086C8] hover:shadow-xl'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-3xl font-black font-mono transition-transform group-hover:scale-110 ${
                      step.isHighlight ? 'text-[#0086C8]' : 'text-[#0086C8]'
                    }`}>
                      {step.num}
                    </span>
                    {/* <span className={`text-[10px] uppercase font-bold font-mono px-2.5 py-1 border ${
                      step.isHighlight
                        ? 'bg-[#00D2FF] text-[#021520] border-[#00D2FF]'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {step.tag}
                    </span> */}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold uppercase text-[#021520] mb-3 leading-snug font-['DM_Sans',sans-serif]">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                    {step.desc}
                  </p>
                </div>

                {/* <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0086C8] uppercase font-mono">
                  <span>{step.isHighlight ? "Offre 7 jours activée" : "Étape validée"}</span>
                  <Check size={16} className="text-[#0086C8]" />
                </div> */}
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ── 3. INTERFACE DE SÉLECTION DU COMPTE À L'INSCRIPTION ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Colonne gauche : Explications */}
            <div className="lg:col-span-5">
              <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-[#0086C8] block mb-2">
                GUIDE D'INSCRIPTION DANS L'APP
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#021520] tracking-tight mb-6 font-['DM_Sans',sans-serif]">
                Sélectionnez le bon profil dans l'application
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-8">
                Lors de votre premier lancement de l'application DEM, veillez à cocher le profil <strong>« Marchand & Entreprise (DEM Pro) »</strong> pour débloquer automatiquement la période d'essai Business.
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-black/10 flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#0086C8] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[#021520]">Aucune carte bancaire requise</h4>
                    <p className="text-xs text-slate-600 mt-0.5">L'essai de 7 jours s'active sans aucun moyen de paiement préalable.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-black/10 flex items-start gap-3">
                  <div className="w-5 h-5 bg-[#0086C8] text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-[#021520]">Sans engagement de renouvellement</h4>
                    <p className="text-xs text-slate-600 mt-0.5">À la fin des 7 jours, choisissez la formule qui vous convient (Starter, Business, Premium) ou arrêtez sans frais.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne droite : Sélecteur de profil simulé */}
            <div className="lg:col-span-7 bg-slate-900 text-white p-8 sm:p-10 border border-black/20 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                  Écran d'inscription App DEM
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {profileOptions.map((prof) => {
                  const isSelected = selectedProfile === prof.id;
                  return (
                    <div
                      key={prof.id}
                      onClick={() => setSelectedProfile(prof.id)}
                      className={`p-6 border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#00D2FF]/10 border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.15)]'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'border-[#00D2FF] bg-[#00D2FF]' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <span className="w-2 h-2 bg-[#021520] block" />}
                          </div>
                          <h4 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white font-['DM_Sans',sans-serif] m-0">
                            {prof.name}
                          </h4>
                        </div>

                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 ${
                            prof.isPro
                              ? 'bg-[#00D2FF] text-[#021520]'
                              : 'bg-white/10 text-white/70 border border-white/10'
                          }`}
                        >
                          {prof.badge}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-white/70 font-['Poppins',sans-serif] ml-8 mb-4 leading-relaxed">
                        {prof.desc}
                      </p>

                      {isSelected && (
                        <div className="ml-8 pt-3 border-t border-white/10 space-y-2">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-[#00D2FF] block font-bold">
                            Inclus pendant votre essai :
                          </span>
                          {prof.benefits.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-2 text-xs text-white/90">
                              <span className="text-[#00D2FF] font-bold">✓</span>
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <a
                href="#download-section"
                className="w-full py-4 bg-[#00D2FF] text-[#021520] font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer"
              >
                <span>Télécharger l'application pour démarrer →</span>
              </a>
            </div>

          </div>

        </div>
      </section>


      {/* ── 4. DOWNLOAD CTA SECTION (CENTRALE) ── */}
      <div id="download-section">
        <DownloadAppCTA
          theme="white"
          watermark="ESSAI PRO"
          subtitle="Accès immédiat"
          title="Téléchargez l’application et activez"
          highlight="vos 7 jours gratuits."
          description="Disponible sur iPhone et Android. Rejoignez des centaines de commerçants dakarois qui gèrent leurs ventes et livraisons sur DEM Pro."
          bullets={[
            "Sélectionnez le profil « DEM Pro » lors de la création de votre compte",
            "Formule Business débloquée automatiquement pour 7 jours",
            "Boutique en ligne instantanée, wallet et factures pro inclus",
            "0 carte bancaire requise, résiliation libre à tout moment"
          ]}
          id="download"
        />
      </div>


      {/* ── 5. CONTACT & ASSISTANCE ONBOARDING ── */}
      <ContactCTA
        theme="cyan-deep"
        watermark="ASSISTANCE"
        subtitle="Un accompagnement dédié"
        title="Besoin d'aide pour paramétrer"
        highlight="votre catalogue ?"
        description="Nos conseillers basés à Dakar vous accompagnent pas à pas pour importer vos produits, créer vos premiers liens de commande et former votre équipe."
        primaryBtnText="Réserver mon appel d'accompagnement"
        primaryBtnLink={`/contact?subject=${encodeURIComponent("Demander un appel avec un agent")}&message=${encodeURIComponent("Je souhaite un accompagnement pour configurer mon compte DEM Pro et mon catalogue de produits.")}`}
        primaryBtnIcon="arrow"
        secondaryBtnText="Consulter les tarifs"
        secondaryBtnLink="/dem-pro#tarifs"
        secondaryBtnIcon="external"
      />

    </div>
  );
}
