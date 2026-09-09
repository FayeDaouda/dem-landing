import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import useIsDesktop from '../hooks/useIsDesktop.js';

gsap.registerPlugin(ScrollTrigger);

export default function Coursiers() {
  const isDesktop = useIsDesktop();
  const [coursesPerDay, setCoursesPerDay] = useState(14);

  // Estimation financière DEM : ~1 200 FCFA net moyen par course
  const estimatedDaily = coursesPerDay * 1200;
  const estimatedWeekly = coursesPerDay * 1200 * 6;
  const estimatedMonthly = coursesPerDay * 1200 * 26;

  const sectionPillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation douce des sections au scroll
      const cards = document.querySelectorAll('.awwwards-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-cyan selection:text-dark">
      
      {/* ── 1. HERO SECTION AWWWARDS ── */}
      <PageHeroSection
        contentMiniBar="RECRUTEMENT & FLOTTE COURSIERS"
        firstTitle="Prenez la route avec DEM."
        secondTitle="Liberté totale, revenus transparents et technologie connectée à Dakar."
      />

      {/* ── 2. BANDEAU CHIFFRES & IMPACT AWWWARDS (NO GRADIENT, NO ROUNDED) ── */}
      <section className="border-t border-b border-black/10 bg-dark text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { num: "< 45m", label: "Délai moyen par livraison", sub: "Optimisation des trajets via GPS" },
            { num: "100%", label: "Reversement hebdomadaire", sub: "Paiement direct Wave / OM" },
            { num: "7j / 7", label: "Flexibilité des créneaux", sub: "Roulez selon votre emploi du temps" },
            { num: "500+", label: "Courses opérées par jour", sub: "Flux de commandes continu garanti" }
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

      {/* ── 3. SECTION SIMULATEUR DE REVENUS & AVANTAGES ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="SIMULATEUR DE REVENUS" />
            <SectionHeading
              align="left"
              title="Estimez votre potentiel"
              highlight="de gains mensuels"
              subtitle="Transparence financière"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 border border-black/10">
            
            {/* Colonne Gauche : Le Calculateur Dynamique */}
            <div className="lg:col-span-6 p-8 lg:p-14 bg-dark text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-cyan font-['Raleway',sans-serif] block mb-1">
                      Volume d'activité
                    </span>
                    <h3 className="text-2xl font-bold text-white">Courses quotidiennes</h3>
                  </div>
                  <span className="text-4xl lg:text-5xl font-black text-cyan font-['DM_Sans',sans-serif]">
                    {coursesPerDay}
                  </span>
                </div>

                {/* Range Slider Sharp (No Rounded) */}
                <div className="mb-10">
                  <input
                    type="range"
                    min="4"
                    max="25"
                    value={coursesPerDay}
                    onChange={(e) => setCoursesPerDay(Number(e.target.value))}
                    className="w-full accent-cyan cursor-pointer h-2 bg-white/20 rounded-none"
                  />
                  <div className="flex justify-between text-[11px] text-white/50 uppercase tracking-wider font-semibold mt-3 font-['Raleway',sans-serif]">
                    <span>4 (Temps partiel)</span>
                    <span>14 (Temps plein standard)</span>
                    <span>25 (Performeur)</span>
                  </div>
                </div>

                {/* Grille des gains */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center p-4 bg-white/[0.04] border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-white/70 font-['Raleway',sans-serif]">
                      Gain estimé / jour
                    </span>
                    <span className="text-lg font-bold text-white">
                      {estimatedDaily.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-white/[0.04] border border-white/10">
                    <span className="text-xs uppercase tracking-widest text-white/70 font-['Raleway',sans-serif]">
                      Gain estimé / semaine (6j)
                    </span>
                    <span className="text-xl font-bold text-white">
                      {estimatedWeekly.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-6 bg-cyan/15 border border-cyan/40">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-cyan font-bold block font-['Raleway',sans-serif]">
                        Revenu net estimé / mois
                      </span>
                      <small className="text-[10px] text-white/60">Base indicative de 26 jours</small>
                    </div>
                    <span className="text-2xl lg:text-4xl font-black text-cyan font-['DM_Sans',sans-serif]">
                      {estimatedMonthly.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-white/40 mt-8 m-0 uppercase tracking-wider font-['Raleway',sans-serif]">
                * Données estimatives basées sur le tarif moyen des courses DEM à Dakar. Les gains varient selon vos plages horaires et le nombre de missions accomplies.
              </p>
            </div>

            {/* Colonne Droite : Les 4 Piliers Coursier (Sharp Awwwards Cards) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-black/10 bg-slate-50">
              {[
                {
                  code: "01",
                  title: "Paiements 100% Garantis",
                  desc: "Vos gains de livraison et vos pourboires sont versés chaque semaine sur Wave ou Orange Money, sans frais cachés ni retard."
                },
                {
                  code: "02",
                  title: "Flexibilité Absolue",
                  desc: "Connectez-vous quand vous voulez via l'application. Choisissez vos heures de travail, vos jours de repos et gérez votre planning."
                },
                {
                  code: "03",
                  title: "Assurance & Couverture",
                  desc: "Chaque coursier actif sur le réseau DEM bénéficie d'une protection et d'une assistance en cas d'incident sur la route."
                },
                {
                  code: "04",
                  title: "Équipement Pro Fourni",
                  desc: "Gilets haute visibilité, caissons isothermes sécurisés et application coursier ergonomique avec guidage GPS pas-à-pas."
                }
              ].map((pil, idx) => (
                <div key={idx} className="p-8 lg:p-10 flex flex-col justify-between bg-white border-b border-black/10 hover:bg-slate-50 transition-colors">
                  <span className="font-serif italic text-lg sm:text-xl font-light text-cyan-2 mb-6 block">
                    /{pil.code}
                  </span>
                  <div>
                    <h4 className="text-base font-bold uppercase tracking-wider text-dark mb-3 font-['DM_Sans',sans-serif]">
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

      {/* ── 4. PROCESSUS D'INTÉGRATION : 4 ÉTAPES CLAIRES ── */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 border-b border-black/10 bg-slate-50 text-dark">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="mb-16">
            <MiniTitleWithBar content="COMMENT ÇA MARCHE" />
            <SectionHeading
              align="left"
              title="Devenir coursier DEM"
              highlight="en 4 étapes simples"
              subtitle="Parcours d'admission"
              titleColor="text-dark"
              highlightColor="var(--color-cyan-2, #0086C8)"
              scriptColor="text-cyan-2"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              className="mt-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">
            {[
              {
                step: "ÉTAPE 01",
                title: "Téléchargez l'application",
                desc: "Installez l'application DEM sur votre smartphone iOS ou Android et sélectionnez le profil « Livreur » à l'inscription."
              },
              {
                step: "ÉTAPE 02",
                title: "Vérification des pièces",
                desc: "Téléversez vos justificatifs (CNI, permis moto et documents du véhicule) directement dans l'application sous 24h."
              },
              {
                step: "ÉTAPE 03",
                title: "Validation & Équipement",
                desc: "Votre compte est validé rapidement. Récupérez votre caisson isotherme sécurisé et votre équipement pro au siège."
              },
              {
                step: "ÉTAPE 04",
                title: "Prenez la route",
                desc: "Passez votre statut en ligne, recevez vos premières courses géolocalisées et encaissez vos revenus chaque semaine."
              }
            ].map((st, i) => (
              <div key={i} className="awwwards-card p-8 lg:p-10 flex flex-col justify-between hover:bg-slate-50 transition-colors">
                <span className="font-serif italic text-lg sm:text-xl font-light text-cyan-2 mb-6 block">
                  {st.step}
                </span>
                <div>
                  <h4 className="text-lg font-bold uppercase text-dark mb-3 font-['DM_Sans',sans-serif]">
                    {st.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed m-0 font-['Poppins',sans-serif]">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. SECTION TÉLÉCHARGEMENT & ONBOARDING LIVREUR ── */}
      <DownloadAppCTA
        theme="white"
        watermark="LIVREUR"
        subtitle="Inscription Simplifiée"
        title="Rejoignez les coursiers de"
        highlight="DEM dès aujourd'hui."
        description="Téléchargez l'application DEM, sélectionnez l'option « Livreur » lors de la création de votre compte et transmettez vos documents en 2 minutes pour commencer à rouler."
        bullets={[
          "Sélectionnez le profil « Livreur » à l'ouverture de l'application",
          "Validation express de votre dossier en moins de 24 heures",
          "Équipement de livraison & caisson fournis par DEM",
          "Paiements hebdomadaires garantis par Wave & Orange Money"
        ]}
        id="download"
      />

      {/* ── 6. INFO / CTA PERSONNALISÉ COURSIERS ── */}
      {/* <ContactCTA
        theme="dark"
        watermark="COURSIERS"
        title="Prêt à prendre la route et"
        highlight="encaisser chaque semaine ?"
        subtitle="Rejoignez la flotte DEM"
        description="Téléchargez dès maintenant l'application DEM sur votre smartphone, choisissez le statut Livreur et débutez vos premières courses à Dakar."
        primaryBtnText="Télécharger l'App"
        primaryBtnLink="#download"
        primaryBtnIcon="download"
        secondaryBtnText="Contacter l'équipe Recrutement"
        secondaryBtnLink="mailto:contact@dem.sn"
        bullets={[
          "Paiements hebdomadaires Wave/OM",
          "Assurance & assistance 7j/7",
          "Caisson & équipement fournis"
        ]}
      /> */}

    </div>
  );
}
