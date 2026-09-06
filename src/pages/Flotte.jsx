import { useState } from 'react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function Flotte() {
  const [activeTab, setActiveTab] = useState('delegue');
  const [openFaq, setOpenFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION ── */}
      <PageHeroSection
        contentMiniBar="INFRASTRUCTURE & GESTIONNAIRES DE PARC"
        firstTitle="Optimisez le rendement de vos deux-roues."
        secondTitle="Une suite technologique B2B complète pour superviser vos coursiers, sécuriser vos actifs et automatiser vos encaissements à Dakar."
      />

      {/* ── 2. COCKPIT TÉLÉMATIQUE EN DIRECT (HERO METRICS BAR) ── */}
      <section className="border-t border-b border-black/10 bg-dark text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { tag: "DISPATCH INTELLIGENT", title: "Flux Continu de Courses", stat: "< 10 min", desc: "Attribution automatique de missions vers les commerces et e-boutiques à fort volume." },
            { tag: "SÉCURITÉ MATÉRIELLE", title: "Supervision GPS Active", stat: "24/7", desc: "Suivi télématique en direct, géolocalisation continue et historique certifié des trajets." },
            { tag: "MODÈLE FINANCIER", title: "Rendement Moyen / Moto", stat: "~240 000 F", desc: "Règlement automatisé des commissions par virement chaque lundi matin." },
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

      {/* ── 3. MATRICE COMPARATIVE : 3 MODÈLES DE PARTENARIAT FLOTTE ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="STRUCTURE DE COLLABORATION" />
            <SectionHeading
              align="left"
              title="Choisissez votre mode"
              highlight="de gestion de flotte"
              subtitle="Formules adaptées à vos objectifs"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          {/* Grille 3 Modèles Sharp (No rounded, no gradient) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 border border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-white">
            
            {/* Formule 1 : Gestion Autonome */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">FORMULE A</span>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-dark font-bold uppercase tracking-wider">Flotte Autonome</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Vous gérez vos conducteurs
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 font-['Poppins',sans-serif]">
                  Idéal si vous disposez déjà de vos livreurs. DEM vous fournit la technologie de dispatch, l'accès au volume de commandes de Dakar et le dashboard de télématique.
                </p>

                <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-dark font-medium font-['Poppins',sans-serif]">
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Accès complet au tableau de bord télématique</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Flux de courses prioritaires en continu</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Relevé hebdomadaire consolidé</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Vous fixez vos accords salariaux en interne</span>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a
                  href="#enregistrer"
                  className="block text-center uppercase tracking-wider text-xs font-bold py-3.5 border border-dark text-dark hover:bg-dark hover:text-white transition-colors"
                >
                  Choisir cette formule
                </a>
              </div>
            </div>

            {/* Formule 2 : Gestion Déléguée (Highlight) */}
            <div className="p-8 lg:p-12 flex flex-col justify-between bg-dark text-white relative">
              <div className="absolute top-0 right-0 bg-cyan text-dark text-[10px] font-black uppercase tracking-widest px-3 py-1 font-mono">
                RECOMMANDÉ
              </div>
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-cyan uppercase tracking-widest">FORMULE B</span>
                  <span className="text-xs px-2.5 py-1 bg-white/10 text-cyan font-bold uppercase tracking-wider">Gestion Clé en Main</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-white mb-4 font-['DM_Sans',sans-serif]">
                  DEM pilote vos conducteurs
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-8 font-['Poppins',sans-serif]">
                  Vous fournissez uniquement les motos. DEM se charge du recrutement, de la formation continue, de l'encadrement des coursiers et de la garantie de rotation.
                </p>

                <ul className="space-y-3 pt-6 border-t border-white/10 text-xs text-white/90 font-medium font-['Poppins',sans-serif]">
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan font-bold font-mono">✓</span>
                    <span>Recrutement et formation certifiée DEM</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan font-bold font-mono">✓</span>
                    <span>Remplacement immédiat en cas d'absence</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan font-bold font-mono">✓</span>
                    <span>Supervision opérationnelle 7j/7</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan font-bold font-mono">✓</span>
                    <span>Rendement financier maximisé par véhicule</span>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a
                  href="#enregistrer"
                  className="block text-center uppercase tracking-wider text-xs font-bold py-3.5 bg-cyan text-dark hover:bg-white transition-colors"
                >
                  Déployer en gestion déléguée
                </a>
              </div>
            </div>

            {/* Formule 3 : Placement Institutionnel */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">FORMULE C</span>
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-dark font-bold uppercase tracking-wider">Grands Investisseurs</span>
                </div>
                <h3 className="text-2xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Location & Loyer Garanti
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 font-['Poppins',sans-serif]">
                  Dédié aux sociétés de leasing, importateurs et gestionnaires de parcs importants (10+ motos). Loyer mensuel fixe garanti par contrat d'exploitation long terme.
                </p>

                <ul className="space-y-3 pt-6 border-t border-slate-100 text-xs text-dark font-medium font-['Poppins',sans-serif]">
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Revenu mensuel contractuel garanti</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Gestion intégrale de l'entretien et du parc</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Reporting trimestriel d'usure et d'actif</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-cyan-2 font-bold font-mono">✓</span>
                    <span>Engagement ferme sur 12 à 36 mois</span>
                  </li>
                </ul>
              </div>

              <div className="pt-10">
                <a
                  href="#enregistrer"
                  className="block text-center uppercase tracking-wider text-xs font-bold py-3.5 border border-dark text-dark hover:bg-dark hover:text-white transition-colors"
                >
                  Demander un contrat investisseur
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
                <span className="text-xs font-mono font-bold text-cyan-2 uppercase tracking-widest block mb-4">/01 · TÉLÉMÉTRIE LIVE</span>
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
                <span className="text-xs font-mono font-bold text-cyan uppercase tracking-widest block mb-4">/02 · FINANCE & COD</span>
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
                <span className="text-xs font-mono font-bold text-cyan-2 uppercase tracking-widest block mb-4">/03 · CONFORMITÉ</span>
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
                <span className="text-xs font-mono font-bold text-cyan-2 uppercase tracking-widest block mb-4">/04 · ÉCOSYSTÈME</span>
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
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="mb-14 text-center">
            <MiniTitleWithBar content="FAQ INVESTISSEURS" />
            <SectionHeading
              align="center"
              title="Tout ce que vous devez savoir"
              highlight="avant d'engager votre flotte"
              subtitle="Questions & Modalités"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="border border-black/10 divide-y divide-black/10">
            {[
              {
                q: "Quels types de motos sont acceptés sur la plateforme DEM ?",
                a: "Nous acceptons les motos de 110cc à 150cc en bon état mécanique (type Haojue, Yamaha YB/Crux, Bajaj Boxer, TVS HLX). Les véhicules doivent être équipés d'un caisson de transport ou d'un support adapté."
              },
              {
                q: "Comment se déroule la contractualisation avec DEM ?",
                a: "Une convention de partenariat B2B est établie précisant le nombre de véhicules, le modèle de gestion sélectionné (autonome, délégué ou location) et les modalités de reversement des commissions."
              },
              {
                q: "Quel est le délai de mise en service après dépôt du dossier ?",
                a: "Dès validation des pièces justificatives (cartes grises, assurances, permis), vos véhicules et chauffeurs sont enregistrés et opérationnels sur la plateforme en moins de 48 heures."
              },
              {
                q: "Comment sont sécurisées les recettes Cash on Delivery (COD) ?",
                a: "Les livreurs versent les fonds encaissés quotidiennement via nos points relais sécurisés ou par code OTP Wave. Vous disposez d'un relevé en temps réel de chaque encaissement sur votre cockpit gestionnaire."
              }
            ].map((faq, idx) => (
              <div key={idx} className="p-6 lg:p-8 bg-white hover:bg-slate-50 transition-colors">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left cursor-pointer gap-4"
                >
                  <span className="text-base lg:text-lg font-bold uppercase text-dark font-['DM_Sans',sans-serif]">
                    {faq.q}
                  </span>
                  <span className="text-xl font-mono text-cyan-2 font-bold shrink-0">
                    {openFaq === idx ? "—" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed m-0 font-['Poppins',sans-serif] pt-4 border-t border-slate-100">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. FORMULAIRE D'AUDIT & ENREGISTREMENT FLOTTE ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 bg-slate-50 border-b border-black/10" id="enregistrer">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="text-center mb-16">
            <MiniTitleWithBar content="DOSSIER DE CANDIDATURE" />
            <SectionHeading
              align="center"
              title="Enregistrez votre parc"
              highlight="auprès de DEM"
              subtitle="Agrément Partenaire Flotte"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-['Poppins',sans-serif]">
              Remplissez les caractéristiques de votre parc. Un conseiller B2B prendra contact avec vous sous 24h pour organiser l'audit technique.
            </p>
          </div>

          <div className="border border-black/10 bg-white p-8 sm:p-12 lg:p-16">
            {submitted ? (
              <div className="p-10 bg-dark text-white text-center border border-cyan">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan block mb-2 font-['Raleway',sans-serif]">
                  DOSSIER TRANS MIS AVEC SUCCÈS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white mb-4 font-['DM_Sans',sans-serif]">
                  Votre demande d'agrément flotte a été enregistrée
                </h3>
                <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed font-['Poppins',sans-serif] mb-6">
                  Notre département Partenariats B2B étudie votre dossier et vous contactera sous 24h pour finaliser la convention d'exploitation.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-block uppercase tracking-wider text-xs font-bold px-6 py-3 border border-cyan text-cyan hover:bg-cyan hover:text-dark transition-colors duration-250 cursor-pointer rounded-none"
                >
                  Soumettre un autre parc
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Ligne 1 : Nom ou Société & Téléphone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Nom du Gestionnaire ou Raison Sociale *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Ousmane Ba (Ba Logistics SARL)"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Numéro Téléphone / WhatsApp Pro *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Ex: +221 77 000 00 00"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>
                </div>

                {/* Ligne 2 : Nombre de motos & Formule choisie */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Nombre de motos à intégrer *
                    </label>
                    <input
                      required
                      type="number"
                      min="1"
                      placeholder="Ex: 5"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Formule de gestion souhaitée *
                    </label>
                    <select
                      value={activeTab}
                      onChange={(e) => setActiveTab(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    >
                      <option value="delegue">Formule B · Gestion Clé en Main DEM (Recommandé)</option>
                      <option value="autonome">Formule A · Gestion Autonome (J'ai mes chauffeurs)</option>
                      <option value="location">Formule C · Location & Loyer Garanti</option>
                    </select>
                  </div>
                </div>

                {/* Ligne 3 : Email & Zone de stationnement */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Email professionnel
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: direction@balogistics.sn"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Zone de garage / base d'opération
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Plateau, Maristes, Almadies, Pikine..."
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>
                </div>

                {/* Bouton de Soumission Sharp */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 uppercase font-bold tracking-widest text-xs sm:text-sm bg-dark text-white hover:bg-cyan-2 hover:text-white transition-all duration-250 cursor-pointer border border-dark rounded-none"
                  >
                    Valider ma demande d'agrément flotte →
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── 7. CTA ADAPTÉ SPÉCIFIQUEMENT POUR LA FLOTTE ── */}
      <ContactCTA
        theme="dark"
        watermark="FLOTTE"
        title="Multipliez le rendement de vos deux-roues avec"
        highlight="la technologie DEM."
        subtitle="Partenariat Flottes"
        description="Rencontrez nos experts B2B pour auditer votre parc, configurer votre cockpit télématique et activer vos premières courses dès cette semaine."
        primaryBtnText="Déposer un dossier flotte"
        primaryBtnLink="#enregistrer"
        primaryBtnIcon="arrow"
        secondaryBtnText="Prendre rendez-vous B2B"
        secondaryBtnLink="mailto:contact@dem.sn"
        bullets={[
          "Contrat d'agrément certifié",
          "Supervision télématique incluse",
          "Reversements hebdomadaires garantis"
        ]}
      />

    </div>
  );
}
