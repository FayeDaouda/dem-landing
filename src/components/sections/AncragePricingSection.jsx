import React from 'react';
import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';

export default function AncragePricingSection() {
  return (
    <section className="px-6 lg:px-16 border-b border-black/10 bg-white font-['DM_Sans',sans-serif] pb-20 lg:pb-32 pt-20 lg:pt-32">
      <div className="max-w-[1400px] mx-auto">
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
                  Le meilleur rapport — seulement +900 F pour débloquer toute la vente en ligne.
                </p>
              </div>

              <div className="p-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">
                  DEM Pro Premium
                </span>
                <span className="text-xl font-black text-dark block mb-1">
                  6 400 FCFA <span className="text-xs font-normal text-slate-500">/ sem</span>
                </span>
                <p className="text-xs text-slate-600 m-0 leading-relaxed">
                  Ancre haute, gros comptes ayant besoin de l'API et du volume illimité.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4 m-0 leading-relaxed italic font-['Poppins',sans-serif]">
              * Logique d’ancrage : le Business (3 200 F) n’est que 900 F au-dessus du Starter mais débloque toute la vente en ligne — l’écart de prix paraît dérisoire face au gain. Le Premium (6 400 F) est au double du Business : assez haut pour ancrer le prix vers le haut et rendre le Business évident, sans décourager les gros comptes qui ont besoin de l’API et du volume illimité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
