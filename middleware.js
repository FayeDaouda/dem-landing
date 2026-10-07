// Aperçu des liens partagés (WhatsApp, Facebook, Telegram, X…) — middleware
// Vercel, exécuté avant le site. Le site est une application d'une seule
// page : ses balises d'aperçu sont les mêmes partout (« DEM — Delivery
// Express Mobility »). Pour les ROBOTS d'aperçu seulement, on renvoie une
// page avec le nom et le logo du commerçant (lien de commande) ou un titre
// de suivi générique (aucune donnée de la commande). Les visiteurs, eux,
// passent sans détour : la fonction ne renvoie rien et Vercel sert le site.

export const config = { matcher: ['/commander/:path*', '/suivi/:path*'] }

const PREVIEW_BOTS = /facebookexternalhit|facebot|whatsapp|twitterbot|telegrambot|slackbot|linkedinbot|discordbot|skypeuripreview|snapchat|viber|pinterest|redditbot|embedly|applebot/i
const API_URL = process.env.VITE_API_URL || 'https://api.dem.sn'
const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

function page({ title, description, image, url }) {
  return new Response(`<!DOCTYPE html>
<html lang="fr"><head>
<meta charset="utf-8">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta property="og:site_name" content="DEM">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary">
</head><body><a href="${esc(url)}">${esc(title)}</a></body></html>`, {
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=600' },
  })
}

export default async function middleware(request) {
  if (!PREVIEW_BOTS.test(request.headers.get('user-agent') || '')) return
  try {
    const url = new URL(request.url)
    const [, section, id] = url.pathname.split('/')
    if (!ID_RE.test(id || '')) return
    const logo = `${url.origin}/logo.png`

    if (section === 'suivi') {
      return page({
        title: 'Suivez votre commande en direct',
        description: 'Étapes de la livraison et position du livreur en temps réel, sans application.',
        image: logo,
        url: url.href,
      })
    }

    const res = await fetch(`${API_URL}/public/dem-pro/${id}`, { signal: AbortSignal.timeout(2500) })
    if (!res.ok) return
    const merchant = await res.json()
    const name = merchant.businessName || 'Commerçant DEM'
    return page({
      title: `Commander chez ${name}`,
      description: 'Choisissez vos articles et payez à la réception. Livraison par DEM, suivie en direct.',
      image: /^https:\/\//.test(merchant.avatar || '') ? merchant.avatar : logo,
      url: url.href,
    })
  } catch {
    // Au moindre souci, le site normal (et son aperçu générique)
    return
  }
}
