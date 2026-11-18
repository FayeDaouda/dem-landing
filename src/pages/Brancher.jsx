import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Download, Smartphone, Link2, ClipboardPaste, ShoppingBag, Code2, Store, Bike, BadgeCheck, MapPin, ArrowRight } from 'lucide-react'
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'
import { DevWooCommerce, WOO_ZIP } from './developpeurs/Presentation.jsx'

gsap.registerPlugin(ScrollTrigger)

// « Brancher mon site » : pour les commerçants qui ont DÉJÀ une boutique en
// ligne. Leurs commandes partent seules chez un coursier DEM. (Sans site :
// la boutique DEM Pro, page /dem-pro.) Code de connexion créé dans l'app
// DEM Pro › API DEM › Brancher mon site.
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const STEPS = [
  [Smartphone,     'Ouvrez l\'app DEM Pro',      'Avec l\'offre Premium. Compte › Équipe & sécurité › API DEM.'],
  [Link2,          'Touchez « Brancher mon site »', 'Choisissez votre type de site : votre code de connexion est prêt.'],
  [ClipboardPaste, 'Collez le code dans votre site', 'WooCommerce : dans le module DEM. Autre site : envoyez-le à votre développeur.'],
]

const CHOICES = [
  {
    icon: ShoppingBag, title: 'WooCommerce', badge: 'Disponible', badgeColor: '#00A86B',
    text: 'Le module DEM Livraison s\'installe en 2 minutes, sans développeur : prix DEM au panier, livraison créée au paiement, commande terminée une fois livrée.',
    link: '#woocommerce-module', cta: 'Voir les étapes',
  },
  {
    icon: Store, title: 'Shopify', badge: 'Bientôt', badgeColor: '#94A3B8',
    text: 'L\'application DEM pour Shopify est en préparation. Écrivez-nous : nous vous prévenons dès son ouverture.',
    link: '/contact?subject=Shopify%20%E2%80%94%20brancher%20mon%20site', cta: 'Être prévenu',
  },
  {
    icon: Code2, title: 'Site sur mesure', badge: 'Disponible', badgeColor: '#00A86B',
    text: 'Votre développeur branche l\'API DEM avec votre code de connexion : devis, création, suivi et mises à jour automatiques.',
    link: '/developpeurs', cta: 'Documentation',
  },
]

const PROMISES = [
  [MapPin,     'Prix exact au panier',  'Votre client voit le prix DEM de sa livraison avant de payer, selon son adresse.'],
  [Bike,       'Coursier trouvé seul',  'Dès la commande payée, un coursier DEM proche vient chercher le colis chez vous.'],
  [BadgeCheck, 'Coursiers vérifiés',    'Pièces contrôlées, notés à chaque course, suivis en direct jusqu\'à la livraison.'],
  [ArrowRight, 'Commande à jour',       'Coursier trouvé, colis récupéré, livré : votre site se met à jour à chaque étape.'],
]

const FAQ = [
  ['Combien ça coûte ?', 'La connexion de site est incluse dans l\'offre DEM Pro Premium. Chaque livraison est facturée au prix DEM affiché au panier.'],
  ['Qui paie la livraison ?', 'Votre client la paie avec sa commande sur votre site. Vous réglez le coursier en espèces à la récupération, ou automatiquement avec votre wallet DEM Pro.'],
  ['Où livrez-vous ?', 'Dans toute la zone desservie par DEM à Dakar. Une adresse hors zone est signalée au panier.'],
  ['Je n\'ai pas encore de site', 'La boutique DEM Pro est faite pour vous : votre catalogue en ligne, un lien de commande à partager, le paiement et nos coursiers.'],
]

export default function Brancher() {
  const ref = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = 'Brancher mon site à DEM — livraison automatique'
    return () => { document.title = prev }
  }, [])

  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-br="line"]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut', delay: 0.3 })
      gsap.fromTo('[data-br="hero"]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.2 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', stagger: 0.08 }),
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      {/* ── Hero ── */}
      <section data-header-theme="white" className="bg-white text-black relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 border-b border-slate-100">
        <div className="absolute left-0 bottom-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="block text-[clamp(6rem,22vw,24rem)] font-black uppercase leading-[0.78] -ml-[0.04em]" style={{ color: 'rgba(0,134,200,0.045)', letterSpacing: '-0.04em' }}>SITE</span>
        </div>
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-3">
            <div data-br="line" className="w-8 sm:w-10 h-[2px] bg-[#0086C8] shrink-0" />
            <span className="font-['Raleway',sans-serif] uppercase font-bold text-[10.5px] sm:text-xs tracking-widest text-[#0086C8]">DEM Pro · Brancher mon site</span>
          </div>
          <h1 data-br="hero" className="font-extrabold text-[34px] sm:text-5xl md:text-6xl lg:text-[4.4rem] mb-5 sm:mb-6 leading-[1.06] tracking-tight max-w-[980px]">
            Votre site vend. <span className="text-[#0086C8]">DEM livre.</span>
          </h1>
          <p data-br="hero" className="text-base sm:text-xl text-slate-500 max-w-[680px] font-['Raleway',sans-serif] leading-relaxed mb-8 sm:mb-10">
            Vous avez déjà une boutique en ligne ? Branchez-la à DEM : chaque commande trouve un coursier DEM, qui récupère le colis chez vous et le livre à votre client. Pour WooCommerce, sans développeur.
          </p>
          <div data-br="hero" className="flex flex-col sm:flex-row gap-3">
            {/* Couleur sur le <span> : le site impose « a { color: inherit } » hors des couches Tailwind */}
            <a href="#choix" className="inline-flex items-center justify-center bg-[#021520] hover:bg-[#0086C8] px-8 py-4 transition-all duration-300">
              <span className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-bold uppercase tracking-widest"><Link2 size={16} /> Choisir mon site</span>
            </a>
            <a href={WOO_ZIP} download className="group inline-flex items-center justify-center border border-[#021520]/20 hover:border-[#0086C8] px-8 py-4 transition-all duration-300">
              <span className="inline-flex items-center gap-3 text-[#021520] group-hover:text-[#0086C8] transition-colors text-xs sm:text-sm font-bold uppercase tracking-widest"><Download size={16} /> Module WooCommerce</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 3 étapes ── */}
      <section data-header-theme="black" className="bg-[#021520] text-white py-20 sm:py-28">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
          <MiniTitleWithBar content="En 3 étapes" color="cyan-light" />
          <h2 data-reveal className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12 max-w-[760px]">Un code à copier, et c'est branché.</h2>
          <ol className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {STEPS.map(([Icon, t, d], i) => (
              <li key={t} data-reveal className="bg-[#021520] p-7 sm:p-9">
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-[#00D2FF] font-black text-4xl leading-none">{i + 1}</span>
                  <Icon size={22} className="text-white/50" />
                </div>
                <div className="font-bold text-lg mb-2">{t}</div>
                <div className="text-sm text-white/60 leading-relaxed">{d}</div>
              </li>
            ))}
          </ol>
          <p data-reveal className="text-white/50 text-sm mt-6">
            Pas encore l'app ? <a href="/download"><span className="text-[#00D2FF] underline">Télécharger DEM Pro</span></a> · L'offre Premium s'active dans l'app.
          </p>
        </div>
      </section>

      {/* ── Choix du site ── */}
      <section id="choix" data-header-theme="white" className="bg-[#F4F7FA] text-black py-20 sm:py-28 scroll-mt-20">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
          <MiniTitleWithBar content="Votre site" />
          <h2 data-reveal className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12 max-w-[760px]">Sur quoi est votre boutique ?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {CHOICES.map(({ icon: Icon, title, badge, badgeColor, text, link, cta }) => (
              <a key={title} href={link} data-reveal className="group bg-white border border-slate-200 hover:border-[#0086C8] p-7 sm:p-8 flex flex-col transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="w-12 h-12 bg-[#0086C8]/10 inline-flex items-center justify-center"><Icon size={22} className="text-[#0086C8]" /></span>
                  <span className="text-[10.5px] font-bold uppercase tracking-widest px-2.5 py-1" style={{ color: badgeColor, background: `${badgeColor}1a` }}>{badge}</span>
                </div>
                <span className="block font-extrabold text-2xl mb-3 text-[#021520]">{title}</span>
                <span className="block text-sm text-slate-500 leading-relaxed mb-8 flex-1">{text}</span>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#021520] group-hover:text-[#0086C8] transition-colors">{cta} <ArrowRight size={14} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── WooCommerce en détail (même bloc que /developpeurs) ── */}
      <DevWooCommerce />

      {/* ── Ce que fait DEM ── */}
      <section data-header-theme="white" className="bg-white text-black py-20 sm:py-28 border-t border-slate-100">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
          <MiniTitleWithBar content="Ce que DEM fait pour vous" />
          <h2 data-reveal className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12 max-w-[820px]">Vous vendez. On s'occupe du reste, jusqu'à la porte de votre client.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {PROMISES.map(([Icon, t, d]) => (
              <div key={t} data-reveal className="bg-white p-7">
                <Icon size={22} className="text-[#0086C8] mb-5" />
                <div className="font-bold mb-2">{t}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Questions ── */}
      <section data-header-theme="white" className="bg-[#F4F7FA] text-black py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-16">
          <MiniTitleWithBar content="Questions" />
          <h2 data-reveal className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-10">Avant de brancher votre site</h2>
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {FAQ.map(([q, a]) => (
              <details key={q} data-reveal className="group py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-lg">
                  {q}
                  <span className="text-[#0086C8] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-slate-500 leading-relaxed mt-3 max-w-[820px]">
                  {a}
                  {q.startsWith('Je n\'ai pas') && <> <a href="/dem-pro"><span className="text-[#0086C8] underline">Découvrir la boutique DEM Pro</span></a></>}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div data-header-theme="black">
        <ContactCTA
          theme="cyan-deep"
          watermark="SITE"
          subtitle="Passez à l'action"
          title="Prêt à brancher"
          highlight="votre boutique ?"
          description="La connexion de site est incluse dans l'offre DEM Pro Premium. Ouvrez l'app, touchez « Brancher mon site », et vos commandes partent avec DEM."
          primaryBtnText="Voir l'offre Premium"
          primaryBtnLink="/dem-pro#tarifs"
          primaryBtnIcon="arrow"
          secondaryBtnText="Contacter DEM"
          secondaryBtnLink="/contact?subject=Brancher%20mon%20site"
          secondaryBtnIcon="mail"
        />
      </div>
    </div>
  )
}
