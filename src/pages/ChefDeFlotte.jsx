import { useState } from 'react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function ChefDeFlotte() {
  const [activeTab, setActiveTab] = useState('delegue');
  const [openFaq, setOpenFaq] = useState(null);
  const [motosCount, setMotosCount] = useState(5);

  // Modèle financier Chef de Flotte DEM : 1 500 FCFA en moyenne par livraison
  const PRICE_PER_DELIVERY = 1500;
  const COURSES_PER_DAY = 6; // Standard 6 courses / jour par moto
  const WORKING_DAYS_MONTH = 26; // Base standard 26 jours ouvrés par mois

  const totalCoursesDaily = motosCount * COURSES_PER_DAY;
  const estimatedDaily = totalCoursesDaily * PRICE_PER_DELIVERY;
  const estimatedWeekly = estimatedDaily * 6;
  const estimatedMonthly = estimatedDaily * WORKING_DAYS_MONTH;
  const estimatedPerMotoMonthly = COURSES_PER_DAY * PRICE_PER_DELIVERY * WORKING_DAYS_MONTH;

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleApplyFromSimulator = () => {
    const downloadElement = document.getElementById('download');
    if (downloadElement) {
      downloadElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION ── */}
      <PageHeroSection
        contentMiniBar="INFRASTRUCTURE & GESTIONNAIRES DE PARC"
        firstTitle="Gérez votre flotte autrement."
        secondTitle="Une suite technologique B2B complète pour superviser vos coursiers, sécuriser vos actifs et automatiser vos encaissements à Dakar."
      />

      {/* ── 2. SECTION SIMULATEUR DE RENDEMENT FLOTTE (AVANT LES ARGUMENTS) ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white" id="simulateur">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="SIMULATEUR DE RENTABILITÉ FLOTTE" />
            <SectionHeading
              align="left"
              title="Estimez les revenus"
              highlight="de votre parc deux-roues"
              subtitle="Transparence & Modèle Économique DEM"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 border border-black/10">
            
            {/* Colonne Gauche : Le Calculateur Dynamique Sharp */}
            <div className="lg:col-span-7 p-8 lg:p-14 bg-dark text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                {/* Header HUD Box */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-white/10">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-cyan">
                    Simulateur Flotte B2B
                  </span>
                  <span className="text-xs px-3 py-1 bg-cyan/15 border border-cyan/30 text-cyan font-bold uppercase tracking-wider font-['DM_Sans',sans-serif]">
                    1 500 FCFA moyen / livraison · ~20 min / course
                  </span>
                </div>

                {/* Contrôle 1 : Nombre de motos */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-cyan font-['Raleway',sans-serif] block mb-1">
                        Taille du parc
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">Nombre de motos</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-cyan font-['DM_Sans',sans-serif]">
                        {motosCount}
                      </span>
                      <span className="text-xs text-white/60 block font-mono">
                        {motosCount > 1 ? 'motos en exploitation' : 'moto en exploitation'}
                      </span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={motosCount}
                    onChange={(e) => setMotosCount(Number(e.target.value))}
                    className="w-full accent-cyan cursor-pointer h-2 bg-white/20 rounded-none"
                  />

                  {/* Sélecteurs rapides de parc */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[1, 3, 5, 10, 15, 20, 30, 50].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setMotosCount(preset)}
                        className={`text-[11px] font-mono font-bold px-2.5 py-1 transition-colors cursor-pointer border ${
                          motosCount === preset
                            ? 'bg-cyan text-dark border-cyan'
                            : 'bg-white/5 text-white/70 border-white/15 hover:border-cyan hover:text-white'
                        }`}
                      >
                        {preset} {preset > 1 ? 'motos' : 'moto'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grille des gains financiers */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                      <span className="text-[11px] uppercase tracking-widest text-white/70 font-['Raleway',sans-serif] block mb-1">
                        Volume total / jour
                      </span>
                      <span className="text-lg font-bold text-white font-mono">
                        {totalCoursesDaily} courses / j
                      </span>
                      <span className="text-[10px] text-white/50 block font-mono mt-1">
                        (6 courses / moto / jour)
                      </span>
                    </div>

                    <div className="p-4 bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                      <span className="text-[11px] uppercase tracking-widest text-white/70 font-['Raleway',sans-serif] block mb-1">
                        Revenu brut estimé / jour
                      </span>
                      <span className="text-lg font-bold text-white font-mono">
                        {estimatedDaily.toLocaleString('fr-FR')} FCFA
                      </span>
                      <span className="text-[10px] text-white/50 block font-mono mt-1">
                        (1 500 FCFA moyen / course)
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white/[0.04] border border-white/10">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-white/70 font-['Raleway',sans-serif] block">
                        Revenu estimé / semaine (6j)
                      </span>
                      <small className="text-[10px] text-white/50">{motosCount} moto{motosCount > 1 ? 's' : ''} en exploitation</small>
                    </div>
                    <span className="text-xl font-bold text-white font-mono">
                      {estimatedWeekly.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  {/* Bloc Mis en Avant (Highlight Cyan Awwwards) */}
                  <div className="p-6 bg-cyan/15 border border-cyan/40">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-cyan font-bold block font-['Raleway',sans-serif]">
                          Revenu mensuel estimé de la flotte
                        </span>
                        <small className="text-[11px] text-white/70">
                          Base de 26 jours ouvrés · 1 500 FCFA moyen / course
                        </small>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-cyan font-['DM_Sans',sans-serif] block">
                          {estimatedMonthly.toLocaleString('fr-FR')} FCFA
                        </span>
                        <span className="text-[11px] text-white/80 font-mono">
                          soit ~{estimatedPerMotoMonthly.toLocaleString('fr-FR')} FCFA / moto / mois
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bouton d'action direct */}
                <div className="pt-8">
                  <button
                    type="button"
                    onClick={handleApplyFromSimulator}
                    className="w-full py-4 uppercase font-bold tracking-widest text-xs sm:text-sm bg-cyan text-dark hover:bg-white transition-all duration-250 cursor-pointer border border-cyan rounded-none"
                  >
                    Enregistrer ma flotte de {motosCount} moto{motosCount > 1 ? 's' : ''} →
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-white/40 mt-8 m-0 uppercase tracking-wider font-['Raleway',sans-serif]">
                * Données estimatives calculées sur la base de 20 minutes en moyenne par course et 1 500 FCFA TTC en moyenne par livraison réalisée à Dakar. Relevé consolidé et virement hebdomadaire automatisé sur compte bancaire ou Wave/OM pro.
              </p>
            </div>

            {/* Colonne Droite : Les 4 Piliers Chef de Flotte (Sharp Awwwards Cards) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 divide-y sm:divide-y-0 lg:divide-y divide-black/10 bg-slate-50">
              {[
                {
                  code: "01",
                  title: "Reversements Hebdomadaires",
                  desc: "Commissions virées chaque lundi matin sur votre compte bancaire, Wave ou Orange Money pro, avec un relevé financier détaillé."
                },
                {
                  code: "02",
                  title: "Volume B2B Garanti",
                  desc: "Accès prioritaire aux commandes des e-commerces, enseignes de distribution et pharmacies partenaires à fort trafic à Dakar."
                },
                {
                  code: "03",
                  title: "Télématique & GPS 24/7",
                  desc: "Supervision live complète : géolocalisation continue, alertes d'arrêts anormaux et historique de navigation certifié."
                },
                {
                  code: "04",
                  title: "Accords Maintenance & Pièces",
                  desc: "Jusqu'à -20% de remise négociée sur les vidanges, pneumatiques et révisions auprès de notre réseau de garages agréés."
                }
              ].map((pil, idx) => (
                <div key={idx} className="p-8 lg:p-10 flex flex-col justify-between bg-white border-b border-black/10 hover:bg-slate-50 transition-colors">
                  <span className="text-xs font-mono font-bold text-cyan-2 mb-4 block">
                    /{pil.code}
                  </span>
                  <div>
                    <h4 className="text-base font-bold uppercase tracking-wider text-dark mb-2 font-['DM_Sans',sans-serif]">
                      {pil.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed m-0 font-['Poppins',sans-serif]">
                      {pil.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. COCKPIT TÉLÉMATIQUE EN DIRECT (HERO METRICS BAR / ARGUMENTS) ── */}
      <section className="border-t border-b border-black/10 bg-dark text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { tag: "DISPATCH INTELLIGENT", title: "Flux Continu de Courses", stat: "< 10 min", desc: "Attribution automatique de missions vers les commerces et e-boutiques à fort volume." },
            { tag: "SÉCURITÉ MATÉRIELLE", title: "Supervision GPS Active", stat: "24/7", desc: "Suivi télématique en direct, géolocalisation continue et historique certifié des trajets." },
            { tag: "MODÈLE FINANCIER", title: "Rendement Moyen / Moto", stat: "~234 000 F", desc: "Règlement automatisé des commissions par virement chaque lundi matin." },
            { tag: "ACCOMPAGNEMENT B2B", title: "Gestionnaire Attitré", stat: "100% Dédié", desc: "Un interlocuteur unique pour la gestion opérationnelle et le suivi administratif." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 lg:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan uppercase block mb-2">
                  {item.tag}
                </span>
                <h3 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                  {item.title}
                </h3>
              </div>
              <div className="pt-6 border-t border-white/10 mt-6">
                <span className="text-3xl font-black text-cyan font-['DM_Sans',sans-serif] block mb-1">
                  {item.stat}
                </span>
                <p className="text-xs text-white/60 leading-relaxed m-0">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. PROFILS & MODÈLES DE COLLABORATION (AVEC MOTO ET SANS MOTO) ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="PROFILS & MODÈLES DE COLLABORATION" />
            <SectionHeading
              align="left"
              title="Deux profils pour collaborer"
              highlight="avec le réseau DEM"
              subtitle="Avec ou Sans Moto"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-3xl leading-relaxed font-['Poppins',sans-serif]">
              Que vous soyez propriétaire d’un parc de deux-roues ou gestionnaire d’équipe opérationnelle, DEM vous offre une infrastructure clé en main pour générer des revenus réguliers chaque semaine à Dakar.
            </p>
          </div>

          {/* Grille 2 Profils Sharp Awwwards (Avec Moto vs Sans Moto) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-white">
            
            {/* Profil 1 : CHEF DE FLOTTE AVEC MOTO */}
            <div className="p-8 lg:p-14 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-cyan-2">
                    Profil 01 · Propriétaire & Investisseur
                  </span>
                  <span className="text-[11px] px-3 py-1 bg-cyan/15 text-[#0086C8] font-bold uppercase tracking-wider font-['DM_Sans',sans-serif]">
                    Avec Moto(s)
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Chef de flotte avec moto
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 font-['Poppins',sans-serif]">
                  Vous possédez une ou plusieurs motos à Dakar. Enregistrez votre parc sur DEM pour accéder à notre flux continu de courses B2B et rentabiliser vos véhicules au quotidien.
                </p>

                <ul className="space-y-3.5 pt-6 border-t border-slate-100 text-xs sm:text-sm text-dark font-medium font-['Poppins',sans-serif]">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-2 font-bold mt-0.5">✓</span>
                    <span><strong>Mise en exploitation immédiate</strong> de votre parc sur le réseau DEM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-2 font-bold mt-0.5">✓</span>
                    <span><strong>Choix du mode d'opération :</strong> roulez avec vos propres livreurs ou laissez DEM recruter</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-2 font-bold mt-0.5">✓</span>
                    <span><strong>Revenus par course :</strong> ~1 500 FCFA moyen par livraison réalisée</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-2 font-bold mt-0.5">✓</span>
                    <span><strong>Cockpit télématique :</strong> géolocalisation GPS et suivi des trajets 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-2 font-bold mt-0.5">✓</span>
                    <span><strong>Accords entretien :</strong> jusqu'à -20% sur les révisions en ateliers partenaires</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan-2 font-bold mt-0.5">✓</span>
                    <span><strong>Reversements garantis :</strong> paiement chaque lundi par Wave, OM ou banque</span>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a
                  href="#download"
                  className="block text-center uppercase tracking-widest text-xs font-bold py-4 border border-dark text-dark hover:bg-dark hover:text-white transition-colors"
                >
                  Inscrire mes motos →
                </a>
              </div>
            </div>

            {/* Profil 2 : CHEF DE FLOTTE SANS MOTO */}
            <div className="p-8 lg:p-14 flex flex-col justify-between bg-dark text-white relative">
              <div className="absolute top-0 right-0 bg-cyan text-dark text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 font-['DM_Sans',sans-serif]">
                ACCÈS SANS CAPITAL
              </div>
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-cyan">
                    Profil 02 · Manager & Superviseur
                  </span>
                  <span className="text-[11px] px-3 py-1 bg-white/10 text-cyan font-bold uppercase tracking-wider font-['DM_Sans',sans-serif]">
                    Sans Moto
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-white mb-4 font-['DM_Sans',sans-serif]">
                  Chef de flotte sans moto
                </h3>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-8 font-['Poppins',sans-serif]">
                  Vous n'avez pas de motos mais possédez des compétences en gestion humaine et logistique. Fédérez, encadrez et supervisez une équipe de coursiers pour percevoir des commissions sur chaque course.
                </p>

                <ul className="space-y-3.5 pt-6 border-t border-white/10 text-xs sm:text-sm text-white/90 font-medium font-['Poppins',sans-serif]">
                  <li className="flex items-start gap-3">
                    <span className="text-cyan font-bold mt-0.5">✓</span>
                    <span><strong>Zéro investissement matériel :</strong> démarrez immédiatement sans acheter de moto</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan font-bold mt-0.5">✓</span>
                    <span><strong>Management d'équipe :</strong> supervisez des coursiers disposant de leurs propres motos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan font-bold mt-0.5">✓</span>
                    <span><strong>Commissions récurrentes :</strong> touchez un pourcentage sur chaque course de votre équipe</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan font-bold mt-0.5">✓</span>
                    <span><strong>Outils de supervision :</strong> gestion des plannings, attribution de zones et scores qualité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan font-bold mt-0.5">✓</span>
                    <span><strong>Accompagnement DEM :</strong> formation managériale et support opérationnel dédié</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-cyan font-bold mt-0.5">✓</span>
                    <span><strong>Gains hebdomadaires :</strong> virement automatique des commissions chaque semaine</span>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a
                  href="#download"
                  className="block text-center uppercase tracking-widest text-xs font-bold py-4 bg-cyan text-dark hover:bg-white transition-colors"
                >
                  Devenir chef d'équipe sans moto →
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. BENTO DE CAPACITÉS TÉLÉMATIQUES & SÉCURITÉ ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-slate-50">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="FONCTIONNALITÉS LOGICIELLES" />
            <SectionHeading
              align="left"
              title="Ce que vous permet"
              highlight="le cockpit DEM Flotte"
              subtitle="Technologie embarquée"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Bloc 1 : Télématique & Traçabilité */}
            <div className="md:col-span-8 p-8 lg:p-12 bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-cyan-2 mb-4 block">
                  /01 · Télémétrie Live
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Géolocalisation & Geofencing temps réel
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl font-['Poppins',sans-serif]">
                  Visualisez chaque moto sur la carte interactive de Dakar. Configurez des alertes de zones, analysez les trajets empruntés et surveillez les temps d'arrêt pour une utilisation optimale de vos actifs.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-100 mt-8">
                <div>
                  <span className="text-xs uppercase text-slate-500 font-bold block">Précision GPS</span>
                  <span className="text-lg md:text-xl font-bold text-dark font-mono">± 3 mètres</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-500 font-bold block">Fréquence ping</span>
                  <span className="text-lg md:text-xl font-bold text-dark font-mono">Toutes les 5s</span>
                </div>
                <div>
                  <span className="text-xs uppercase text-slate-500 font-bold block">Historique</span>
                  <span className="text-lg md:text-xl font-bold text-dark font-mono">90 jours</span>
                </div>
              </div>
            </div>

            {/* Bloc 2 : Reversements Automatisés */}
            <div className="md:col-span-4 p-8 lg:p-10 bg-dark text-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-cyan mb-4 block">
                  /02 · Finance & COD
                </span>
                <h3 className="text-xl font-bold uppercase text-white mb-3 font-['DM_Sans',sans-serif]">
                  Reversements Hebdomadaires Automatiques
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-['Poppins',sans-serif]">
                  Toutes les commissions générées par votre flotte sont calculées automatiquement et virées chaque semaine sur votre compte bancaire, Wave ou Orange Money pro.
                </p>
              </div>

              <div className="p-4 bg-white/[0.04] border border-white/10 mt-6">
                <span className="text-[11px] uppercase tracking-widest text-cyan font-bold block mb-1">Fréquence de règlement</span>
                <span className="text-base font-bold text-white">Chaque Lundi avant 12h00</span>
              </div>
            </div>

            {/* Bloc 3 : Gestion KYC Chauffeurs */}
            <div className="md:col-span-4 p-8 lg:p-10 bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-cyan-2 mb-4 block">
                  /03 · Conformité
                </span>
                <h3 className="text-xl font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif]">
                  Vérification KYC & Permis
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
                  Chaque coursier rattaché à votre compte fait l'objet d'un audit administratif préalable : permis de conduire vérifié, extrait de casier judiciaire et validation d'expérience.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <span className="text-xs font-bold text-cyan-2 uppercase tracking-wider font-mono">100% Conducteurs Contrôlés</span>
              </div>
            </div>

            {/* Bloc 4 : Maintenance & Partenariats */}
            <div className="md:col-span-8 p-8 lg:p-12 bg-white border border-black/10 flex flex-col justify-between">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-cyan-2 mb-4 block">
                  /04 · Écosystème
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Accords d'Entretien & Tarifs Pièces Négociés
                </h3>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl font-['Poppins',sans-serif]">
                  En tant que chef de flotte partenaire DEM, accédez à notre réseau d'ateliers mécaniques agréés à Dakar pour vos vidanges, pneumatiques et révisions à tarifs préférentiels négociés.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-100 mt-6 text-xs font-semibold text-slate-700">
                <span className="px-3 py-1.5 bg-slate-100">Jusqu'à -20% sur les pièces d'usure</span>
                <span className="px-3 py-1.5 bg-slate-100">Priorité en atelier partenaire</span>
                <span className="px-3 py-1.5 bg-slate-100">Contrat cadre assurance flotte</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 5. QUESTIONS FRÉQUENTES DES INVESTISSEURS ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-t border-b border-white/10 bg-cyan-deep text-white">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="mb-14 text-center">
            {/* <MiniTitleWithBar content="FAQ INVESTISSEURS" /> */}
            <SectionHeading
              align="center"
              title="Tout ce que vous devez savoir"
              highlight="avant d'engager votre flotte"
              subtitle="Questions & Modalités"
              titleColor="text-white"
              highlightColor="var(--cyan, #00D2FF)"
              highlightClassName="text-[#00D2FF]"
              scriptColor="text-[#00D2FF]"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="border border-white/15 divide-y divide-white/10 bg-black/10 backdrop-blur-sm">
            {[
              {
                q: "Puis-je devenir Chef de flotte si je ne possède pas de moto ?",
                a: "Oui, absolument ! Le profil « Chef de flotte Sans Moto » est pensé pour les managers d'équipe. Vous fédérez et supervisez un réseau de coursiers disposant de leurs propres motos, et vous percevez des commissions récurrentes sur l'ensemble de leurs courses livrées."
              },
              {
                q: "Quels types de motos sont acceptés sur la plateforme DEM ?",
                a: "Nous acceptons les motos de 110cc à 150cc en bon état mécanique (type Haojue, Yamaha YB/Crux, Bajaj Boxer, TVS HLX). Les véhicules doivent être équipés d'un caisson de transport ou d'un support adapté."
              },
              {
                q: "Comment se déroule la contractualisation avec DEM ?",
                a: "Une convention de partenariat B2B est établie précisant votre statut (avec ou sans moto), le nombre de coursiers ou véhicules rattachés et les modalités de reversement hebdomadaire des commissions."
              },
              {
                q: "Quel est le délai de mise en service après dépôt du dossier ?",
                a: "Dès validation des pièces justificatives (cartes grises, assurances, permis ou CNI), votre compte Chef de flotte est activé et vos équipes sont opérationnelles en moins de 48 heures."
              },
              {
                q: "Comment sont sécurisées les recettes Cash on Delivery (COD) ?",
                a: "Les coursiers versent les fonds encaissés quotidiennement via nos points relais sécurisés ou par code OTP Wave. Vous disposez d'un relevé en temps réel de chaque encaissement sur votre cockpit gestionnaire."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 lg:p-8 bg-white/[0.03] hover:bg-white/[0.07] transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left cursor-pointer gap-4"
                >
                  <span className="text-base lg:text-lg font-bold uppercase text-white font-['DM_Sans',sans-serif]">
                    {faq.q}
                  </span>
                  <span className="text-xl font-mono text-[#00D2FF] font-bold shrink-0">
                    {openFaq === idx ? "—" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="mt-4 text-sm md:text-base text-slate-200 leading-relaxed m-0 font-['Poppins',sans-serif] pt-4 border-t border-white/10">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. SECTION TÉLÉCHARGEMENT & ONBOARDING CHEF DE FLOTTE ── */}
      <DownloadAppCTA
        theme="white"
        watermark="FLOTTE"
        subtitle="Application Gestionnaire de Parc"
        title="Enregistrez votre parc auprès de"
        highlight="DEM dès aujourd'hui."
        description="Téléchargez gratuitement l’application DEM sur iOS ou Android. Créez votre compte, sélectionnez le rôle « Chef de flotte » et connectez vos motos en direct pour superviser vos gains."
        bullets={[
          "Sélectionnez le profil « Chef de flotte » à l'ouverture de l'application",
          "Ajout et supervision télématique de l'ensemble de votre parc",
          "Attribution automatisée des courses aux conducteurs de votre flotte",
          "Reversements hebdomadaires automatiques sécurisés par Wave & OM"
        ]}
        id="download"
      />

      {/* ── 7. SECTION ENGAGEMENT & IMPACT CHEF DE FLOTTE ── */}
      <ContactCTA
        theme="cyan-deep"
        watermark="FLOTTE"
        subtitle="Partenariat d'excellence"
        title="Optimisez chaque kilomètre"
        highlight="vers un rendement garanti."
        description="Que vous possédiez 1 moto ou un parc de 50 véhicules, DEM met à votre disposition sa technologie télématique de pointe, son flux continu de courses B2B et ses reversements hebdomadaires 100% garantis."
        primaryBtnText="Télécharger l'App DEM"
        primaryBtnLink="#download"
        primaryBtnIcon="download"
      />

    </div>
  );
}
