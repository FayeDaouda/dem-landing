import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight } from 'lucide-react';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function PricingDemPro({ onSelectPlan }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Heading split curtain ──
      const heading = sectionRef.current.querySelector('[data-pr="heading"]');
      if (heading) {
        const words = heading.textContent.trim().split(' ');
        heading.innerHTML = words.map(w =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span style="display:inline-block;" class="pr-word">${w}</span>` +
          `</span>`
        ).join(' ');
        gsap.fromTo(heading.querySelectorAll('.pr-word'),
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.045,
            scrollTrigger: { trigger: heading, start: 'top 88%', once: true }
          }
        );
      }

      // ── Règle commune : slide in from left ──
      gsap.fromTo('[data-pr="rule-box"]',
        { x: -50, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
        {
          x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)',
          duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-pr="rule-box"]', start: 'top 88%', once: true }
        }
      );

      // ── 3 cartes pricing : curtain stagger ──
      gsap.fromTo('[data-pr="plan-card"]',
        { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)',
          duration: 1.0, ease: 'expo.out',
          stagger: { amount: 0.5, from: 'start' },
          scrollTrigger: { trigger: '[data-pr="plans-grid"]', start: 'top 80%', once: true }
        }
      );

      // ── Prix en chiffres : compteur ──
      sectionRef.current.querySelectorAll('[data-pr-price]').forEach((el) => {
        const target = parseFloat(el.dataset.prPrice.replace(/\s/g, ''));
        if (!target) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(counter.val).toLocaleString('fr-FR'); },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });

      // ── Tableau comparatif : expand depuis le bas ──
      gsap.fromTo('[data-pr="comparison"]',
        { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)',
          duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-pr="comparison"]', start: 'top 85%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (planKey) => {
    if (onSelectPlan) {
      onSelectPlan(planKey);
    }
    const formEl = document.getElementById('demande-pro') || document.getElementById('download');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Données des 3 cartes d'offres officielles DEM Pro
  const plans = [
    {
      key: 'starter',
      name: 'DEM Pro Starter',
      tagline: 'Le tremplin',
      priceK: '2 400',
      priceUnit: 'FCFA / semaine',
      badge: 'PRODUIT D\'APPEL',
      isFeatured: false,
      desc: 'Pour démarrer, organiser ses courses et son catalogue privé.',
      highlights: [
        'Course simple incluse',
        'Courses groupées (2 simultanées)',
        'Courses programmées (3 simultanées)',
        '1 catalogue de 3 produits',
        'Analytics & filtres : 3 jours',
        'Compte solo (1 utilisateur) · 1 adresse',
        'Support Standard',
        'Vente en ligne non incluse (grisé)'
      ],
      ctaText: 'Choisir Starter',
    },
    {
      key: 'business',
      name: 'DEM Pro Business',
      tagline: 'Le best-seller',
      priceK: '3 200',
      priceUnit: 'FCFA / semaine',
      badge: 'LE PLUS CHOISI',
      isFeatured: true,
      desc: 'Vendre en ligne, encaisser, analyser. Tout ce qu’un commerçant sérieux veut vraiment.',
      highlights: [
        <>Toutes les fonctionnalités de l'offre <span className="font-bold text-cyan">Starter</span></>,
        'Vente en ligne (lien + paiement)',
        'Wallet (retrait 100 000 F / sem.)',
        'Courses groupées (4 simultanées)',
        'Courses programmées (6 simultanées)',
        '4 catalogues de 5 produits chacun',
        'Export CSV + PDF & Factures avec logo',
        'Mes clients (CRM)',
        'Analytics & filtres : 8 jours',
        '3 utilisateurs · 3 adresses enregistrées',
        'Support Prioritaire'
      ],
      ctaText: 'Choisir Business',
    },
    {
      key: 'premium',
      name: 'DEM Pro Premium',
      tagline: 'L’offre complète',
      priceK: '7 400',
      priceUnit: 'FCFA / semaine',
      badge: 'VOLUME & API',
      isFeatured: false,
      desc: 'Volume illimité, API, service dédié. Pour les gros vendeurs et ceux qui ont déjà un site.',
      highlights: [
        <>Toutes les fonctionnalités de l'offre <span className="font-bold text-[#0086C8]">Business</span></>,
        'API DEM (brancher son site)',
        'Courses groupées (8 simultanées)',
        'Courses programmées (8 simultanées)',
        '8 catalogues de 8 produits chacun',
        'Wallet (retrait 250 000 F / sem.)',
        'Analytics & filtres : 1 mois',
        '6 utilisateurs · 5 adresses enregistrées',
        'Support Dédié'
      ],
      ctaText: 'Choisir Premium',
    }
  ];

  // Matrice complète des fonctionnalités du tableau comparatif
  const comparisonSections = [
    {
      category: 'FONCTIONNALITÉS',
      rows: [
        { name: 'Course simple', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
        { name: 'Courses groupées (simultanées)', starter: '2', business: '4', premium: '8' },
        { name: 'Courses programmées (simultanées)', starter: '3', business: '6', premium: '8' },
        { name: 'Catalogue produits', starter: '1 catalogue de 3 produits', business: '4 catalogues de 5 produits chacun', premium: '8 catalogues de 8 produits chacun' },
        { name: 'Vente en ligne (lien + paiement)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Wallet, plafond de retrait', starter: false, business: '100 000 F / sem.', premium: '250 000 F / sem.' },
        { name: 'Analytics & filtres (historique)', starter: '3 jours', business: '8 jours', premium: '1 mois' },
        { name: 'Export CSV + PDF', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Mes clients (CRM)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Factures avec logo', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'API DEM (brancher son site)', starter: false, business: false, premium: 'Inclus' },
        { name: 'Utilisateurs par compte', starter: '1', business: '3', premium: '6' },
        { name: 'Adresses enregistrées', starter: '1', business: '3', premium: '5' },
        { name: 'Support', starter: 'Standard', business: 'Prioritaire', premium: 'Dédié' },
      ]
    }
  ];

  const renderCellContent = (value, isFeatured = false) => {
    if (value === false) {
      return (
        <span className="text-slate-300 text-lg font-bold select-none inline-block font-['DM_Sans',sans-serif]">
          —
        </span>
      );
    }
    if (value === 'Inclus') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-dark font-['DM_Sans',sans-serif]">
          <span className="w-4 h-4 rounded-none bg-cyan/20 text-[#0086C8] flex items-center justify-center">
            <Check size={12} strokeWidth={3} />
          </span>
          <span>Inclus</span>
        </span>
      );
    }
    if (typeof value === 'string' && value.startsWith('Grisé')) {
      return (
        <span className="text-[11px] font-semibold text-slate-400 italic font-['Poppins',sans-serif]">
          {value}
        </span>
      );
    }
    if (typeof value === 'string' && value.startsWith('Privé')) {
      return (
        <span className="text-xs font-semibold text-slate-500 font-['Poppins',sans-serif]">
          {value}
        </span>
      );
    }
    if (value === 'Illimité' || value === 'Illimitée') {
      return (
        <span className="text-xs sm:text-sm font-black uppercase text-[#0086C8] tracking-wider font-['DM_Sans',sans-serif]">
          {value}
        </span>
      );
    }
    return (
      <span className={`text-xs sm:text-sm font-bold ${isFeatured ? 'text-[#0086C8]' : 'text-dark'} font-['DM_Sans',sans-serif]`}>
        {value}
      </span>
    );
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white font-['DM_Sans',sans-serif]" id="tarifs">
      <div className="max-w-[1400px] mx-auto">

        {/* ── 1. EN-TÊTE PRINCIPAL ── */}
        <div className="mb-16">
          <MiniTitleWithBar content="LE PRINCIPE TARIFAIRE DEM PRO" />
          <div className="mt-4 overflow-hidden">
            <h2
              data-tv="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-dark leading-[1.05] tracking-tight"
            >
              Trois offres, chacune adaptée à votre niveau d'activité.
            </h2>
          </div>
          {/* <p className="mt-4 text-xs uppercase font-bold tracking-widest text-[#0086C8] font-['Raleway',sans-serif]">Transparence, E-commerce &amp; Rentabilité</p> */}
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
            Chaque formule débloque plus d'outils pour développer votre business plus rapidement, et en toute simplicité : plus votre offre est complète, plus vendre et gérer devient simple.
          </p>
        </div>


        {/* ── 3. LES 3 CARTES DE PRICING OFFICIELLES ── */}
        <div data-pr="plans-grid" className="grid grid-cols-1 lg:grid-cols-3 border border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-white mb-24">
          {plans.map((plan) => {
            const isFeatured = plan.isFeatured;

            return (
              <div
                key={plan.key}
                data-pr="plan-card"
                className={`p-8 lg:p-12 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.key === 'starter' ? 'bg-[#0B1A30] text-white' :
                  plan.key === 'business' ? 'bg-[#006091] text-white shadow-2xl relative z-10 lg:-my-4 lg:border-t-4 lg:border-t-cyan border-cyan' :
                  'bg-white text-dark border border-black/10 hover:bg-slate-50'
                }`}
              >
                <div>
                  {/* Titre & Eyebrow élégant en Serif Italique */}
                  <div className="mb-6">
                    <span
                      className={`font-serif italic text-base lg:text-lg block mb-1.5 ${
                        plan.key === 'business' ? 'text-cyan' : 'text-[#0086C8]'
                      }`}
                    >
                      {plan.tagline}
                    </span>
                    <h3
                      className={`text-2xl lg:text-3xl font-bold uppercase font-['DM_Sans',sans-serif] ${
                        plan.key === 'premium' ? 'text-dark' : 'text-white'
                      }`}
                    >
                      {plan.name}
                    </h3>
                  </div>

                  {/* Prix en FCFA / semaine */}
                  <div className="mb-6 pb-6 border-b border-black/10">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`text-4xl lg:text-5xl font-black font-['DM_Sans',sans-serif] tracking-tight ${
                          plan.key === 'business' ? 'text-cyan' : plan.key === 'starter' ? 'text-white' : 'text-dark'
                        }`}
                      >
                        {plan.priceK}
                      </span>
                      <span
                        className={`text-xs uppercase font-extrabold tracking-wider font-['DM_Sans',sans-serif] ${
                          plan.key === 'premium' ? 'text-slate-600' : 'text-white/90'
                        }`}
                      >
                        {plan.priceUnit}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-3 leading-relaxed m-0 font-['Poppins',sans-serif] ${
                        plan.key === 'premium' ? 'text-slate-600' : 'text-white/80'
                      }`}
                    >
                      {plan.desc}
                    </p>
                  </div>

                  {/* Liste des points clés de l'offre */}
                  <ul className="space-y-3 mb-8">
                    {plan.highlights.map((h, i) => (
                      <li
                        key={i}
                        className={`flex items-start gap-3 text-xs sm:text-sm font-medium font-['Poppins',sans-serif] leading-snug ${
                          plan.key === 'premium' ? 'text-slate-700' : 'text-white/90'
                        }`}
                      >
                        <span
                          className={`shrink-0 mt-0.5 font-bold ${
                            plan.key === 'business' ? 'text-cyan' : 'text-[#0086C8]'
                          }`}
                        >
                          ✓
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton d'action */}
                {/* <div className="pt-6 border-t border-black/10">
                  <button
                    type="button"
                    onClick={() => handleSelect(plan.key)}
                    className={`w-full py-4 uppercase font-bold tracking-widest text-xs sm:text-sm transition-all duration-250 cursor-pointer rounded-none flex items-center justify-center gap-2 border ${
                      isFeatured
                        ? 'bg-cyan text-dark border-cyan hover:bg-white hover:border-white'
                        : 'bg-dark text-white border-dark hover:bg-[#0086C8] hover:border-[#0086C8]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div> */}
              </div>
            );
          })}
        </div>

        {/* ── 4. TABLEAU COMPARATIF COMPLET (MATRICE DÉTAILLÉE) ── */}
        <div data-pr="comparison" className="border border-black/10 bg-white mb-28">
          
          {/* En-tête du Tableau */}
          <div className="p-8 lg:p-12 border-b border-black/10 bg-slate-50">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif]">
                  Tableau comparatif des offres DEM Pro
                </h3>
                <p className="text-sm text-slate-600 mt-1 mb-0 font-['Poppins',sans-serif]">
                  Vue d’ensemble des trois offres, fonction par fonction.
                </p>
              </div>
            </div>
          </div>

          {/* Table Container Responsive */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              
              {/* Header Columns */}
              <thead>
                <tr className="bg-dark text-white divide-x divide-white/10 border-b border-white/10">
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider w-2/5 font-['DM_Sans',sans-serif]">
                    Fonctionnalité
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 font-['DM_Sans',sans-serif]">
                    Starter (2 300 F)
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 bg-cyan text-dark font-['DM_Sans',sans-serif] relative">
                    <span className="block font-black">Business (3 200 F)</span>
                    <span className="text-[10px] tracking-widest block font-bold uppercase">LE PLUS CHOISI</span>
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 font-['DM_Sans',sans-serif]">
                    Premium (7 400 F)
                  </th>
                </tr>
              </thead>

              {/* Body by Category */}
              <tbody className="divide-y divide-black/10">
                {comparisonSections.map((sec, secIdx) => (
                  <tr key={secIdx} className="contents">
                    {/* Category Header Row */}
                    <tr className="bg-slate-100 border-t-2 border-b border-black/10">
                      <td
                        colSpan={4}
                        className="py-3.5 px-6 font-bold text-xs tracking-wider uppercase text-[#0086C8] bg-slate-100 font-['DM_Sans',sans-serif]"
                      >
                        {sec.category}
                      </td>
                    </tr>

                    {/* Category Item Rows */}
                    {sec.rows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-slate-50/80 transition-colors divide-x divide-black/10"
                      >
                        {/* Feature Name */}
                        <td className="py-4 px-6 text-xs sm:text-sm font-medium text-dark font-['Poppins',sans-serif]">
                          {row.name}
                        </td>

                        {/* Starter Value */}
                        <td className="py-4 px-6 text-center">
                          {renderCellContent(row.starter, false)}
                        </td>

                        {/* Business Value (Highlighted Column) */}
                        <td className="py-4 px-6 text-center bg-cyan/[0.04]">
                          {renderCellContent(row.business, true)}
                        </td>

                        {/* Premium Value */}
                        <td className="py-4 px-6 text-center">
                          {renderCellContent(row.premium, false)}
                        </td>
                      </tr>
                    ))}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* Légende / Pied de tableau */}
          <div className="p-6 border-t border-black/10 bg-slate-50 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 font-['Poppins',sans-serif]">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-cyan/20 text-[#0086C8] flex items-center justify-center font-bold">✓</span>
                <span>Inclus dans l’offre</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-slate-400 font-bold text-base leading-none">—</span>
                <span>Non inclus</span>
              </span>
            </div>
            <span className="text-slate-500 italic text-[11px]">
              * Les tarifs s'entendent en FCFA TTC. Facturation hebdomadaire sans engagement.
            </span>
          </div>

        </div>

        {/* ── 5. APPEL À L'ACTION ── */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 mt-12 mb-8 max-w-4xl mx-auto">
          <a
            href="https://play.google.com/store/apps/details?id=sn.dem.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-5 bg-dark !text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-cyan hover:!text-dark transition-colors text-center rounded-sm group"
          >
            <span>Demander mon essai gratuit business d’une semaine</span>
          </a>
          <a
            href="#contact"
            className="flex-1 px-6 py-5 border-2 border-dark text-dark font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-dark hover:!text-white transition-colors text-center rounded-sm group"
          >
            <span>Réserver un call avec un agent pour paramétrer mon catalogue</span>
          </a>
        </div>



      </div>
    </section>
  );
}
