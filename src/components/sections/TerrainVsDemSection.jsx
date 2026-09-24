import React from 'react';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';
import { 
  XCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  UserX,
  UserCheck,
  Banknote,
  Wallet,
  MapPinOff,
  Navigation,
  PhoneOff,
  Zap,
  ShoppingBag,
  FileCheck2
} from 'lucide-react';

export default function TerrainVsDemSection() {
  const scrollToPricing = () => {
    const el = document.getElementById('tarifs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const comparisons = [
    {
      num: "01",
      topic: "Qualité du coursier",
      problem: {
        title: "Livreurs non formés & retards imprévisibles",
        desc: "Coursiers indépendants sans engagement, joignables de manière aléatoire, retards chroniques et attitude négligée qui ternit l'image de votre marque.",
        icon: UserX
      },
      solution: {
        title: "Livreurs professionnels, formés & certifiés",
        desc: "Des coursiers formés aux standards du service client, habillés avec soin, ponctuels et respectueux, ambassadeurs fidèles de votre enseigne.",
        icon: UserCheck
      }
    },
    {
      num: "02",
      topic: "Gestion financière",
      problem: {
        title: "Encaissements COD opaques & trésorerie bloquée",
        desc: "L'argent liquide circule sans reçu ni traçabilité pendant des jours. Risques élevés de perte, d'impayés et réconciliations manuelles épuisantes.",
        icon: Banknote
      },
      solution: {
        title: "Reversements COD sous 24h & Wallet sécurisé",
        desc: "Encaissement sécurisé (Espèces, Wave, OM). Montants crédités immédiatement sur votre Wallet DEM Pro et reversés sous 24h ouvrées sur votre compte.",
        icon: Wallet
      }
    },
    {
      num: "03",
      topic: "Visibilité & litiges",
      problem: {
        title: "Zéro visibilité & contestations permanentes",
        desc: "Aucune géolocalisation. Vous passez vos journées à répondre « Où est ma commande ? », sans pouvoir prouver la remise effective du colis au client.",
        icon: MapPinOff
      },
      solution: {
        title: "Traçabilité GPS live & preuve par code OTP",
        desc: "Lien de suivi temps réel sur carte envoyé à l'acheteur. Remise sécurisée obligatoirement verrouillée par code secret OTP ou signature : 0 litige.",
        icon: Navigation
      }
    },
    {
      num: "04",
      topic: "Organisation opérationnelle",
      problem: {
        title: "Perte de temps épuisante au téléphone",
        desc: "Négocier chaque course au cas par cas, partager des repères approximatifs par messages vocaux WhatsApp et rappeler 5 livreurs différents.",
        icon: PhoneOff
      },
      solution: {
        title: "Expéditions groupées & programmées en 1 clic",
        desc: "Lancez jusqu'à 8 courses simultanées ou planifiez vos tournées sur toute la semaine depuis l'application, sans passer le moindre coup de fil.",
        icon: Zap
      }
    },
    {
      num: "05",
      topic: "Vente & administration",
      problem: {
        title: "Commandes manuelles & rupture de stock",
        desc: "Prise de commande éparpillée dans les DM Instagram et WhatsApp, pas de facturation conforme, erreurs d'adresses et pertes régulières de commandes.",
        icon: ShoppingBag
      },
      solution: {
        title: "Mini-boutique en ligne & facturation automatique",
        desc: "Lien de commande prêt à l'emploi avec gestion de stock en temps réel et émission instantanée de factures officielles portant votre logo et NINEA.",
        icon: FileCheck2
      }
    }
  ];

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-slate-50 font-['DM_Sans',sans-serif]" id="comparatif-terrain">
      <div className="max-w-[1400px] mx-auto">
        
        {/* En-tête de section */}
        <div className="mb-16">
          <MiniTitleWithBar content="RÉALITÉ DU MARCHÉ VS EXPÉRIENCE DEM" />
          <SectionHeading
            align="left"
            title="Ce qui freine vos livraisons vs"
            highlight="Le standard DEM Pro"
            subtitle="Terrain vs Nouvelle Génération"
            titleColor="text-dark"
            highlightColor="var(--color-cyan-2, #0086C8)"
            scriptColor="text-cyan-2"
            titleSize="text-3xl md:text-5xl lg:text-6xl"
            className="mt-4"
          />
          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
            À Dakar et dans les métropoles africaines, la livraison informelle est le premier goulet d'étranglement des commerçants et e-commerçants. Découvrez concrètement le fossé qui sépare la débrouille quotidienne du standard professionnel DEM Pro.
          </p>
        </div>

        {/* Tableau comparatif en 2 colonnes */}
        <div className="border border-black/10 bg-white overflow-hidden shadow-sm">
          
          {/* Header 2 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            
            {/* Colonne Gauche - En-tête Problèmes Terrain */}
            <div className="p-8 lg:p-10 bg-rose-50/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-rose-700 font-['DM_Sans',sans-serif]">
                  Le quotidien informel
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif] mb-2">
                Les frictions rencontrées sur le terrain
              </h3>
              <p className="text-sm text-slate-600 font-['Poppins',sans-serif] m-0">
                Ce qui vous coûte du temps, bloque votre trésorerie et détruit la confiance de vos acheteurs.
              </p>
            </div>

            {/* Colonne Droite - En-tête Avantages DEM */}
            <div className="p-8 lg:p-10 bg-cyan/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0086C8] font-['DM_Sans',sans-serif]">
                  Avec DEM Pro 
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark font-['DM_Sans',sans-serif] mb-2">
                Les solutions concrètes apportées par DEM
              </h3>
              <p className="text-sm text-slate-700 font-['Poppins',sans-serif] m-0 font-medium">
                Une infrastructure technologique et humaine pensée pour propulser vos ventes en toute sérénité.
              </p>
            </div>

          </div>

          {/* Lignes de comparaison 1 à 1 */}
          <div className="divide-y divide-black/10">
            {comparisons.map((row, idx) => {
              const ProbIcon = row.problem.icon;
              const SolIcon = row.solution.icon;

              return (
                <div 
                  key={idx} 
                  className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-black/10 group hover:bg-slate-50/50 transition-colors"
                >
                  
                  {/* Côté Gauche - Problème Terrain */}
                  <div className="p-6 sm:p-8 lg:p-10 flex items-start gap-4 sm:gap-5 bg-white">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                      <ProbIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                        {row.problem.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] m-0">
                        {row.problem.desc}
                      </p>
                    </div>
                  </div>

                  {/* Côté Droit - Solution DEM */}
                  <div className="p-6 sm:p-8 lg:p-10 flex items-start gap-4 sm:gap-5 bg-cyan/[0.02] border-t lg:border-t-0">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-none bg-cyan/20 text-[#0086C8] flex items-center justify-center shrink-0 border border-cyan/30">
                      <SolIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold uppercase text-dark mb-2 font-['DM_Sans',sans-serif]">
                        {row.solution.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-['Poppins',sans-serif] m-0">
                        {row.solution.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bandeau de synthèse d'impact */}


        </div>

      </div>
    </section>
  );
}
