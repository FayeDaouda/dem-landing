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

const primaryBtnStyle = (enabled) => ({
  width: '100%',
  background: enabled ? `linear-gradient(135deg, ${C.cyan}, ${C.cyan2})` : 'rgba(255,255,255,0.08)',
  color: enabled ? '#021520' : 'rgba(255,255,255,0.4)',
  border: 'none',
  borderRadius: 14,
  padding: '16px',
  fontSize: 15,
  fontWeight: 800,
  fontFamily: "'Inter', sans-serif",
  cursor: enabled ? 'pointer' : 'not-allowed',
})

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

// Mêmes préfixes que isValidSenegalMobile côté app (senegal_phone.dart) —
// Orange (77/78), Free (76/75), Expresso (70), 9 chiffres sans le +221.
function isValidSenegalMobile(digits) {
  return /^(70|75|76|77|78)\d{7}$/.test(digits)
}

const newSessionToken = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

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

// ── Indicateur de progression (4 étapes) ────────────────────────────────────
const STEP_LABELS = ['Catalogue', 'Adresse', 'Paiement', 'Résumé']

function StepIndicator({ step, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          aria-label="Retour"
          style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0, cursor: 'pointer',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
          {[1, 2, 3, 4].map(n => (
            <div
              key={n}
              style={{
                flex: 1, height: 4, borderRadius: 2,
                background: n <= step ? C.cyan : 'rgba(255,255,255,0.12)',
              }}
            />
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, fontWeight: 600 }}>
          Étape {step}/4 — {STEP_LABELS[step - 1]}
        </p>
      </div>
    </div>
  )
}

// ── Étape 1 : Catalogue ──────────────────────────────────────────────────────
function CatalogueStep({ products, cart, cartItems, cartTotal, onChangeQty, onNext }) {
  const categories = useMemo(() => {
    const set = new Set()
    for (const p of products) {
      const cat = p.category?.trim()
      if (cat) set.add(cat)
    }
    return [...set].sort()
  }, [products])

  const [selected, setSelected] = useState('Tous')
  const visibleProducts = selected === 'Tous'
    ? products
    : products.filter(p => (p.category?.trim() || 'Autres produits') === selected)

  const canNext = cartItems.length > 0

  return (
    <div>
      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>🛍️ Catalogue</div>

        {products.length === 0 ? (
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
            Ce commerçant n'a pas encore de produits dans son catalogue.
          </p>
        ) : (
          <>
            {categories.length > 0 && (
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, marginBottom: 4 }}>
                {['Tous', ...categories].map(cat => {
                  const active = selected === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelected(cat)}
                      style={{
                        flexShrink: 0, padding: '8px 14px', borderRadius: 20, cursor: 'pointer',
                        border: active ? `1.5px solid ${C.cyan}` : '1px solid rgba(255,255,255,0.14)',
                        background: active ? 'rgba(0,210,255,0.14)' : 'rgba(255,255,255,0.04)',
                        color: active ? C.cyan : 'rgba(255,255,255,0.7)',
                        fontSize: 13, fontWeight: 700, fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap',
                      }}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            )}

            <div style={{ maxHeight: '55vh', overflowY: 'auto', paddingRight: 4 }}>
              {visibleProducts.map(p => {
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
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', marginBottom: 14, borderRadius: 12,
          background: 'rgba(0,210,255,0.08)', border: '1px solid rgba(0,210,255,0.2)',
        }}>
          <span style={{ fontSize: 13.5, color: '#fff', fontWeight: 600 }}>
            {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color: C.cyan }}>{formatFcfa(cartTotal)}</span>
        </div>
      )}

      <button type="button" disabled={!canNext} onClick={onNext} style={primaryBtnStyle(canNext)}>
        Choisir l'adresse
      </button>
      {!canNext && (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 12 }}>
          Choisissez au moins un produit
        </p>
      )}
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

// ── Étape 2 : Adresse (GPS ou saisie + suggestions) ──────────────────────────
function AddressStep({ address, onAddressChange, onSelectPlace, onUseGps, gpsLoading, gpsError, onNext }) {
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

  const canNext = address.trim().length >= 4

  return (
    <div>
      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>📍 Adresse de livraison</div>
        <button
          type="button"
          onClick={onUseGps}
          disabled={gpsLoading}
          style={{
            width: '100%', marginBottom: 8, padding: '12px 16px', borderRadius: 12,
            border: '1px solid rgba(0,210,255,0.3)', background: 'rgba(0,210,255,0.08)',
            color: C.cyan, fontSize: 14, fontWeight: 700, cursor: gpsLoading ? 'default' : 'pointer',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {gpsLoading ? 'Localisation…' : '📡 Utiliser ma position actuelle'}
        </button>
        {gpsError && (
          <p style={{ fontSize: 12.5, color: C.danger, margin: '0 0 14px' }}>{gpsError}</p>
        )}
        <div style={{ position: 'relative', marginTop: gpsError ? 0 : 6 }}>
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

      <button type="button" disabled={!canNext} onClick={onNext} style={primaryBtnStyle(canNext)}>
        Continuer
      </button>
      {!canNext && (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 12 }}>
          Renseignez l'adresse de livraison
        </p>
      )}
    </div>
  )
}

// ── Étape 3 : Mode de paiement + coordonnées ─────────────────────────────────
const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Espèces', emoji: '💵' },
  { value: 'WAVE', label: 'Wave', emoji: '🌊' },
  { value: 'ORANGE_MONEY', label: 'Orange Money', emoji: '🟠' },
  { value: 'FREE_MONEY', label: 'Free Money', emoji: '🔵' },
]

function PaymentStep({
  paymentMethod, onChangePaymentMethod,
  landmark, onChangeLandmark, notes, onChangeNotes,
  customerName, onChangeName, customerPhone, onChangePhone,
  onNext,
}) {
  const phoneDigits = customerPhone.replace(/\D/g, '')
  const phoneValid = isValidSenegalMobile(phoneDigits)
  const canNext = phoneValid

  return (
    <div>
      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>💳 Mode de paiement à la livraison</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {PAYMENT_METHODS.map(m => {
            const active = paymentMethod === m.value
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => onChangePaymentMethod(m.value)}
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

      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>📦 Repère &amp; instructions</div>
        <Field label="Repère (optionnel)">
          <input
            style={inputStyle}
            value={landmark}
            onChange={e => onChangeLandmark(e.target.value)}
            placeholder="Ex: face à la pharmacie, portail bleu…"
          />
        </Field>
        <div style={{ marginBottom: 0 }}>
          <label style={labelStyle}>Instructions pour le livreur (optionnel)</label>
          <textarea
            style={{ ...inputStyle, resize: 'vertical', minHeight: 60, fontFamily: "'Inter', sans-serif" }}
            value={notes}
            onChange={e => onChangeNotes(e.target.value)}
            placeholder="Ex: m'appeler à l'arrivée…"
          />
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>👤 Vos coordonnées</div>
        <Field label="Votre nom (optionnel)">
          <input
            style={inputStyle}
            value={customerName}
            onChange={e => onChangeName(e.target.value)}
            placeholder="Prénom Nom"
            autoComplete="name"
          />
        </Field>
        <div style={{ marginBottom: 0 }}>
          <label style={labelStyle}>Votre téléphone<span style={{ color: C.cyan }}> *</span></label>
          <input
            style={inputStyle}
            value={customerPhone}
            onChange={e => onChangePhone(e.target.value)}
            placeholder="77 000 00 00"
            type="tel"
            autoComplete="tel"
          />
          {customerPhone.trim().length > 0 && !phoneValid && (
            <p style={{ fontSize: 12.5, color: C.danger, margin: '8px 0 0' }}>
              Numéro mobile invalide (7X XXX XX XX)
            </p>
          )}
        </div>
      </div>

      <button type="button" disabled={!canNext} onClick={onNext} style={primaryBtnStyle(canNext)}>
        Finaliser ma commande
      </button>
      {!canNext && (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 12 }}>
          Renseignez un numéro de téléphone valide
        </p>
      )}
    </div>
  )
}

// ── Étape 4 : Résumé ─────────────────────────────────────────────────────────
function ReviewStep({
  cartItems, cartTotal, deliveryAddress, landmark, notes,
  paymentMethod, customerName, customerPhone,
  submitting, submitError, onSubmit,
}) {
  const paymentLabel = PAYMENT_METHODS.find(m => m.value === paymentMethod)
  return (
    <div>
      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>🧺 Votre panier</div>
        {cartItems.map(item => (
          <div key={item.productId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
            <ProductThumb url={item.image} size={32} />
            <div style={{ minWidth: 0, flex: 1, margin: '0 12px' }}>
              <p style={{ fontSize: 14, color: '#fff', margin: 0 }}>{item.name} × {item.quantity}</p>
            </div>
            <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.7)' }}>{formatFcfa(item.price * item.quantity)}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Total</span>
          <span style={{ fontSize: 17, fontWeight: 800, color: C.cyan }}>{formatFcfa(cartTotal)}</span>
        </div>
      </div>

      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>📍 Livraison</div>
        <p style={{ fontSize: 14, color: '#fff', margin: 0 }}>{deliveryAddress}</p>
        {landmark && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '6px 0 0' }}>Repère : {landmark}</p>}
        {notes && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>Instructions : {notes}</p>}
      </div>

      <div style={sectionCardStyle}>
        <div style={sectionTitleStyle}>💳 Paiement &amp; contact</div>
        <p style={{ fontSize: 14, color: '#fff', margin: 0 }}>
          {paymentLabel?.emoji} {paymentLabel?.label} — à la livraison
        </p>
        {customerName && <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '8px 0 0' }}>{customerName}</p>}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>{customerPhone}</p>
      </div>

      {submitError && (
        <div style={{
          background: 'rgba(255,92,92,0.1)', border: '1px solid rgba(255,92,92,0.3)',
          borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: 13.5, color: '#FFB3B3',
        }}>
          {submitError}
        </div>
      )}

      <button type="button" disabled={submitting} onClick={onSubmit} style={primaryBtnStyle(!submitting)}>
        {submitting ? 'Envoi en cours…' : `Envoyer ma commande — ${formatFcfa(cartTotal)}`}
      </button>
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

  const [step, setStep] = useState(1)

  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryLat, setDeliveryLat] = useState(null)
  const [deliveryLng, setDeliveryLng] = useState(null)
  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState(null)

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
    if (!navigator.geolocation) {
      setGpsError("Votre navigateur ne permet pas la géolocalisation.")
      return
    }
    setGpsLoading(true)
    setGpsError(null)
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords
        setDeliveryLat(latitude)
        setDeliveryLng(longitude)
        try {
          const res = await fetch(`${API_URL}/public/places/reverse-geocode?lat=${latitude}&lng=${longitude}`)
          const data = await res.json()
          setDeliveryAddress(data.address || 'Position actuelle (coordonnées GPS)')
        } catch {
          setDeliveryAddress('Position actuelle (coordonnées GPS)')
        } finally {
          setGpsLoading(false)
        }
      },
      err => {
        setGpsLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError("Autorisez la localisation dans votre navigateur pour utiliser cette option.")
        } else if (err.code === err.TIMEOUT) {
          setGpsError("Délai dépassé — réessayez ou saisissez votre adresse.")
        } else {
          setGpsError("Position indisponible — saisissez votre adresse manuellement.")
        }
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  function selectPlace({ address, lat, lng }) {
    setDeliveryAddress(address)
    setDeliveryLat(lat)
    setDeliveryLng(lng)
    setGpsError(null)
  }

  async function handleSubmit() {
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
      if (!res.ok) throw new Error(data.message || "Impossible d'envoyer votre commande. Réessayez.")
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
          <>
            <StepIndicator step={step} onBack={() => setStep(s => Math.max(1, s - 1))} />

            {step === 1 && (
              <CatalogueStep
                products={products}
                cart={cart}
                cartItems={cartItems}
                cartTotal={cartTotal}
                onChangeQty={changeQty}
                onNext={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <AddressStep
                address={deliveryAddress}
                onAddressChange={setDeliveryAddress}
                onSelectPlace={selectPlace}
                onUseGps={useGps}
                gpsLoading={gpsLoading}
                gpsError={gpsError}
                onNext={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <PaymentStep
                paymentMethod={paymentMethod}
                onChangePaymentMethod={setPaymentMethod}
                landmark={landmark}
                onChangeLandmark={setLandmark}
                notes={notes}
                onChangeNotes={setNotes}
                customerName={customerName}
                onChangeName={setCustomerName}
                customerPhone={customerPhone}
                onChangePhone={setCustomerPhone}
                onNext={() => setStep(4)}
              />
            )}

            {step === 4 && (
              <ReviewStep
                cartItems={cartItems}
                cartTotal={cartTotal}
                deliveryAddress={deliveryAddress}
                landmark={landmark}
                notes={notes}
                paymentMethod={paymentMethod}
                customerName={customerName}
                customerPhone={customerPhone}
                submitting={submitting}
                submitError={submitError}
                onSubmit={handleSubmit}
              />
            )}

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
          </>
        )}

        {submitted && (
          <div style={{
            background: 'rgba(0,224,140,0.08)', border: '1px solid rgba(0,224,140,0.25)',
            borderRadius: 16, padding: '32px 28px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 10 }}>Commande envoyée !</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              {merchant.businessName} va confirmer votre commande. Un livreur DEM viendra récupérer et vous livrer votre commande.
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
