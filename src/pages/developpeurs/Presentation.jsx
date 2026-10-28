import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Zap, Download, ShoppingCart, Smartphone, Store, LayoutGrid, KeyRound, PenLine, Repeat,
  FlaskConical, Gauge, Lock, CreditCard, Bike, Package, CheckCircle2,
} from 'lucide-react'
import MiniTitleWithBar from '../../components/atoms/MiniTitleWithBar.jsx'
import ApiTerminal from './ApiTerminal.jsx'
import { OPENAPI_URL } from './snippets.js'

gsap.registerPlugin(ScrollTrigger)

// Partie « présentation » de /developpeurs : mêmes codes que le reste du site
// (titres mot par mot, ligne qui se dessine, filigrane, angles droits, cyan
// sur bleu nuit). Animations coupées si l'utilisateur les a désactivées.
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// Titre découpé en mots qui montent (comme PageHeroSection), en React
function Words({ text, className = 'dev-word' }) {
  return text.split(' ').map((w, i) => (
    <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
      <span className={className} style={{ display: 'inline-block' }}>{w}&nbsp;</span>
    </span>
  ))
}

// ── 1. En-tête ───────────────────────────────────────────────────────────────
export function DevHero() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-dev="line"]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut', delay: 0.3 })
      gsap.fromTo('[data-dev="label"]', { xPercent: -6, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.1 })
      gsap.fromTo('.dev-word', { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.05, delay: 0.25 })
      gsap.fromTo('.dev-word-2', { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.02, delay: 0.45 })
      gsap.fromTo('[data-dev="fade"]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.1, delay: 0.7 })
      gsap.fromTo('[data-dev="terminal"]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-header-theme="white" className="bg-white text-black relative overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-slate-100">
      <div className="absolute left-0 bottom-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <span className="block text-[clamp(6rem,22vw,24rem)] font-black uppercase leading-[0.78] -ml-[0.04em]" style={{ color: 'rgba(0,134,200,0.045)', letterSpacing: '-0.04em' }}>API</span>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] gap-x-16 gap-y-10 items-center">
        <div>
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-3">
            <div data-dev="line" className="w-8 sm:w-10 h-[2px] bg-[#0086C8] shrink-0" />
            <span data-dev="label" className="font-['Raleway',sans-serif] uppercase font-bold text-[10.5px] sm:text-xs tracking-widest text-[#0086C8]">
              API DEM · Développeurs
            </span>
          </div>
          <h1 className="font-extrabold text-[32px] sm:text-5xl md:text-6xl lg:text-[4.2rem] mb-5 sm:mb-6 leading-[1.08] tracking-tight text-black">
            <Words text="Branchez votre site au" />
            <span className="text-[#0086C8]"><Words text="réseau DEM." /></span>
          </h1>
          <p className="text-base sm:text-xl text-slate-500 max-w-[620px] font-['Raleway',sans-serif] leading-relaxed mb-8 sm:mb-10">
            <Words className="dev-word-2" text="Quand un client commande sur votre site, votre application ou votre logiciel de caisse, la livraison DEM se crée toute seule : prix annoncé avant le paiement, coursier trouvé en quelques minutes, commande mise à jour à chaque étape." />
          </p>
          <div className="flex flex-col sm:flex-row gap-3" data-dev="fade">
            {/* Couleur sur le <span> : le site impose « a { color: inherit } » hors des couches Tailwind */}
            <a href="#demarrage" className="inline-flex items-center justify-center bg-[#021520] hover:bg-[#0086C8] px-8 py-4 transition-all duration-300">
              <span className="inline-flex items-center gap-3 text-white text-xs sm:text-sm font-bold uppercase tracking-widest"><Zap size={16} /> Démarrage rapide</span>
            </a>
            <a href={OPENAPI_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center border border-[#021520]/20 hover:border-[#0086C8] px-8 py-4 transition-all duration-300">
              <span className="inline-flex items-center gap-3 text-[#021520] group-hover:text-[#0086C8] transition-colors text-xs sm:text-sm font-bold uppercase tracking-widest"><Download size={16} /> Spécification OpenAPI</span>
            </a>
          </div>
        </div>
        <div data-dev="terminal" className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <ApiTerminal />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <dl className="grid grid-cols-1 sm:grid-cols-3 border-t border-slate-200" data-dev="fade">
            {[
              ['Adresse', 'api.dem.sn/v1'],
              ['Format', 'REST · JSON · XOF'],
              ['Accès', 'DEM Pro Premium'],
            ].map(([k, v]) => (
              <div key={k} className="pt-4 pb-1 sm:pr-4">
                <dt className="text-[10.5px] uppercase tracking-widest text-slate-400 font-bold">{k}</dt>
                <dd className={`text-sm font-semibold mt-1 ${k === 'Adresse' ? "font-mono text-[#0086C8]" : 'text-[#021520]'}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

// ── 2. Chiffres clés ─────────────────────────────────────────────────────────
const STATS = [
  [3, '', 'appels pour livrer une première commande'],
  [15, ' min', 'de prix garanti par devis'],
  [1, '', 'seule livraison par commande, même si la requête est renvoyée'],
  [0, '', 'vraie course en mode test : tout est simulé'],
]

export function DevStats() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      ref.current.querySelectorAll('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: end, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => { el.textContent = Math.round(obj.v) },
        })
      })
      gsap.from('[data-stat]', { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-header-theme="black" className="bg-[#021520] text-white border-y border-white/10">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 grid grid-cols-2 lg:grid-cols-4">
        {STATS.map(([n, unit, label], i) => (
          <div key={label} data-stat className={`py-10 sm:py-14 px-2 sm:px-6 ${i % 2 === 1 ? 'border-l border-white/10' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-white/10' : ''} ${i === 2 ? 'lg:border-l' : ''}`}>
            <div className="text-4xl sm:text-6xl font-black tracking-tight text-[#00D2FF]">
              <span data-count={n}>{reduceMotion() ? n : 0}</span>{unit}
            </div>
            <div className="mt-2 text-xs sm:text-sm text-white/65 leading-snug max-w-[240px]">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── 3. Comment ça marche : le parcours d'une commande ────────────────────────
const JOURNEY = [
  [CreditCard,   'Votre client paie',      'Votre site demande le prix (devis), puis crée la livraison.', 'delivery.created'],
  [Bike,         'Un coursier accepte',    'DEM trouve le coursier le plus proche, en quelques minutes.',  'delivery.driver_assigned'],
  [Package,      'Colis récupéré',         'Le coursier part vers votre client, suivi en direct.',         'delivery.picked_up'],
  [CheckCircle2, 'Livré',                  'Votre commande passe à « livrée », toute seule.',              'delivery.delivered'],
]

export function DevJourney() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) {
      ref.current?.querySelectorAll('[data-step]').forEach(el => el.classList.add('is-on'))
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-track]', { scaleX: 0 }, {
        scaleX: 1, ease: 'none', transformOrigin: 'left center',
        scrollTrigger: { trigger: '[data-steps]', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      })
      gsap.fromTo('[data-track-v]', { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: 'top center',
        scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      })
      ref.current.querySelectorAll('[data-step]').forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: 'top 72%', onEnter: () => el.classList.add('is-on'), onLeaveBack: () => el.classList.remove('is-on') })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-header-theme="white" className="bg-white text-black py-20 sm:py-28">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
        <MiniTitleWithBar content="Comment ça marche" />
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-[760px] mb-4">Une commande sur votre site, une livraison DEM.</h2>
        <p className="text-slate-500 max-w-[640px] mb-14 font-['Raleway',sans-serif] text-base sm:text-lg">
          À chaque étape, DEM prévient votre site (webhook) : vous n'avez rien à surveiller.
        </p>

        <div data-steps className="relative">
          {/* Trajet qui se dessine (horizontal sur ordinateur, vertical sur mobile) */}
          <div className="hidden lg:block absolute left-[6%] right-[6%] top-[27px] h-[2px] bg-slate-200">
            <div data-track className="h-full bg-[#0086C8]" />
          </div>
          <div className="lg:hidden absolute left-[27px] top-4 bottom-4 w-[2px] bg-slate-200">
            <div data-track-v className="w-full h-full bg-[#0086C8]" />
          </div>

          <ol className="grid lg:grid-cols-4 gap-10 lg:gap-6 relative">
            {JOURNEY.map(([Icon, title, desc, event], i) => (
              <li key={event} data-step className="dev-step flex lg:block gap-5">
                <div className="dev-step-dot shrink-0 w-14 h-14 flex items-center justify-center border-2 border-slate-200 bg-white text-slate-400 transition-all duration-500 relative z-10 lg:mx-auto">
                  <Icon size={22} />
                </div>
                <div className="lg:text-center lg:mt-6">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Étape {i + 1}</div>
                  <div className="text-lg font-bold mb-1.5">{title}</div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3 lg:max-w-[260px] lg:mx-auto">{desc}</p>
                  <code className="dev-step-event inline-block font-mono text-[11.5px] px-2.5 py-1 border border-slate-200 text-slate-400 transition-all duration-500">{event}</code>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <style>{`
        .dev-step.is-on .dev-step-dot { border-color: #0086C8; background: #0086C8; color: #fff; box-shadow: 0 10px 30px -8px rgba(0,134,200,.55); }
        .dev-step.is-on .dev-step-event { border-color: rgba(0,134,200,.35); color: #0086C8; background: rgba(0,210,255,.08); }
      `}</style>
    </section>
  )
}

// ── 4. Cas d'usage ───────────────────────────────────────────────────────────
const USES = [
  [ShoppingCart, 'Boutique en ligne', 'WooCommerce, Shopify ou site sur mesure : chaque commande payée devient une livraison, prix affiché au panier.'],
  [Smartphone,   'Application mobile', 'Votre app commande la course et montre le suivi en direct à vos clients.'],
  [Store,        'Plusieurs magasins', 'Logiciel de caisse ou de stock : chaque point de retrait envoie ses livraisons.'],
  [LayoutGrid,   'Place de marché',   'Vous vendez pour d\'autres : la livraison de chaque vendeur part du bon endroit.'],
]

export function DevUseCases() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-use]', { y: 50, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.12, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-header-theme="white" className="bg-[#F4F7FA] text-black py-20 sm:py-28">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16">
        <MiniTitleWithBar content="Pour qui" />
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-[760px] mb-12">Votre système vend, DEM livre.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
          {USES.map(([Icon, title, desc]) => (
            <div key={title} data-use className="group bg-white p-7 sm:p-8 transition-colors duration-300 hover:bg-[#021520]">
              <Icon size={28} className="text-[#0086C8] group-hover:text-[#00D2FF] transition-colors mb-6" />
              <div className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{title}</div>
              <p className="text-sm text-slate-500 group-hover:text-white/70 leading-relaxed transition-colors">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 5. Sécurité et fiabilité ─────────────────────────────────────────────────
const TRUST = [
  [KeyRound,     'Clés secrètes',          'Jamais stockées en clair, révocables en un geste, avec des droits choisis clé par clé.', 'lg:col-span-2'],
  [PenLine,      'Webhooks signés',        'Chaque message porte une signature HMAC-SHA256 et un horodatage contre le rejeu.', ''],
  [Repeat,       'Jamais de doublon',      'Idempotency-Key : une requête renvoyée après une coupure ne crée jamais une deuxième course.', ''],
  [FlaskConical, 'Mode test',              'Clé dem_test_ : livraisons simulées de bout en bout, mêmes webhooks, aucun coursier dérangé.', ''],
  [Gauge,        'Limites claires',        'Quotas annoncés dans chaque réponse, nouvel essai indiqué (Retry-After).', ''],
  [Lock,         'Chacun chez soi',        'Une clé ne voit que les livraisons de son compte, et le test jamais la production.', 'lg:col-span-2'],
]

export function DevSecurity() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('[data-trust]', { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true } })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} data-header-theme="black" className="bg-[#021520] text-white py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute -left-10 bottom-0 pointer-events-none select-none" aria-hidden="true">
        <span className="text-[clamp(5rem,16vw,18rem)] font-black uppercase leading-none" style={{ color: 'rgba(0,210,255,0.03)' }}>SÛR</span>
      </div>
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-16 relative">
        <MiniTitleWithBar content="Sécurité et fiabilité" color="cyan-light" />
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-[760px] mb-12">Pensée pour la production, dès le premier jour.</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {TRUST.map(([Icon, title, desc, span]) => (
            <div key={title} data-trust className={`bg-[#021520] p-7 sm:p-8 hover:bg-[#0A2233] transition-colors duration-300 ${span}`}>
              <Icon size={24} className="text-[#00D2FF] mb-5" />
              <div className="text-lg font-bold mb-2">{title}</div>
              <p className="text-sm text-white/65 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
