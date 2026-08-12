import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.dem.sn'

const C = {
  cyan: '#00D2FF',
  cyan2: '#0086C8',
  danger: '#FF5C5C',
  success: '#00E08C',
}

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  padding: '14px 16px',
  fontSize: 15,
  color: '#fff',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
}

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'rgba(255,255,255,0.7)',
  marginBottom: 8,
}

const sectionCardStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 16,
  padding: '20px 20px',
  marginBottom: 20,
}

const sectionTitleStyle = {
  fontSize: 15,
  fontWeight: 800,
  color: '#fff',
  marginBottom: 14,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.cyan }}> *</span>}</label>
      {children}
    </div>
  )
}

function formatFcfa(n) {
  return `${Math.round(n).toLocaleString('fr-FR')} FCFA`
}

// ── Vignette produit — image si le commerçant en a mis une, sinon une icône
// générique (jamais bloquant : la photo est optionnelle côté DEM Pro).
function ProductThumb({ url, size = 44 }) {
  const [failed, setFailed] = useState(false)
  const base = {
    width: size, height: size, borderRadius: 10, flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }
  if (!url || failed) {
    return (
      <div style={{ ...base, background: 'rgba(0,210,255,0.10)', fontSize: size * 0.45 }}>
        🛍️
      </div>
    )
  }
  return (
    <img
      src={url}
      alt=""
      onError={() => setFailed(true)}
      style={{ ...base, objectFit: 'cover' }}
    />
  )
}

const newSessionToken = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

// ── Bannière "Ouvrir dans l'app" ────────────────────────────────────────────
// Lien personnalisé (pas de vrai lien universel https pour l'instant) —
// propose l'ouverture au tap, échoue silencieusement si l'app n'est pas
// installée (compromis accepté, aucune détection d'installation possible
// sans tooling supplémentaire).
function OpenInAppBanner({ merchantId }) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(/android|iphone|ipad|ipod/i.test(navigator.userAgent))
  }, [])
  if (!isMobile) return null
  return (
    <a
      href={`dem://commander/${merchantId}`}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: 'rgba(0,210,255,0.12)', borderBottom: '1px solid rgba(0,210,255,0.25)',
        color: '#fff', textDecoration: 'none', padding: '12px 16px', fontSize: 13.5, fontWeight: 700,
      }}
    >
      📱 Ouvrir dans l'app DEM
    </a>
  )
}

// ── Catalogue ────────────────────────────────────────────────────────────────
function ProductCatalogue({ products, cart, onChangeQty }) {
  const grouped = useMemo(() => {
    const map = new Map()
    for (const p of products) {
      const key = p.category?.trim() || 'Autres produits'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(p)
    }
    const keys = [...map.keys()].sort((a, b) => {
      if (a === 'Autres produits') return 1
      if (b === 'Autres produits') return -1
      return a.localeCompare(b)
    })
    return keys.map(k => [k, map.get(k)])
  }, [products])

  if (products.length === 0) {
    return (
      <div style={{ ...sectionCardStyle }}>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Ce commerçant n'a pas encore de produits dans son catalogue.
        </p>
      </div>
    )
  }

  return (
    <div style={sectionCardStyle}>
      <div style={sectionTitleStyle}>🛍️ Catalogue</div>
      {grouped.map(([category, items]) => (
        <div key={category} style={{ marginBottom: 16 }}>
          {grouped.length > 1 && (
            <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, marginBottom: 8 }}>
              {category.toUpperCase()}
            </p>
          )}
          {items.map(p => {
            const qty = cart[p.id] || 0
            const atMax = p.quantity != null && qty >= p.quantity
            return (
              <div
                key={p.id}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <ProductThumb url={p.image} />
                <div style={{ minWidth: 0, flex: 1, margin: '0 12px' }}>
                  <p style={{ fontSize: 14.5, fontWeight: 600, color: '#fff', margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: '2px 0 0' }}>
                    {p.defaultPrice != null ? formatFcfa(p.defaultPrice) : 'Prix sur demande'}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => onChangeQty(p.id, Math.max(0, qty - 1))}
                    disabled={qty === 0}
                    style={qtyBtnStyle(qty === 0)}
                  >−</button>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', minWidth: 16, textAlign: 'center' }}>{qty}</span>
                  <button
                    type="button"
                    onClick={() => onChangeQty(p.id, qty + 1)}
                    disabled={atMax}
                    style={qtyBtnStyle(atMax)}
                  >+</button>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function qtyBtnStyle(disabled) {
  return {
    width: 30, height: 30, borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
    background: disabled ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.1)',
    color: disabled ? 'rgba(255,255,255,0.3)' : '#fff',
    fontSize: 16, fontWeight: 700, cursor: disabled ? 'default' : 'pointer',
  }
}

// ── Panier ───────────────────────────────────────────────────────────────────
function CartSummary({ items, total, onChangeQty }) {
  if (items.length === 0) return null
  return (
    <div style={sectionCardStyle}>
      <div style={sectionTitleStyle}>🧺 Votre panier</div>
      {items.map(item => (
        <div key={item.productId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
          <ProductThumb url={item.image} size={32} />
          <div style={{ minWidth: 0, flex: 1, margin: '0 12px' }}>
            <p style={{ fontSize: 14, color: '#fff', margin: 0 }}>{item.name} × {item.quantity}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)' }}>{formatFcfa(item.price * item.quantity)}</span>
            <button
              type="button"
              onClick={() => onChangeQty(item.productId, 0)}
              style={{ background: 'none', border: 'none', color: C.danger, fontSize: 16, cursor: 'pointer', padding: 4 }}
              aria-label="Retirer"
            >✕</button>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Total</span>
        <span style={{ fontSize: 17, fontWeight: 800, color: C.cyan }}>{formatFcfa(total)}</span>
      </div>
    </div>
  )
}

// ── Adresse (GPS ou saisie + suggestions) ────────────────────────────────────
function AddressStep({ address, onAddressChange, onSelectPlace, onUseGps, gpsLoading }) {
  const [query, setQuery] = useState(address)
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const sessionToken = useRef(newSessionToken())
  const debounceRef = useRef(null)

  useEffect(() => setQuery(address), [address])

  function handleChange(v) {
    setQuery(v)
    onAddressChange(v)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (v.trim().length < 3) { setSuggestions([]); setOpen(false); return }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_URL}/public/places/autocomplete?input=${encodeURIComponent(v)}&sessionToken=${sessionToken.current}`,
        )
        const data = await res.json()
        setSuggestions(data.predictions || [])
        setOpen(true)
      } catch {
        setSuggestions([])
      }
    }, 350)
  }

  async function pick(prediction) {
    setOpen(false)
    setQuery(prediction.description)
    onAddressChange(prediction.description)
    try {
      const res = await fetch(
        `${API_URL}/public/places/details?placeId=${prediction.place_id}&sessionToken=${sessionToken.current}`,
      )
      const data = await res.json()
      if (data.lat != null && data.lng != null) {
        onSelectPlace({ address: data.address || prediction.description, lat: data.lat, lng: data.lng })
      }
    } catch {
      // best-effort — l'adresse texte reste renseignée même si la résolution échoue
    }
    sessionToken.current = newSessionToken()
  }

  return (
    <div style={sectionCardStyle}>
      <div style={sectionTitleStyle}>📍 Adresse de livraison</div>
      <button
        type="button"
        onClick={onUseGps}
        disabled={gpsLoading}
        style={{
          width: '100%', marginBottom: 14, padding: '12px 16px', borderRadius: 12,
          border: '1px solid rgba(0,210,255,0.3)', background: 'rgba(0,210,255,0.08)',
          color: C.cyan, fontSize: 14, fontWeight: 700, cursor: gpsLoading ? 'default' : 'pointer',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {gpsLoading ? 'Localisation…' : '📡 Utiliser ma position actuelle'}
      </button>
      <div style={{ position: 'relative' }}>
        <input
          style={inputStyle}
          value={query}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder="Quartier, rue, numéro…"
        />
        {open && suggestions.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, zIndex: 10,
            background: '#0A2233', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12,
            overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            {suggestions.map(s => (
              <div
                key={s.place_id}
                onClick={() => pick(s)}
                style={{ padding: '12px 16px', fontSize: 13.5, color: '#fff', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                {s.description}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Mode de paiement ─────────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Espèces', emoji: '💵' },
  { value: 'WAVE', label: 'Wave', emoji: '🌊' },
  { value: 'ORANGE_MONEY', label: 'Orange Money', emoji: '🟠' },
  { value: 'FREE_MONEY', label: 'Free Money', emoji: '🔵' },
]

function PaymentMethodStep({ value, onChange }) {
  return (
    <div style={sectionCardStyle}>
      <div style={sectionTitleStyle}>💳 Mode de paiement à la livraison</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {PAYMENT_METHODS.map(m => {
          const active = value === m.value
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => onChange(m.value)}
              style={{
                padding: '14px 12px', borderRadius: 12, cursor: 'pointer',
                border: active ? `1.5px solid ${C.cyan}` : '1px solid rgba(255,255,255,0.12)',
                background: active ? 'rgba(0,210,255,0.12)' : 'rgba(255,255,255,0.04)',
                color: '#fff', fontSize: 14, fontWeight: 700, fontFamily: "'Inter', sans-serif",
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span>{m.emoji}</span>{m.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Écran principal ───────────────────────────────────────────────────────────
export default function OrderRequest() {
  const { merchantId } = useParams()

  const [merchant, setMerchant] = useState(null)
  const [loadState, setLoadState] = useState('loading') // loading | ready | notfound

  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({}) // { [productId]: quantity }

  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryLat, setDeliveryLat] = useState(null)
  const [deliveryLng, setDeliveryLng] = useState(null)
  const [gpsLoading, setGpsLoading] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState('CASH')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [landmark, setLandmark] = useState('')
  const [notes, setNotes] = useState('')
  const [website, setWebsite] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}/public/dem-pro/${merchantId}`)
      .then(res => { if (!res.ok) throw new Error('not found'); return res.json() })
      .then(data => { if (!cancelled) { setMerchant(data); setLoadState('ready') } })
      .catch(() => { if (!cancelled) setLoadState('notfound') })
    return () => { cancelled = true }
  }, [merchantId])

  useEffect(() => {
    if (loadState !== 'ready') return
    fetch(`${API_URL}/public/dem-pro/${merchantId}/products`)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
  }, [loadState, merchantId])

  const productsById = useMemo(() => new Map(products.map(p => [p.id, p])), [products])

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([productId, quantity]) => {
        const p = productsById.get(productId)
        return p ? { productId, name: p.name, price: p.defaultPrice ?? 0, quantity, image: p.image } : null
      })
      .filter(Boolean)
  }, [cart, productsById])

  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

  function changeQty(productId, qty) {
    setCart(prev => ({ ...prev, [productId]: qty }))
  }

  function useGps() {
    if (!navigator.geolocation) return
    setGpsLoading(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        setDeliveryLat(pos.coords.latitude)
        setDeliveryLng(pos.coords.longitude)
        setDeliveryAddress('Position GPS actuelle')
        setGpsLoading(false)
      },
      () => setGpsLoading(false),
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  function selectPlace({ address, lat, lng }) {
    setDeliveryAddress(address)
    setDeliveryLat(lat)
    setDeliveryLng(lng)
  }

  const canSubmit = deliveryAddress.trim().length >= 4 && cartItems.length > 0 && !submitting

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch(`${API_URL}/public/dem-pro/${merchantId}/order-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim() || undefined,
          customerPhone: customerPhone.trim() || undefined,
          deliveryAddress: deliveryAddress.trim(),
          deliveryLatitude: deliveryLat ?? undefined,
          deliveryLongitude: deliveryLng ?? undefined,
          landmark: landmark.trim() || undefined,
          notes: notes.trim() || undefined,
          items: cartItems.map(i => ({ productId: i.productId, quantity: i.quantity })),
          customerPaymentMethod: paymentMethod,
          website,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || "Impossible d'envoyer votre demande. Réessayez.")
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#021520', color: 'rgba(255,255,255,0.85)', minHeight: '100vh' }}>
      {loadState === 'ready' && <OpenInAppBanner merchantId={merchantId} />}

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #00D2FF 0%, #0086C8 55%, #005A8C 100%)',
        padding: '40px 24px 36px', textAlign: 'center',
      }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20, textDecoration: 'none' }}>
          <img src="/logo.png" alt="DEM" style={{ width: 36, height: 36, borderRadius: 9 }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 700, letterSpacing: 1.2 }}>DELIVERY EXPRESS MOBILITY</span>
        </Link>

        {loadState === 'ready' && (
          <>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>Commander chez</p>
            <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', fontWeight: 900, color: '#fff', margin: 0 }}>
              {merchant.businessName}
            </h1>
          </>
        )}
        {loadState === 'loading' && (
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Chargement…</h1>
        )}
        {loadState === 'notfound' && (
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: 0 }}>Lien introuvable</h1>
        )}
      </div>

      {/* Contenu */}
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '36px 20px 80px' }}>

        {loadState === 'notfound' && (
          <div style={{
            background: 'rgba(255,92,92,0.08)', border: '1px solid rgba(255,92,92,0.25)',
            borderRadius: 16, padding: '24px 28px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              Ce lien de commande n'est plus disponible. Il a peut-être expiré, le compte n'est plus actif,
              ou n'est pas (ou plus) sur un plan payant. Contactez directement le commerçant pour passer votre commande.
            </p>
          </div>
        )}

        {loadState === 'ready' && !submitted && (
          <form onSubmit={handleSubmit}>
            <ProductCatalogue products={products} cart={cart} onChangeQty={changeQty} />
            <CartSummary items={cartItems} total={cartTotal} onChangeQty={changeQty} />

            <AddressStep
              address={deliveryAddress}
              onAddressChange={setDeliveryAddress}
              onSelectPlace={selectPlace}
              onUseGps={useGps}
              gpsLoading={gpsLoading}
            />

            <div style={sectionCardStyle}>
              <Field label="Repère (optionnel)">
                <input
                  style={inputStyle}
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="Ex: face à la pharmacie, portail bleu…"
                />
              </Field>
              <Field label="Instructions pour le livreur (optionnel)">
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 60, fontFamily: "'Inter', sans-serif" }}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Ex: m'appeler à l'arrivée…"
                />
              </Field>
            </div>

            <PaymentMethodStep value={paymentMethod} onChange={setPaymentMethod} />

            <div style={sectionCardStyle}>
              <div style={sectionTitleStyle}>👤 Vos coordonnées (optionnel)</div>
              <Field label="Votre nom">
                <input
                  style={inputStyle}
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Prénom Nom"
                  autoComplete="name"
                />
              </Field>
              <Field label="Votre téléphone">
                <input
                  style={inputStyle}
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="77 000 00 00"
                  type="tel"
                  autoComplete="tel"
                />
              </Field>
            </div>

            {/* Honeypot — masqué visuellement et hors du parcours clavier, jamais rempli par un humain */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor="website">Ne pas remplir</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
            </div>

            {submitError && (
              <div style={{
                background: 'rgba(255,92,92,0.1)', border: '1px solid rgba(255,92,92,0.3)',
                borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13.5, color: '#FFB3B3',
              }}>
                {submitError}
              </div>
            )}
            {!canSubmit && !submitting && (
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 12 }}>
                {cartItems.length === 0 ? 'Choisissez au moins un produit' : "Renseignez l'adresse de livraison"}
              </p>
            )}

            <button
              type="submit"
              disabled={!canSubmit}
              style={{
                width: '100%',
                background: canSubmit ? `linear-gradient(135deg, ${C.cyan}, ${C.cyan2})` : 'rgba(255,255,255,0.08)',
                color: canSubmit ? '#021520' : 'rgba(255,255,255,0.4)',
                border: 'none',
                borderRadius: 14,
                padding: '16px',
                fontSize: 15,
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                marginTop: 8,
              }}
            >
              {submitting ? 'Envoi en cours…' : cartTotal > 0 ? `Envoyer ma demande — ${formatFcfa(cartTotal)}` : 'Envoyer ma demande'}
            </button>
          </form>
        )}

        {submitted && (
          <div style={{
            background: 'rgba(0,224,140,0.08)', border: '1px solid rgba(0,224,140,0.25)',
            borderRadius: 16, padding: '32px 28px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Demande envoyée !</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              {merchant.businessName} va confirmer votre commande. Un livreur DEM viendra récupérer et vous livrer votre colis.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 24px', textAlign: 'center',
        color: 'rgba(255,255,255,0.35)', fontSize: 13, background: '#010E18',
      }}>
        <p>© {new Date().getFullYear()} DEM — Delivery Express Mobility &nbsp;|&nbsp;
          <Link to="/" style={{ color: C.cyan }}>dem.sn</Link>
        </p>
      </div>
    </div>
  )
}
