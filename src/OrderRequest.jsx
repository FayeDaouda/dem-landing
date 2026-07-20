import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.dem.sn'

const C = {
  cyan: '#00D2FF',
  cyan2: '#0086C8',
  danger: '#FF5C5C',
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

function Field({ label, required, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.cyan }}> *</span>}</label>
      {children}
    </div>
  )
}

export default function OrderRequest() {
  const { merchantId } = useParams()

  const [merchant, setMerchant] = useState(null)   // { businessName, avatar }
  const [loadState, setLoadState] = useState('loading') // loading | ready | notfound

  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [landmark, setLandmark] = useState('')
  const [notes, setNotes] = useState('')
  const [website, setWebsite] = useState('') // honeypot — invisible pour un humain

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}/public/dem-pro/${merchantId}`)
      .then(res => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then(data => { if (!cancelled) { setMerchant(data); setLoadState('ready') } })
      .catch(() => { if (!cancelled) setLoadState('notfound') })
    return () => { cancelled = true }
  }, [merchantId])

  const canSubmit = customerName.trim().length >= 2
    && customerPhone.trim().length >= 8
    && deliveryAddress.trim().length >= 4
    && !submitting

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
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          deliveryAddress: deliveryAddress.trim(),
          landmark: landmark.trim() || undefined,
          notes: notes.trim() || undefined,
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
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>Commander une livraison chez</p>
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
      <div style={{ maxWidth: 520, margin: '0 auto', padding: '36px 24px 80px' }}>

        {loadState === 'notfound' && (
          <div style={{
            background: 'rgba(255,92,92,0.08)', border: '1px solid rgba(255,92,92,0.25)',
            borderRadius: 16, padding: '24px 28px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              Ce lien de commande n'est plus disponible. Il a peut-être expiré ou le compte n'est plus actif.
              Contactez directement le commerçant pour passer votre commande.
            </p>
          </div>
        )}

        {loadState === 'ready' && !submitted && (
          <>
            <div style={{
              background: 'rgba(0,210,255,0.08)', border: '1px solid rgba(0,210,255,0.2)',
              borderRadius: 14, padding: '16px 20px', marginBottom: 28, fontSize: 14, lineHeight: 1.6,
            }}>
              Remplissez vos informations ci-dessous — {merchant.businessName} confirmera votre commande et un livreur DEM viendra récupérer votre colis.
            </div>

            <form onSubmit={handleSubmit}>
              <Field label="Votre nom" required>
                <input
                  style={inputStyle}
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Prénom Nom"
                  autoComplete="name"
                />
              </Field>

              <Field label="Votre téléphone" required>
                <input
                  style={inputStyle}
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="77 000 00 00"
                  type="tel"
                  autoComplete="tel"
                />
              </Field>

              <Field label="Adresse de livraison" required>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 70, fontFamily: "'Inter', sans-serif" }}
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="Quartier, rue, numéro…"
                />
              </Field>

              <Field label="Repère (optionnel)">
                <input
                  style={inputStyle}
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="Ex: face à la pharmacie, portail bleu…"
                />
              </Field>

              <Field label="Instructions (optionnel)">
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 60, fontFamily: "'Inter', sans-serif" }}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Ex: m'appeler à l'arrivée…"
                />
              </Field>

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
                {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
              </button>
            </form>
          </>
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
