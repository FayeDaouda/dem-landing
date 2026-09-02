import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Flotte() {
  const [motoCount, setMotoCount] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  // Estimation : ~60 000 FCFA net par moto/semaine pour le chef de flotte
  const estimatedMonthlyCommission = motoCount * 240000;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#021520] text-white min-h-screen pt-24 pb-20 font-sans">
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">
        
        {/* En-tête */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>🏍️</span> Partenaires Flottes & Investisseurs
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Espace <span className="text-cyan">Chef de Flotte</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl leading-relaxed font-light mb-12">
          Placez vos motos sur la plateforme DEM, recrutez ou confiez-nous vos conducteurs, et encaissez des commissions automatiques sur chaque course.
        </p>

        {/* Simulateur Investisseurs Flottes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-cyan/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan mb-2 block">
                Rentabilité de votre parc
              </span>
              <h2 className="text-2xl font-bold mb-6">Estimez vos commissions de flotte</h2>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-white/70">Nombre de motos en circulation :</span>
                  <span className="text-2xl font-black text-cyan">{motoCount} motos</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={motoCount} 
                  onChange={(e) => setMotoCount(Number(e.target.value))}
                  className="w-full accent-cyan cursor-pointer h-2 bg-white/20 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-white/50 mt-2">
                  <span>2 motos</span>
                  <span>10 motos</span>
                  <span>30+ motos</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-cyan/15 border border-cyan/30">
                <span className="text-xs text-cyan uppercase tracking-wider font-bold block mb-1">Revenus mensuels estimés</span>
                <span className="text-3xl sm:text-4xl font-black text-white">{estimatedMonthlyCommission.toLocaleString('fr-FR')} FCFA</span>
                <span className="text-xs text-white/60 block mt-2">Versés automatiquement chaque semaine</span>
              </div>
            </div>

            <p className="text-[11px] text-white/50 mt-6">
              * Calcul basé sur une moyenne de 12 courses/jour par moto en activité régulière.
            </p>
          </div>

          {/* Outils & Avantages */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
              <span className="text-3xl p-2 rounded-xl bg-white/[0.06]">📊</span>
              <div>
                <h3 className="text-lg font-bold mb-1">Tableau de bord de supervision</h3>
                <p className="text-xs sm:text-sm text-white/70">
                  Visualisez en direct les courses réalisées par vos livreurs, leurs performances, leurs kilométrages et l'état de votre parc.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
              <span className="text-3xl p-2 rounded-xl bg-white/[0.06]">👥</span>
              <div>
                <h3 className="text-lg font-bold mb-1">Gestion simplifiée des conducteurs</h3>
                <p className="text-xs sm:text-sm text-white/70">
                  Rattachez vos livreurs en un clic. Nous nous chargeons de la vérification des pièces et de leur formation à la sécurité.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4">
              <span className="text-3xl p-2 rounded-xl bg-white/[0.06]">🔒</span>
              <div>
                <h3 className="text-lg font-bold mb-1">Sécurité & Traçabilité</h3>
                <p className="text-xs sm:text-sm text-white/70">
                  Suivi GPS 24/7 et historique certifié de chaque livraison pour protéger votre investissement matériel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire Enregistrement Flotte */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Enregistrer votre flotte</h2>
            <p className="text-sm text-white/70">Rejoignez le réseau officiel des chefs de flottes DEM.</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-cyan/15 border border-cyan/40 text-center">
              <span className="text-4xl mb-3 block">🏍️</span>
              <h3 className="text-xl font-bold text-cyan mb-2">Dossier soumis !</h3>
              <p className="text-sm text-white/80">
                Notre responsable Partenaires Flottes va prendre contact avec vous sous 24h pour finaliser l'agrément.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Nom du Chef de Flotte</label>
                  <input required type="text" placeholder="Ex: Ousmane Ba" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Téléphone / WhatsApp</label>
                  <input required type="tel" placeholder="Ex: +221 77 555 55 55" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Taille actuelle du parc moto</label>
                  <input required type="number" min="1" placeholder="Ex: 5" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Avez-vous déjà vos livreurs ?</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#081624] border border-white/15 text-white focus:outline-none focus:border-cyan text-sm">
                    <option value="yes">Oui, j'ai déjà mes chauffeurs</option>
                    <option value="partial">Partiellement</option>
                    <option value="no">Non, je cherche des chauffeurs DEM</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-cyan text-[#021520] font-bold text-base hover:bg-white transition-all shadow-lg shadow-cyan/20 cursor-pointer">
                Valider mon dossier Chef de Flotte →
              </button>
            </form>
          )}
        </div>

      </section>
    </div>
  );
}
