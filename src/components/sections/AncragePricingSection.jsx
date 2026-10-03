import React from 'react';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';

export default function AncragePricingSection() {
  return (
    <section className="px-6 lg:px-16 border-b border-black/10 bg-white font-['DM_Sans',sans-serif] pb-20 lg:pb-32 pt-20 lg:pt-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="border border-black/10 bg-slate-50 p-8 sm:p-12 lg:p-16">
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
                  2 300 FCFA <span className="text-xs font-normal text-slate-500">/ sem</span>
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
                  3 200 FCFA <span className="text-xs font-normal text-slate-500">/ sem</span>
                </span>
                <p className="text-xs text-slate-700 m-0 leading-relaxed font-semibold">
                  Le meilleur rapport — seulement +900 F pour passer à la vitesse supérieure.
                </p>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                  DEM Pro Premium
                </span>
                <span className="text-xl font-black text-dark block mb-1">
                  7 400 FCFA <span className="text-xs font-normal text-slate-500">/ sem</span>
                </span>
                <p className="text-xs text-slate-600 m-0 leading-relaxed">
                  Pour les gros vendeurs et ceux qui ont déjà un site : l'API DEM, le plus de volume et un support dédié.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 m-0 leading-relaxed italic font-['Poppins',sans-serif]">
              Chaque formule s'adapte à votre activité. Prenez celle dont vous avez besoin aujourd'hui, et DEM vous accompagne à chaque étape. À votre rythme, avec DEM à vos côtés.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
