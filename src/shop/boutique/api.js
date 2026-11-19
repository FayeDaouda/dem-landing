// Tous les appels réseau de la boutique publique (dem.sn/commander/:id), au
// même endroit : les noms du serveur peuvent encore bouger (branche
// dem-pro/lien-prix-livraison) — c'est ici, et seulement ici, qu'on les
// ajuste.
//
// Détection : chaque nouveauté n'est utilisée que si le serveur la renvoie.
//   - paymentOptions absent → règle d'avant (prepaid = payer maintenant
//     possible, paiement à la réception toujours possible) ;
//   - hasDefaultPickup absent → pas de devis de livraison (la boutique fixe
//     le prix à la validation, comme avant) ;
//   - shop absent → vitrine minimale (nom, logo, accent DEM).
import { API_URL } from '../ui.jsx'
import { ACCENTS, safeImage } from './format.js'

const PATHS = {
  merchant: id => `/public/dem-pro/${id}`,
  products: id => `/public/dem-pro/${id}/products`,
  // Contrat prévisionnel : /public/merchants/:id/delivery-quote ; la branche
  // serveur l'a posé sous /public/dem-pro/:id/delivery-quote.
  quote: id => `/public/dem-pro/${id}/delivery-quote`,
  order: id => `/public/dem-pro/${id}/order-requests`,
  autocomplete: '/public/places/autocomplete',
  placeDetails: '/public/places/details',
  reverse: '/public/places/reverse-geocode',
}

// ── Mode démonstration (développement local SEULEMENT) ───────────────────────
// ?demo=1 sur http://localhost : bannière, accent, horaires, devis… factices,
// pour voir la page avant que le serveur ne renvoie ces champs. En
// production, import.meta.env.DEV vaut false : le bloc et le module demo.js
// sont retirés du build.
async function demoModule() {
  if (import.meta.env.DEV) {
    const params = new URLSearchParams(window.location.search)
    // Chemin opaque pour Rollup : aucun fragment demo.js n'est émis au build
    // (le serveur de développement le sert tel quel)
    const path = ['/src/shop/boutique', 'demo.js'].join('/')
    if (params.has('demo')) return { ...(await import(/* @vite-ignore */ path)), params }
  }
  return null
}

async function getJson(path, init) {
  const res = await fetch(`${API_URL}${path}`, init)
  const data = await res.json().catch(() => ({}))
  return { res, data }
}

// ── Boutique ─────────────────────────────────────────────────────────────────
export async function fetchMerchant(merchantId) {
  const { res, data } = await getJson(PATHS.merchant(merchantId))
  if (!res.ok) {
    const err = new Error(data.message || 'not found')
    err.status = res.status
    throw err
  }
  const demo = await demoModule()
  return normalizeMerchant(demo ? demo.demoMerchant(data, demo.params) : data)
}

export function normalizeMerchant(raw) {
  const s = raw.shop && typeof raw.shop === 'object' ? raw.shop : {}
  const hasOptions = !!raw.paymentOptions && typeof raw.paymentOptions === 'object'
  const po = hasOptions ? raw.paymentOptions : null
  const paymentOptions = po
    ? {
      payNow: !!po.payNow,
      payOnDelivery: po.payOnDelivery !== false || !po.payNow,
      // À l'arrivée : en ligne (Wave / Orange Money) et/ou espèces. Absent →
      // les deux (le serveur trie).
      onDeliveryOnline: po.onDeliveryOnline ?? true,
      onDeliveryCash: po.onDeliveryCash ?? true,
    }
    : { payNow: !!raw.prepaid, payOnDelivery: true, onDeliveryOnline: true, onDeliveryCash: true }

  // shop.open === false : boutique EN PAUSE (page visible, commandes
  // refusées — 409 SHOP_PAUSED). Les horaires, eux, sont informatifs.
  const paused = s.open === false
  const social = s.social && typeof s.social === 'object' ? s.social : {}
  const link = v => (v && typeof v === 'object' ? safeHttps(v.url) : null)
  return {
    name: raw.businessName || 'Commerçant DEM',
    avatar: safeImage(raw.avatar),
    inAppPayment: !!raw.inAppPayment,
    deliveryZone: raw.deliveryZone ?? null,
    paymentOptions,
    legacyPayment: !hasOptions,
    // Devis de livraison disponible sur cette boutique (nouveau serveur)
    quoteSupported: Object.prototype.hasOwnProperty.call(raw, 'hasDefaultPickup'),
    hasDefaultPickup: !!raw.hasDefaultPickup,
    // Quartier de départ affiché : celui choisi par la boutique d'abord (la
    // zone tarifaire du serveur peut être approximative)
    pickupArea: s.area || raw.pickupArea || null,
    shop: {
      bannerUrl: safeImage(s.banner),
      tagline: s.tagline || null,
      description: s.description || null,
      area: s.area || null,
      accent: ACCENTS[s.accent] ? s.accent : 'dem',
      hours: s.hours ?? null,
      paused,
      pausedMessage: paused ? s.pauseMessage || null : null,
      announcement: s.announcement || null,
      whatsappUrl: link(s.whatsapp),
      socials: {
        instagram: link(social.instagram),
        tiktok: link(social.tiktok),
        facebook: link(social.facebook),
      },
      featuredProductIds: Array.isArray(s.featuredProductIds) ? s.featuredProductIds : [],
      layout: s.layout === 'list' ? 'list' : 'grid',
    },
  }
}

const safeHttps = url => (typeof url === 'string' && /^https:\/\//i.test(url) ? url : null)

export async function fetchProducts(merchantId) {
  const { res, data } = await getJson(PATHS.products(merchantId))
  const list = res.ok && Array.isArray(data) ? data : []
  const demo = await demoModule()
  return demo ? demo.demoProducts(list) : list
}

// ── Devis de la livraison ────────────────────────────────────────────────────
// → { status: 'ok', quote: { total, price, demFee, distanceKm, pickupArea } }
//   | { status: 'no-pickup' }            pas de point de retrait par défaut
//   | { status: 'out-of-zone', message }
//   | { status: 'error', message }       réseau, limite de débit…
export async function fetchDeliveryQuote(merchantId, lat, lng, signal) {
  const demo = await demoModule()
  if (demo) return demo.demoQuote(lat, lng, demo.params)
  try {
    const q = `?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`
    const { res, data } = await getJson(`${PATHS.quote(merchantId)}${q}`, { signal })
    if (res.ok) {
      if (data.available === false || data.total == null) return { status: 'no-pickup' }
      return {
        status: 'ok',
        quote: {
          total: Math.round(Number(data.total)),
          price: data.price ?? null,
          demFee: data.demFee ?? null,
          distanceKm: data.distanceKm ?? null,
          pickupArea: data.pickupArea || null,
        },
      }
    }
    if (data.code === 'OUT_OF_ZONE' || res.status === 422) {
      return { status: 'out-of-zone', message: data.message || 'Cette adresse est hors de la zone de livraison.' }
    }
    if (res.status === 400 && /zone/i.test(data.message || '')) {
      return { status: 'out-of-zone', message: data.message }
    }
    return { status: 'error', message: data.message || 'Prix de la livraison indisponible pour le moment.' }
  } catch (err) {
    if (err?.name === 'AbortError') throw err
    return { status: 'error', message: 'Connexion impossible. Vérifiez votre réseau.' }
  }
}

// ── Envoi de la commande ─────────────────────────────────────────────────────
// → { ok: true, data } | { ok: false, status, code, message, data }
export async function submitOrder(merchantId, body) {
  const demo = await demoModule()
  if (demo) return demo.demoSubmit(body)
  try {
    const { res, data } = await getJson(PATHS.order(merchantId), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (res.ok) return { ok: true, data }
    return {
      ok: false,
      status: res.status,
      code: data.code || null,
      message: data.message || 'Impossible d\'envoyer votre commande. Réessayez.',
      data,
    }
  } catch {
    return { ok: false, status: 0, code: 'NETWORK', message: 'Connexion impossible. Vérifiez votre réseau et réessayez.', data: {} }
  }
}

// ── Adresses (recherche, détails, adresse d'un point) ─────────────────────────
export async function placesAutocomplete(input, sessionToken) {
  const { data } = await getJson(`${PATHS.autocomplete}?input=${encodeURIComponent(input)}&sessionToken=${sessionToken}`)
  return data.predictions || []
}

export async function placeDetails(placeId, sessionToken) {
  const { data } = await getJson(`${PATHS.placeDetails}?placeId=${encodeURIComponent(placeId)}&sessionToken=${sessionToken}`)
  return data
}

export async function reverseGeocode(lat, lng) {
  try {
    const { data } = await getJson(`${PATHS.reverse}?lat=${lat}&lng=${lng}`)
    return data.address || null
  } catch {
    return null
  }
}
