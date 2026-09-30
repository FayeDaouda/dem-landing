import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CoursierSimulator({
  ratePerDelivery = 1450,
  subtitle = "Ajustez le curseur selon le nombre de jours travaillés par mois pour projeter vos revenus réels à Dakar"
}) {
  const [daysPerMonth, setDaysPerMonth] = useState(26);

  const passPrice = 1300;
  const avgCoursesPerDay = 8;

  const depenseMensuelle = daysPerMonth * passPrice;
  const gagneParJour = avgCoursesPerDay * ratePerDelivery;
  const estimatedMonthly = (gagneParJour ) * daysPerMonth;

  const presets = [
    { label: "Temps partiel", value: 12, tag: "12j/mois" },
    { label: "Temps plein", value: 22, tag: "22j/mois" },
    { label: "Performeur", value: 26, tag: "26j/mois" },
  ];

  return (
    <div className="w-full bg-[#021520] text-white border border-black/10 shadow-2xl p-6 sm:p-10 lg:p-12 my-6">

      {/* En-tête du simulateur */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
              SIMULATEUR INTERACTIF
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-['DM_Sans',sans-serif] m-0">
            Simulateur de revenus coursier {" "}
            <span className=" text-[#00D2FF]">
              DEM
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-white/70 font-['Poppins',sans-serif] mt-2 mb-0 max-w-xl">
            {subtitle}
          </p>
        </div>

        <div className="text-left md:text-right shrink-0">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block">
            Pass Journalier DEM
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#00D2FF] font-['DM_Sans',sans-serif]">
            {passPrice.toLocaleString('fr-FR')} FCFA <span className="text-xs font-normal text-white/70">/ jour</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-center">

        {/* Colonne Contrôleur & Slider */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-white/80 font-['Raleway',sans-serif]">
                Nombre de jours / mois :
              </span>
              <span className="text-3xl sm:text-4xl font-black text-[#00D2FF] font-['DM_Sans',sans-serif]">
                {daysPerMonth} <span className="text-sm font-bold text-white/60">jours</span>
              </span>
            </div>

            {/* Slider de sélection */}
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={daysPerMonth}
              onChange={(e) => setDaysPerMonth(Number(e.target.value))}
              className="w-full accent-[#00D2FF] cursor-pointer h-2 bg-white/20 rounded-none mb-4"
              aria-label="Nombre de jours par mois"
            />

            <div className="flex justify-between text-[11px] text-white/50 uppercase font-mono tracking-wider mb-6">
              <span>Min : 1 jour</span>
              <span>Max : 30 jours</span>
            </div>

            {/* Puces presets rapides */}
            <div className="flex flex-wrap gap-2 pt-2">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setDaysPerMonth(preset.value)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${daysPerMonth === preset.value
                    ? 'bg-[#00D2FF] text-[#021520] border-[#00D2FF]'
                    : 'bg-white/5 text-white/80 border-white/10 hover:border-[#00D2FF]/50 hover:text-white'
                    }`}
                >
                  <span>{preset.label} ({preset.value}j)</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to="/coursiers#simulateur"
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#00D2FF] text-[#021520] text-xs font-black uppercase tracking-wider hover:bg-white transition-colors"
            >
              <span>Postuler comme coursier DEM</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="text-[11px] text-white/50 font-['Poppins',sans-serif]">
              Inscription gratuite · Validation sous 24h
            </span>
          </div>
        </div>

        {/* Colonne Résultats financiers */}
        <div className="lg:col-span-6 space-y-3">

          <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 block mb-0.5">
                Dépense chez DEM
              </span>
              <small className="text-[10px] text-white/40">Sur {daysPerMonth} jours (pass journalier)</small>
            </div>
            <span className="text-xl sm:text-2xl font-black text-[#FF3366] font-['DM_Sans',sans-serif]">
              - {depenseMensuelle.toLocaleString('fr-FR')} FCFA
            </span>
          </div>

          <div className="p-4 sm:p-5 bg-white/[0.03] border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/60 block mb-0.5">
                Gagné par jour grâce à DEM
              </span>
              <small className="text-[10px] text-white/40">Moyenne de {avgCoursesPerDay} courses/jour</small>
            </div>
            <span className="text-xl sm:text-2xl font-black text-white font-['DM_Sans',sans-serif]">
              {gagneParJour.toLocaleString('fr-FR')} FCFA
            </span>
          </div>

          {/* Carte vedette Mensuel */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-[#00D2FF]/20 to-[#0086C8]/15 border-2 border-[#00D2FF] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-[#00D2FF] text-[#021520] text-[9px] font-mono font-bold uppercase tracking-wider">
                  NET REVERSÉ
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white font-['Raleway',sans-serif]">
                  Total estimé par mois
                </span>
              </div>
              <small className="text-[10px] text-white/70 block mt-1">
                Base {daysPerMonth} jours · Gains 100% conservés
              </small>
            </div>
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#00D2FF] font-['DM_Sans',sans-serif] shrink-0 ml-4">
              {estimatedMonthly.toLocaleString('fr-FR')} <span className="text-sm">FCFA</span>
            </span>
          </div>

          <p className="text-[10px] text-white/40 m-0 pt-2 font-['Poppins',sans-serif] leading-tight">
            * Estimation calculée sur un tarif moyen net de {ratePerDelivery.toLocaleString('fr-FR')} FCFA par course à Dakar. Les revenus effectifs dépendent du secteur géographique, des créneaux horaires et des pourboires clients.
          </p>

        </div>

      </div>

    </div>
  );
}
