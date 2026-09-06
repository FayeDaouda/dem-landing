import { useState } from 'react';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';

export default function Entreprises() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION AWWWARDS ── */}
      <PageHeroSection
        contentMiniBar="SOLUTIONS E-COMMERCE & GRANDS COMPTES"
        firstTitle="Propulsez la logistique de votre marque."
        secondTitle="Livraison Same-Day, reversement COD sous 24h et intégration e-commerce fluide partout à Dakar."
      />

      {/* ── 2. BANDEAU DE MÉTRIQUES B2B (NO GRADIENT, NO ROUNDED) ── */}
      <section className="border-t border-b border-black/10 bg-dark text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { num: "< 2h", label: "Délai moyen Same-Day", sub: "Expédition et remise le jour même à vos clients" },
            { num: "24h", label: "Reversement COD garanti", sub: "Collecte des fonds et virement direct Wave / OM" },
            { num: "100%", label: "Traçabilité & Preuve OTP", sub: "Signature numérique et code de validation" },
            { num: "-30%", label: "Taux de retour colis", sub: "Grâce aux notifications SMS et au géoguidage" }
          ].map((item, idx) => (
            <div key={idx} className="p-8 lg:p-10 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <span className="font-['DM_Sans',sans-serif] font-black text-4xl lg:text-5xl text-cyan mb-3 block">
                {item.num}
              </span>
              <div>
                <h3 className="uppercase text-xs font-bold tracking-widest text-white mb-1 font-['Raleway',sans-serif]">
                  {item.label}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed m-0">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. LES 3 PILIERS B2B & E-COMMERCE ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="SERVICES MARCHANDS & RETAIL" />
            <SectionHeading
              align="left"
              title="Une chaîne de livraison"
              highlight="pensée pour convertir"
              subtitle="Performance commerciale"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border border-black/10 divide-y lg:divide-y-0 lg:divide-x divide-black/10 bg-white">
            
            {/* Pilier 1 */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-2 uppercase tracking-widest block mb-4">/01 · EXPÉDITION ULTRA-RAPIDE</span>
                <h3 className="text-2xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Livraison Same-Day & Créneaux Précis
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Vos commandes enregistrées avant midi sont livrées l'après-midi même. Vos clients choisissent leur créneau de livraison et suivent leur coursier en temps réel.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 text-xs text-cyan-dark font-bold font-mono uppercase">
                Ramassage groupé en boutique
              </div>
            </div>

            {/* Pilier 2 */}
            <div className="p-8 lg:p-12 flex flex-col justify-between bg-dark text-white">
              <div>
                <span className="text-xs font-mono font-bold text-cyan uppercase tracking-widest block mb-4">/02 · GESTION DU CASH ON DELIVERY</span>
                <h3 className="text-2xl font-bold uppercase text-white mb-4 font-['DM_Sans',sans-serif]">
                  Encaissement Sécurisé & Reversement 24h
                </h3>
                <p className="text-sm text-white/80 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Nous collectons le paiement à la livraison (Espèces, Wave ou Orange Money) et vous reversons l'intégralité des montants sous 24h ouvrées avec rapport détaillé.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 text-xs text-cyan font-bold font-mono uppercase">
                Rapprochement comptable 100%
              </div>
            </div>

            {/* Pilier 3 */}
            <div className="p-8 lg:p-12 flex flex-col justify-between hover:bg-slate-50 transition-colors">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-2 uppercase tracking-widest block mb-4">/03 · PLUGINS & API E-COMMERCE</span>
                <h3 className="text-2xl font-bold uppercase text-dark mb-4 font-['DM_Sans',sans-serif]">
                  Intégration Shopify & WooCommerce
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 font-['Poppins',sans-serif]">
                  Connectez votre boutique en ligne à l'API DEM pour générer automatiquement vos étiquettes de colis, planifier les courses et notifier vos acheteurs.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 text-xs text-cyan-dark font-bold font-mono uppercase">
                Documentation API & Sandbox
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 4. FORMULAIRE OUVERTURE COMPTE PRO MARCHAND ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-slate-50" id="demande-pro">
        <div className="max-w-[1000px] mx-auto">
          
          <div className="text-center mb-16">
            <MiniTitleWithBar content="OUVERTURE DE COMPTE" />
            <SectionHeading
              align="center"
              title="Rejoignez les marques"
              highlight="qui livrent avec DEM"
              subtitle="Tarifs Entreprises & Volume"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
            <p className="mt-4 text-base text-slate-600 max-w-xl mx-auto font-['Poppins',sans-serif]">
              Complétez ce formulaire pour obtenir votre grille tarifaire dégressive et vos accès au portail marchand DEM Pro sous 24h.
            </p>
          </div>

          <div className="border border-black/10 bg-white p-8 sm:p-12 lg:p-16">
            {submitted ? (
              <div className="p-10 bg-dark text-white text-center border border-cyan">
                <span className="text-xs font-bold uppercase tracking-widest text-cyan block mb-2 font-['Raleway',sans-serif]">
                  DEMANDE TRANSMIS AVEC SUCCÈS
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white mb-4 font-['DM_Sans',sans-serif]">
                  Votre dossier d'ouverture de compte est en cours d'activation !
                </h3>
                <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed font-['Poppins',sans-serif] mb-6">
                  Notre équipe commerciale vous contactera dès aujourd'hui pour valider votre grille tarifaire et configurer vos accès marchands.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="inline-block uppercase tracking-wider text-xs font-bold px-6 py-3 border border-cyan text-cyan hover:bg-cyan hover:text-dark transition-colors duration-250 cursor-pointer rounded-none"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Ligne 1 : Nom Entreprise & Nom Responsable */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Nom de l'entreprise ou Boutique *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Dakar Fashion Store"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Nom du responsable *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ex: Aminata Sarr"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>
                </div>

                {/* Ligne 2 : Téléphone & Volume Mensuel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Téléphone / WhatsApp Commercial *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Ex: +221 77 000 00 00"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Volume mensuel estimé *
                    </label>
                    <select className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark focus:outline-none focus:border-cyan-2 text-sm rounded-none">
                      <option value="1-50">1 à 50 livraisons / mois (Démarrage)</option>
                      <option value="50-200">50 à 200 livraisons / mois (Régulier)</option>
                      <option value="200-500">200 à 500 livraisons / mois (Grand volume)</option>
                      <option value="500+">500+ livraisons / mois (Entreprise clé)</option>
                    </select>
                  </div>
                </div>

                {/* Ligne 3 : Email & Secteur */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Email professionnel
                    </label>
                    <input
                      type="email"
                      placeholder="Ex: contact@boutique.sn"
                      className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark placeholder-slate-400 focus:outline-none focus:border-cyan-2 text-sm rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark mb-2 font-['Raleway',sans-serif]">
                      Secteur d'activité
                    </label>
                    <select className="w-full px-4 py-3.5 bg-slate-50 border border-black/15 text-dark focus:outline-none focus:border-cyan-2 text-sm rounded-none">
                      <option value="fashion">Mode & Prêt-à-porter</option>
                      <option value="tech">High-Tech & Électronique</option>
                      <option value="cosmetic">Beauté & Cosmétique</option>
                      <option value="food">Restauration & Alimentaire</option>
                      <option value="sante">Santé & Parapharmacie</option>
                      <option value="autre">Autre secteur</option>
                    </select>
                  </div>
                </div>

                {/* Bouton de Soumission Sharp */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 uppercase font-bold tracking-widest text-xs sm:text-sm bg-dark text-white hover:bg-cyan-2 hover:text-white transition-all duration-250 cursor-pointer border border-dark rounded-none"
                  >
                    Activer mon compte marchand DEM Pro →
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── 5. SECTION INFO / CTA PERSONNALISÉ ENTREPRISES ── */}
      <ContactCTA
        theme="dark"
        watermark="B2B PRO"
        title="Accélérez la croissance de vos ventes avec"
        highlight="la logistique DEM."
        subtitle="Partenariat Marchands"
        description="Déléguez vos expéditions à nos coursiers qualifiés et offrez à vos clients l'expérience de livraison Same-Day la plus rapide et fiable du Sénégal."
        primaryBtnText="Demander une démo API"
        primaryBtnLink="#demande-pro"
        primaryBtnIcon="arrow"
        secondaryBtnText="Contacter le pôle B2B"
        secondaryBtnLink="mailto:contact@dem.sn"
        bullets={[
          "Reversement COD sous 24h garanti",
          "Plugins Shopify & WooCommerce",
          "Tableau de bord de suivi en direct"
        ]}
      />

    </div>
  );
}
