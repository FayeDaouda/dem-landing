import { Check, ArrowRight } from 'lucide-react';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';

export default function PricingDemPro({ onSelectPlan }) {
  const handleSelect = (planKey) => {
    if (onSelectPlan) {
      onSelectPlan(planKey);
    }
    const formEl = document.getElementById('demande-pro');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Données des 3 cartes d'offres avec tarifs 2k, 3k, 6k et eyebrow en serif
  const plans = [
    {
      key: 'starter',
      name: 'DEM Pro Starter',
      tagline: 'Le tremplin',
      priceK: '2k',
      amountFCFA: '2 000 FCFA',
      badge: null,
      isFeatured: false,
      desc: 'Idéal pour digitaliser vos premières courses et gérer un petit catalogue.',
      highlights: [
        'Courses simples & groupées (3 max)',
        '1 Catalogue, jusqu’à 3 produits',
        'Suivi GPS en temps réel & historique',
        'Gestion de stock intégrée',
        'Infos entreprise & conformité NINEA',
        'Support standard 7j/7'
      ],
      ctaText: 'Choisir Starter',
    },
    {
      key: 'business',
      name: 'DEM Pro Business',
      tagline: 'Le best-seller',
      priceK: '3k',
      amountFCFA: '3 000 FCFA',
      badge: 'LE PLUS CHOISI',
      isFeatured: true,
      desc: 'Pensé pour être le choix évident : débloque la vente en ligne, la mini-boutique et l’encaissement Wallet.',
      highlights: [
        'Courses simultanées & programmées (8 max)',
        '8 Catalogues, jusqu’à 50 produits publics',
        'Lien de commande (mini-boutique customisable)',
        'Paiement en ligne & Wallet DEM Pro',
        'Plafond de retrait de 100 000 FCFA / semaine',
        'Facturation automatique avec votre logo',
        'CRM clients & Analytics sur 3 mois',
        'Support prioritaire dédié'
      ],
      ctaText: 'Choisir Business',
    },
    {
      key: 'premium',
      name: 'DEM Pro Premium',
      tagline: 'L’offre complète',
      priceK: '6k',
      amountFCFA: '6 000 FCFA',
      badge: 'SUR-MESURE & API',
      isFeatured: false,
      desc: 'La puissance logistique maximale pour les marques à fort volume et l’intégration API directe.',
      highlights: [
        'Courses groupées & programmées illimitées',
        'Catalogues & produits illimités',
        'API DEM directe (Shopify, WooCommerce, site web)',
        'Plafond de retrait de 350 000 FCFA / semaine',
        'Facturation groupée par lot',
        'Account manager dédié & Priorité coursier',
        'Analytics approfondis sur 6 mois',
        '5 Utilisateurs par compte'
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
        { name: 'Course Groupée (simultanées)', starter: '3 max', business: '8 max', premium: 'Illimité' },
        { name: 'Course Programmée (simultanées)', starter: '2 max', business: '8 max', premium: 'Illimité' },
        { name: 'Suivi + historique + recherche', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'CATALOGUE PRODUITS',
      rows: [
        { name: 'Catalogues', starter: '1', business: '8 max', premium: 'Illimité' },
        { name: 'Produits', starter: '3 max', business: '50 max', premium: 'Illimité' },
        { name: 'Gestion de stock', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
        { name: 'Catalogue partageable (public)', starter: 'Privé', business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'VENTE EN LIGNE',
      rows: [
        { name: 'Lien de commande (mini-boutique)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Lien customisable (logo + fond)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Paiement en ligne par le client', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Wallet DEM Pro (encaissement)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Plafond de retrait', starter: false, business: '100 000 F/sem', premium: '350 000 F/sem' },
        { name: 'Commandes reçues', starter: false, business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'CONNEXION EXTERNE',
      rows: [
        { name: 'API DEM (brancher son propre site)', starter: false, business: false, premium: 'Inclus' },
      ]
    },
    {
      category: 'FINANCES / ANALYTICS',
      rows: [
        { name: 'Filtres période', starter: 'Jour · Semaine', business: '3 mois', premium: '6 mois' },
        { name: 'Vues Ventes / Livraisons / Activité', starter: 'Grisé', business: 'Inclus', premium: 'Inclus' },
        { name: 'Export CSV + PDF', starter: 'Grisé', business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'CLIENTS / CRM',
      rows: [
        { name: 'Mes clients (historique, fidélisation)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Meilleur client + courbes', starter: false, business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'FACTURATION',
      rows: [
        { name: 'Factures avec logo (après vente)', starter: false, business: 'Inclus', premium: 'Inclus' },
        { name: 'Facturation groupée / par lot', starter: false, business: false, premium: 'Inclus' },
        { name: 'Infos entreprise + NINEA', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
      ]
    },
    {
      category: 'UTILISATEURS & SERVICE',
      rows: [
        { name: 'Utilisateurs par compte', starter: '1', business: '3', premium: '5' },
        { name: 'Adresses favorites', starter: '2 max', business: '10 max', premium: 'Illimité' },
        { name: 'Code promo', starter: 'Inclus', business: 'Inclus', premium: 'Inclus' },
        { name: 'Support', starter: 'Standard', business: 'Prioritaire', premium: 'Premium' },
        { name: 'Account manager dédié', starter: false, business: false, premium: 'Inclus' },
        { name: 'Priorité coursier (heures de pointe)', starter: false, business: false, premium: 'Inclus' },
      ]
    }
  ];

  // Rendu de cellule sans police mono
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
    if (value === 'Grisé' || value === 'Privé') {
      return (
        <span className="text-xs font-semibold text-slate-400 italic font-['Poppins',sans-serif]">
          {value}
        </span>
      );
    }
    if (value === 'Illimité') {
      return (
        <span className="text-xs sm:text-sm font-black uppercase text-[#0086C8] tracking-wider font-['DM_Sans',sans-serif]">
          Illimité
        </span>
      );
    }
    return (
      <span className="text-xs sm:text-sm font-bold text-dark font-['DM_Sans',sans-serif]">
        {value}
      </span>
    );
  };

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white font-['DM_Sans',sans-serif]" id="tarifs">
      <div className="max-w-[1400px] mx-auto">

        {/* ── 1. EN-TÊTE PRINCIPAL ── */}
        <div className="mb-16">
          <MiniTitleWithBar content="LE PRINCIPE TARIFAIRE" />
          <SectionHeading
            align="left"
            title="Trois offres construites"
            highlight="en escalier"
            subtitle="Transparence & Rentabilité"
            titleColor="text-dark"
            highlightColor="var(--color-cyan-2, #0086C8)"
            scriptColor="text-cyan-2"
            titleSize="text-3xl md:text-5xl lg:text-6xl"
            className="mt-4"
          />
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
            DEM Pro passe en <strong>100% payant</strong>. Chaque palier lève les limites du précédent. L’offre du milieu <strong>Business</strong> est pensée pour être le choix évident : c’est elle qui débloque la vente en ligne et l’encaissement, le cœur de valeur de DEM Pro.
          </p>
        </div>

        {/* ── 2. RÈGLE COMMUNE À TOUTES LES OFFRES ── */}
        <div className="mb-16 border border-black/10 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 bottom-0 w-2 bg-cyan" />
          <div className="p-6 md:p-8 pl-8 md:pl-10">
            <h3 className="text-lg md:text-xl font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
              Règle commune à toutes les offres
            </h3>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed m-0 font-['Poppins',sans-serif]">
              Les <strong>100 FCFA de mise en relation</strong> restent facturés au client sur chaque course, quelle que soit l’offre. L’abonnement paie uniquement l’accès aux outils. Le coursier garde <strong>100% de sa course</strong>.
            </p>
          </div>
        </div>

        {/* ── 3. LES 3 CARTES DE PRICING (EYEBROW EN SERIF + 2K, 3K, 6K) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-white mb-24">
          {plans.map((plan) => {
            const isFeatured = plan.isFeatured;

            return (
              <div
                key={plan.key}
                className={`p-8 lg:p-12 flex flex-col justify-between relative transition-all duration-300 ${
                  isFeatured
                    ? 'bg-dark text-white shadow-2xl relative z-10 lg:-my-4 lg:border-t-4 lg:border-t-cyan border-cyan'
                    : 'bg-white text-dark hover:bg-slate-50'
                }`}
              >
                {/* Badge Featured */}
                {isFeatured && (
                  <div className="absolute top-0 right-0 bg-cyan text-dark text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 font-['DM_Sans',sans-serif]">
                    ★ {plan.badge}
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

                  {/* Prix en 2k, 3k, 6k */}
                  <div className="mb-6 pb-6 border-b border-black/10">
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={`text-5xl lg:text-6xl font-black font-['DM_Sans',sans-serif] tracking-tight ${
                          isFeatured ? 'text-cyan' : 'text-dark'
                        }`}
                      >
                        {plan.priceK}
                      </span>
                      <div className="flex flex-col">
                        <span
                          className={`text-xs uppercase font-extrabold tracking-wider font-['DM_Sans',sans-serif] ${
                            isFeatured ? 'text-white' : 'text-dark'
                          }`}
                        >
                          F / semaine
                        </span>
                        <span
                          className={`text-[11px] font-medium font-['Poppins',sans-serif] ${
                            isFeatured ? 'text-white/60' : 'text-slate-500'
                          }`}
                        >
                          ({plan.amountFCFA})
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-xs mt-3 leading-relaxed m-0 font-['Poppins',sans-serif] ${
                        isFeatured ? 'text-white/80' : 'text-slate-600'
                      }`}
                    >
                      {plan.desc}
                    </p>
                  </div>

                  {/* Liste des points clés */}
                  <ul className="space-y-3.5 mb-8">
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
                <div className="pt-6 border-t border-black/10">
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
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 4. TABLEAU COMPARATIF COMPLET ── */}
        <div className="border border-black/10 bg-white">
          
          {/* En-tête du Tableau */}
          <div className="p-8 lg:p-12 border-b border-black/10 bg-slate-50">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-serif italic text-base text-[#0086C8] block mb-1">
                  Matrice comparative complète
                </span>
                <h3 className="text-2xl md:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif]">
                  Tableau comparatif des offres
                </h3>
                <p className="text-sm text-slate-600 mt-1 mb-0 font-['Poppins',sans-serif]">
                  Vue d’ensemble des trois offres, fonction par fonction.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-medium font-['Poppins',sans-serif]">
                La colonne <span className="text-dark font-bold underline">Business</span> est mise en avant (« le plus choisi »)
              </div>
            </div>
          </div>

          {/* Table Container Responsive */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              
              {/* Header Columns */}
              <thead>
                <tr className="bg-dark text-white divide-x divide-white/10 border-b border-white/10">
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider w-2/5 font-['DM_Sans',sans-serif]">
                    Fonctionnalité
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 font-['DM_Sans',sans-serif]">
                    Starter (2k)
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 bg-cyan text-dark font-['DM_Sans',sans-serif] relative">
                    <span className="block font-black">Business (3k)</span>
                    <span className="text-[10px] tracking-widest block font-bold uppercase">LE PLUS CHOISI</span>
                  </th>
                  <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-center w-1/5 font-['DM_Sans',sans-serif]">
                    Premium (6k)
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
                        className="py-3 px-6 font-bold text-xs tracking-wider uppercase text-[#0086C8] bg-slate-100 font-['DM_Sans',sans-serif]"
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
                        <td className="py-4 px-6 text-center bg-cyan/[0.03]">
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
              * Les tarifs s'entendent hors taxes. Facturation hebdomadaire sans engagement de durée.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
