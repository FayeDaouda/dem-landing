import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { L, baseMap, destIcon, driverIcon } from './shop/map.js'
import './shop/shop.css'
import './shop/tracking.css'
import {
  API_URL, Icon, MerchantAvatar, PAYMENT_METHODS, SUPPORT_WHATSAPP, formatFcfa, useLightPage,
} from './shop/ui.jsx'

// Suivi public d'une commande (dem.sn/suivi/:id) — sans compte ni app, sur
// téléphone comme sur ordinateur. Données : GET /public/suivi/:id (statut,
// étapes, adresse de livraison, position du livreur une fois en route —
// jamais son identité). Relu toutes les 5 s en route, 10 s sinon ; en pause
// quand l'onglet est caché ; arrêt une fois la commande terminée. Thème
// clair par défaut, sombre en option (mémorisé sur l'appareil).

const ACTIVE = new Set(['AWAITING_PAYMENT', 'RECEIVED', 'SCHEDULED', 'SEARCHING', 'PICKUP', 'ON_THE_WAY'])

// Préférences du visiteur (navigateur seulement) — jamais bloquant : en
// navigation privée, le stockage peut être refusé.
const THEME_KEY = 'dem_suivi_theme'
const BANNER_KEY = 'dem_suivi_app_banner_closed'
function readPref(key) { try { return localStorage.getItem(key) } catch { return null } }
function writePref(key, value) { try { localStorage.setItem(key, value) } catch { /* refusé */ } }

const STORES = {
  android: { href: 'https://play.google.com/store/apps/details?id=sn.dem.demapp', label: 'Google Play' },
  ios: { href: 'https://apps.apple.com/us/app/dem-livraison/id6764724342', label: 'App Store' },
}
function platformOf() {
  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  // iPadOS se présente comme un Mac : on le reconnaît à l'écran tactile.
  if (/iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios'
  return 'other'
}

const time = d => new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
function when(d) {
  if (!d) return null
  const date = new Date(d)
  const today = new Date()
  const sameDay = date.toDateString() === today.toDateString()
  return sameDay
    ? `Aujourd'hui à ${time(d)}`
    : `${date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à ${time(d)}`
}

function statusOf(t) {
  const name = t.merchant?.name ?? 'Le commerçant'
  const paidOnline = !!t.payment?.paidAt
  switch (t.stage) {
    case 'AWAITING_PAYMENT':
      return { icon: 'shield', title: 'Paiement en attente', text: `Payez votre commande pour l'envoyer à ${name}.`, live: true }
    case 'EXPIRED':
      return { icon: 'clock', title: 'Paiement non reçu', text: 'Le délai de 30 minutes est dépassé : la commande n\'a pas été envoyée. Repassez-la depuis la boutique.', tone: 'red' }
    case 'RECEIVED':
      return paidOnline
        ? { icon: 'check', title: 'Commande payée', text: `${name} va la confirmer dans quelques instants.`, live: true }
        : { icon: 'note', title: 'Commande reçue', text: `${name} va la confirmer dans quelques instants.`, live: true }
    case 'SCHEDULED':
      return { icon: 'clock', title: 'Livraison programmée', text: t.times.scheduled ? `Prévue ${when(t.times.scheduled).toLowerCase()}.` : 'Un livreur vous sera attribué à l\'heure prévue.' }
    case 'SEARCHING':
      return { icon: 'bike', title: 'Commande confirmée', text: 'Nous attribuons un livreur DEM à votre commande.', live: true }
    case 'PICKUP':
      return { icon: 'store', title: 'Le livreur récupère votre commande', text: `Il est en route vers ${t.merchant ? name : 'le point de collecte'}.`, live: true }
    case 'ON_THE_WAY':
      return { icon: 'bike', title: 'En route vers vous', text: 'Gardez votre téléphone à portée de main : le livreur peut vous appeler en arrivant.', live: true }
    case 'DELIVERED':
      return { icon: 'check', title: 'Commande livrée', text: `${when(t.times.delivered)}. Merci de votre confiance !`, tone: 'green' }
    case 'CANCELLED':
      return { icon: 'x', title: 'Commande annulée', text: `Cette livraison a été annulée. Contactez ${t.merchant ? name : 'le support'} si besoin.`, tone: 'red' }
    case 'REJECTED':
      return { icon: 'x', title: 'Commande non acceptée', text: paidOnline
        ? `${name} n'a pas pu accepter cette commande. Votre paiement vous est remboursé automatiquement.`
        : `${name} n'a pas pu accepter cette commande. Vous n'avez rien payé.`, tone: 'red' }
    default:
      return { icon: 'note', title: 'Suivi de commande', text: '' }
  }
}

function stepsOf(t) {
  const name = t.merchant?.name
  const ended = ['CANCELLED', 'REJECTED', 'EXPIRED'].includes(t.stage)
  const list = []
  if (t.kind === 'request') list.push({ label: 'Commande envoyée', at: t.times.received })
  // Lien prépayé : le paiement lance la commande
  if (t.payment?.prepaid) list.push({ label: 'Payée en ligne', at: t.times.paid, hint: t.stage === 'AWAITING_PAYMENT' ? 'En attente de votre paiement' : null })
  list.push({
    label: t.kind === 'request' ? `Confirmée${name ? ` par ${name}` : ''}` : 'Commande créée',
    at: t.times.confirmed,
    hint: t.stage === 'SCHEDULED' && t.times.scheduled ? `Livraison prévue ${when(t.times.scheduled).toLowerCase()}` : null,
  })
  list.push({
    label: 'Récupérée par le livreur',
    at: t.times.pickedUp,
    hint: t.stage === 'SEARCHING' ? 'Attribution d\'un livreur…' : t.stage === 'PICKUP' ? 'Le livreur est en route pour la récupérer' : null,
  })
  list.push({ label: 'Livrée', at: t.times.delivered, hint: t.stage === 'ON_THE_WAY' ? 'En route vers vous' : null })

  // Étape en cours = la première non datée (sauf commande terminée)
  const firstOpen = list.findIndex(s => !s.at)
  const out = list.map((s, i) => ({
    ...s,
    state: s.at ? 'is-done' : !ended && i === firstOpen ? 'is-current' : '',
  }))
  if (ended) {
    const cut = firstOpen === -1 ? out.length : firstOpen
    out.splice(cut, out.length - cut, {
      label: t.stage === 'REJECTED' ? 'Non acceptée' : t.stage === 'EXPIRED' ? 'Non payée à temps' : 'Annulée', at: t.times.ended, state: 'is-failed',
    })
  }
  return out
}

export default function Tracking() {
  const { id } = useParams()
  // Commande tout juste passée sur la boutique : paiement déjà lancé, on
  // ouvre Wave tout de suite (cette page reste dans l'historique : au retour,
  // elle affiche « Payé »). Orange Money : QR affiché dans la carte.
  const location = useLocation()
  const autoPayment = location.state?.payment ?? null
  useEffect(() => {
    if (!autoPayment?.paymentUrl) return
    const t = setTimeout(() => {
      window.history.replaceState({}, '')
      window.location.href = autoPayment.paymentUrl
    }, 700)
    return () => clearTimeout(t)
  }, [autoPayment])
  // Clair par défaut ; le sombre est une option, mémorisée sur cet appareil.
  const [dark, setDark] = useState(() => readPref(THEME_KEY) === 'dark')
  useLightPage(dark ? '#0b1220' : '#f4f6fa')
  const toggleTheme = () => setDark(d => { writePref(THEME_KEY, d ? 'light' : 'dark'); return !d })
  const [data, setData] = useState(null)
  const [state, setState] = useState('loading') // loading | ready | notfound
  const [offline, setOffline] = useState(false)
  const failures = useRef(0)
  const timer = useRef(null)

  const load = useCallback(async () => {
    clearTimeout(timer.current)
    try {
      const res = await fetch(`${API_URL}/public/suivi/${id}`, { cache: 'no-store' })
      if (res.status === 404) { setState('notfound'); return }
      if (!res.ok) throw new Error(String(res.status))
      const next = await res.json()
      setData(next)
      setState('ready')
      setOffline(false)
      failures.current = 0
      if (ACTIVE.has(next.stage) && !document.hidden) {
        timer.current = setTimeout(load, next.stage === 'ON_THE_WAY' ? 5000 : 10000)
      }
    } catch {
      failures.current += 1
      setOffline(true)
      // Nouvelle tentative de plus en plus espacée (jusqu'à 30 s)
      if (!document.hidden) timer.current = setTimeout(load, Math.min(30000, 3000 * failures.current))
    }
  }, [id])

  useEffect(() => {
    load()
    const onVisible = () => { if (!document.hidden) load() }
    document.addEventListener('visibilitychange', onVisible)
    return () => { clearTimeout(timer.current); document.removeEventListener('visibilitychange', onVisible) }
  }, [load])

  useEffect(() => {
    if (data) document.title = `${statusOf(data).title} — Suivi DEM`
  }, [data])

  if (state === 'notfound') return <NotFound dark={dark} />

  return (
    <div className={`ds dt${dark ? ' is-dark' : ''}`}>
      <div className="dt-layout">
        <div className="dt-side">
          <TopBar data={data} dark={dark} onToggleTheme={toggleTheme} />
          <div className="dt-panel">
            <div className="dt-panel-inner">
              {offline && <div className="dt-offline"><Icon name="refresh" size={15} /> Connexion perdue — nouvelle tentative en cours…</div>}
              <AppBanner />
              {state === 'loading' ? <PanelSkeleton /> : <Panel data={data} autoPayment={autoPayment} />}
            </div>
          </div>
        </div>
        <MapView data={data} />
      </div>
    </div>
  )
}

function TopBar({ data, dark, onToggleTheme }) {
  const [copied, setCopied] = useState(false)
  async function share() {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: 'Suivi de commande DEM', url }); return } catch { /* annulé */ }
    }
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* refusé */ }
  }
  return (
    <header className="dt-top">
      <Link to="/" className="ds-brand"><img src="/logo.png" alt="DEM" /></Link>
      <div className="dt-top-title">
        <b>Suivi de commande</b>
        <small>{data ? `N° ${data.reference}` : '…'}</small>
      </div>
      <div className="dt-top-actions">
        <button
          type="button" className="dt-top-btn is-icon" onClick={onToggleTheme}
          aria-label={dark ? 'Passer en thème clair' : 'Passer en thème sombre'} title={dark ? 'Thème clair' : 'Thème sombre'}
        >
          <Icon name={dark ? 'sun' : 'moon'} size={16} />
        </button>
        <button type="button" className="dt-top-btn" onClick={share}>
          <Icon name={copied ? 'check' : 'share'} size={15} /> {copied ? 'Copié' : 'Partager'}
        </button>
      </div>
    </header>
  )
}

function Panel({ data, autoPayment }) {
  const s = statusOf(data)
  const payment = PAYMENT_METHODS.find(m => m.value === data.paymentMethod)
  const help = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(`Bonjour, j'ai besoin d'aide pour ma commande N° ${data.reference}.`)}`

  return (
    <div className="ds-fade" key={data.stage}>
      <div className="ds-card">
        <div className="dt-status">
          <span className={`dt-status-ico ${s.tone ? `is-${s.tone}` : ''} ${s.live ? 'is-live' : ''}`}>
            <Icon name={s.icon} size={24} strokeWidth={2} />
          </span>
          <div style={{ minWidth: 0 }}>
            <h1>{s.title}</h1>
            <p>{s.text}</p>
          </div>
        </div>
        {data.stage === 'ON_THE_WAY' && data.etaMin != null && (
          <div className="dt-eta"><b>~{data.etaMin} min</b><span>avant l'arrivée estimée</span></div>
        )}
        {ACTIVE.has(data.stage) && <span className="dt-live"><i /> Mis à jour en direct</span>}
      </div>

      <PaymentCard data={data} autoPayment={autoPayment} />

      <div className="ds-card">
        <h2 className="ds-card-title" style={{ fontSize: 15 }}>Étapes</h2>
        <ol className="dt-steps">
          {stepsOf(data).map(st => (
            <li key={st.label} className={st.state}>
              <span className="dt-dot">
                {st.state === 'is-done' && <Icon name="check" size={14} strokeWidth={3} />}
                {st.state === 'is-failed' && <Icon name="x" size={13} strokeWidth={3} />}
              </span>
              <div className="dt-step-text">
                <b>{st.label}</b>
                {st.at ? <small>{when(st.at)}</small> : st.hint ? <small>{st.hint}</small> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="ds-card">
        {data.merchant && (
          <div className="dt-merchant" style={{ marginBottom: data.items.length ? 12 : 0 }}>
            <MerchantAvatar name={data.merchant.name} avatar={data.merchant.avatar} size={44} />
            <div style={{ minWidth: 0 }}>
              <b>{data.merchant.name}</b>
              <small style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--ds-green)', fontWeight: 600 }}>
                <Icon name="shield" size={13} /> Partenaire DEM Pro
              </small>
            </div>
          </div>
        )}
        {data.items.length > 0 && (
          <>
            {data.items.map((i, k) => (
              <div key={k} className="ds-line">
                <span className="ds-line-thumb">{i.image ? <img src={i.image} alt="" /> : <Icon name="bag" size={18} />}</span>
                <span className="ds-line-name">{i.name}<small>Quantité : {i.quantity}</small></span>
                {i.price != null && <span className="ds-line-price">{formatFcfa(i.price * i.quantity)}</span>}
              </div>
            ))}
            {data.total != null && <div className="ds-total"><span>Total des articles</span><b>{formatFcfa(data.total)}</b></div>}
          </>
        )}
        {payment && data.payment?.productPayment !== 'ONLINE' && (
          <div className="dt-kv" style={{ borderTop: data.items.length ? '1px solid var(--ds-line)' : 'none', marginTop: data.items.length ? 10 : 0 }}>
            <span className="ds-pay-dot" style={{ background: payment.color }}>{payment.mark}</span>
            <div style={{ fontSize: 14, lineHeight: 1.45 }}>
              <b>Paiement à la réception</b>
              <div style={{ color: 'var(--ds-muted)', fontSize: 13 }}>{payment.label}</div>
            </div>
          </div>
        )}
      </div>

      <div className="ds-card">
        <div className="dt-kv" style={{ paddingTop: 0 }}>
          <span className="ds-recap-ico"><Icon name="pin" size={17} /></span>
          <div className="ds-recap-body">
            <small>Adresse de livraison</small>
            {data.delivery.address}
            {data.delivery.landmark && <div style={{ color: 'var(--ds-muted)' }}>Repère : {data.delivery.landmark}</div>}
          </div>
        </div>
      </div>

      <a className="ds-btn ds-btn-secondary" href={help} target="_blank" rel="noopener noreferrer" style={{ marginTop: 14 }}>
        <Icon name="chat" size={18} /> Besoin d'aide ? Écrire au support DEM
      </a>
      <p className="ds-footer" style={{ padding: '18px 0 0' }}>
        Livraison assurée par <Link to="/">DEM — Delivery Express Mobility</Link>
      </p>
    </div>
  )
}

const OPERATORS = [['WAVE', 'Wave', '#1dc8ce'], ['ORANGE_MONEY', 'Orange Money', '#ff7a00']]
const OPERATOR_LABEL = { WAVE: 'Wave', ORANGE_MONEY: 'Orange Money' }

// Paiement sur la page de suivi :
// - lien prépayé en attente : payer pour envoyer la commande (articles, et
//   livraison si choisie « avec la commande ») — Wave / Orange Money ;
// - payé : confirmation ; refusé / annulé : remboursement automatique suivi ;
// - livraison restée « à la livraison » : payable en ligne aussi.
function PaymentCard({ data, autoPayment }) {
  const p = data.payment
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState(null)
  const [qr, setQr] = useState(autoPayment?.qrCode ?? null)
  if (!p) return null

  async function pay(operatorName) {
    setBusy(operatorName)
    setError(null)
    setQr(null)
    try {
      const res = await fetch(`${API_URL}/public/suivi/${data.id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operatorName }),
      })
      const out = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(out.message || 'Paiement impossible pour le moment. Réessayez.')
      if (out.paymentUrl) window.location.href = out.paymentUrl
      else if (out.qrCode) setQr(out.qrCode)
      else throw new Error('Paiement impossible pour le moment. Réessayez.')
    } catch (err) {
      setError(err.message || 'Connexion impossible. Réessayez.')
    } finally {
      setBusy(null)
    }
  }

  const buttons = (
    <>
      <div className="dt-paycard-actions">
        {OPERATORS.map(([op, label, color]) => (
          <button key={op} type="button" className="ds-btn dt-paybtn" style={{ '--op': color }}
            disabled={!!busy} onClick={() => pay(op)}>
            {busy === op ? 'Ouverture…' : label}
          </button>
        ))}
      </div>
      {qr && (
        <div className="dt-paycard-qr">
          <img src={qr.startsWith('data:') || qr.startsWith('http') ? qr : `data:image/png;base64,${qr}`} alt="QR code de paiement" />
          <small>Scannez ce code avec Orange Money, ou payez depuis l'app Orange Money.</small>
        </div>
      )}
      {error && <div className="ds-alert is-error" style={{ marginTop: 10, marginBottom: 0 }}><Icon name="x" size={18} />{error}</div>}
    </>
  )

  // 1. Lien prépayé : en attente du paiement
  if (p.prepaid && p.awaitingPayment) {
    return (
      <div className="ds-card dt-paycard is-due">
        <div className="dt-paycard-top">
          <span className="dt-paycard-ico"><Icon name="shield" size={19} /></span>
          <div>
            <b>Payer {formatFcfa(p.amountDue)} pour envoyer la commande</b>
            <small>Paiement sécurisé via DEM · à faire dans les 30 minutes</small>
          </div>
        </div>
        <div className="dt-paysplit">
          <div><span>Articles</span><b>{formatFcfa(p.productAmount)}</b></div>
          {p.deliveryAmount != null
            ? <div><span>Livraison</span><b>{formatFcfa(p.deliveryAmount)}</b></div>
            : <div><span>Livraison</span><small>à régler au coursier</small></div>}
        </div>
        {buttons}
        <small className="dt-paycard-hint">Validez dans l'application, puis revenez ici : la page se met à jour toute seule.</small>
      </div>
    )
  }

  // 2. Remboursement (refus, sans réponse, annulation, doublon)
  if (p.refund) {
    const sent = p.refund.status === 'SENT'
    return (
      <div className={`ds-card dt-paycard ${sent ? 'is-paid' : ''}`}>
        <span className="dt-paycard-ico"><Icon name={sent ? 'check' : 'refresh'} size={19} /></span>
        <div>
          <b>{sent ? 'Remboursement envoyé' : 'Remboursement en cours'}</b>
          <small>{formatFcfa(p.refund.amount)} {sent ? 'renvoyés' : 'à renvoyer'} sur votre {OPERATOR_LABEL[p.paymentOperator] ?? 'compte mobile money'}.</small>
        </div>
      </div>
    )
  }

  // 3. Payé en ligne
  if (p.prepaid && p.paidAt) {
    return (
      <div className="ds-card dt-paycard is-paid">
        <span className="dt-paycard-ico"><Icon name="check" size={20} strokeWidth={2.6} /></span>
        <div>
          <b>Payé en ligne — {formatFcfa(p.amountDue)}</b>
          <small>{p.deliveryAmount != null ? 'Articles et livraison réglés.' : 'Articles réglés · la livraison se règle au coursier.'}</small>
        </div>
      </div>
    )
  }

  // 4. Livraison à régler : possible en ligne aussi
  if (p.deliveryDue != null) {
    return (
      <div className="ds-card dt-paycard">
        <div className="dt-paycard-top" style={{ width: '100%' }}>
          <span className="dt-paycard-ico"><Icon name="bike" size={19} /></span>
          <div>
            <b>Livraison : {formatFcfa(p.deliveryDue)}</b>
            <small>À régler au coursier, ou dès maintenant en ligne.</small>
          </div>
        </div>
        {buttons}
      </div>
    )
  }
  return null
}

function PanelSkeleton() {
  return (
    <>
      <div className="ds-card">
        <div style={{ display: 'flex', gap: 14 }}>
          <div className="ds-skel" style={{ width: 48, height: 48, borderRadius: 15 }} />
          <div style={{ flex: 1 }}>
            <div className="ds-skel" style={{ height: 20, width: '70%', marginBottom: 8 }} />
            <div className="ds-skel" style={{ height: 14, width: '90%' }} />
          </div>
        </div>
      </div>
      <div className="ds-card"><div className="ds-skel" style={{ height: 130 }} /></div>
    </>
  )
}

// Invitation à installer l'app, adaptée au téléphone (App Store / Google
// Play, les deux sur ordinateur). Masquée quand l'app est déjà installée —
// détectable sur Android/Chrome (getInstalledRelatedApps, voir
// public/manifest.webmanifest et asset_statements côté app), ou quand la
// page s'ouvre déjà dans l'app (?app=1) — et une fois fermée par le visiteur.
function AppBanner() {
  const [hidden, setHidden] = useState(() =>
    readPref(BANNER_KEY) === '1'
    || new URLSearchParams(window.location.search).has('app')
    || window.matchMedia?.('(display-mode: standalone)').matches === true)
  useEffect(() => {
    if (hidden || typeof navigator.getInstalledRelatedApps !== 'function') return
    let cancelled = false
    navigator.getInstalledRelatedApps()
      .then(apps => { if (!cancelled && apps?.length) setHidden(true) })
      .catch(() => { /* non pris en charge */ })
    return () => { cancelled = true }
  }, [hidden])
  if (hidden) return null

  const platform = platformOf()
  const close = () => { writePref(BANNER_KEY, '1'); setHidden(true) }
  return (
    <div className="dt-app ds-fade" role="complementary" aria-label="Application DEM">
      <img src="/logo.png" alt="" />
      <div className="dt-app-text">
        <b>Suivez vos livraisons dans l'app DEM</b>
        Notifications en temps réel, historique et commande en 1 minute.
      </div>
      {platform === 'other' ? (
        <div className="dt-app-stores">
          {Object.values(STORES).map(st => (
            <a key={st.label} className="dt-app-cta" href={st.href} target="_blank" rel="noopener noreferrer">
              <Icon name="download" size={15} /> {st.label}
            </a>
          ))}
        </div>
      ) : (
        <a className="dt-app-cta" href={STORES[platform].href} target="_blank" rel="noopener noreferrer">
          <Icon name="download" size={15} /> Télécharger
        </a>
      )}
      <button type="button" className="dt-app-close" onClick={close} aria-label="Masquer">
        <Icon name="x" size={16} />
      </button>
    </div>
  )
}

function NotFound({ dark }) {
  return (
    <div className={`ds dt${dark ? ' is-dark' : ''}`}>
      <header className="dt-top">
        <Link to="/" className="ds-brand"><img src="/logo.png" alt="DEM" /></Link>
        <div className="dt-top-title"><b>Suivi de commande</b></div>
      </header>
      <main className="ds-main" style={{ maxWidth: 520 }}>
        <div className="ds-card ds-success ds-fade">
          <div className="ds-success-badge" style={{ background: 'var(--ds-fill)', color: 'var(--ds-muted)' }}>
            <Icon name="linkOff" size={30} />
          </div>
          <h2>Suivi introuvable</h2>
          <p>Ce lien de suivi n'existe pas ou a expiré : il reste disponible 7 jours après la livraison.</p>
          <div className="ds-actions">
            <a className="ds-btn ds-btn-secondary" href={`https://wa.me/${SUPPORT_WHATSAPP}`} target="_blank" rel="noopener noreferrer">
              <Icon name="chat" size={18} /> Contacter le support DEM
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

// ── Carte ────────────────────────────────────────────────────────────────
function MapView({ data }) {
  const el = useRef(null)
  const map = useRef(null)
  const dest = useRef(null)
  const driver = useRef(null)
  const anim = useRef(null)
  const userMoved = useRef(false)

  const hasDest = data?.delivery?.lat != null && data?.delivery?.lng != null

  // Carte créée une fois, détruite au départ
  useEffect(() => {
    if (!el.current || map.current) return
    const m = baseMap(el.current, { scrollWheelZoom: true })
    m.setView([14.7167, -17.4677], 12) // Dakar, en attendant les données
    m.on('dragstart zoomstart', e => { if (e.originalEvent) userMoved.current = true })
    map.current = m
    const ro = new ResizeObserver(() => m.invalidateSize())
    ro.observe(el.current)
    return () => { ro.disconnect(); cancelAnimationFrame(anim.current); m.remove(); map.current = null }
  }, [])

  const frame = useCallback(() => {
    const m = map.current
    if (!m || !dest.current) return
    const pts = [dest.current.getLatLng()]
    if (driver.current) pts.push(driver.current.getLatLng())
    if (pts.length === 1) m.setView(pts[0], 15, { animate: true })
    else m.fitBounds(L.latLngBounds(pts), { padding: [60, 60], maxZoom: 16, animate: true })
  }, [])

  useEffect(() => {
    const m = map.current
    if (!m || !data) return

    if (hasDest) {
      const ll = [data.delivery.lat, data.delivery.lng]
      if (!dest.current) dest.current = L.marker(ll, { icon: destIcon, keyboard: false, title: 'Adresse de livraison' }).addTo(m)
      else dest.current.setLatLng(ll)
    }

    if (data.driver) {
      const to = L.latLng(data.driver.lat, data.driver.lng)
      if (!driver.current) {
        driver.current = L.marker(to, { icon: driverIcon, keyboard: false, title: 'Votre livreur', zIndexOffset: 500 }).addTo(m)
      } else {
        // Glissement de l'ancienne position vers la nouvelle (1,2 s)
        const from = driver.current.getLatLng()
        const start = performance.now()
        cancelAnimationFrame(anim.current)
        const step = now => {
          const k = Math.min(1, (now - start) / 1200)
          const e = 1 - Math.pow(1 - k, 3)
          driver.current?.setLatLng([from.lat + (to.lat - from.lat) * e, from.lng + (to.lng - from.lng) * e])
          if (k < 1) anim.current = requestAnimationFrame(step)
        }
        anim.current = requestAnimationFrame(step)
      }
    } else if (driver.current) {
      driver.current.remove()
      driver.current = null
    }

    if (!userMoved.current) frame()
  }, [data, hasDest, frame])

  return (
    <div className={`dt-map-wrap ${data?.stage === 'ON_THE_WAY' ? '' : 'is-compact'}`}>
      <div ref={el} className="dt-map" aria-label="Carte de suivi" />
      {data && !hasDest && (
        <div className="dt-map-empty"><Icon name="pin" size={16} /> Adresse non localisée sur la carte</div>
      )}
      {hasDest && (
        <button type="button" className="dt-recenter" aria-label="Recentrer" onClick={() => { userMoved.current = false; frame() }}>
          <Icon name="crosshair" size={20} />
        </button>
      )}
    </div>
  )
}
