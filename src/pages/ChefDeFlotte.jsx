import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import {
  ShieldCheck,
  TrendingUp,
  Coins,
  Clock,
  Layers,
  Percent,
  ArrowRight,
  Check,
  Sliders,
  FileText,
  CheckCircle2,
  HelpCircle,
  Zap,
  Lock,
  ChevronDown
} from 'lucide-react';

export default function ChefDeFlotte() {
  // Simulateur d'exploitation Chef de Flotte Externe
  const [motosCount, setMotosCount] = useState(5); // 3 à 10 motos éligibles
  const [selectedOffer, setSelectedOffer] = useState('month'); // '5days', '15days', 'month'
  const [activeScenario, setActiveScenario] = useState('reference'); // 'reference' (14 500 F/j) ou 'prudent' (6 000 F/j)
  const [openFaq, setOpenFaq] = useState(null);

  // Définition des 3 offres officielles de Pass Prépayé
  const OFFERS = {
    // '5days': {
    //   name: 'Forfait 5 jours',
    //   days: 5,
    //   pricePerDay: 1900,
    //   totalPerCourier: 9500,
    //   badge: 'Flexibilité maximale',
    //   role: 'Engagement court, idéal pour tester ou ajuster',
    //   savingsVsMarket: '-31%'
    // },
    '10days': {
      name: 'Forfait 10 jours',
      days: 10,
      pricePerDay: 1200,
      totalPerCourier: 12000,
      badge: 'Le plus équilibré',
      role: 'Engagement moyen, prix/jour fortement réduit',
      savingsVsMarket: '-49%'
    },
    'month': {
      name: 'Forfait 1 mois (30j)',
      days: 30,
      pricePerDay: 1000,
      totalPerCourier: 39000,
      badge: 'Rentabilité maximale',
      role: 'Engagement long, tarif le plus bas du marché',
      savingsVsMarket: '-53%'
    }
  };

  const currentOffer = OFFERS[selectedOffer];

  // Calculs économiques
  // Scénario Référence : 11 600 FCFA/jour/coursier (8 courses à 1450 FCFA)
  // Scénario Prudent : 3 courses/jour à 2 000 FCFA sur 20 jours (soit 6 000 FCFA/jour/coursier)
  const activeDays = currentOffer.days;
  const caPerDayPerCourier = activeScenario === 'reference' ? 11600 : 6000;

  // Si scénario prudent, calcul sur 20 jours effectifs même en forfait mensuel
  const effectiveWorkingDays = activeScenario === 'prudent' ? Math.min(activeDays, 20) : activeDays;

  const totalFleetCA = motosCount * caPerDayPerCourier * effectiveWorkingDays;
  const totalPassCost = motosCount * currentOffer.totalPerCourier;
  const netRemainingForChef = totalFleetCA - totalPassCost;
  const passSharePercent = Math.round((totalPassCost / totalFleetCA) * 100);
  const chefKeepsPercent = 100 - passSharePercent;

  // Estimation mise en relation (100 FCFA / course payé par le client, versé à DEM)
  // Hypothèse : 6 courses / jour / coursier sur 26 jours = 156 courses / mois = 15 600 FCFA / coursier
  const estimatedCoursesPerMonth = motosCount * 156;
  const estimatedMiseEnRelation = estimatedCoursesPerMonth * 100;

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Utilitaire split word curtain ──
      const splitCurtain = (selector, triggerEl, delayOffset = 0) => {
        const el = typeof selector === 'string'
          ? (triggerEl || document).querySelector(selector)
          : selector;
        if (!el) return;
        const words = el.textContent.trim().split(' ');
        el.innerHTML = words.map(w =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span style="display:inline-block;" class="sc-w">${w}\u00a0</span>` +
          `</span>`
        ).join('');
        gsap.fromTo(el.querySelectorAll('.sc-w'),
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1.05, ease: 'expo.out',
            stagger: 0.045, delay: delayOffset,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
          }
        );
      };

      // ── 1. HERO : split curtain + ligne ──
      splitCurtain('[data-cdf="hero-h1"]');

      // ── 2. SECTION MÉTRIQUES HUD : cards slide up stagger depuis bas ──
      gsap.fromTo('[data-cdf="metric-card"]',
        { y: 60, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 0.8, ease: 'expo.out',
          stagger: { amount: 0.5, from: 'start' },
          scrollTrigger: { trigger: '[data-cdf="metrics-grid"]', start: 'top 82%', once: true }
        }
      );

      // ── 3. SECTION OFFRES : heading + cards 3 colonnes ──
      splitCurtain('[data-cdf="offres-h"]');
      gsap.fromTo('[data-cdf="offer-card"]',
        { y: 80, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 0.9, ease: 'expo.out',
          stagger: { amount: 0.45, from: 'start' },
          scrollTrigger: { trigger: '[data-cdf="offers-grid"]', start: 'top 80%', once: true }
        }
      );

      // ── 4. BENCHMARK : heading + lignes tableau alternantes ──
      splitCurtain('[data-cdf="bench-h"]');
      gsap.fromTo('[data-cdf="bench-col-l"]',
        { x: -60, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-cdf="bench-wrap"]', start: 'top 85%', once: true }
        }
      );
      gsap.fromTo('[data-cdf="bench-col-r"]',
        { x: 60, clipPath: 'inset(0 0 0 100%)' },
        {
          x: 0, clipPath: 'inset(0 0 0 0%)',
          duration: 1.1, ease: 'expo.out', delay: 0.1,
          scrollTrigger: { trigger: '[data-cdf="bench-wrap"]', start: 'top 85%', once: true }
        }
      );

      // ── 5. SIMULATEUR : expand depuis bas ──
      gsap.fromTo('[data-cdf="simulator"]',
        { y: 80, clipPath: 'inset(0 0 100% 0)', scale: 0.97 },
        {
          y: 0, clipPath: 'inset(0 0 0% 0)', scale: 1,
          duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-cdf="simulator"]', start: 'top 82%', once: true }
        }
      );

      // ── 6. PROJECTION TABLE : reveal depuis bas ──
      gsap.fromTo('[data-cdf="proj-table"]',
        { y: 60, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-cdf="proj-table"]', start: 'top 85%', once: true }
        }
      );

      // ── 7. RÈGLES : stagger clipPath ──
      splitCurtain('[data-cdf="rules-h"]');
      gsap.fromTo('[data-cdf="rule-card"]',
        { y: 50, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 0.75, ease: 'expo.out',
          stagger: { amount: 0.65, from: 'start' },
          scrollTrigger: { trigger: '[data-cdf="rules-grid"]', start: 'top 82%', once: true }
        }
      );

      // ── 8. COCKPIT BLOCS : expand alternant ──
      splitCurtain('[data-cdf="cockpit-h"]');
      gsap.fromTo('[data-cdf="cockpit-block"]',
        { y: 60, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0, clipPath: 'inset(0 0 0% 0)',
          duration: 0.9, ease: 'expo.out',
          stagger: { amount: 0.5, from: 'start' },
          scrollTrigger: { trigger: '[data-cdf="cockpit-grid"]', start: 'top 82%', once: true }
        }
      );

      // ── 9. FAQ : items curtain stagger ──
      splitCurtain('[data-cdf="faq-h"]');
      gsap.fromTo('[data-cdf="faq-item"]',
        { x: -40, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0, clipPath: 'inset(0 0% 0 0)',
          duration: 0.7, ease: 'expo.out',
          stagger: { amount: 0.6, from: 'start' },
          scrollTrigger: { trigger: '[data-cdf="faq-list"]', start: 'top 84%', once: true }
        }
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  const pageRef_handleApplyFromSimulator = () => {
    const downloadElement = document.getElementById('download');
    if (downloadElement) {
      downloadElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyFromSimulator = () => {
    const downloadElement = document.getElementById('download');
    if (downloadElement) {
      downloadElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tableau officiel de projection du revenu Pass par flotte / mois (Page 5 du dossier)
  const PROJECTION_TABLE = [
    { count: 3, pass5: 28500, pass15: 63000, passMonth: 117000, miseRel: 46800 },
    { count: 4, pass5: 38000, pass15: 84000, passMonth: 156000, miseRel: 62400 },
    { count: 5, pass5: 47500, pass15: 105000, passMonth: 195000, miseRel: 78000 },
    { count: 6, pass5: 57000, pass15: 126000, passMonth: 234000, miseRel: 93600 },
    { count: 7, pass5: 66500, pass15: 147000, passMonth: 273000, miseRel: 109200 },
    { count: 8, pass5: 76000, pass15: 168000, passMonth: 312000, miseRel: 124800 },
    { count: 9, pass5: 85500, pass15: 189000, passMonth: 351000, miseRel: 140400 },
    { count: 10, pass5: 95000, pass15: 210000, passMonth: 390000, miseRel: 156000 },
  ];

  return (
    <div ref={pageRef} className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">

      {/* ── 1. HERO SECTION AWWWARDS ── */}
      <PageHeroSection
        contentMiniBar="PARTENAIRES · CHEF DE FLOTTE EXTERNE"
        firstTitle="Estimez vos revenus en intégrant le réseau DEM."
        watermark="FLOTTE"
      />

      {/* ── 5. SIMULATEUR DYNAMIQUE DE RENTABILITÉ FLOTTE (OFFICIEL DOSSIER) ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white" id="simulateur">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-16">
            <MiniTitleWithBar content="SIMULATEUR DE RENTABILITÉ FLOTTE" />
            <SectionHeading
              align="left"
              title="CALCULEZ PRÉCISÉMENT VOS GAINS ET "
              highlight="CE QUE VOTRE FLOTTE VOUS RAPPORTE"
              subtitle="Contrôle total · Simple · Transparent · Sans commission"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            {/* <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
              Le principe est simple : <strong>ce que votre flotte génère vs ce que vous payez à DEM</strong>. Vous constatez immédiatement le reste à charge minimal et la marge disponible pour rémunérer vos coursiers, l'entretien et votre bénéfice.
            </p> */}
          </div>

        <div data-cdf="simulator" className="grid grid-cols-1 lg:grid-cols-12 border border-black/10 bg-white shadow-sm">

            {/* Colonne Gauche : Commandes & Paramètres */}
            <div className="lg:col-span-6 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-black/10 flex flex-col justify-between">
              <div>

                {/* Sélecteur 1 : Nombre de motos (3 à 10) */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#0086C8] font-['Raleway',sans-serif] block mb-1">
                        Éligibilité Chef de Flotte
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-dark font-['DM_Sans',sans-serif]">
                        Nombre de motos (coursiers)
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-black text-dark font-['DM_Sans',sans-serif]">
                        {motosCount}
                      </span>
                      <span className="text-xs text-slate-500 block font-mono">
                        {motosCount > 1 ? 'motos inscrites' : 'moto inscrite'}
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={motosCount}
                    onChange={(e) => setMotosCount(Number(e.target.value))}
                    className="w-full accent-[#0086C8] cursor-pointer h-2 bg-slate-200 rounded-none"
                  />

                  {/* Boutons rapides 3 à 10 */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {[3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setMotosCount(count)}
                        className={`text-xs font-mono font-bold px-3 py-1.5 transition-colors cursor-pointer border ${motosCount === count
                          ? 'bg-[#0086C8] text-white border-[#0086C8]'
                          : 'bg-slate-50 text-slate-700 border-black/10 hover:border-[#0086C8]'
                          }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 italic font-['Poppins',sans-serif]">
                    * Éligibilité standard : 3 à 10 motos. Au-delà de 10 motos, extension soumise à validation préalable de la direction DEM.
                  </p>
                </div>

                {/* Sélecteur 2 : Choix du Pass */}
                <div className="mb-8 pt-6 border-t border-black/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0086C8] font-['Raleway',sans-serif] block mb-3">
                    Offre de Pass DEM choisie
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: '10days', label: '10 jours', price: '12 000 F', sub: '1 200 F/j' },
                      { key: 'month', label: '26j + 4 dimanches offets', price: '36 000 F', sub: '1 200 F/j' }
                    ].map((plan) => (
                      <button
                        key={plan.key}
                        type="button"
                        onClick={() => setSelectedOffer(plan.key)}
                        className={`p-3 text-left border transition-all cursor-pointer ${selectedOffer === plan.key
                          ? 'bg-dark text-white border-dark'
                          : 'bg-white text-dark border-black/10 hover:bg-slate-50'
                          }`}
                      >
                        <span className="text-xs font-bold uppercase block">{plan.label}</span>
                        <span className={`text-sm font-bold font-mono block ${selectedOffer === plan.key ? 'text-cyan' : 'text-[#0086C8]'}`}>
                          {plan.price}
                        </span>
                        <span className="text-[10px] opacity-70 block">{plan.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sélecteur 3 : Scénario d'activité (Référence vs Prudent) */}
                <div className="pt-6 border-t border-black/10">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0086C8] font-['Raleway',sans-serif] block mb-3">
                    Scénario de Chiffre d'Affaires
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveScenario('reference')}
                      className={`p-3 text-left border transition-all cursor-pointer ${activeScenario === 'reference'
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950'
                        : 'border-black/10 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase">Scénario Référence</span>
                        {activeScenario === 'reference' && <Check size={14} className="text-emerald-600" />}
                      </div>
                      <span className="text-xs text-slate-600 block">11 600 FCFA / jour / coursier (8 courses/j)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveScenario('prudent')}
                      className={`p-3 text-left border transition-all cursor-pointer ${activeScenario === 'prudent'
                        ? 'border-amber-600 bg-amber-50/70 text-amber-950'
                        : 'border-black/10 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold uppercase">Scénario Prudent</span>
                        {activeScenario === 'prudent' && <Check size={14} className="text-amber-600" />}
                      </div>
                      <span className="text-xs text-slate-600 block">3 courses/jour à 2 000 F (sur 20 jours)</span>
                    </button>
                  </div>
                </div>

              </div>

              <div className="pt-8 mt-8 border-t border-black/10">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-['Poppins',sans-serif]">
                  <Lock size={14} className="text-[#0086C8]" />
                  <span>Crédit prépayé : le chef achète d'avance, aucun découvert possible.</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite : Bilan Financier & Restant Chef (HUD Sombre) */}
            <div className="lg:col-span-6 p-8 lg:p-12 bg-dark text-white flex flex-col justify-between">
              <div>

                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-white/10 text-white font-mono">
                    {motosCount} motos · {currentOffer.name}
                  </span>
                </div>

                {/* 3 Blocs de Décomposition du Dossier */}
                <div className="space-y-4">

                  {/* CA Brut de la Flotte */}
                  <div className="p-4 sm:p-5 bg-white/[0.02] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-white/10 text-white/80 text-[9px] font-mono font-bold uppercase tracking-wider">
                          CHIFFRE D'AFFAIRES
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-white/90 font-['Raleway',sans-serif]">
                          Total généré
                        </span>
                      </div>
                      <small className="text-[10px] text-white/50 block mt-1">
                        {motosCount} coursiers × {caPerDayPerCourier.toLocaleString('fr-FR')} F × {effectiveWorkingDays} jours
                      </small>
                    </div>
                    <span className="text-xl sm:text-2xl lg:text-3xl font-black text-white/90 font-['DM_Sans',sans-serif] shrink-0 ml-4">
                      {totalFleetCA.toLocaleString('fr-FR')} <span className="text-xs font-normal">FCFA</span>
                    </span>
                  </div>

                  {/* Coût Pass DEM */}
                  <div className="p-4 sm:p-5 bg-red-500/10 border border-red-500/20 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-red-500/20 text-red-200 text-[9px] font-mono font-bold uppercase tracking-wider">
                          COÛT PASS DEM
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-red-100/90 font-['Raleway',sans-serif]">
                          Prépayé
                        </span>
                      </div>
                      <small className="text-[10px] text-red-200/50 block mt-1">
                        {motosCount} coursiers × {currentOffer.totalPerCourier.toLocaleString('fr-FR')} FCFA ({passSharePercent}% du CA)
                      </small>
                    </div>
                    <span className="text-xl sm:text-2xl font-black text-red-400 font-['DM_Sans',sans-serif] shrink-0 ml-4">
                      − {totalPassCost.toLocaleString('fr-FR')} <span className="text-xs font-normal">FCFA</span>
                    </span>
                  </div>

                  {/* Reste Net Chef de Flotte (Grande Boîte Cyan) */}
                  <div className="p-5 sm:p-6 bg-gradient-to-r from-[#00D2FF]/20 to-[#0086C8]/15 border-2 border-[#00D2FF] flex items-center justify-between mt-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-[#00D2FF] text-[#021520] text-[9px] font-mono font-bold uppercase tracking-wider">
                          RESTE AU CHEF
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-white font-['Raleway',sans-serif]">
                          Marge conservée : {chefKeepsPercent}% du CA
                        </span>
                      </div>
                      <small className="text-[10px] text-white/70 block mt-1">
                        Soit ~{Math.round(netRemainingForChef / motosCount).toLocaleString('fr-FR')} FCFA / moto
                      </small>
                    </div>
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#00D2FF] font-['DM_Sans',sans-serif] shrink-0 ml-4">
                      {netRemainingForChef.toLocaleString('fr-FR')} <span className="text-sm">FCFA</span>
                    </span>
                  </div>

                  {/* Estimation complémentaire : Mise en relation client (Page 5 dossier) */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 flex items-center justify-between mt-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white/60 block font-['Raleway',sans-serif] uppercase text-[10px] tracking-wider">
                          MISE EN RELATION CLIENT
                        </span>
                      </div>
                      <small className="text-[10px] text-white/40 block mt-1">
                        100 F × {estimatedCoursesPerMonth.toLocaleString('fr-FR')} courses (payé par le client, 0 F ponctionné)
                      </small>
                    </div>
                    <span className="text-sm font-bold text-white/70 font-mono shrink-0 ml-4">
                      ~{estimatedMiseEnRelation.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                </div>

              </div>

              {/* Bouton d'action direct */}
              <div className="pt-8 mt-8 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleApplyFromSimulator}
                  className="w-full py-4 uppercase font-bold tracking-widest text-xs sm:text-sm bg-cyan text-dark hover:bg-white transition-all duration-250 cursor-pointer border border-cyan rounded-none flex items-center justify-center gap-2"
                >
                  <span>Brancher ma flotte de {motosCount} moto{motosCount > 1 ? 's' : ''} sur DEM</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ── 2. BANDEAU DE MÉTRIQUES B2B & PRINCIPES CLÉS (SHARP HUD) ── */}
      <section className="border-t border-b border-black/10 bg-dark text-white">
        <div data-cdf="metrics-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { num: "0%", label: "Commission sur les courses", sub: "Principe intangible : vos coursiers gardent 100% de leurs revenus" },
            { num: "-53%", label: "Écart vs commissions marché", sub: "1 300 F/j chez DEM contre ~2 755 F/j sur le marché à 19%" },
            { num: "3 à 10", label: "Motos par flotte externe", sub: "Un coursier par moto inscrite. Tout agrandissement du parc nécessite l'accord de DEM." },
            { num: "100%", label: "Prépayé & Zéro impayé", sub: "Le chef achète son pass d'avance. Trésorerie saine et autonomie totale" }
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

      {/* ── 3. LE MODÈLE EN UN COUP D'ŒIL & LES 3 OFFRES DE PASS ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white" id="offres">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-16">
            <MiniTitleWithBar content="TARIFICATION & OFFRES DE PASS" />
            <SectionHeading
              align="left"
              title="Trois forfaits indépendants"
              highlight="adaptés à votre trésorerie"
              subtitle="Ce que DEM encaisse · Zéro commission cachée"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
              Le chef de flotte externe achète son crédit de pass à l'avance pour ses coursiers inscrits. Ses coursiers roulent sur ce crédit ; à épuisement, le chef recharge avec l'offre de son choix. <strong>Chaque offre est un forfait complet</strong> : pas de rallonge ni de jours à l'unité.
            </p>
          </div>

          {/* Grille des 3 Cartes Offres Awwwards Sharp */}
          <div data-cdf="offers-grid" className="grid grid-cols-1 lg:grid-cols-3 border border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-white mb-12">

            {/* Offre 1 : Forfait 5 jours */}
            <div data-cdf="offer-card" className="p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif italic text-base text-[#0086C8]">
                    Engagement Court
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-100 text-slate-700">
                    5 jours
                  </span>
                </div>

                <h3 className="text-2xl font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                  Forfait 5 jours
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-['Poppins',sans-serif]">
                  Idéal pour démarrer, tester la réactivité de ses équipes ou piloter avec une trésorerie très courte.
                </p>

                <div className="py-6 border-t border-b border-black/10 mb-6 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Prix / jour :</span>
                    <span className="text-xl font-bold text-dark font-mono">1 900 FCFA</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#0086C8] font-bold">Total / coursier :</span>
                    <span className="text-2xl font-black text-dark font-['DM_Sans',sans-serif]">9 500 FCFA</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5">
                      -31% vs commission marché (19%)
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 font-['Poppins',sans-serif]">
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Facturation par coursier inscrit (1 moto = 1 coursier)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Accès complet au cockpit télématique DEM</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Tee-shirts officiels DEM inclus pour vos livreurs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Crédit prépayé : zéro risque d'impayé</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => { setSelectedOffer('5days'); handleApplyFromSimulator(); }}
                  className="w-full py-3.5 uppercase font-bold tracking-widest text-xs border border-dark text-dark hover:bg-dark hover:text-white transition-colors cursor-pointer"
                >
                  Choisir le 5 jours →
                </button>
              </div>
            </div>

            {/* Offre 2 : Forfait 15 jours */}
            <div data-cdf="offer-card" className="p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors bg-slate-50/50">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif italic text-base text-[#0086C8]">
                    Engagement Moyen
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/20 text-[#0086C8]">
                    15 jours
                  </span>
                </div>

                <h3 className="text-2xl font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                  Forfait 15 jours
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-['Poppins',sans-serif]">
                  Le compromis équilibré : couverture sur deux semaines avec un coût journalier nettement allégé.
                </p>

                <div className="py-6 border-t border-b border-black/10 mb-6 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Prix / jour :</span>
                    <span className="text-xl font-bold text-dark font-mono">1 400 FCFA</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#0086C8] font-bold">Total / coursier :</span>
                    <span className="text-2xl font-black text-dark font-['DM_Sans',sans-serif]">21 000 FCFA</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5">
                      -49% vs commission marché (19%)
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 font-['Poppins',sans-serif]">
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Facturation par coursier inscrit (1 moto = 1 coursier)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Accès complet au cockpit télématique DEM</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Tee-shirts officiels DEM inclus pour vos livreurs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-[#0086C8] shrink-0 mt-0.5" />
                    <span>Économie de 500 F/jour par rapport au pass 5j</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => { setSelectedOffer('15days'); handleApplyFromSimulator(); }}
                  className="w-full py-3.5 uppercase font-bold tracking-widest text-xs border border-[#0086C8] bg-[#0086C8] text-white hover:bg-dark hover:border-dark transition-colors cursor-pointer"
                >
                  Choisir le 15 jours →
                </button>
              </div>
            </div>

            {/* Offre 3 : Forfait 1 mois (30 jours) */}
            <div data-cdf="offer-card" className="p-8 lg:p-10 flex flex-col justify-between bg-dark text-white relative">
              <div className="absolute top-0 right-0 bg-cyan text-dark text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 font-['DM_Sans',sans-serif]">
                PRIX / JOUR MINI
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif italic text-base text-cyan">
                    Engagement Long
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/10 text-cyan">
                    30 jours
                  </span>
                </div>

                <h3 className="text-2xl font-bold uppercase text-white mb-2 font-['DM_Sans',sans-serif]">
                  Forfait 1 mois (30 j)
                </h3>
                <p className="text-xs text-white/70 mb-6 font-['Poppins',sans-serif]">
                  La rentabilité maximale. Le tarif journalier le plus bas pour exploiter sa flotte sur un mois plein.
                </p>

                <div className="py-6 border-t border-b border-white/10 mb-6 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-white/60 font-bold">Prix / jour :</span>
                    <span className="text-xl font-bold text-cyan font-mono">1 300 FCFA</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-cyan font-bold">Total / coursier :</span>
                    <span className="text-2xl font-black text-white font-['DM_Sans',sans-serif]">39 000 FCFA</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-cyan font-bold bg-white/10 px-2 py-0.5">
                      -53% vs commission marché (19%)
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 text-xs text-white/90 font-['Poppins',sans-serif]">
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-cyan shrink-0 mt-0.5" />
                    <span>Facturation par coursier inscrit (1 moto = 1 coursier)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-cyan shrink-0 mt-0.5" />
                    <span>Accès complet au cockpit télématique DEM</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-cyan shrink-0 mt-0.5" />
                    <span>Tee-shirts officiels DEM inclus pour vos livreurs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check size={15} className="text-cyan shrink-0 mt-0.5" />
                    <span>Seulement 9% du chiffre d'affaires généré</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => { setSelectedOffer('month'); handleApplyFromSimulator(); }}
                  className="w-full py-3.5 uppercase font-bold tracking-widest text-xs bg-cyan text-dark hover:bg-white transition-colors cursor-pointer border border-cyan"
                >
                  Choisir le 1 mois →
                </button>
              </div>
            </div>

          </div>

          {/* Bandeau d'explication : Mise en relation & Principe Intangible */}
          <div className="grid grid-cols-1 lg:grid-cols-12 border border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-slate-50">
            <div className="lg:col-span-4 p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#0086C8] uppercase block mb-1">
                  Mise en relation automatique
                </span>
                <h4 className="text-lg font-bold text-dark uppercase font-['DM_Sans',sans-serif] mb-2">
                  100 FCFA / course
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                  Ajoutée automatiquement au prix de chaque livraison et prélevée à la source par DEM. Revenu variable selon le volume de courses. <strong>Aucune action du chef, aucune ponction sur le coursier.</strong>
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 p-6 lg:p-8 bg-cyan/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-dark mb-2">
                  <ShieldCheck size={18} className="text-[#0086C8]" />
                  <span className="text-xs font-bold uppercase tracking-widest font-['Raleway',sans-serif]">
                    Principe intangible non-négociable
                  </span>
                </div>
                <h4 className="text-lg font-bold text-dark uppercase font-['DM_Sans',sans-serif] mb-2">
                  Les coursiers gardent 100% de leurs courses
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-['Poppins',sans-serif] m-0">
                  Les 100 FCFA de mise en relation sont un ajout au prix côté client, <strong>jamais une ponction sur le gain du coursier</strong>. DEM ne prend aucune commission en pourcentage. Le chef de flotte reste entièrement libre de sa gestion interne (versement fixe ou salaire avec ses coursiers).
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 4. POSITIONNEMENT FACE AU MARCHÉ (BENCHMARK COMMISSION 19%) ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">

          <div data-cdf="bench-wrap" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div data-cdf="bench-col-l" className="lg:col-span-5">
              <MiniTitleWithBar content="AVANTAGE COMPÉTITIF ÉCRASANT" />
              <SectionHeading
                align="left"
                title="Pourquoi DEM bat"
                highlight="les modèles à commission"
                subtitle="Comparatif Face au Marché"
                titleColor="text-dark"
                highlightColor="var(--color-cyan-2, #0086C8)"
                scriptColor="text-cyan-2"
                titleSize="text-3xl md:text-5xl"
                className="mt-4"
              />
              <p className="mt-6 text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                Le marché de l'intermédiation prend en moyenne <strong>19% de commission sur chaque course</strong>. Pour un coursier qui réalise 11 600 FCFA/jour, cela représente <strong>2 204 FCFA/jour prélevés</strong> (11 600 × 19%).
              </p>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                Les trois offres DEM se situent toutes largement sous ce seuil — et surtout, <strong>DEM ne prend rien sur les courses supplémentaires réalisées</strong>. Plus votre flotte roule, plus votre marge grandit.
              </p>
            </div>

            <div data-cdf="bench-col-r" className="lg:col-span-7">
              <div className="border border-black/10 bg-white shadow-sm">
                <div className="p-6 border-b border-black/10 bg-dark text-white flex justify-between items-center">
                  <span className="text-xs uppercase font-bold tracking-wider font-['Raleway',sans-serif]">
                    Modèle / Offre
                  </span>
                  <div className="flex gap-8 text-right text-xs uppercase font-bold tracking-wider font-['Raleway',sans-serif]">
                    <span>Coût / jour / coursier</span>
                    <span className="w-24">Écart vs marché</span>
                  </div>
                </div>

                <div className="divide-y divide-black/10 text-xs sm:text-sm">
                  <div className="p-5 flex justify-between items-center bg-slate-100/70">
                    <div>
                      <span className="font-bold text-dark block">Marché classique</span>
                      <span className="text-xs text-slate-500">Commission de 19% sur le CA journalier</span>
                    </div>
                    <div className="flex gap-8 items-center text-right font-mono">
                      <span className="font-bold text-slate-800">2 204 FCFA</span>
                      <span className="w-24 text-slate-400 font-sans font-bold">—</span>
                    </div>
                  </div>

                  <div className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="font-bold text-dark block">DEM — Forfait 5 jours</span>
                      <span className="text-xs text-slate-500">1 900 FCFA / jour</span>
                    </div>
                    <div className="flex gap-8 items-center text-right font-mono">
                      <span className="font-bold text-dark">1 900 FCFA</span>
                      <span className="w-24 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 text-xs font-sans">
                        −31%
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
                    <div>
                      <span className="font-bold text-dark block">DEM — Forfait 15 jours</span>
                      <span className="text-xs text-slate-500">1 400 FCFA / jour</span>
                    </div>
                    <div className="flex gap-8 items-center text-right font-mono">
                      <span className="font-bold text-dark">1 400 FCFA</span>
                      <span className="w-24 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 text-xs font-sans">
                        −49%
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex justify-between items-center bg-cyan/10 font-medium">
                    <div>
                      <span className="font-bold text-dark block">DEM — Forfait 1 mois (30 j)</span>
                      <span className="text-xs text-slate-600">1 300 FCFA / jour · Meilleur taux</span>
                    </div>
                    <div className="flex gap-8 items-center text-right font-mono">
                      <span className="font-black text-dark text-base">1 300 FCFA</span>
                      <span className="w-24 text-emerald-700 font-black bg-emerald-100 px-2 py-1 text-xs font-sans">
                        −53%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-black/10 text-[11px] text-slate-500 font-['Poppins',sans-serif]">
                  * Calcul basé sur un chiffre d'affaires moyen de 11 600 FCFA par coursier et par jour constaté sur le marché de la livraison express à Dakar.
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. PROJECTION OFFICIELLE PAR TAILLE DE FLOTTE (TABLEAU DOSSIER PAGE 5) ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-14">
            <MiniTitleWithBar content="PROJECTION COMPLÈTE 3 À 10 COURSIERS" />
            <SectionHeading
              align="left"
              title="Tableau de revenu pass"
              highlight="par taille de flotte"
              subtitle="Revenu ferme garanti & encaissé d'avance"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl"
              className="mt-4"
            />
            <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
              Relevé officiel du dossier interne. Une flotte pleine (10 coursiers) coûte à l'achat du pass entre 95 000 FCFA (tous en 5j) et 390 000 FCFA/mois (tous en 1 mois) — garanti, encaissé d'avance et sans commission variable imprévue.
            </p>
          </div>

          <div data-cdf="proj-table" className="border border-black/10 overflow-x-auto bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark text-white border-b border-black/10 text-xs uppercase font-['Raleway',sans-serif] tracking-wider">
                  <th className="p-4 lg:p-5 font-bold">Motos / Coursiers</th>
                  <th className="p-4 lg:p-5 font-bold">Tous en 5 jours (9 500 F)</th>
                  <th className="p-4 lg:p-5 font-bold">Tous en 15 jours (21 000 F)</th>
                  <th className="p-4 lg:p-5 font-bold bg-[#0086C8] text-white">Tous en 1 mois (39 000 F)</th>
                  <th className="p-4 lg:p-5 font-bold text-slate-300">Mise en relation est. (100 F/c)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10 text-xs sm:text-sm font-mono">
                {PROJECTION_TABLE.map((row) => (
                  <tr
                    key={row.count}
                    className={`hover:bg-slate-50 transition-colors ${motosCount === row.count ? 'bg-cyan/10 font-bold' : ''
                      }`}
                  >
                    <td className="p-4 lg:p-5 font-sans font-bold text-dark flex items-center gap-2">
                      <span>{row.count} motos</span>
                      {motosCount === row.count && (
                        <span className="text-[10px] font-sans font-bold uppercase px-2 py-0.5 bg-[#0086C8] text-white">
                          Sélection
                        </span>
                      )}
                    </td>
                    <td className="p-4 lg:p-5 text-slate-700">
                      {row.pass5.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="p-4 lg:p-5 text-slate-700">
                      {row.pass15.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="p-4 lg:p-5 font-bold text-[#0086C8] bg-cyan/5">
                      {row.passMonth.toLocaleString('fr-FR')} FCFA
                    </td>
                    <td className="p-4 lg:p-5 text-slate-500 font-sans text-xs">
                      +{row.miseRel.toLocaleString('fr-FR')} FCFA (payé client)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ── 7. RÈGLES D'EXPLOITATION & GARDE-FOUS (DOSSIER PAGES 8 & 9) ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-16">
            <MiniTitleWithBar content="CADRE CONTRACTUEL & RÈGLES D'EXPLOITATION" />
            <SectionHeading
              align="left"
              title="Les 8 règles fondamentales"
              highlight="du partenariat Chef de Flotte"
              subtitle="Transparence · Rigueur opérationnelle"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
              Une collaboration saine repose sur des frontières nettes. DEM assure l'infrastructure, le flux de courses et la télématique ; vous assurez l'exploitation de vos motos et le management de vos équipes.
            </p>
          </div>

          <div data-cdf="rules-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">
            {[
              {
                num: "01",
                title: "Éligibilité & Parc",
                rule: "3 à 10 motos",
                desc: "En dessous de 3 motos : pas de statut chef de flotte. Au-delà de 10 motos : extension soumise à validation préalable de DEM."
              },
              {
                num: "02",
                title: "Règle 1:1",
                rule: "1 moto = 1 coursier",
                desc: "Chaque moto est attribuée à un seul coursier. Le nombre de coursiers inscrits égale toujours exactement le nombre de motos."
              },
              {
                num: "03",
                title: "Prépayé Strict",
                rule: "Zéro impayé",
                desc: "Le chef achète son crédit de pass avant que ses coursiers roulent. Pas de découvert, pas de service à crédit, recharge libre."
              },
              {
                num: "04",
                title: "Frontière DEM / Chef",
                rule: "Autonomie managériale",
                desc: "DEM fournit la plateforme et les outils. Le chef gère sa flotte et son mode de rémunération (versement fixe ou salaire). DEM ne s'en mêle pas."
              },
              {
                num: "05",
                title: "Principe Intangible",
                rule: "100% pour les coursiers",
                desc: "Les coursiers gardent l'intégralité de leurs gains de courses. Les 100 FCFA de mise en relation sont réglés par le client, jamais ponctionnés."
              },
              {
                num: "06",
                title: "Pièces Obligatoires",
                rule: "Dossier certifié",
                desc: "Moto : CMC/carte grise, assurance, photo avec plaque visible. Coursier : permis de conduire recto-verso, selfie de validation."
              },
              {
                num: "07",
                title: "Inclus dans le Pass",
                rule: "Cockpit + Tee-shirts",
                desc: "Accès complet aux outils et application de gestion + tee-shirts DEM fournis pour vos livreurs. Zéro surcoût d'onboarding."
              },
              {
                num: "08",
                title: "Résiliation Souple",
                rule: "Préavis 2 semaines",
                desc: "Contrat résiliable à tout moment par l'une ou l'autre des parties, sous réserve d'un préavis formel de 2 semaines."
              }
            ].map((ruleItem, idx) => (
              <div key={idx} data-cdf="rule-card" className="p-8 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs font-bold text-[#0086C8]">
                      /{ruleItem.num}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700">
                      {ruleItem.rule}
                    </span>
                  </div>
                  <h4 className="text-base font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                    {ruleItem.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                    {ruleItem.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 8. COCKPIT LOGICIEL & TECHNOLOGIE FLOTTE (CE QUE DEM MET À DISPOSITION) ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">

          <div className="mb-16">
            <MiniTitleWithBar content="FONCTIONNALITÉS LOGICIELLES INCLUSES" />
            <SectionHeading
              align="left"
              title="Ce que vous permet"
              highlight="le cockpit DEM Flotte"
              subtitle="Technologie embarquée · Sans frais supplémentaires"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div data-cdf="cockpit-grid" className="grid grid-cols-1 md:grid-cols-12 gap-8">

            {/* Bloc 1 : Télémétrie Live */}
            <div data-cdf="cockpit-block" className="md:col-span-8 p-8 lg:p-12 bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8] mb-4 block">
                  /01 · Télémétrie Live
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Géolocalisation & Geofencing temps réel
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl font-['Poppins',sans-serif]">
                  Visualisez chaque moto de votre parc sur la carte interactive de Dakar. Configurez des alertes de zones, analysez les trajets empruntés et surveillez les temps d'arrêt pour une utilisation optimale de vos actifs.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 mt-8">
                <div>
                  <span className="text-xs uppercase text-slate-500 font-bold block">Précision GPS</span>
                  <span className="text-lg md:text-xl font-bold text-dark font-mono">± 3 mètres</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-500 font-bold block">Fréquence ping</span>
                  <span className="text-lg md:text-xl font-bold text-dark font-mono">Toutes les 5s</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-500 font-bold block">Historique</span>
                  <span className="text-lg md:text-xl font-bold text-dark font-mono">90 jours</span>
                </div>
              </div>
            </div>

            {/* Bloc 2 : Gestion des Pass & Consommation */}
            <div data-cdf="cockpit-block" className="md:col-span-4 p-8 lg:p-10 bg-dark text-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-cyan mb-4 block">
                  /02 · Gestion des Pass
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-3 font-['DM_Sans',sans-serif]">
                  Recharge Prépayée & Consommation Directe
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-['Poppins',sans-serif]">
                  Rechargez en un clic les pass de vos livreurs par Wave ou Orange Money. Suivez en temps réel les jours restants pour chaque coursier et réapprovisionnez sans coupure de service.
                </p>
              </div>

              <div className="p-4 bg-white/[0.04] border border-white/10 mt-6">
                <span className="text-[11px] uppercase tracking-widest text-cyan font-bold block mb-1">Modes de recharge</span>
                <span className="text-base font-bold text-white">Wave Pro · OM Pro · Virement</span>
              </div>
            </div>

            {/* Bloc 3 : Dispatch & Attribution */}
            <div data-cdf="cockpit-block" className="md:col-span-4 p-8 lg:p-10 bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8] mb-4 block">
                  /03 · Dispatch
                </span>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif]">
                  Flux Continu de Courses B2B
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                  Vos livreurs ont accès aux commandes des entreprises et marchands DEM Pro de Dakar : alimentation, mode, documents urgents et e-commerce sans temps mort.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <span className="text-xs font-bold text-[#0086C8] uppercase tracking-wider font-mono">Algorithme d'attribution optimisé</span>
              </div>
            </div>

            {/* Bloc 4 : Accords Garage & Remises Flotte */}
            <div data-cdf="cockpit-block" className="md:col-span-8 p-8 lg:p-12 bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8] mb-4 block">
                  /04 · Écosystème
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Accords d'Entretien & Tarifs Pièces Négociés
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl font-['Poppins',sans-serif]">
                  En tant que chef de flotte partenaire DEM, accédez à notre réseau d'ateliers mécaniques agréés à Dakar pour vos vidanges, pneumatiques et révisions à tarifs préférentiels négociés.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-slate-700">
                <span className="px-3 py-1.5 bg-slate-100">Jusqu'à -20% sur les pièces d'usure</span>
                <span className="px-3 py-1.5 bg-slate-100">Priorité en atelier partenaire</span>
                <span className="px-3 py-1.5 bg-slate-100">Contrat cadre assurance flotte</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 9. QUESTIONS FRÉQUENTES CHEF DE FLOTTE ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-t border-b border-white/10 bg-cyan-deep text-white">
        <div className="max-w-[1000px] mx-auto">

          <div data-cdf="faq-h" className="mb-14 text-center">
            <SectionHeading
              align="center"
              title="Tout ce que vous devez savoir"
              highlight="sur le statut Chef de Flotte Externe"
              subtitle="Questions & Modalités Pratiques"
              titleColor="text-white"
              highlightColor="var(--cyan, #00D2FF)"
              highlightClassName="text-[#00D2FF]"
              scriptColor="text-[#00D2FF]"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div data-cdf="faq-list" className="border border-white/15 divide-y divide-white/10 bg-black/10 backdrop-blur-sm">
            {[
              {
                q: "Combien de motos puis-je inscrire au démarrage ?",
                a: "Le statut de Chef de flotte externe est accessible pour les parcs comptant entre 3 et 10 motos. Chaque moto est rattachée à un coursier (règle 1:1). Au-delà de 10 motos, toute extension est soumise à validation formelle de l'équipe DEM."
              },
              {
                q: "Comment fonctionne le système de pass prépayé ?",
                a: "Vous achetez à l'avance le forfait de votre choix (5 jours, 15 jours ou 1 mois/30 jours) pour vos coursiers. Vos livreurs roulent sur ce crédit de jours. À épuisement, vous rechargez librement avec l'offre adaptée à votre trésorerie. Zéro découvert, zéro impayé."
              },
              {
                q: "DEM prend-il une commission sur les courses de mes livreurs ?",
                a: "Non, absolument aucune ! C'est un principe intangible chez DEM : les coursiers gardent 100% de leurs courses. Les 100 FCFA de mise en relation sont ajoutés au prix payé par le client final, jamais prélevés sur les gains du coursier ou de votre flotte."
              },
              {
                q: "Comment suis-je rémunéré en tant que chef de flotte ?",
                a: "DEM ne vous verse pas de salaire directement : vous vous rémunérez selon votre organisation interne (versement fixe journalier convenu avec vos coursiers ou salaire mensuel). DEM n'interfère pas dans votre relation financière interne avec vos livreurs."
              },
              {
                q: "Quelles sont les pièces obligatoires à fournir ?",
                a: "Pour chaque moto : certificat de mise en circulation (carte grise), attestation d'assurance en cours de validité et photo de la moto avec plaque visible. Pour chaque coursier : permis de conduire recto-verso et selfie de confirmation."
              },
              {
                q: "Puis-je changer d'offre de pass d'un cycle à l'autre ?",
                a: "Oui, totalement. Les 3 offres (5 jours, 15 jours, 30 jours) sont indépendantes. Vous pouvez par exemple prendre une offre 5 jours au démarrage pour évaluer vos équipes, puis basculer sur l'offre 30 jours pour maximiser votre marge à 1 300 F/jour."
              }
            ].map((faq, idx) => (
              <div key={idx} data-cdf="faq-item" className="p-6 lg:p-8 bg-white/[0.03] hover:bg-white/[0.07] transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left cursor-pointer gap-4"
                >
                  <span className="text-base lg:text-lg font-bold uppercase text-white font-['DM_Sans',sans-serif]">
                    {faq.q}
                  </span>
                  <span className="text-xl font-mono text-[#00D2FF] font-bold shrink-0">
                    {openFaq === idx ? "—" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="mt-4 text-sm md:text-base text-slate-200 leading-relaxed m-0 font-['Poppins',sans-serif] pt-4 border-t border-white/10">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 10. SECTION TÉLÉCHARGEMENT & ONBOARDING CHEF DE FLOTTE ── */}
      <DownloadAppCTA
        theme="white"
        watermark="FLOTTE"
        subtitle="Application Gestionnaire de Parc Externe"
        title="Enregistrez votre parc de motos"
        highlight="sur le réseau DEM."
        description="Téléchargez l’application DEM sur iOS ou Android. Sélectionnez le profil « Chef de flotte », téléversez les pièces de vos véhicules et de vos coursiers (3 à 10 motos), et activez vos pass prépayés pour commencer à rouler."
        bullets={[
          "Sélectionnez le profil « Chef de flotte » lors de l'inscription",
          "Validation des pièces justificatives de votre flotte sous 48h",
          "Achat de vos pass prépayés (5j, 15j ou 30j) par Wave ou Orange Money",
          "Dotation tee-shirts DEM offerte et activation immédiate des coursiers"
        ]}
        id="download"
      />

      {/* ── 11. SECTION ENGAGEMENT & IMPACT CHEF DE FLOTTE ── */}
      <ContactCTA
        theme="cyan-deep"
        watermark="FLOTTE"
        subtitle="Partenariat d'excellence"
        title="Développez la rentabilité de votre parc"
        highlight="sans commission imprévue."
        description="Connectez vos motos sur une infrastructure technologique robuste, offrez à vos coursiers un volume continu de commandes e-commerce à Dakar et conservez jusqu'à 91% du chiffre d'affaires généré."
        primaryBtnText="Télécharger l'App DEM"
        primaryBtnLink="#download"
        primaryBtnIcon="download"
      />

    </div>
  );
}
