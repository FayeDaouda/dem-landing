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
          `<span style="display:inline-block;" class="pr-word">${w}\u00a0</span>` +
          `</span>`
        ).join('');
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
      priceK: '2 000',
      priceUnit: 'FCFA / semaine',
      badge: 'PRODUIT D\'APPEL',
      isFeatured: false,
      desc: 'Pour démarrer, organiser ses courses et son catalogue privé.',
      highlights: [
        'Course Simple + Groupée (3 max simultanées)',
        'Course Programmée (2 max en même temps)',
        '1 seul catalogue, 3 produits maximum',
        'Gestion de stock activable sur chaque produit',
        'Catalogue privé (visible par le Pro uniquement)',
        'Suivi par statut + historique + recherche',
        'Compte solo (1 utilisateur) · 2 adresses favorites',
        'Facturation : infos entreprise + conformité NINEA',
        'Support standard (appel / WhatsApp / email) + mode nuit',
        'Vente en ligne, Wallet & Analytics non inclus (grisés)'
      ],
      ctaText: 'Choisir Starter',
    },
    {
      key: 'business',
      name: 'DEM Pro Business',
      tagline: 'Le best-seller',
      priceK: '3 000',
      priceUnit: 'FCFA / semaine',
      badge: 'LE PLUS CHOISI',
      isFeatured: true,
      desc: 'Vendre en ligne, encaisser, analyser. Tout ce qu’un commerçant sérieux veut vraiment.',
      highlights: [
        'Courses groupées (8 max) & programmées (8 max)',
        'Jusqu’à 8 catalogues / 50 produits (publics & partageables)',
        'Lien de commande = mini-boutique customisable (logo + fond)',
        'Paiement en ligne par le client & Wallet DEM Pro',
        'Plafond de retrait de 100 000 FCFA / semaine',
        'Commandes reçues dans une boîte de réception dédiée',
        '3 vues débloquées : Ventes / Livraisons / Activité (3 mois)',
        'Export comptable CSV + PDF en un clic',
        'Mes clients : historique, contact, fidélisation, meilleur client',
        'Factures automatiques après vente avec votre logo',
        '3 personnes sur le compte · 10 adresses · Support prioritaire'
      ],
      ctaText: 'Choisir Business',
    },
    {
      key: 'premium',
      name: 'DEM Pro Premium',
      tagline: 'L’offre complète',
      priceK: '6 000',
      priceUnit: 'FCFA / semaine',
      badge: 'VOLUME ILLIMITÉ & API',
      isFeatured: false,
      desc: 'Volume illimité, API, service dédié. Pour les gros vendeurs et ceux qui ont déjà un site.',
      highlights: [
        'Course Simple, Groupée & Programmée 100% illimitées',
        'Catalogues illimités & produits illimités',
        'Exclusif Premium : API DEM pour brancher votre boutique / site',
        'Lien de commande customisable (logo + image de fond)',
        'Paiement en ligne & Wallet (retraits 350 000 FCFA / semaine)',
        'Boîte de réception des commandes reçues',
        'Filtres jusqu’à 6 mois : Ventes / Livraisons / Activité',
        'Export CSV + PDF & facturation groupée par lot',
        'Mes clients : fidélisation et meilleur client',
        '5 personnes sur le compte · Adresses favorites illimitées',
        'Support premium, Account manager dédié & Priorité coursier'
      ],
      ctaText: 'Choisir Premium',
    }
  ];

  // Matrice complète des fonctionnalités du tableau comparatif
  const comparisonSections = [
    {
      category: 'LIVRAISONS',
      rows: [
        { name: 'Course Simple', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
        { name: 'Course Groupée (simultanées)', starter: '3 max en même temps', business: '8 max en même temps', premium: 'Illimitée' },
        { name: 'Course Programmée (simultanées)', starter: '2 max en même temps', business: '8 max en même temps', premium: 'Illimitée' },
        { name: 'Suivi par statut + historique + recherche', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'CATALOGUE PRODUITS',
      rows: [
        { name: 'Nombre de catalogues', starter: '1 seul catalogue', business: 'Jusqu’à 8 catalogues', premium: 'Illimité' },
        { name: 'Nombre de produits', starter: '3 produits max', business: '50 produits max', premium: 'Illimité' },
        { name: 'Gestion de stock activable', starter: 'Inclus (par produit)', business: 'Inclus (par produit)', premium: 'Inclus (par produit)' },
        { name: 'Visibilité catalogue', starter: 'Privé (visible Pro uniquement)', business: 'Public (partageable)', premium: 'Public (partageable)' },
      ]
    },
    {
      category: 'VENTE EN LIGNE — LE CŒUR DE L\'OFFRE',
      rows: [
        { name: 'Lien de commande (mini-boutique sans app)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Lien customisable (logo + image de fond)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Paiement en ligne par le client', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Wallet DEM Pro (solde, historique, retraits)', starter: false, business: '100 000 F / semaine', premium: '350 000 F / semaine' },
        { name: 'Boîte de réception des commandes reçues', starter: false, business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'CONNEXION EXTERNE — EXCLUSIF PREMIUM',
      rows: [
        { name: 'API DEM (brancher son propre site / e-shop)', starter: false, business: false, premium: 'Inclus (Clé API dédiée)' },
        { name: 'Création automatique de course par commande site', starter: false, business: false, premium: 'Inclus' },
      ]
    },
    {
      category: 'FINANCES / ANALYTICS',
      rows: [
        { name: 'Filtres de période disponibles', starter: 'Jour et Semaine uniquement', business: 'Jour / Semaine / Mois / 3 mois', premium: 'Jour / Sem / Mois / 3 mois / 6 mois' },
        { name: 'Vues débloquées (Ventes / Livraisons / Activité)', starter: 'Grisé (popup upgrade)', business: 'Inclus (taux réussite, courbes)', premium: 'Inclus (analytics complets)' },
        { name: 'Export comptable CSV + PDF', starter: 'Grisé (popup upgrade)', business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'CLIENTS / CRM',
      rows: [
        { name: 'Mes clients (historique, contact)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Meilleur client, fidélisation & courbes', starter: false, business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'FACTURATION',
      rows: [
        { name: 'Factures générées après chaque vente (avec logo)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Facturation groupée / par lot (gros volumes)', starter: false, business: false, premium: 'Inclus' },
        { name: 'Infos entreprise + conformité NINEA', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'UTILISATEURS & SERVICE',
      rows: [
        { name: 'Nombre d’utilisateurs sur le compte', starter: '1 seul (compte solo)', business: '3 personnes', premium: '5 personnes' },
        { name: 'Adresses favorites enregistrées', starter: '2 maximum', business: '10 maximum', premium: 'Illimité' },
        { name: 'Code promo activable', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
        { name: 'Niveau de support client', starter: 'Standard (Appel/WhatsApp/Email) + nuit', business: 'Support prioritaire', premium: 'Support premium' },
        { name: 'Account manager dédié', starter: false, business: false, premium: 'Inclus' },
        { name: 'Priorité coursier aux heures de pointe', starter: false, business: false, premium: 'Inclus' },
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
              data-pr="heading"
              className="font-extrabold text-3xl md:text-5xl lg:text-6xl font-['DM_Sans',sans-serif] text-dark leading-[1.05] tracking-tight"
            >
              Trois offres construites en escalier
            </h2>
          </div>
          <p className="mt-4 text-xs uppercase font-bold tracking-widest text-[#0086C8] font-['Raleway',sans-serif]">Transparence, E-commerce &amp; Rentabilité</p>
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
            DEM Pro fonctionne sur un modèle <strong>100% transparent et rentable</strong>. Chaque palier lève les limites du précédent. L’offre <strong>Business</strong> est pensée pour être le choix évident : c’est elle qui débloque la vente en ligne, le lien de commande et l’encaissement Wallet, le cœur de valeur de DEM Pro.
          </p>
        </div>

        {/* ── 2. RÈGLE COMMUNE À TOUTES LES OFFRES ── */}
        <div data-pr="rule-box" className="mb-16 border border-black/10 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-cyan" />
          <div className="p-6 md:p-8 pl-8 md:pl-10">
            <h3 className="text-lg md:text-xl font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
              Règle commune à toutes les offres
            </h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed m-0 font-['Poppins',sans-serif]">
              Les <strong>100 FCFA de mise en relation</strong> restent facturés au client sur chaque course, quelle que soit l’offre. L’abonnement paie uniquement l’accès aux outils professionnels. Le coursier garde <strong>100% de sa course</strong>.
            </p>
          </div>
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
                  isFeatured
                    ? 'bg-dark text-white shadow-2xl relative z-10 lg:-my-4 lg:border-t-4 lg:border-t-cyan border-cyan'
                    : 'bg-white text-dark hover:bg-slate-50'
                }`}
              >
                {/* Badge Featured */}
                {plan.badge && (
                  <div className={`absolute top-0 right-0 text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 font-['DM_Sans',sans-serif] ${
                    isFeatured ? 'bg-cyan text-dark' : 'bg-slate-100 text-slate-700 border-l border-b border-black/10'
                  }`}>
                    {isFeatured ? `★ ${plan.badge}` : plan.badge}
                  </div>
                )}

                <div>
                  {/* Titre & Eyebrow élégant en Serif Italique */}
                  <div className="mb-6">
                    <span
                      className={`font-serif italic text-base lg:text-lg block mb-1.5 ${
                        isFeatured ? 'text-cyan' : 'text-[#0086C8]'
                      }`}
                    >
                      {plan.tagline}
                    </span>
                    <h3
                      className={`text-2xl lg:text-3xl font-bold uppercase font-['DM_Sans',sans-serif] ${
                        isFeatured ? 'text-white' : 'text-dark'
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
                          isFeatured ? 'text-cyan' : 'text-dark'
                        }`}
                      >
                        {plan.priceK}
                      </span>
                      <span
                        className={`text-xs uppercase font-extrabold tracking-wider font-['DM_Sans',sans-serif] ${
                          isFeatured ? 'text-white' : 'text-slate-600'
                        }`}
                      >
                        {plan.priceUnit}
                      </span>
                    </div>
                    <p
                      className={`text-xs mt-3 leading-relaxed m-0 font-['Poppins',sans-serif] ${
                        isFeatured ? 'text-white/80' : 'text-slate-600'
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
                          isFeatured ? 'text-white/90' : 'text-slate-700'
                        }`}
                      >
                        <span
                          className={`shrink-0 mt-0.5 font-bold ${
                            isFeatured ? 'text-cyan' : 'text-[#0086C8]'
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
                <span className="font-serif italic text-base text-[#0086C8] block mb-1">
                  Matrice comparative complète
                </span>
                <h3 className="text-2xl md:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif]">
                  Tableau comparatif des offres DEM Pro
                </h3>
                <p className="text-sm text-slate-600 mt-1 mb-0 font-['Poppins',sans-serif]">
                  Vue d’ensemble des trois offres, fonction par fonction.
                </p>
              </div>
              <div className="text-xs text-slate-600 font-medium font-['Poppins',sans-serif]">
                La colonne <span className="text-dark font-bold underline">Business</span> est mise en avant (« le plus choisi »)
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
                    Starter (2 000 F)
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 bg-cyan text-dark font-['DM_Sans',sans-serif] relative">
                    <span className="block font-black">Business (3 000 F)</span>
                    <span className="text-[10px] tracking-widest block font-bold uppercase">LE PLUS CHOISI</span>
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 font-['DM_Sans',sans-serif]">
                    Premium (6 000 F)
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


        {/* ── 5. SECTION STRATÉGIQUE : LA MÉCANIQUE D'ANCRAGE ── */}
        <div className="border border-black/10 bg-slate-50 p-8 sm:p-12 lg:p-16">
          <div className="max-w-4xl mb-12">
            <MiniTitleWithBar content="STRATÉGIE & VALEUR CLIENT" />
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-dark tracking-tight leading-tight mt-3 mb-4">
              La mécanique d'ancrage : <br />
              <span className="font-serif italic font-normal text-[#0086C8] lowercase">
                pourquoi le Business est conçu pour être le plus vendu.
              </span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
              Chaque palier tarifaire DEM Pro a été méticuleusement calibré pour guider le commerçant vers la formule qui transforme réellement son activité, sans friction psychologique.
            </p>
          </div>

          {/* Les 4 Piliers d'Ancrage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                num: "01",
                title: "Le Starter frustre juste ce qu'il faut",
                desc: "Les vues analytics, l'export et la vente en ligne sont visibles mais grisés. À chaque tap sur une fonction bloquée, un popup propose de passer en Business. Le Pro voit exactement ce qu'il rate."
              },
              {
                num: "02",
                title: "Le Business débloque LA valeur",
                desc: "Le passage Starter → Business fait basculer d'un simple carnet de produits privé à une vraie boutique en ligne avec encaissement. C'est le saut le plus spectaculaire des trois — donc le plus facile à vendre."
              },
              {
                num: "03",
                title: "Le Premium rend le Business évident",
                desc: "Le Premium n'ajoute que du volume (illimité), du service (account manager, priorité coursier) et l'API. Pour un commerçant standard, ces avantages ne justifient pas le surcoût : il se rabat naturellement sur le Business."
              },
              {
                num: "04",
                title: "Résultat : L'effet d'aspiration",
                desc: "Le milieu aspire la majorité des souscriptions. Le Starter capte les petits budgets et sert de produit d'appel ; le Premium ancre le prix vers le haut et capte les gros comptes."
              }
            ].map((item, idx) => (
              <div key={idx} className="p-6 sm:p-8 bg-white border border-black/10 flex flex-col justify-between hover:border-[#0086C8] transition-colors">
                <div>
                  <span className="font-serif italic text-2xl font-light text-[#0086C8] block mb-3">
                    /{item.num}
                  </span>
                  <h4 className="text-lg font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Grille de synthèse d'ancrage */}
          <div className="border border-black/10 bg-white p-6 sm:p-8">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#0086C8] mb-4 font-['DM_Sans',sans-serif]">
              Synthèse de la grille tarifaire & Positionnement
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 border border-black/10">
              <div className="p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                  DEM Pro Starter
                </span>
                <span className="text-xl font-black text-dark block mb-1">
                  2 000 FCFA <span className="text-xs font-normal text-slate-500">/ sem</span>
                </span>
                <p className="text-xs text-slate-600 m-0 leading-relaxed">
                  Produit d'appel, accessible à tous pour démarrer sans risque.
                </p>
              </div>

              <div className="p-5 bg-cyan/10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#0086C8] font-bold block mb-1">
                  DEM Pro Business (Cible)
                </span>
                <span className="text-xl font-black text-dark block mb-1">
                  3 000 FCFA <span className="text-xs font-normal text-slate-500">/ sem</span>
                </span>
                <p className="text-xs text-slate-700 m-0 leading-relaxed font-semibold">
                  Le meilleur rapport — seulement +1 000 F pour débloquer toute la vente en ligne.
                </p>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                  DEM Pro Premium
                </span>
                <span className="text-xl font-black text-dark block mb-1">
                  6 000 FCFA <span className="text-xs font-normal text-slate-500">/ sem</span>
                </span>
                <p className="text-xs text-slate-600 m-0 leading-relaxed">
                  Ancre haute, gros comptes ayant besoin de l'API et du volume illimité.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 m-0 leading-relaxed italic font-['Poppins',sans-serif]">
              * Logique d’ancrage : le Business (3 000 F) n’est que 1 000 F au-dessus du Starter mais débloque toute la vente en ligne — l’écart de prix paraît dérisoire face au gain. Le Premium (6 000 F) est au double du Business : assez haut pour ancrer le prix vers le haut et rendre le Business évident, sans décourager les gros comptes qui ont besoin de l’API et du volume illimité.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
