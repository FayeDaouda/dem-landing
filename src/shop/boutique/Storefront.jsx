import { useState } from 'react'
import { Link } from 'react-router-dom'
import wordmark from '../../assets/dem-wordmark-white.svg'
import { Icon, initials } from '../ui.jsx'

// Vitrine de la boutique et cadre DEM (en-tête, confiance, pied de page).
// Le cadre reste aux couleurs DEM ; la vitrine prend l'accent de la boutique.

// ── Icônes de marque (pleines) ───────────────────────────────────────────────
const BRAND = {
  whatsapp: 'M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 012.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 00-3.48-8.41z',
  tiktok: 'M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  facebook: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z',
}

function BrandIcon({ name, size = 18 }) {
  if (name === 'instagram') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BRAND[name]} />
    </svg>
  )
}

// ── En-tête DEM (fixe) ───────────────────────────────────────────────────────
export function TopBar({ merchant, showMerchant }) {
  const mini = showMerchant && merchant
  return (
    <header className="bq-top">
      <div className="bq-top-inner">
        <div className="bq-top-lead">
          <Link to="/" className={`bq-top-brand ${mini ? 'is-hidden' : ''}`} aria-label="DEM — accueil" tabIndex={mini ? -1 : undefined}>
            <img src={wordmark} alt="" width="66" height="22" />
            <span className="bq-top-tag">Boutique</span>
          </Link>
          {merchant && (
            <span className={`bq-top-shop ${mini ? '' : 'is-hidden'}`} aria-hidden={mini ? undefined : 'true'}>
              <ShopLogo merchant={merchant} size={28} />
              <b>{merchant.name}</b>
            </span>
          )}
        </div>
        <span className="bq-top-secure"><Icon name="lock" size={13} /> <span>Commande sécurisée</span></span>
      </div>
    </header>
  )
}

export function ShopLogo({ merchant, size }) {
  const [failed, setFailed] = useState(false)
  const style = size ? { width: size, height: size, fontSize: Math.round(size * 0.36) } : undefined
  return (
    <span className="bq-logo" style={style} aria-hidden="true">
      {merchant.avatar && !failed
        ? <img src={merchant.avatar} alt="" onError={() => setFailed(true)} />
        : <span>{initials(merchant.name)}</span>}
    </span>
  )
}

// ── Vitrine ──────────────────────────────────────────────────────────────────
export function Vitrine({ merchant, status, compact, idRef }) {
  const { shop } = merchant
  const [more, setMore] = useState(false)
  const wa = shop.whatsappUrl
    ? `${shop.whatsappUrl}?text=${encodeURIComponent(`Bonjour ${merchant.name}, je vous contacte depuis votre boutique en ligne DEM.`)}`
    : null
  const socials = ['instagram', 'tiktok', 'facebook']
    .map(kind => ({ kind, url: shop.socials?.[kind] }))
    .filter(s => s.url)
  const longDesc = (shop.description || '').length > 160

  if (compact) {
    return (
      <div className="bq-compact" ref={idRef}>
        <div className="bq-wrap bq-compact-inner">
          <ShopLogo merchant={merchant} size={44} />
          <div style={{ minWidth: 0 }}>
            <p className="bq-compact-name">{merchant.name}</p>
            <span className="bq-partner"><Icon name="shield" size={13} /> Partenaire DEM Pro</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bq-vitrine" aria-label={`Boutique ${merchant.name}`}>
      <div className={`bq-cover ${shop.bannerUrl ? 'has-photo' : ''}`}>
        {shop.bannerUrl ? (
          <img src={shop.bannerUrl} alt="" fetchpriority="high" decoding="async" />
        ) : (
          <div className="bq-pills" aria-hidden="true"><span /><span /><span /><span /></div>
        )}
      </div>

      <div className="bq-wrap bq-id" ref={idRef}>
        <div className="bq-id-row">
          <ShopLogo merchant={merchant} />
          {(wa || socials.length > 0) && (
            <div className="bq-contact">
              {wa && (
                <a className="bq-wa" href={wa} target="_blank" rel="noopener noreferrer">
                  <BrandIcon name="whatsapp" size={17} /> <span>WhatsApp</span>
                </a>
              )}
              {socials.map(s => (
                <a key={s.kind} className="bq-iconbtn is-outline" href={s.url} target="_blank" rel="noopener noreferrer"
                  aria-label={`${s.kind[0].toUpperCase()}${s.kind.slice(1)} de ${merchant.name}`}>
                  <BrandIcon name={s.kind} size={17} />
                </a>
              ))}
            </div>
          )}
        </div>

        <p className="bq-eyebrow"><span aria-hidden="true" />Boutique en ligne{shop.area ? ` · ${shop.area}` : ''}</p>
        <h1 className="bq-shop-name">{merchant.name}</h1>
        <div className="bq-badges">
          {/* Compte DEM Pro validé par l'équipe DEM — pas une vérification
              d'identité : « partenaire », pas « vérifié » */}
          <span className="bq-partner"><Icon name="shield" size={14} /> Partenaire DEM Pro</span>
          {status && (
            <span className={`bq-status ${status.open ? 'is-open' : 'is-closed'}`}>
              <i aria-hidden="true" />{status.label}
            </span>
          )}
        </div>
        {shop.tagline && <p className="bq-tagline">{shop.tagline}</p>}
        {shop.description && (
          <div className="bq-desc">
            <p id="bq-desc" className={longDesc && !more ? 'is-clamped' : ''}>{shop.description}</p>
            {longDesc && (
              <button type="button" className="bq-textbtn" aria-expanded={more} aria-controls="bq-desc" onClick={() => setMore(m => !m)}>
                {more ? 'Réduire' : 'Lire la suite'}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export function Announcement({ text }) {
  if (!text) return null
  return (
    <div className="bq-wrap">
      <p className="bq-announce"><Icon name="megaphone" size={17} /><span>{text}</span></p>
    </div>
  )
}

// Rangée de confiance — cadre DEM
export function TrustRow({ paymentOptions }) {
  const payText = paymentOptions.payNow && !paymentOptions.payOnDelivery
    ? 'Paiement en ligne sécurisé'
    : paymentOptions.payNow
      ? 'En ligne ou à la livraison'
      : 'À l\'arrivée du coursier'
  return (
    <div className="bq-wrap">
      <ul className="bq-trust" aria-label="Garanties DEM">
        <li>
          <span className="bq-trust-ico bq-paymarks" aria-hidden="true"><i className="is-wave">W</i><i className="is-om">OM</i></span>
          <span><b>Wave · Orange Money</b><small>{payText}</small></span>
        </li>
        <li>
          <span className="bq-trust-ico" aria-hidden="true"><Icon name="bike" size={18} /></span>
          <span><b>Coursier DEM</b><small>Récupère et vous livre</small></span>
        </li>
        <li>
          <span className="bq-trust-ico" aria-hidden="true"><Icon name="route" size={18} /></span>
          <span><b>Suivi en direct</b><small>Sur votre téléphone</small></span>
        </li>
      </ul>
    </div>
  )
}

export function PausedNotice({ message }) {
  return (
    <div className="bq-wrap">
      <div className="bq-paused" role="status">
        <span className="bq-paused-ico" aria-hidden="true"><Icon name="pause" size={20} /></span>
        <div>
          <p className="bq-paused-title">Boutique en pause</p>
          <p className="bq-paused-text">{message || 'Les commandes en ligne sont suspendues pour le moment. Vous pouvez parcourir le catalogue ; revenez bientôt pour commander.'}</p>
        </div>
      </div>
    </div>
  )
}

export function VitrineSkeleton() {
  return (
    <section className="bq-vitrine" aria-busy="true" aria-label="Chargement de la boutique">
      <div className="bq-cover"><div className="bq-pills" aria-hidden="true"><span /><span /><span /><span /></div></div>
      <div className="bq-wrap bq-id">
        <div className="bq-id-row"><span className="bq-logo bq-skel" /></div>
        <div className="bq-skel" style={{ width: 180, height: 12, marginTop: 20 }} />
        <div className="bq-skel" style={{ width: '70%', maxWidth: 420, height: 34, marginTop: 14 }} />
        <div className="bq-skel" style={{ width: 160, height: 26, marginTop: 14 }} />
      </div>
    </section>
  )
}

export function NotFoundShop() {
  return (
    <main className="bq-wrap bq-notfound">
      <p className="bq-eyebrow"><span aria-hidden="true" />Lien de commande</p>
      <h1 className="bq-h1">Ce lien n'est plus disponible<span className="bq-dot">.</span></h1>
      <p className="bq-lead">La boutique est peut-être fermée pour le moment. Contactez directement le commerçant pour passer votre commande.</p>
      <Link to="/" className="bq-btn is-inline">Découvrir DEM <Icon name="arrowRight" size={18} /></Link>
    </main>
  )
}

// ── Pied de page DEM ─────────────────────────────────────────────────────────
export function ShopFooter({ padBottom }) {
  return (
    <footer className="bq-foot" style={padBottom ? { paddingBottom: `calc(${padBottom}px + env(safe-area-inset-bottom))` } : undefined}>
      <div className="bq-wrap bq-foot-inner">
        <div className="bq-foot-brand">
          <img src={wordmark} alt="DEM" width="72" height="24" loading="lazy" />
          <p>Boutique propulsée par DEM&nbsp;Pro. Livraison par les coursiers DEM, partout à Dakar.</p>
        </div>
        <nav className="bq-foot-links" aria-label="Liens DEM">
          <Link to="/dem-pro">Créer ma boutique</Link>
          <Link to="/terms">Conditions</Link>
          <Link to="/privacy">Confidentialité</Link>
        </nav>
      </div>
    </footer>
  )
}
