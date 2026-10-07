// Briques partagées par la boutique publique et la page de suivi.
import { useEffect } from 'react'

export const API_URL = import.meta.env.VITE_API_URL || 'https://api.dem.sn'
export const SUPPORT_WHATSAPP = '221710131926' // chatbot WhatsApp (07/10)

// Icônes ligne dessinées à la main (aucune dépendance externe).
const PATHS = {
  bag: <><path d="M6 8h12l1 12H5L6 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></>,
  crosshair: <><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
  card: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10.5h18" /><path d="M7 14.5h4" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.6 3.1-6.4 7-6.4s7 2.8 7 6.4" /></>,
  box: <><path d="M3 8.5L12 4l9 4.5-9 4.5-9-4.5z" /><path d="M3 8.5V16l9 4.5 9-4.5V8.5" /><path d="M12 13v7.5" /></>,
  check: <path d="M5 13l4 4L19 7" />,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.5-4.5" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 018 0v2.5" /></>,
  shield: <><path d="M12 3l7 3v5.5c0 4.4-3 8.2-7 9.5-4-1.3-7-5.1-7-9.5V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  cash: <><rect x="3" y="6.5" width="18" height="11" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6.5 9.5v5M17.5 9.5v5" /></>,
  bike: <><circle cx="6" cy="16.5" r="3" /><circle cx="18" cy="16.5" r="3" /><path d="M6 16.5l4-7h4l4 7" /><path d="M9 9.5h-2M14 9.5l-1.5-3H10" /></>,
  route: <><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8 18h7.5a3.5 3.5 0 000-7h-7a3.5 3.5 0 010-7H16" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  copy: <><rect x="8.5" y="8.5" width="11" height="11" rx="2.2" /><path d="M15.5 8.5V6.6a2.1 2.1 0 00-2.1-2.1H6.6a2.1 2.1 0 00-2.1 2.1v6.8a2.1 2.1 0 002.1 2.1h1.9" /></>,
  share: <><circle cx="18" cy="5.5" r="2.3" /><circle cx="6" cy="12" r="2.3" /><circle cx="18" cy="18.5" r="2.3" /><path d="M8 11l8-4.4M8 13l8 4.4" /></>,
  chat: <><path d="M20 12a8 8 0 01-11.7 7.1L4 20l1-4.1A8 8 0 1120 12z" /><path d="M9 10.5h6M9 13.5h4" /></>,
  note: <><path d="M6 3.5h9l3 3v14H6z" /><path d="M9 11h6M9 14.5h6M9 7.5h3" /></>,
  flag: <><path d="M6 21V4" /><path d="M6 4.5h11l-2 4 2 4H6" /></>,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  refresh: <><path d="M19.5 12a7.5 7.5 0 11-2.2-5.3" /><path d="M19.5 4.5v4h-4" /></>,
  linkOff: <><path d="M9 15l6-6" /><path d="M13 5l1.5-1.5a3.5 3.5 0 015 5L18 10" /><path d="M11 19l-1.5 1.5a3.5 3.5 0 01-5-5L6 14" /></>,
  moon: <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  download: <><path d="M12 4v11" /><path d="M7.5 10.5L12 15l4.5-4.5" /><path d="M5 19h14" /></>,
  store: <><path d="M4 9.5L5.5 4h13L20 9.5" /><path d="M4 9.5a2.7 2.7 0 005.3 0 2.7 2.7 0 005.4 0 2.7 2.7 0 005.3 0" /><path d="M5.5 11.5V20h13v-8.5" /><path d="M10 20v-4.5h4V20" /></>,
}

export function Icon({ name, size = 18, strokeWidth = 1.9, style, className }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }} className={className} aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}

export function formatFcfa(n) {
  return `${Math.round(n).toLocaleString('fr-FR')} FCFA`
}

// Mêmes préfixes que l'app (senegal_phone.dart) — Orange 71/77/78, Free
// 75/76, Expresso 70 — 9 chiffres sans le +221.
// + comptes de test (revue des stores) : 000000000 à 000000004.
export function isValidSenegalMobile(digits) {
  return /^(70|71|75|76|77|78)\d{7}$/.test(digits) || /^00000000[0-4]$/.test(digits)
}

// Saisie du téléphone → 9 chiffres locaux. L'indicatif (00221 ou 221 suivi
// d'un numéro) est retiré AVANT de garder 9 chiffres : sinon, tapé chiffre
// par chiffre, « 00221 77… » restait bloqué sur « 00 221 77 12 ».
export function localPhoneDigits(value) {
  let d = String(value).replace(/\D/g, '')
  if (d.startsWith('00221')) d = d.slice(5)
  else if (d.startsWith('221') && d.length > 9) d = d.slice(3)
  return d.slice(0, 9)
}

// 771234567 → 77 123 45 67
export function formatLocalPhone(digits) {
  const d = digits.replace(/\D/g, '').slice(0, 9)
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ')
}

export function initials(name) {
  return (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

export function MerchantAvatar({ name, avatar, size }) {
  const style = size ? { width: size, height: size, borderRadius: size * 0.28, fontSize: size * 0.38 } : undefined
  return (
    <div className="ds-avatar" style={style}>
      {avatar ? <img src={avatar} alt="" onError={e => { e.currentTarget.style.display = 'none' }} /> : initials(name)}
    </div>
  )
}

export const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Espèces', color: '#12a150', mark: 'F' },
  { value: 'WAVE', label: 'Wave', color: '#1dc8ce', mark: 'W' },
  { value: 'ORANGE_MONEY', label: 'Orange Money', color: '#ff7a00', mark: 'OM' },
  { value: 'FREE_MONEY', label: 'Free Money', color: '#d61f26', mark: 'FM' },
]

// ── Commandes passées depuis ce navigateur ──────────────────────────────────
// Pour retrouver son suivi en revenant sur la boutique (le client n'a pas de
// compte). Rien d'autre que l'identifiant de suivi, le nom du commerçant et
// la date — jamais d'adresse ni de téléphone.
const STORE_KEY = 'dem.commandes'
const KEEP_MS = 7 * 24 * 60 * 60 * 1000

export function rememberOrder({ id, merchantId, merchantName }) {
  try {
    const list = recentOrders().filter(o => o.id !== id)
    list.unshift({ id, merchantId, merchantName, at: Date.now() })
    localStorage.setItem(STORE_KEY, JSON.stringify(list.slice(0, 10)))
  } catch { /* stockage indisponible (navigation privée) : rien de grave */ }
}

export function recentOrders() {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    return Array.isArray(list) ? list.filter(o => o && o.id && Date.now() - o.at < KEEP_MS) : []
  } catch {
    return []
  }
}

export function trackingUrl(id) {
  return `${window.location.origin}/suivi/${id}`
}

// Fond clair aussi derrière la page (rebond iOS, bas de page) — le reste
// du site est sombre.
export function useLightPage(background = '#f4f6fa') {
  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = background
    return () => { document.body.style.background = prev }
  }, [background])
}

// Zone de livraison (réglée dans l'admin, renvoyée avec les infos du
// commerçant) — même calcul que le serveur (utils/delivery-zone.js).
export function isInZone(zone, lat, lng) {
  if (!zone || zone.type !== 'circle') return true
  const rad = d => (d * Math.PI) / 180
  const a = zone.center
  const h = Math.sin(rad(lat - a.lat) / 2) ** 2
    + Math.cos(rad(a.lat)) * Math.cos(rad(lat)) * Math.sin(rad(lng - a.lng) / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h)) <= zone.radiusKm
}
