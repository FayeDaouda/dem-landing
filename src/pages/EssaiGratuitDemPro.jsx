import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Smartphone, Store, ShieldCheck, Sparkles, HelpCircle, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

import step1Img from '../assets/img/essaiGratuit/1.jpeg';
import step2Img from '../assets/img/essaiGratuit/2.jpeg';
import step3Img from '../assets/img/essaiGratuit/3.jpeg';
import step4Img from '../assets/img/essaiGratuit/4.jpeg';
import step5Img from '../assets/img/essaiGratuit/5.jpeg';
import step6Img from '../assets/img/essaiGratuit/6.jpeg';
import step7Img from '../assets/img/essaiGratuit/7.jpeg';
import finImg from '../assets/img/essaiGratuit/fin.jpeg';

export default function EssaiGratuitDemPro() {
  const [selectedProfile, setSelectedProfile] = useState('pro');
  const [modalIndex, setModalIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onboardingSteps = [
    {
      num: '1',
      title: "Téléchargez l’application DEM",
      desc: "Installez l’application DEM sur votre téléphone et ouvrez-la.",
      tag: "Étape 1",
      image: step1Img
    },
    {
      num: '2',
      title: "Renseignez votre numéro de téléphone",
      desc: "Entrez votre numéro afin de créer votre compte DEM.",
      tag: "Étape 2",
      image: step2Img
    },
    {
      num: '3',
      title: "Validez votre numéro",
      desc: "Un code OTP vous sera envoyé par SMS. Il devrait arriver dans les 30 secondes. Saisissez ce code dans l’application pour continuer.",
      tag: "Étape 3",
      image: step3Img
    },
    {
      num: '4',
      title: "Choisissez « DEM Pro »",
      desc: "Lors du choix de votre type de compte, sélectionnez DEM Pro pour accéder aux fonctionnalités destinées aux professionnels.",
      tag: "Étape 4",
      image: step4Img
    },
    {
      num: '5',
      title: "Renseignez les informations demandées",
      desc: "Complétez les informations concernant votre activité ou votre entreprise, puis envoyez votre demande.",
      tag: "Étape 5",
      image: step5Img
    },
    {
      num: '6',
      title: "Attendez la validation de votre compte",
      desc: "Notre équipe vérifie votre demande. La validation se fait généralement dans l’heure.",
      tag: "Étape 6",
      image: step6Img
    },
    {
      num: '7',
      title: "Demandez votre essai gratuit",
      desc: "Une fois votre compte DEM Pro validé, rendez-vous dans la section Business et demandez votre essai gratuit de 7 jours.",
      tag: "Étape 7 · 7 Jours Offerts",
      image: step7Img,
      isHighlight: true
    }
  ];

  // Gestion des touches clavier pour naviguer dans le modal
  useEffect(() => {
    if (modalIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalIndex(null);
      if (e.key === 'ArrowRight') setModalIndex((prev) => (prev < onboardingSteps.length - 1 ? prev + 1 : 0));
      if (e.key === 'ArrowLeft') setModalIndex((prev) => (prev > 0 ? prev - 1 : onboardingSteps.length - 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex, onboardingSteps.length]);

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
            <SectionHeading
              align="left"
              title="COMMENT DÉMARRER VOTRE "
              highlight="ESSAI GRATUIT ?"
              subtitle="Parcours d'activation étape par étape"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-['Poppins',sans-serif] max-w-3xl">
              Suivez ces 7 étapes simples pour activer vos 7 jours d'essai Business et profiter de toute la puissance de DEM Pro. Cliquez sur une étape pour l'agrandir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {onboardingSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setModalIndex(idx)}
                className={`p-5 sm:p-6 border transition-all duration-300 flex flex-col h-fit group relative cursor-pointer ${
                  step.isHighlight
                    ? 'bg-gradient-to-br from-white via-white to-[#00D2FF]/10 border-[#0086C8] shadow-lg hover:shadow-2xl xl:col-span-2'
                    : 'bg-white border-black/10 hover:border-[#0086C8] hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Visuel d'étape avec indicateur de zoom au survol */}
                  {step.image && (
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 border border-black/5 mb-5 group/img">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#021520]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2.5 bg-[#021520]/90 text-white rounded-none border border-white/20 flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                          <ZoomIn size={14} className="text-[#00D2FF]" />
                          <span>Agrandir</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#0086C8] transition-transform group-hover:scale-110">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold uppercase text-[#021520] mb-2 leading-snug font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MODAL LIGHTBOX INTERACTIF AVEC NAVIGATION PRÉCÉDENT / SUIVANT ── */}
      {modalIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalIndex(null)}
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#021520] text-white border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
          >
            {/* En-tête du modal */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-[#031c2b]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 bg-[#00D2FF] text-[#021520] font-mono font-bold text-xs uppercase tracking-wider">
                  Étape 0{modalIndex + 1}
                </span>
                <span className="text-white/60 font-mono text-xs">
                  0{modalIndex + 1} / 0{onboardingSteps.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModalIndex(null)}
                aria-label="Fermer le modal"
                className="w-9 h-9 flex items-center justify-center rounded-none bg-white/5 hover:bg-white/15 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Corps avec image et flèches de navigation */}
            <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#021520] overflow-hidden min-h-[320px]">
              {/* Bouton Précédent Flottant */}
              <button
                type="button"
                onClick={() => setModalIndex((prev) => (prev > 0 ? prev - 1 : onboardingSteps.length - 1))}
                aria-label="Étape précédente"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-[#021520]/80 hover:bg-[#00D2FF] hover:text-[#021520] text-white border border-white/20 transition-all cursor-pointer shadow-xl"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Image haute résolution */}
              <div className="max-h-[55vh] sm:max-h-[62vh] flex items-center justify-center">
                <img
                  src={onboardingSteps[modalIndex].image}
                  alt={onboardingSteps[modalIndex].title}
                  className="max-h-[55vh] sm:max-h-[62vh] w-auto max-w-full object-contain select-none shadow-2xl"
                />
              </div>

              {/* Bouton Suivant Flottant */}
              <button
                type="button"
                onClick={() => setModalIndex((prev) => (prev < onboardingSteps.length - 1 ? prev + 1 : 0))}
                aria-label="Étape suivante"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center bg-[#021520]/80 hover:bg-[#00D2FF] hover:text-[#021520] text-white border border-white/20 transition-all cursor-pointer shadow-xl"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Pied de page du modal avec titre, description et navigation */}
            <div className="px-5 sm:px-6 py-4 border-t border-white/10 bg-[#031c2b] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="max-w-xl">
                <h4 className="text-base sm:text-lg font-bold uppercase text-white font-['DM_Sans',sans-serif] m-0">
                  {onboardingSteps[modalIndex].title}
                </h4>
                <p className="text-xs sm:text-sm text-white/70 font-['Poppins',sans-serif] mt-1 m-0">
                  {onboardingSteps[modalIndex].desc}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalIndex((prev) => (prev > 0 ? prev - 1 : onboardingSteps.length - 1))}
                  className="px-4 py-2 border border-white/20 hover:border-[#00D2FF] hover:text-[#00D2FF] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span>Précédent</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalIndex((prev) => (prev < onboardingSteps.length - 1 ? prev + 1 : 0))}
                  className="px-4 py-2 bg-[#00D2FF] hover:bg-white text-[#021520] text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Suivant</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. RÉSULTAT FINAL : VOTRE ESPACE PRO EST PRÊT ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Colonne gauche : Explications du résultat */}
            <div className="lg:col-span-6">
              <MiniTitleWithBar content="RÉSULTAT APRÈS ACTIVATION" />
              <SectionHeading
                align="left"
                title="VOTRE ESPACE MARCHAND EST "
                highlight="PRÊT À L'EMPLOI."
                subtitle="Tableau de bord personnalisé"
                titleColor="text-dark"
                highlightColor="var(--color-cyan-2, #0086C8)"
                scriptColor="text-cyan-2"
                titleSize="text-3xl md:text-5xl lg:text-5xl"
                className="mt-2 mb-6"
              />
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-8">
                Dès que votre compte est validé et votre essai gratuit débloqué, votre boutique est immédiatement opérationnelle sur votre smartphone.
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-5 bg-slate-50 border border-black/10 flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#0086C8] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    01
                  </div>
                  <div>
                    <h4 className="text-base font-bold uppercase text-[#021520] font-['DM_Sans',sans-serif]">
                      Faites vos livraisons en 1 clic
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-['Poppins',sans-serif] m-0">
                      Lancez une livraison simple, programmez des envois pour plus tard ou regroupez plusieurs colis en une seule tournée.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-black/10 flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#0086C8] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    02
                  </div>
                  <div>
                    <h4 className="text-base font-bold uppercase text-[#021520] font-['DM_Sans',sans-serif]">
                      Ajoutez vos premiers produits
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-['Poppins',sans-serif] m-0">
                      Enregistrez vos articles, vos prix et vos photos pour les retrouver instantanément à chaque commande ou les partager à vos clients.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-black/10 flex items-start gap-4">
                  <div className="w-8 h-8 bg-[#0086C8] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                    03
                  </div>
                  <div>
                    <h4 className="text-base font-bold uppercase text-[#021520] font-['DM_Sans',sans-serif]">
                      Pilotez vos ventes et vos encaissements
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 font-['Poppins',sans-serif] m-0">
                      Suivez en direct le statut de vos colis livrés, vos encaissements Mobile Money et votre chiffre d'affaires quotidien.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#download-section"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#021520] !text-white hover:bg-[#0086C8] font-bold uppercase text-xs tracking-wider transition-colors cursor-pointer"
              >
                <span>Télécharger l'app et commencer l'essai →</span>
              </a>
            </div>

            {/* Colonne droite : Mockup de l'écran final */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative max-w-[340px] sm:max-w-[380px] w-full bg-slate-100 p-4 sm:p-6 border border-black/10 shadow-2xl">
                <div className="relative aspect-[9/18] w-full overflow-hidden bg-white border border-black/10 shadow-inner">
                  <img
                    src={finImg}
                    alt="Espace marchand DEM Pro activé"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
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
