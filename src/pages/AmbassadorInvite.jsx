import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Copy, Check, Smartphone, Store, KeyRound, Truck, ShieldCheck, Wallet } from 'lucide-react'
import { API_URL } from '../shop/ui.jsx'

// ── Lien d'un ambassadeur : dem.sn/pro/<code> ───────────────────────────────
// Un commerçant invité découvre DEM Pro et reçoit le code à saisir dans le
// champ « Code de parrainage » de son inscription DEM Pro (dans l'app).
// Le serveur confirme le code et donne seulement le prénom (rien d'autre).
const APP_STORE = 'https://apps.apple.com/us/app/dem-livraison/id6764724342'
const PLAY_STORE = 'https://play.google.com/store/apps/details?id=sn.dem.demapp'

export default function AmbassadorInvite() {
  const { code: raw = '' } = useParams()
  const code = raw.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20)
  const [state, setState] = useState({ status: 'loading', firstName: null })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Rejoignez DEM Pro — DEM'
    let alive = true
    fetch(`${API_URL}/public/ambassador/${encodeURIComponent(code)}`)
      .then(r => (r.ok ? r.json() : null))
      .then(d => alive && setState(d?.valid ? { status: 'ok', firstName: d.firstName } : { status: 'invalid', firstName: null }))
      .catch(() => alive && setState({ status: 'ok', firstName: null })) // réseau : on montre quand même le code
    return () => { alive = false }
  }, [code])

  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* refusé */ }
  }

  const who = state.firstName ? `${state.firstName}, ambassadeur DEM,` : 'Un ambassadeur DEM'

  return (
    <div className="bg-[#f6f8fb]">
      <section className="bg-[#021520] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-16 sm:pt-36 sm:pb-20">
          <p className="text-[#00D2FF] font-semibold text-sm tracking-wide uppercase">DEM Pro · Livraison à Dakar</p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold leading-tight max-w-3xl">
            {state.status === 'invalid' ? 'Ce lien n\'est plus valable.' : <>{who} vous invite sur DEM Pro.</>}
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl">
            Faites livrer vos colis partout à Dakar en quelques clics, suivez chaque course en direct
            et partagez votre boutique en ligne avec vos clients.
          </p>

          {state.status !== 'invalid' && (
            <div className="mt-8 inline-flex flex-col sm:flex-row sm:items-center gap-3 bg-white/[0.06] border border-white/10 rounded-2xl p-4 sm:p-5">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Votre code d'invitation</p>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-[0.18em] mt-1">{code}</p>
              </div>
              <button type="button" onClick={copy}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00D2FF] text-[#021520] font-bold px-5 py-3 hover:brightness-95 transition">
                {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Code copié' : 'Copier le code'}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#021520]">Votre boutique sur DEM Pro en 3 étapes</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            [Smartphone, 'Téléchargez DEM', 'Installez l\'application DEM et entrez votre numéro de téléphone.'],
            [Store, 'Choisissez « DEM Pro »', 'Renseignez le nom de votre boutique et votre activité.'],
            [KeyRound, 'Saisissez le code', state.status === 'invalid' ? 'Demandez un nouveau code à votre ambassadeur.' : `Dans le champ « Code de parrainage », tapez ${code}.`],
          ].map(([Icon, title, text], i) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#0086C8]/10 text-[#0086C8] grid place-items-center"><Icon size={20} /></span>
                <span className="text-sm font-bold text-slate-400">Étape {i + 1}</span>
              </div>
              <h3 className="mt-4 font-bold text-lg text-[#021520]">{title}</h3>
              <p className="mt-1 text-slate-600 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href={PLAY_STORE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[#021520] text-white font-bold px-6 py-3.5 hover:bg-[#0A2233] transition">
            Télécharger sur Google Play
          </a>
          <a href={APP_STORE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-[#021520] text-[#021520] font-bold px-6 py-3.5 hover:bg-white transition">
            Télécharger sur l'App Store
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            [Truck, 'Coursiers DEM', 'Ils récupèrent vos colis à la boutique et les livrent à vos clients.'],
            [ShieldCheck, 'Suivi en direct', 'Vous et vos clients suivez chaque livraison sur la carte.'],
            [Wallet, 'Wave et Orange Money', 'Vos clients peuvent payer en ligne, l\'argent arrive dans votre wallet.'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="flex gap-3">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-[#00D2FF]/15 text-[#0086C8] grid place-items-center"><Icon size={18} /></span>
              <div>
                <h3 className="font-bold text-[#021520]">{title}</h3>
                <p className="text-sm text-slate-600 mt-0.5">{text}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-500">
          Une question ? <Link to="/contact" className="text-[#0086C8] font-semibold">Contactez l'équipe DEM</Link>.
        </p>
      </section>
    </div>
  )
}
