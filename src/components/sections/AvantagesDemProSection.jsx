import React from 'react';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';
import { Clock, Wallet, ShoppingBag, FileCheck, ShieldCheck, TrendingUp, ArrowDown } from 'lucide-react';

export default function AvantagesDemProSection() {
  const scrollToPricing = () => {
    const el = document.getElementById('tarifs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const avantages = [
    {
      num: '/1',
      domain: 'Gain de temps',
      badge: 'Zéro appel',
      icon: Clock,
      title: 'Expéditions groupées & programmées',
      desc: 'Fini la perte de temps à négocier chaque course au téléphone. Enregistrez jusqu’à 8 livraisons simultanées ou planifiez vos envois plusieurs jours à l\'avance en un clic.',
      benefitLabel: 'Bénéfice direct :',
      benefitValue: '+3h gagnées par jour'
    },
    {
      num: '/2',
      domain: 'Trésorerie',
      badge: '24h chrono',
      icon: Wallet,
      title: 'Encaissement COD & Reversement 24h',
      desc: 'Nos livreurs encaissent vos fonds à la livraison (Espèces, Wave ou OM). L’argent est crédité sur votre Wallet DEM Pro et reversé sous 24h ouvrées sur votre compte.',
      benefitLabel: 'Bénéfice direct :',
      benefitValue: '0 risque d\'impayé'
    },
    {
      num: '/3',
      domain: 'Vente en ligne',
      badge: 'Mini-Boutique',
      icon: ShoppingBag,
      title: 'Lien de commande & Catalogue digital',
      desc: 'Créez vos catalogues produits avec prix et stocks. Partagez votre lien de commande sur Instagram, TikTok ou WhatsApp pour que vos clients achètent en toute autonomie.',
      benefitLabel: 'Bénéfice direct :',
      benefitValue: '+40% de conversion'
    },
    {
      num: '/4',
      domain: 'Crédibilité',
      badge: 'Image de marque',
      icon: FileCheck,
      title: 'Factures automatiques & NINEA',
      desc: 'Émettez automatiquement après chaque vente des factures professionnelles avec votre logo et vos mentions légales pour rassurer vos clients et simplifier votre comptabilité.',
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Comptabilité simplifiée'
    },
    {
      num: '/5',
      domain: 'Sécurité & Suivi',
      badge: 'Live GPS & OTP',
      icon: ShieldCheck,
      title: 'Traçabilité temps réel & Preuve OTP',
      desc: 'Offrez à vos acheteurs un lien de suivi en direct sur la carte. La livraison est validée par code de sécurité ou signature, éliminant les contestations et litiges.',
      benefitLabel: 'Bénéfice direct :',
      benefitValue: '-30% de retours colis'
    },
    {
      num: '/6',
      domain: 'Croissance',
      badge: 'CRM & Analytics',
      icon: TrendingUp,
      title: 'CRM Clients & Rapports d\'activité',
      desc: 'Identifiez vos meilleurs clients, suivez la courbe de vos ventes par semaine et exportez facilement vos données (CSV/PDF) pour piloter votre croissance avec précision.',
      benefitLabel: 'Bénéfice direct :',
      benefitValue: 'Fidélisation maximale'
    }
  ];

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-white font-['DM_Sans',sans-serif]" id="avantages-pro">
      <div className="max-w-[1400px] mx-auto">
        
        {/* En-tête */}
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
          <div className="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif] m-0">
              Passer à un compte <strong>DEM Pro</strong>, c’est libérer votre business des contraintes de livraison, sécuriser vos encaissements et offrir à vos clients une expérience d’achat moderne et digne des plus grandes marques.
            </p>
            <button
              type="button"
              onClick={scrollToPricing}
              className="inline-flex items-center gap-2 text-xs uppercase font-extrabold tracking-widest text-[#0086C8] hover:text-dark transition-colors self-start shrink-0 pb-1 border-b-2 border-cyan cursor-pointer"
            >
              <span>Voir les formules tarifaires</span>
              <ArrowDown size={14} />
            </button>
          </div>
        </div>

        {/* Grille des 6 Avantages Clés Awwwards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black/10 divide-y md:divide-y-0 divide-black/10 bg-white shadow-sm">
          {avantages.map((item, idx) => {
            const Icon = item.icon;
            const borderClasses = `
              ${idx % 2 === 0 ? 'md:border-r' : ''} 
              ${idx % 3 !== 2 ? 'lg:border-r' : ''} 
              ${idx < 4 ? 'md:border-b' : ''} 
              ${idx < 3 ? 'lg:border-b' : 'lg:border-b-0'} 
              border-black/10
            `;

            return (
              <div
                key={idx}
                className={`p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50/80 transition-colors group ${borderClasses}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8]">
                        {item.num}
                      </span>
                      <span className="text-xs uppercase font-semibold text-slate-400 font-['DM_Sans',sans-serif]">
                        · {item.domain}
                      </span>
                    </div>
                    {/* <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 bg-cyan/15 text-[#0086C8]">
                      {item.badge}
                    </span> */}
                  </div>

                  <div className="w-10 h-10 rounded-none bg-slate-100 flex items-center justify-center text-dark mb-5 group-hover:bg-cyan group-hover:text-dark transition-colors">
                    <Icon size={20} />
                  </div>

                  <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-dark font-['DM_Sans',sans-serif]">
                    {item.benefitLabel}
                  </span>
                  <span className="text-xs font-bold text-[#0086C8] uppercase font-['DM_Sans',sans-serif]">
                    {item.benefitValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
