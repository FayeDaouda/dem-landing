import { useState } from 'react';

export default function Livreurs() {
  const [coursesPerDay, setCoursesPerDay] = useState(12);
  const [submitted, setSubmitted] = useState(false);

  // Estimation : ~1 200 FCFA net par course
  const estimatedWeekly = coursesPerDay * 1200 * 6;
  const estimatedMonthly = coursesPerDay * 1200 * 26;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#021520] text-white min-h-screen pt-24 pb-20 font-sans">
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">
        
        {/* En-tête */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>🛵</span> Recrutement & Partenariat
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Devenez <span className="text-cyan">Livreur DEM</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed font-light mb-12">
          Roulez avec votre moto, soyez votre propre patron et encaissez vos gains chaque semaine en toute liberté à Dakar.
        </p>

        {/* 2 Colonnes : Simulateur + Avantages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Simulateur de Gains */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.03] border border-cyan/30 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan mb-2 block">
                Calculateur de revenus
              </span>
              <h2 className="text-2xl font-bold mb-6">Estimez vos gains</h2>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-white/70">Courses par jour :</span>
                  <span className="text-xl font-bold text-cyan">{coursesPerDay} courses</span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="25" 
                  value={coursesPerDay} 
                  onChange={(e) => setCoursesPerDay(Number(e.target.value))}
                  className="w-full accent-cyan cursor-pointer h-2 bg-white/20 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-white/50 mt-2">
                  <span>4 (temps partiel)</span>
                  <span>15 (temps plein)</span>
                  <span>25 (pro)</span>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center p-4 rounded-xl bg-white/[0.04]">
                  <span className="text-xs text-white/70 uppercase tracking-wider">Par semaine</span>
                  <span className="text-xl font-black text-white">{estimatedWeekly.toLocaleString('fr-FR')} FCFA</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-cyan/15 border border-cyan/30">
                  <span className="text-xs text-cyan uppercase tracking-wider font-bold">Par mois</span>
                  <span className="text-2xl font-black text-cyan">{estimatedMonthly.toLocaleString('fr-FR')} FCFA</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-white/50 mt-6 text-center">
              * Estimations indicatives basées sur une moyenne de 6 jours travaillés par semaine.
            </p>
          </div>

          {/* Avantages */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-3xl mb-3 block">💰</span>
              <h3 className="text-lg font-bold mb-2">Paiements Rapides</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Vos revenus sont transférés directement sur votre compte Wave ou Orange Money.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-3xl mb-3 block">⏰</span>
              <h3 className="text-lg font-bold mb-2">Liberté Totale</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Connectez-vous quand vous le souhaitez. Travaillez à temps plein ou en complément de revenus.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-3xl mb-3 block">🛡️</span>
              <h3 className="text-lg font-bold mb-2">Assurance Incluse</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Vous bénéficiez d'un accompagnement et d'une couverture lors de toutes vos missions DEM.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-3xl mb-3 block">📱</span>
              <h3 className="text-lg font-bold mb-2">App Fluide</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Une application simple d'utilisation avec navigation GPS intégrée et commandes en continu.
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire de Candidature */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Rejoindre la flotte DEM</h2>
            <p className="text-sm text-white/70">Remplissez ce formulaire et notre équipe vous contactera sous 24h.</p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-cyan/15 border border-cyan/40 text-center">
              <span className="text-4xl mb-3 block">🎉</span>
              <h3 className="text-xl font-bold text-cyan mb-2">Candidature bien reçue !</h3>
              <p className="text-sm text-white/80">
                Merci ! Un responsable du recrutement DEM vous contactera par téléphone ou WhatsApp dans les prochaines heures.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Nom complet</label>
                  <input required type="text" placeholder="Ex: Moussa Diop" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Numéro Téléphone / WhatsApp</label>
                  <input required type="tel" placeholder="Ex: +221 77 123 45 67" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Zone de résidence</label>
                  <input required type="text" placeholder="Ex: Grand Yoff, Parcelles, Pikine..." className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Avez-vous votre propre moto ?</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#081624] border border-white/15 text-white focus:outline-none focus:border-cyan text-sm">
                    <option value="yes">Oui, j'ai ma propre moto</option>
                    <option value="no">Non, je cherche une location / flotte</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-cyan text-[#021520] font-bold text-base hover:bg-white transition-all shadow-lg shadow-cyan/20 cursor-pointer">
                Envoyer ma candidature →
              </button>
            </form>
          )}
        </div>

      </section>
    </div>
  );
}
