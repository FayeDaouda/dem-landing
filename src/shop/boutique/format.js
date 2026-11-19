// Outils de la boutique publique : montants, horaires, couleur d'accent,
// liens WhatsApp et réseaux, coordonnées retenues. Aucun appel réseau ici
// (voir api.js).

// ── Montants ─────────────────────────────────────────────────────────────────
// « 25 000 F » : espace insécable normale (U+00A0) comme séparateur des
// milliers et avant le F. toLocaleString('fr-FR') renvoie selon le
// navigateur U+202F (fine) ou U+00A0 : on uniformise.
export function formatPrice(n) {
  const v = Math.round(Number(n) || 0).toLocaleString('fr-FR').replace(/[  \s]/g, ' ')
  return `${v} F`
}

export function formatKm(km) {
  if (km == null || !Number.isFinite(Number(km))) return null
  return `${Number(km).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`
}

export const plural = (n, one, many) => `${n} ${n > 1 ? many : one}`

// ── Couleur d'accent choisie par la boutique ────────────────────────────────
// fill    : barres, puces actives, coins, anneau de focus
// ink     : texte d'accent sur fond clair (prix, liens) — AA ≥ 4,5 sur #F6F8FB
// btn     : bouton principal (texte blanc, AA ≥ 4,5)
// btnHover/btnHoverText : survol du bouton
// corner  : petits coins des éléments mis en avant
// « dem » : #0086C8 ne tient pas l'AA en texte blanc (4,0) → le bouton reste
// sombre #021520 (charte du site, survol cyan) et le texte passe en #0072AB.
export const ACCENTS = {
  dem:        { fill: '#0086C8', ink: '#0072AB', btn: '#021520', btnHover: '#00D2FF', btnHoverText: '#021520', corner: '#00D2FF' },
  ocean:      { fill: '#1D4ED8', ink: '#1D4ED8', btn: '#1D4ED8', btnHover: '#021520', btnHoverText: '#FFFFFF', corner: '#1D4ED8' },
  emerald:    { fill: '#047857', ink: '#047857', btn: '#047857', btnHover: '#021520', btnHoverText: '#FFFFFF', corner: '#047857' },
  terracotta: { fill: '#C2410C', ink: '#C2410C', btn: '#C2410C', btnHover: '#021520', btnHoverText: '#FFFFFF', corner: '#C2410C' },
  gold:       { fill: '#A16207', ink: '#A16207', btn: '#A16207', btnHover: '#021520', btnHoverText: '#FFFFFF', corner: '#A16207' },
  rose:       { fill: '#BE185D', ink: '#BE185D', btn: '#BE185D', btnHover: '#021520', btnHoverText: '#FFFFFF', corner: '#BE185D' },
  violet:     { fill: '#6D28D9', ink: '#6D28D9', btn: '#6D28D9', btnHover: '#021520', btnHoverText: '#FFFFFF', corner: '#6D28D9' },
  charcoal:   { fill: '#111827', ink: '#111827', btn: '#111827', btnHover: '#334155', btnHoverText: '#FFFFFF', corner: '#111827' },
}

// Variables CSS de la boutique (posées sur la racine .bq)
export function accentVars(key) {
  const a = ACCENTS[key] || ACCENTS.dem
  return {
    '--bq-accent': a.fill,
    '--bq-accent-ink': a.ink,
    '--bq-btn': a.btn,
    '--bq-btn-hover': a.btnHover,
    '--bq-btn-hover-text': a.btnHoverText,
    '--bq-corner': a.corner,
  }
}

// ── Horaires ─────────────────────────────────────────────────────────────────
// Format pas encore figé côté serveur : on accepte
//   - un tableau [{ day, open, close }] (day : 0-6, dimanche = 0, ou nom) ;
//   - un objet { lundi | mon | monday | 1 : { open, close } | [open, close]
//     | "09:00-19:00" | [{ open, close }, …] | null (fermé) }.
// Dakar vit à l'heure UTC toute l'année (pas d'heure d'été) : on lit l'heure
// en UTC, quel que soit le fuseau du téléphone.
const DAY_KEYS = [
  ['0', 'sun', 'sunday', 'dim', 'dimanche'],
  ['1', 'mon', 'monday', 'lun', 'lundi'],
  ['2', 'tue', 'tuesday', 'mar', 'mardi'],
  ['3', 'wed', 'wednesday', 'mer', 'mercredi'],
  ['4', 'thu', 'thursday', 'jeu', 'jeudi'],
  ['5', 'fri', 'friday', 'ven', 'vendredi'],
  ['6', 'sat', 'saturday', 'sam', 'samedi'],
]
const DAY_NAMES = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

function dayIndex(key) {
  const k = String(key).trim().toLowerCase()
  return DAY_KEYS.findIndex(keys => keys.includes(k))
}

function toMinutes(t) {
  const m = /^(\d{1,2})(?:[:hH](\d{2}))?$/.exec(String(t ?? '').trim())
  if (!m) return null
  const v = Number(m[1]) * 60 + Number(m[2] || 0)
  return v >= 0 && v <= 24 * 60 ? v : null
}

function toRanges(value) {
  if (!value || value === 'closed' || value === 'fermé') return []
  if (typeof value === 'string') {
    return value.split(/[,;]/).map(part => {
      const [o, c] = part.split(/\s*[-–à]\s*/)
      return { o: toMinutes(o), c: toMinutes(c) }
    }).filter(r => r.o != null && r.c != null)
  }
  if (Array.isArray(value)) {
    if (value.length === 2 && typeof value[0] === 'string' && typeof value[1] === 'string') {
      const r = { o: toMinutes(value[0]), c: toMinutes(value[1]) }
      return r.o != null && r.c != null ? [r] : []
    }
    return value.flatMap(toRanges)
  }
  if (typeof value === 'object') {
    if (value.closed === true) return []
    const r = { o: toMinutes(value.open ?? value.from ?? value.start), c: toMinutes(value.close ?? value.to ?? value.end) }
    return r.o != null && r.c != null ? [r] : []
  }
  return []
}

// → tableau de 7 jours (0 = dimanche), chacun une liste de plages en minutes
export function normalizeHours(hours) {
  if (!hours) return null
  const week = Array.from({ length: 7 }, () => [])
  let any = false
  if (Array.isArray(hours)) {
    for (const h of hours) {
      const d = typeof h?.day === 'number' ? h.day : dayIndex(h?.day)
      if (d < 0 || d > 6) continue
      const r = toRanges(h)
      week[d].push(...r)
      any = any || r.length > 0
    }
  } else if (typeof hours === 'object') {
    for (const [key, value] of Object.entries(hours)) {
      const d = dayIndex(key)
      if (d < 0) continue
      const r = toRanges(value)
      week[d].push(...r)
      any = any || r.length > 0
    }
  }
  return any ? week.map(list => list.sort((a, b) => a.o - b.o)) : null
}

export function formatHour(min) {
  const h = Math.floor(min / 60) % 24
  const m = min % 60
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`
}

// Statut d'ouverture d'après les horaires (informatifs : la commande reste
// possible boutique fermée) : { open, label, opensAt } ou null sans horaires.
export function shopStatus(hours, now = new Date()) {
  const week = normalizeHours(hours)
  const day = now.getUTCDay()
  const minutes = now.getUTCHours() * 60 + now.getUTCMinutes()

  if (!week) return null

  const current = week[day].find(r => minutes >= r.o && minutes < r.c)
  if (current) return { open: true, label: `Ouvert · ferme à ${formatHour(current.c)}` }
  // Prochaine ouverture, sur 7 jours
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7
    const next = week[d].find(r => i > 0 || r.o > minutes)
    if (!next) continue
    const when = i === 0 ? '' : i === 1 ? 'demain ' : `${DAY_NAMES[d]} `
    return { open: false, label: `Fermé · ouvre ${when}à ${formatHour(next.o)}`, opensAt: `${when}à ${formatHour(next.o)}` }
  }
  return { open: false, label: 'Fermé pour le moment' }
}

export function safeImage(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url) ? url : null
}

// ── « Se souvenir de moi » ────────────────────────────────────────────────────
// Nom, téléphone et adresse (texte, point sur la carte, repère) gardés sur ce
// téléphone seulement, si le client le veut, pour la commande suivante.
const CLIENT_KEY = 'dem.boutique.client'

export function loadClient() {
  try {
    const v = JSON.parse(localStorage.getItem(CLIENT_KEY) || 'null')
    return v && typeof v === 'object' ? v : null
  } catch {
    return null
  }
}

export function saveClient(data) {
  try { localStorage.setItem(CLIENT_KEY, JSON.stringify({ ...data, at: Date.now() })) } catch { /* stockage indisponible */ }
}

export function forgetClient() {
  try { localStorage.removeItem(CLIENT_KEY) } catch { /* stockage indisponible */ }
}
