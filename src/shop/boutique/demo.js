// Données factices de la boutique — DÉVELOPPEMENT LOCAL SEULEMENT.
// Chargé par api.js derrière import.meta.env.DEV : jamais présent dans le
// build de production. Réglages par l'adresse :
//   ?demo=1                     vitrine complète, devis 1 500 F depuis Médina
//   &accent=emerald             couleur d'accent (dem, ocean, emerald, terracotta,
//                               gold, rose, violet, charcoal)
//   &layout=list                catalogue en liste
//   &paused=1                   boutique en pause
//   &closed=1                   boutique fermée (horaires)
//   &nobanner=1                 sans bannière (bandeau sombre DEM)
//   &outzone=1                  devis : hors zone
//   &nopickup=1                 pas de point de retrait (prix fixé par la boutique)
//   &pay=now | &pay=delivery    un seul mode de paiement accepté
const IMG = (id, w = 900) => `https://images.unsplash.com/${id}?w=${w}&auto=format&fit=crop&q=75`

const PHOTOS = [
  IMG('photo-1617627143750-d86bc21e42bb'),
  IMG('photo-1590874103328-eac38a683ce7'),
  null,
  IMG('photo-1601924994987-69e26d50dc26'),
  null,
]

export function demoMerchant(raw, params) {
  const pay = params.get('pay')
  const today = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getUTCDay()]
  const hours = {
    mon: [['09:00', '20:00']], tue: [['09:00', '20:00']], wed: [['09:00', '20:00']],
    thu: [['09:00', '20:00']], fri: [['09:00', '13:00'], ['15:00', '20:00']], sat: [['10:00', '18:00']],
  }
  if (params.has('closed')) delete hours[today]
  else hours[today] = [['00:00', '23:59']]
  return {
    ...raw,
    prepaid: pay !== 'delivery',
    paymentOptions: {
      payNow: pay !== 'delivery',
      payOnDelivery: pay !== 'now',
      onDeliveryOnline: true,
      onDeliveryCash: false,
    },
    hasDefaultPickup: !params.has('nopickup'),
    pickupArea: params.has('nopickup') ? null : 'Medina',
    shop: {
      banner: params.has('nobanner') ? null : IMG('photo-1558769132-cb1aea458c5e', 1800),
      tagline: 'Wax, bazin et broderies faits main à Dakar',
      description: 'Robes, boubous et accessoires cousus dans notre atelier de la Médina. Chaque pièce est unique : tissus choisis au marché HLM, finitions à la main. Retouches offertes sur demande.',
      area: 'Médina',
      accent: params.get('accent') || 'terracotta',
      hours,
      open: !params.has('paused'),
      pauseMessage: params.has('paused') ? 'Nous sommes en congés jusqu\'au lundi 24 novembre. Merci de votre patience !' : null,
      announcement: 'Livraison offerte dès 50 000 F d\'achat ce week-end',
      whatsapp: { number: '+221771234567', url: 'https://wa.me/221771234567' },
      social: {
        instagram: { handle: 'awamode.dakar', url: 'https://www.instagram.com/awamode.dakar' },
        tiktok: { handle: 'awamode', url: 'https://www.tiktok.com/@awamode' },
      },
      featuredProductIds: [],
      layout: params.get('layout') === 'list' ? 'list' : 'grid',
    },
  }
}

export function demoProducts(list) {
  return list.map((p, i) => ({
    ...p,
    image: p.image ?? PHOTOS[i % PHOTOS.length],
    description: i === 0 ? 'Robe longue en wax 100 % coton, coupe évasée, manches trois-quarts. Taille unique ajustable (du 38 au 44).' : p.description,
    quantity: i === 4 ? 0 : i === 1 ? 3 : p.quantity,
    featured: i < 2,
    featuredRank: i < 2 ? i + 1 : null,
  }))
}

// Devis : 1 500 F depuis la Médina
export async function demoQuote(lat, lng, params) {
  await new Promise(r => setTimeout(r, 450))
  if (params.has('outzone')) return { status: 'out-of-zone', message: 'Cette adresse est hors de la zone de livraison de DEM.' }
  if (params.has('nopickup')) return { status: 'no-pickup' }
  return { status: 'ok', quote: { total: 1500, price: 1300, demFee: 200, distanceKm: 3.2, pickupArea: 'Médina' } }
}

// Envoi simulé : rien ne part au serveur en démonstration
export async function demoSubmit(body) {
  await new Promise(r => setTimeout(r, 700))
  return {
    ok: true,
    data: { id: null, paymentTiming: body.paymentTiming, awaitingPayment: false, demo: true },
  }
}
