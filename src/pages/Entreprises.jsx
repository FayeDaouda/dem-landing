import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Entreprises() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#021520] text-white min-h-screen pt-24 pb-20 font-sans">
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">
        
        {/* En-tête */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>💼</span> Solutions B2B & E-commerce
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          DEM pour les <span className="text-cyan">Entreprises</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl leading-relaxed font-light mb-12">
          Boostez vos ventes en ligne et fidélisez vos clients avec une livraison ultra-rapide à Dakar. Encaissement Wave/Cash garanti et suivi en direct.
        </p>

        {/* 3 Piliers B2B */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan/15 flex items-center justify-center text-2xl mb-6 text-cyan">
                ⚡
              </div>
              <h3 className="text-xl font-bold mb-3">Livraison le Jour Même (Same-Day)</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Vos clients reçoivent leurs commandes en moins de 2 heures ou sur créneau programmé selon leurs préférences.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 text-xs text-cyan font-semibold">
              Moins de 45 min en express direct
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan/15 flex items-center justify-center text-2xl mb-6 text-cyan">
                💳
              </div>
              <h3 className="text-xl font-bold mb-3">Gestion Cash on Delivery (COD)</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Nous collectons les paiements (Espèces, Wave, Orange Money) auprès de vos clients et vous les reversons sous 24h.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 text-xs text-cyan font-semibold">
              Rapprochement automatisé 100%
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan/15 flex items-center justify-center text-2xl mb-6 text-cyan">
                📊
              </div>
              <h3 className="text-xl font-bold mb-3">Tableau de Bord & API</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Suivez toutes vos expéditions en temps réel, exportez vos rapports comptables et intégrez DEM à votre site web.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 text-xs text-cyan font-semibold">
              Plugins Shopify / WooCommerce
            </div>
          </div>
        </div>

        {/* Formulaire Ouverture Compte Pro */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-cyan/30 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Ouvrir un Compte Entreprise</h2>
            <p className="text-sm text-white/70">Recevez votre grille tarifaire préférentielle sous 24h.</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-cyan/15 border border-cyan/40 text-center">
              <span className="text-4xl mb-3 block">✅</span>
              <h3 className="text-xl font-bold text-cyan mb-2">Demande envoyée !</h3>
              <p className="text-sm text-white/80">
                Notre équipe commerciale va vous contacter pour finaliser l'ouverture de votre compte marchand DEM Pro.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Nom de l'entreprise / Boutique</label>
                  <input required type="text" placeholder="Ex: Dakar Fashion Store" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Nom du responsable</label>
                  <input required type="text" placeholder="Ex: Aminata Sarr" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Téléphone / WhatsApp</label>
                  <input required type="tel" placeholder="Ex: +221 77 000 00 00" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Volume mensuel estimé</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#081624] border border-white/15 text-white focus:outline-none focus:border-cyan text-sm">
                    <option value="1-50">1 à 50 livraisons / mois</option>
                    <option value="50-200">50 à 200 livraisons / mois</option>
                    <option value="200+">Plus de 200 livraisons / mois</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-cyan text-[#021520] font-bold text-base hover:bg-white transition-all shadow-lg shadow-cyan/20 cursor-pointer">
                Demander mon compte professionnel →
              </button>
            </form>
          )}
        </div>

      </section>
    </div>
  );
}
