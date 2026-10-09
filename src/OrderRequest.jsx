import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './shop/shop.css'
import {
  API_URL, Icon, MerchantAvatar, PAYMENT_METHODS,
  formatFcfa, formatLocalPhone, isInZone, isValidSenegalMobile, localPhoneDigits,
  recentOrders, rememberOrder, useLightPage,
} from './shop/ui.jsx'

// Boutique publique d'un commerçant DEM Pro (dem.sn/commander/:id) — le
// client final choisit ses articles, indique où livrer et comment il paiera
// À LA RÉCEPTION, puis suit sa commande sur dem.sn/suivi/:id. Trois étapes,
// un panier toujours visible (colonne à droite sur ordinateur, barre en bas
// sur téléphone), et des garanties claires : rien n'est payé en ligne.

const STEPS = ['Articles', 'Livraison', 'Confirmation']
// Carte chargée seulement à l'étape Livraison (Leaflet)
const MapPicker = lazy(() => import('./shop/MapPicker.jsx'))
const newSessionToken = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

export default function OrderRequest() {
  const { merchantId } = useParams()
  useLightPage()

  const [merchant, setMerchant] = useState(null)
  const [loadState, setLoadState] = useState('loading') // loading | ready | notfound
  const [products, setProducts] = useState(null) // null = en cours de chargement
  const [cart, setCart] = useState({}) // { [productId]: quantité }
  const [step, setStep] = useState(1)

  const [address, setAddress] = useState('')
  const [coords, setCoords] = useState(null) // { lat, lng } une fois localisée
  const [landmark, setLandmark] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('') // 9 chiffres
  const [payment, setPayment] = useState('CASH') // boutique sans prépaiement : moyen à la livraison
  // Boutique avec paiement intégré (merchant.prepaid) : articles payés pour
  // lancer la commande ; livraison maintenant ('WITH_ORDER', au prix exact)
  // ou à la livraison, au choix ; Wave ou Orange Money pour payer.
  const [deliveryPayment, setDeliveryPayment] = useState('WITH_ORDER')
  // Payer maintenant (en ligne, recommandé) ou à la livraison (09/10)
  const [payTiming, setPayTiming] = useState('NOW')
  const [operator, setOperator] = useState('WAVE')
  const [quote, setQuote] = useState(null) // { loading } | { available, total }
  const navigate = useNavigate()
  const [website, setWebsite] = useState('') // pot de miel anti-robot
  const [touched, setTouched] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitted, setSubmitted] = useState(null) // { id } une fois envoyée

  useEffect(() => {
    let cancelled = false
    fetch(`${API_URL}/public/dem-pro/${merchantId}`)
      .then(res => { if (!res.ok) throw new Error('not found'); return res.json() })
      .then(data => {
        if (cancelled) return
        setMerchant(data)
        setLoadState('ready')
        document.title = `Commander chez ${data.businessName} — DEM`
      })
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

  // Prix de la livraison si elle est payée maintenant — depuis l'adresse de
  // la boutique jusqu'au point placé par le client.
  const onlineAvailable = !!merchant?.prepaid
  const prepaid = onlineAvailable && payTiming === 'NOW'
  useEffect(() => {
    if (!prepaid || step !== 3 || !coords) return
    let cancelled = false
    setQuote({ loading: true })
    fetch(`${API_URL}/public/dem-pro/${merchantId}/delivery-quote?lat=${coords.lat}&lng=${coords.lng}`)
      .then(res => res.json())
      .then(q => {
        if (cancelled) return
        setQuote(q?.available ? q : { available: false })
        if (!q?.available) setDeliveryPayment('ON_DELIVERY')
      })
      .catch(() => { if (!cancelled) { setQuote({ available: false }); setDeliveryPayment('ON_DELIVERY') } })
    return () => { cancelled = true }
  }, [prepaid, step, coords, merchantId])

  // Chaque étape repart du haut de page
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [step, submitted])

  const productsById = useMemo(() => new Map((products || []).map(p => [p.id, p])), [products])
  const cartItems = useMemo(() => Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([productId, quantity]) => {
      const p = productsById.get(productId)
      return p ? { productId, name: p.name, price: p.defaultPrice ?? 0, quantity, image: p.image } : null
    })
    .filter(Boolean), [cart, productsById])
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

  const phoneValid = isValidSenegalMobile(phone)
  const addressValid = address.trim().length >= 4
  const outOfZone = !!coords && !isInZone(merchant?.deliveryZone, coords.lat, coords.lng)

  // Ce que l'étape attend encore avant de continuer (null = prête)
  const blocker =
    step === 1 ? (cartItems.length ? null : 'Ajoutez au moins un article')
    : step === 2 ? (!addressValid ? 'Indiquez l\'adresse de livraison'
      : !coords ? 'Placez votre adresse sur la carte'
      : outOfZone ? 'Adresse hors de la zone de livraison'
      : !phoneValid ? 'Indiquez un numéro de téléphone valide' : null)
    : null

  const previous = useMemo(
    () => recentOrders().find(o => o.merchantId === merchantId),
    [merchantId, submitted], // eslint-disable-line react-hooks/exhaustive-deps
  )

  function next() {
    if (blocker) { setTouched(true); return }
    setTouched(false)
    setStep(s => Math.min(3, s + 1))
  }

  async function submit() {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch(`${API_URL}/public/dem-pro/${merchantId}/order-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name.trim() || undefined,
          customerPhone: `+221${phone}`,
          deliveryAddress: address.trim(),
          deliveryLatitude: coords?.lat ?? undefined,
          deliveryLongitude: coords?.lng ?? undefined,
          landmark: landmark.trim() || undefined,
          notes: notes.trim() || undefined,
          items: cartItems.map(i => ({ productId: i.productId, quantity: i.quantity })),
          ...(onlineAvailable ? { paymentTiming: payTiming } : {}),
          ...(prepaid
            ? { deliveryPayment: deliveryNow ? 'WITH_ORDER' : 'ON_DELIVERY', operatorName: operator }
            : { customerPaymentMethod: payment }),
          channel: 'web',
          website,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.message || 'Impossible d\'envoyer votre commande. Réessayez.')
      if (data.id) rememberOrder({ id: data.id, merchantId, merchantName: merchant.businessName })
      // Prépayée : direction le suivi, qui ouvre Wave / Orange Money (ou
      // propose de réessayer si le lancement du paiement a échoué).
      if (data.awaitingPayment && data.id) {
        navigate(`/suivi/${data.id}`, { state: { payment: data.payment ?? null } })
        return
      }
      setSubmitted({ id: data.id ?? null })
    } catch (err) {
      setSubmitError(err.message || 'Connexion impossible. Vérifiez votre réseau et réessayez.')
    } finally {
      setSubmitting(false)
    }
  }

  const deliveryNow = prepaid && deliveryPayment === 'WITH_ORDER' && !!quote?.available
  const amountDue = cartTotal + (deliveryNow ? quote.total : 0)
  const action = step < 3
    ? { label: step === 1 ? 'Continuer' : 'Vérifier ma commande', onClick: next, disabled: false, icon: 'arrowRight' }
    : prepaid
      ? { label: `Payer ${formatFcfa(amountDue)}`, onClick: submit, disabled: submitting || quote?.loading, icon: null }
      : { label: `Envoyer ma commande`, onClick: submit, disabled: submitting, icon: null }

  return (
    <div className="ds">
      <Hero />

      {loadState === 'notfound' ? (
        <NotFound />
      ) : (
        <>
          <MerchantHeader merchant={merchant} loading={loadState === 'loading'} compact={step > 1 || !!submitted} />

          <main className="ds-main">
            {submitted ? (
              <Success merchant={merchant} id={submitted.id} total={cartTotal} />
            ) : (
              <div className="ds-layout">
                <section style={{ minWidth: 0 }}>
                  {previous && step === 1 && <PreviousOrder order={previous} />}
                  <Steps step={step} onBack={() => setStep(s => Math.max(1, s - 1))} />

                  {step === 1 && (
                    <Catalogue products={products} cart={cart} onChange={(id, q) => setCart(c => ({ ...c, [id]: q }))} />
                  )}
                  {step === 2 && (
                    <Delivery
                      address={address} setAddress={setAddress} coords={coords} setCoords={setCoords}
                      landmark={landmark} setLandmark={setLandmark} notes={notes} setNotes={setNotes}
                      name={name} setName={setName} phone={phone} setPhone={setPhone}
                      showErrors={touched} outOfZone={outOfZone}
                    />
                  )}
                  {step === 3 && (
                    <Confirm
                      merchant={merchant} items={cartItems} total={cartTotal} inApp={!!merchant?.inAppPayment}
                      address={address} landmark={landmark} notes={notes} name={name} phone={phone}
                      payment={payment} setPayment={setPayment} onEdit={setStep}
                      prepaid={prepaid} quote={quote} deliveryNow={deliveryNow}
                      onlineAvailable={onlineAvailable} payTiming={payTiming} setPayTiming={setPayTiming}
                      setDeliveryPayment={setDeliveryPayment} operator={operator} setOperator={setOperator}
                      amountDue={amountDue}
                      error={submitError}
                    />
                  )}

                  {/* Pot de miel — invisible, hors du parcours clavier, jamais rempli par un humain */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="website">Ne pas remplir</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
                  </div>
                </section>

                <aside className="ds-aside">
                  <CartSummary
                    merchant={merchant} items={cartItems} total={cartTotal} inApp={!!merchant?.inAppPayment}
                    action={action} blocker={touched ? blocker : null} step={step} submitting={submitting}
                    prepaid={prepaid} deliveryNow={deliveryNow} quote={quote} amountDue={amountDue}
                  />
                </aside>
              </div>
            )}
          </main>

          {!submitted && (step > 1 || cartItems.length > 0) && (
            <CartBar
              count={itemCount} total={cartTotal} action={action} submitting={submitting} blocker={touched ? blocker : null}
              due={step === 3 && prepaid ? amountDue : null}
            />
          )}
        </>
      )}

      <footer className="ds-footer" style={{ paddingBottom: !submitted && (step > 1 || cartItems.length > 0) ? 110 : undefined }}>
        Livraison assurée par <Link to="/">DEM — Delivery Express Mobility</Link>
        <br />
        <Link to="/terms">Conditions</Link> · <Link to="/privacy">Confidentialité</Link>
      </footer>
    </div>
  )
}

// ── En-tête ────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <header className="ds-hero">
      <div className="ds-topbar">
        <Link to="/" className="ds-brand">
          <img src="/logo.png" alt="" />
          <span>DEM</span>
        </Link>
        <span className="ds-secure"><Icon name="lock" size={13} /> Commande sécurisée</span>
      </div>
    </header>
  )
}

function MerchantHeader({ merchant, loading, compact }) {
  return (
    <div className="ds-merchant">
      <div className={`ds-merchant-card ds-fade ${compact ? 'is-compact' : ''}`}>
        {loading ? (
          <>
            <div className="ds-skel" style={{ width: 64, height: 64, borderRadius: 18 }} />
            <div>
              <div className="ds-skel" style={{ width: '60%', height: 22, marginBottom: 8 }} />
              <div className="ds-skel" style={{ width: '40%', height: 14 }} />
            </div>
          </>
        ) : (
          <>
            <MerchantAvatar name={merchant.businessName} avatar={merchant.avatar} />
            <div style={{ minWidth: 0 }}>
              <p className="ds-merchant-kicker" style={{ margin: 0, fontSize: 12.5, fontWeight: 600, color: 'var(--ds-muted)' }}>Commander chez</p>
              <h1 className="ds-merchant-name">{merchant.businessName}</h1>
              {/* Compte DEM Pro validé par l'équipe DEM — pas une vérification
                  d'identité ou de documents : « partenaire », pas « vérifié » */}
              <span className="ds-verified"><Icon name="shield" size={15} /> Partenaire DEM Pro</span>
            </div>
          </>
        )}
        <div className="ds-trust">
          {merchant?.inAppPayment
            ? <TrustItem icon="shield" title="Paiement sécurisé" text="Wave ou Orange Money" />
            : <TrustItem icon="cash" title="Payez à la réception" text="Espèces, Wave, Orange Money" />}
          <TrustItem icon="bike" title="Livreur DEM" text="Récupère et vous livre" />
          <TrustItem icon="route" title="Suivi en direct" text="Sur votre téléphone" />
        </div>
      </div>
    </div>
  )
}

function TrustItem({ icon, title, text }) {
  return (
    <div className="ds-trust-item">
      <span className="ds-trust-ico"><Icon name={icon} size={16} /></span>
      <span className="ds-trust-text"><b>{title}</b><span>{text}</span></span>
    </div>
  )
}

function NotFound() {
  return (
    <main className="ds-main" style={{ maxWidth: 560, paddingTop: 0 }}>
      <div className="ds-card ds-fade" style={{ marginTop: -40, position: 'relative', textAlign: 'center', padding: '32px 24px' }}>
        <div className="ds-success-badge" style={{ background: 'var(--ds-fill)', color: 'var(--ds-muted)' }}>
          <Icon name="linkOff" size={30} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>Ce lien n'est plus disponible</h2>
        <p style={{ color: 'var(--ds-muted)', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
          La boutique est peut-être fermée pour le moment. Contactez directement le commerçant pour passer votre commande.
        </p>
      </div>
    </main>
  )
}

function PreviousOrder({ order }) {
  const date = new Date(order.at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
  return (
    <Link to={`/suivi/${order.id}`} className="ds-banner ds-fade" style={{ textDecoration: 'none', color: 'inherit' }}>
      <span className="ds-trust-ico"><Icon name="route" size={16} /></span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <b>Votre commande du {date}</b>
        <small>Voir où elle en est</small>
      </span>
      <Icon name="arrowRight" size={18} style={{ color: 'var(--ds-blue)' }} />
    </Link>
  )
}

// ── Étapes ─────────────────────────────────────────────────────────────────
function Steps({ step, onBack }) {
  return (
    <nav className="ds-steps" aria-label="Étapes de la commande">
      {step > 1 && (
        <button type="button" className="ds-back" onClick={onBack} aria-label="Étape précédente">
          <Icon name="arrowLeft" size={18} />
        </button>
      )}
      {STEPS.map((label, i) => {
        const n = i + 1
        const state = n < step ? 'is-done' : n === step ? 'is-current' : ''
        return (
          <div key={label} className={`ds-step ${state}`} aria-current={n === step ? 'step' : undefined}>
            <span className="ds-step-dot">{n < step ? <Icon name="check" size={14} strokeWidth={3} /> : n}</span>
            <span className="ds-step-label">{label}</span>
            {n < STEPS.length && <span className="ds-step-line" />}
          </div>
        )
      })}
    </nav>
  )
}

// ── Étape 1 : articles ─────────────────────────────────────────────────────
function Catalogue({ products, cart, onChange }) {
  const [category, setCategory] = useState('Tous')
  const [query, setQuery] = useState('')

  const categories = useMemo(() => {
    const set = new Set((products || []).map(p => p.category?.trim()).filter(Boolean))
    return [...set].sort((a, b) => a.localeCompare(b, 'fr'))
  }, [products])

  const visible = useMemo(() => {
    let list = products || []
    if (category !== 'Tous') list = list.filter(p => p.category?.trim() === category)
    const q = query.trim().toLowerCase()
    if (q) list = list.filter(p => p.name.toLowerCase().includes(q))
    return list
  }, [products, category, query])

  if (products === null) {
    return (
      <div className="ds-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="ds-product">
            <div className="ds-skel" style={{ aspectRatio: '1 / 1', borderRadius: 0 }} />
            <div className="ds-product-body">
              <div className="ds-skel" style={{ height: 14, width: '80%' }} />
              <div className="ds-skel" style={{ height: 14, width: '45%' }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="ds-card ds-empty">
        <Icon name="bag" size={34} />
        <p style={{ margin: 0 }}>Ce commerçant n'a pas encore d'articles en ligne.</p>
      </div>
    )
  }

  return (
    <div>
      {products.length >= 8 && (
        <div className="ds-search ds-input-wrap">
          <Icon name="search" size={17} />
          <input
            className="ds-input has-icon" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un article" aria-label="Rechercher un article"
          />
        </div>
      )}
      {categories.length > 0 && (
        <div className="ds-chips" role="tablist">
          {['Tous', ...categories].map(c => (
            <button
              key={c} type="button" role="tab" aria-selected={category === c}
              className={`ds-chip ${category === c ? 'is-active' : ''}`} onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
      )}
      {visible.length === 0 ? (
        <div className="ds-card ds-empty">Aucun article ne correspond à votre recherche.</div>
      ) : (
        <div className="ds-grid">
          {visible.map((p, i) => (
            <ProductCard key={p.id} product={p} qty={cart[p.id] || 0} index={i} onChange={q => onChange(p.id, q)} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProductCard({ product: p, qty, index, onChange }) {
  const [imgFailed, setImgFailed] = useState(false)
  const atMax = p.quantity != null && qty >= p.quantity
  const lowStock = p.quantity != null && p.quantity <= 5
  return (
    <article className={`ds-product ${qty ? 'is-in-cart' : ''}`} style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}>
      <div className="ds-product-img">
        {p.image && !imgFailed
          ? <img src={p.image} alt="" loading="lazy" onError={() => setImgFailed(true)} />
          : <Icon name="bag" size={34} strokeWidth={1.4} />}
      </div>
      <div className="ds-product-body">
        <h3 className="ds-product-name">{p.name}</h3>
        {lowStock && <span className="ds-stock">Plus que {p.quantity} en stock</span>}
        <div className="ds-product-foot">
          {p.defaultPrice != null
            ? <span className="ds-price">{formatFcfa(p.defaultPrice)}</span>
            : <span className="ds-price-muted">Prix à confirmer</span>}
          {qty === 0 ? (
            <button type="button" className="ds-add" onClick={() => onChange(1)} aria-label={`Ajouter ${p.name}`}>
              <Icon name="plus" size={18} strokeWidth={2.4} />
            </button>
          ) : (
            <div className="ds-stepper">
              <button type="button" onClick={() => onChange(qty - 1)} aria-label="Retirer un">
                <Icon name="minus" size={16} strokeWidth={2.4} />
              </button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => onChange(qty + 1)} disabled={atMax} aria-label="Ajouter un">
                <Icon name="plus" size={16} strokeWidth={2.4} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

// ── Étape 2 : livraison et contact ─────────────────────────────────────────
function Delivery({
  address, setAddress, coords, setCoords, landmark, setLandmark, notes, setNotes,
  name, setName, phone, setPhone, showErrors, outOfZone,
}) {
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [gps, setGps] = useState({ loading: false, error: null })
  // Précision du GPS (m) tant que le repère n'a pas été ajusté à la main
  const [accuracy, setAccuracy] = useState(null)
  const [showMap, setShowMap] = useState(!!coords)
  const [mapOpenNow, setMapOpenNow] = useState(false) // « Adresse introuvable ? » : carte plein écran directe
  // Adresse remplie automatiquement (GPS, carte) : remplacée par la suivante ;
  // tapée par le client : jamais écrasée.
  const autoAddress = useRef(false)
  const token = useRef(newSessionToken())
  const debounce = useRef(null)
  const phoneValid = isValidSenegalMobile(phone)

  // Retoucher le texte (« Villa 12 »…) ne déplace pas le repère déjà posé :
  // seul le choix d'une suggestion, le GPS ou la carte le déplacent.
  function onType(v) {
    autoAddress.current = false
    setAddress(v)
    clearTimeout(debounce.current)
    if (v.trim().length < 3) { setSuggestions([]); setOpen(false); return }
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_URL}/public/places/autocomplete?input=${encodeURIComponent(v)}&sessionToken=${token.current}`)
        const data = await res.json()
        setSuggestions(data.predictions || [])
        setOpen(true)
      } catch { setSuggestions([]) }
    }, 300)
  }

  async function pick(s) {
    setOpen(false)
    setAddress(s.description)
    try {
      const res = await fetch(`${API_URL}/public/places/details?placeId=${s.place_id}&sessionToken=${token.current}`)
      const data = await res.json()
      if (data.lat != null && data.lng != null) {
        setAddress(data.address || s.description)
        setCoords({ lat: data.lat, lng: data.lng })
        autoAddress.current = false // adresse choisie par le client : gardée
        setAccuracy(null)
        setShowMap(true)
      }
    } catch { /* l'adresse texte reste renseignée */ }
    token.current = newSessionToken()
  }

  async function reverse(lat, lng) {
    try {
      const res = await fetch(`${API_URL}/public/places/reverse-geocode?lat=${lat}&lng=${lng}`)
      const data = await res.json()
      return data.address || null
    } catch {
      return null
    }
  }

  function useMyPosition() {
    if (!navigator.geolocation) {
      setGps({ loading: false, error: 'Votre navigateur ne permet pas la localisation : saisissez votre adresse.' })
      return
    }
    setGps({ loading: true, error: null })
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng, accuracy: acc } = pos.coords
        setCoords({ lat, lng })
        setAccuracy(acc > 100 ? Math.round(acc) : null)
        setShowMap(true)
        autoAddress.current = true
        setAddress((await reverse(lat, lng)) || 'Ma position actuelle')
        setGps({ loading: false, error: null })
      },
      err => setGps({
        loading: false,
        error: err.code === err.PERMISSION_DENIED
          ? 'Localisation refusée : saisissez votre adresse ou placez-la sur la carte.'
          : 'Position indisponible : saisissez votre adresse ou placez-la sur la carte.',
      }),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  // Point confirmé sur la carte plein écran (avec l'adresse trouvée)
  async function onMapChange(lat, lng, _source, found) {
    setCoords({ lat, lng })
    setAccuracy(null) // repère ajusté à la main
    if (address.trim().length < 4 || autoAddress.current) {
      const label = found && found !== 'Point sélectionné sur la carte' ? found : await reverse(lat, lng)
      if (label) { setAddress(label); autoAddress.current = true }
    }
  }

  const addressError = showErrors && address.trim().length < 4
  const coordsError = showErrors && !coords
  const phoneError = (showErrors || phone.length === 9) && !phoneValid

  return (
    <div className="ds-fade">
      <div className="ds-card">
        <h2 className="ds-card-title"><span className="ds-ico"><Icon name="pin" size={17} /></span>Où livrer ?</h2>
        <button type="button" className="ds-btn ds-btn-ghost" onClick={useMyPosition} disabled={gps.loading} style={{ marginBottom: 12 }}>
          {gps.loading ? <span className="ds-spinner" style={{ borderColor: 'rgba(6,113,186,0.25)', borderTopColor: 'var(--ds-blue)' }} /> : <Icon name="crosshair" size={18} />}
          {gps.loading ? 'Localisation en cours…' : 'Utiliser ma position actuelle'}
        </button>
        {gps.error && <p className="ds-help is-error" style={{ margin: '-4px 0 10px' }}>{gps.error}</p>}

        <div className="ds-field" style={{ marginBottom: 0 }}>
          <label className="ds-label" htmlFor="ds-address">Adresse de livraison</label>
          <div className="ds-input-wrap">
            <Icon name="search" size={17} />
            <input
              id="ds-address" className={`ds-input has-icon ${addressError ? 'is-invalid' : ''}`}
              value={address} onChange={e => onType(e.target.value)}
              onFocus={() => suggestions.length && setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Quartier, rue, numéro…" autoComplete="street-address"
            />
            {open && suggestions.length > 0 && (
              <div className="ds-suggest" role="listbox">
                {suggestions.map(s => (
                  <button key={s.place_id} type="button" role="option" onMouseDown={e => e.preventDefault()} onClick={() => pick(s)}>
                    <Icon name="pin" size={16} style={{ color: 'var(--ds-faint)' }} />
                    <span>
                      {s.structured_formatting?.main_text ?? s.description}
                      {s.structured_formatting?.secondary_text && <small>{s.structured_formatting.secondary_text}</small>}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {showMap ? (
            <Suspense fallback={<div className="ds-skel" style={{ height: 230, marginTop: 12, borderRadius: 14 }} />}>
              <MapPicker
                value={coords} accuracy={accuracy} onChange={onMapChange} reverse={reverse}
                openOnMount={mapOpenNow} onOpenChange={o => { if (!o) setMapOpenNow(false) }}
              />
            </Suspense>
          ) : (
            <button type="button" className="ds-linkbtn" onClick={() => { setMapOpenNow(true); setShowMap(true) }}>
              <Icon name="pin" size={15} /> Adresse introuvable ? Placez-la vous-même sur la carte
            </button>
          )}

          {outOfZone ? (
            <div className="ds-alert is-error" style={{ marginTop: 10, marginBottom: 0 }}>
              <Icon name="x" size={17} />
              <span>Cette adresse est hors de notre zone de livraison. Vérifiez le repère, ou choisissez une adresse plus proche.</span>
            </div>
          ) : coords && accuracy ? (
            <div className="ds-located is-warn"><Icon name="crosshair" size={16} /> Position approximative (± {accuracy} m) : déplacez le repère pour l'ajuster.</div>
          ) : coords ? (
            <div className="ds-located"><Icon name="check" size={16} strokeWidth={2.6} /> Adresse placée sur la carte : le livreur vous trouvera facilement</div>
          ) : coordsError || addressError ? (
            <p className="ds-help is-error">{addressError ? 'Indiquez l\'adresse de livraison.' : 'Placez votre adresse sur la carte : choisissez une suggestion, utilisez votre position ou touchez la carte.'}</p>
          ) : address.trim().length >= 4 ? (
            <p className="ds-help">Choisissez une suggestion, ou placez le repère sur la carte, pour que le livreur vous trouve.</p>
          ) : null}
        </div>
      </div>

      <div className="ds-card">
        <h2 className="ds-card-title"><span className="ds-ico"><Icon name="flag" size={17} /></span>Pour le livreur</h2>
        <div className="ds-field">
          <label className="ds-label" htmlFor="ds-landmark">Point de repère <small>(recommandé)</small></label>
          <input id="ds-landmark" className="ds-input" value={landmark} onChange={e => setLandmark(e.target.value)} placeholder="Ex. : face à la pharmacie, portail bleu" maxLength={200} />
        </div>
        <div className="ds-field" style={{ marginBottom: 0 }}>
          <label className="ds-label" htmlFor="ds-notes">Instructions <small>(facultatif)</small></label>
          <textarea id="ds-notes" className="ds-input" rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ex. : m'appeler en arrivant" maxLength={500} style={{ resize: 'vertical' }} />
        </div>
      </div>

      <div className="ds-card">
        <h2 className="ds-card-title"><span className="ds-ico"><Icon name="user" size={17} /></span>Vos coordonnées</h2>
        <p className="ds-sub">Le livreur vous appelle à ce numéro en arrivant. Il n'est utilisé que pour cette livraison.</p>
        <div className="ds-field">
          <label className="ds-label" htmlFor="ds-name">Votre prénom <small>(facultatif)</small></label>
          <input id="ds-name" className="ds-input" value={name} onChange={e => setName(e.target.value)} placeholder="Ex. : Awa" autoComplete="given-name" maxLength={80} />
        </div>
        <div className="ds-field" style={{ marginBottom: 0 }}>
          <label className="ds-label" htmlFor="ds-phone">Téléphone</label>
          <div className="ds-phone">
            <span className="ds-phone-prefix">+221</span>
            <input
              id="ds-phone" className={`ds-input ${phoneError ? 'is-invalid' : ''}`} type="tel" inputMode="numeric"
              autoComplete="tel-national" placeholder="77 123 45 67"
              value={formatLocalPhone(phone)}
              onChange={e => setPhone(localPhoneDigits(e.target.value))}
            />
          </div>
          {phoneError && <p className="ds-help is-error">Numéro invalide, exemple : 77 123 45 67.</p>}
        </div>
      </div>
    </div>
  )
}

// ── Étape 3 : paiement et récapitulatif ────────────────────────────────────
function Confirm({
  merchant, inApp, items, total, address, landmark, notes, name, phone, payment, setPayment, onEdit, error,
  prepaid, quote, deliveryNow, setDeliveryPayment, operator, setOperator, amountDue,
  onlineAvailable, payTiming, setPayTiming,
}) {
  return (
    <div className="ds-fade">
      {error && <div className="ds-alert is-error"><Icon name="x" size={18} />{error}</div>}

      {onlineAvailable && (
        <div className="ds-card">
          <h2 className="ds-card-title">
            <span className="ds-ico"><Icon name="cash" size={17} /></span>
            Comment voulez-vous payer ?
          </h2>
          <div className="ds-timing" role="radiogroup" aria-label="Moment du paiement">
            <TimingOption
              active={payTiming === 'NOW'} onClick={() => setPayTiming('NOW')} icon="shield"
              title="Payer maintenant" badge="Recommandé"
              text="En ligne, sécurisé · remboursé si la boutique ne peut pas préparer votre commande"
            />
            <TimingOption
              active={payTiming === 'ON_DELIVERY'} onClick={() => setPayTiming('ON_DELIVERY')} icon="bike"
              title="Payer à la livraison"
              text="Espèces ou mobile money, au coursier"
            />
          </div>
        </div>
      )}

      {prepaid ? (
        <div className="ds-card">
          <h2 className="ds-card-title">
            <span className="ds-ico"><Icon name="shield" size={17} /></span>
            Paiement en ligne
          </h2>
          <p className="ds-sub">
            Articles payés maintenant. La livraison : maintenant, ou au coursier.
          </p>

          <div className="ds-paychoice">
            <div className="ds-paychoice-head">
              <span className="ds-recap-ico"><Icon name="bag" size={17} /></span>
              <span className="ds-paychoice-title"><b>Articles</b><small>Payés maintenant</small></span>
              <b style={{ marginLeft: 'auto' }}>{formatFcfa(total)}</b>
            </div>
          </div>

          <PayChoice
            icon="bike" title="Livraison"
            amount={quote?.loading ? 'Calcul du prix…' : quote?.available ? formatFcfa(quote.total) : 'Prix fixé à la livraison'}
            options={[['WITH_ORDER', 'Maintenant'], ['ON_DELIVERY', 'À la livraison']]}
            value={deliveryNow ? 'WITH_ORDER' : 'ON_DELIVERY'} onChange={setDeliveryPayment}
            disabledValues={quote?.available ? [] : ['WITH_ORDER']}
            note={deliveryNow ? 'Rien à donner au coursier.' : 'Vous la réglez au coursier (espèces ou mobile money).'}
          />

          <p className="ds-sub" style={{ marginTop: 14, marginBottom: 8 }}>Payer {formatFcfa(amountDue)} avec :</p>
          <div className="ds-pay" role="radiogroup" aria-label="Moyen de paiement">
            {PAYMENT_METHODS.filter(m => m.value === 'WAVE' || m.value === 'ORANGE_MONEY').map(m => (
              <button key={m.value} type="button" role="radio" aria-checked={operator === m.value}
                className={operator === m.value ? 'is-active' : ''} onClick={() => setOperator(m.value)}>
                <span className="ds-pay-dot" style={{ background: m.color }}>{m.mark}</span>
                {m.label}
                <span className="ds-radio" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="ds-card">
          <h2 className="ds-card-title">
            <span className="ds-ico"><Icon name="cash" size={17} /></span>
            Paiement à la réception
          </h2>
          <p className="ds-sub">Rien n'est payé maintenant. Vous réglez à la livraison, par le moyen de votre choix :</p>
          <div className="ds-pay" role="radiogroup">
            {PAYMENT_METHODS.map(m => (
              <button key={m.value} type="button" role="radio" aria-checked={payment === m.value}
                className={payment === m.value ? 'is-active' : ''} onClick={() => setPayment(m.value)}>
                <span className="ds-pay-dot" style={{ background: m.color }}>{m.mark}</span>
                {m.label}
                <span className="ds-radio" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="ds-card">
        <h2 className="ds-card-title"><span className="ds-ico"><Icon name="note" size={17} /></span>Récapitulatif</h2>
        <div className="ds-recap-row">
          <span className="ds-recap-ico"><Icon name="bag" size={17} /></span>
          <div className="ds-recap-body">
            <small>Articles</small>
            {items.map(i => <div key={i.productId}>{i.quantity} × {i.name}</div>)}
          </div>
          <button type="button" className="ds-recap-edit" onClick={() => onEdit(1)}>Modifier</button>
        </div>
        <div className="ds-recap-row">
          <span className="ds-recap-ico"><Icon name="pin" size={17} /></span>
          <div className="ds-recap-body">
            <small>Livraison</small>
            {address}
            {landmark && <div style={{ color: 'var(--ds-muted)' }}>Repère : {landmark}</div>}
            {notes && <div style={{ color: 'var(--ds-muted)' }}>{notes}</div>}
          </div>
          <button type="button" className="ds-recap-edit" onClick={() => onEdit(2)}>Modifier</button>
        </div>
        <div className="ds-recap-row">
          <span className="ds-recap-ico"><Icon name="user" size={17} /></span>
          <div className="ds-recap-body">
            <small>Contact</small>
            {name ? `${name} · ` : ''}+221 {formatLocalPhone(phone)}
          </div>
          <button type="button" className="ds-recap-edit" onClick={() => onEdit(2)}>Modifier</button>
        </div>
        {prepaid ? (
          <PayTotals total={total} deliveryNow={deliveryNow} quote={quote} amountDue={amountDue} style={{ marginTop: 14 }} />
        ) : (
          <>
            <div className="ds-total" style={{ marginTop: 14 }}>
              <span>Total des articles</span>
              <b>{formatFcfa(total)}</b>
            </div>
            <p className="ds-fee-note">Les frais de livraison éventuels sont fixés par {merchant.businessName}.</p>
          </>
        )}
      </div>
    </div>
  )
}

// Un moment de paiement (maintenant / à la livraison), en grande carte
function TimingOption({ active, onClick, icon, title, badge, text }) {
  return (
    <button type="button" role="radio" aria-checked={active} className={`ds-timing-opt ${active ? 'is-active' : ''}`} onClick={onClick}>
      <span className="ds-timing-ico"><Icon name={icon} size={18} /></span>
      <span className="ds-timing-text">
        <b>{title}{badge && <em>{badge}</em>}</b>
        <small>{text}</small>
      </span>
      <span className="ds-radio" />
    </button>
  )
}

// Articles + livraison (maintenant ou au coursier) = à payer maintenant
function PayTotals({ total, deliveryNow, quote, amountDue, style }) {
  return (
    <div className="ds-paytotals" style={style}>
      <div><span>Articles</span><span>{formatFcfa(total)}</span></div>
      <div>
        <span>Livraison</span>
        <span>{deliveryNow ? formatFcfa(quote.total) : <small>au coursier</small>}</span>
      </div>
      <div className="ds-total"><span>À payer maintenant</span><b>{formatFcfa(amountDue)}</b></div>
    </div>
  )
}

// Choix segmenté (ex. livraison payée maintenant ou à la livraison)
function PayChoice({ icon, title, amount, options, value, onChange, disabledValues = [], note }) {
  return (
    <div className="ds-paychoice">
      <div className="ds-paychoice-head">
        <span className="ds-recap-ico"><Icon name={icon} size={17} /></span>
        <span className="ds-paychoice-title"><b>{title}</b><small>{amount}</small></span>
      </div>
      <div className="ds-seg" role="radiogroup" aria-label={title}>
        {options.map(([v, label]) => {
          const disabled = disabledValues.includes(v)
          return (
            <button key={v} type="button" role="radio" aria-checked={value === v} disabled={disabled}
              className={value === v ? 'is-active' : ''} onClick={() => !disabled && onChange(v)}>
              {label}
            </button>
          )
        })}
      </div>
      {note && <small className="ds-paychoice-note">{note}</small>}
    </div>
  )
}

// ── Panier : colonne (ordinateur) et barre du bas (téléphone) ─────────────
function ActionButton({ action, submitting }) {
  return (
    <button type="button" className="ds-btn ds-btn-primary" onClick={action.onClick} disabled={action.disabled}>
      {submitting ? <span className="ds-spinner" /> : null}
      {submitting ? 'Envoi…' : action.label}
      {!submitting && action.icon && <Icon name={action.icon} size={18} strokeWidth={2.2} />}
    </button>
  )
}

function CartSummary({ merchant, inApp, items, total, action, blocker, step, submitting, prepaid, deliveryNow, quote, amountDue }) {
  return (
    <div className="ds-card">
      <h2 className="ds-card-title" style={{ marginBottom: 10 }}>
        <span className="ds-ico"><Icon name="bag" size={17} /></span>Votre panier
      </h2>
      {items.length === 0 ? (
        <div className="ds-empty" style={{ padding: '14px 0 18px' }}>
          <Icon name="bag" size={30} strokeWidth={1.5} />
          <div>Ajoutez des articles pour commencer.</div>
        </div>
      ) : (
        <>
          {items.map(i => (
            <div key={i.productId} className="ds-line">
              <span className="ds-line-thumb">
                {i.image ? <img src={i.image} alt="" /> : <Icon name="bag" size={18} />}
              </span>
              <span className="ds-line-name">{i.name}<small>{i.quantity} × {formatFcfa(i.price)}</small></span>
              <span className="ds-line-price">{formatFcfa(i.price * i.quantity)}</span>
            </div>
          ))}
          {step === 3 && prepaid ? (
            <PayTotals total={total} deliveryNow={deliveryNow} quote={quote} amountDue={amountDue} style={{ marginTop: 10 }} />
          ) : (
            <>
              <div className="ds-total"><span>Total</span><b>{formatFcfa(total)}</b></div>
              {step === 3 && merchant && (
                <p className="ds-fee-note">Les frais de livraison éventuels sont fixés par {merchant.businessName}.</p>
              )}
            </>
          )}
        </>
      )}
      <div style={{ marginTop: 16 }}>
        <ActionButton action={action} submitting={submitting} />
        {blocker
          ? <p className="ds-help is-error" style={{ textAlign: 'center' }}>{blocker}</p>
          : <p className="ds-reassure"><Icon name="lock" size={13} /> {prepaid ? 'Paiement sécurisé · remboursé en cas de refus' : 'Vous payez à la réception'}</p>}
      </div>
    </div>
  )
}

function CartBar({ count, total, action, submitting, blocker, due }) {
  return (
    <div className="ds-cartbar">
      {/* Ce qui manque encore, sur toute la largeur (à côté du bouton, le
          message s'écrasait sur 3 lignes) */}
      {blocker && <p className="ds-cartbar-blocker"><Icon name="x" size={13} strokeWidth={2.6} /> {blocker}</p>}
      <div className="ds-cartbar-inner">
        <div className="ds-cartbar-info">
          <small>{due != null ? 'À payer maintenant' : `${count} article${count > 1 ? 's' : ''}`}</small>
          <b>{formatFcfa(due ?? total)}</b>
        </div>
        <ActionButton action={action} submitting={submitting} />
      </div>
    </div>
  )
}

// ── Commande envoyée ───────────────────────────────────────────────────────
function Success({ merchant, id, total }) {
  const [copied, setCopied] = useState(false)
  const link = id ? `${window.location.origin}/suivi/${id}` : null

  async function share() {
    if (!link) return
    const text = `Ma commande chez ${merchant.businessName} — suivi : ${link}`
    if (navigator.share) {
      try { await navigator.share({ title: 'Suivi de commande DEM', text, url: link }); return } catch { /* annulé */ }
    }
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* presse-papiers refusé : le lien reste affiché */ }
  }

  return (
    <div className="ds-card ds-success ds-fade" style={{ maxWidth: 620, margin: '0 auto' }}>
      <div className="ds-success-badge"><Icon name="check" size={38} strokeWidth={2.6} /></div>
      <h2>Commande envoyée</h2>
      <p>{merchant.businessName} a bien reçu votre commande de {formatFcfa(total)}.</p>
      {id && <span className="ds-ref"><Icon name="note" size={14} /> N° {id.slice(0, 8).toUpperCase()}</span>}

      <ol className="ds-next" style={{ padding: 0 }}>
        <li><span>1</span><div><b>{merchant.businessName} confirme</b><br /><small style={{ color: 'var(--ds-muted)' }}>Vous suivez chaque étape en direct.</small></div></li>
        <li><span>2</span><div><b>Un livreur DEM récupère votre commande</b><br /><small style={{ color: 'var(--ds-muted)' }}>Puis vous la livre à l'adresse indiquée.</small></div></li>
        <li><span>3</span><div><b>Vous payez à la réception</b><br /><small style={{ color: 'var(--ds-muted)' }}>Espèces ou mobile money, comme choisi.</small></div></li>
      </ol>

      {link && (
        <div className="ds-actions">
          <Link to={`/suivi/${id}`} className="ds-btn ds-btn-primary">
            <Icon name="route" size={18} /> Suivre ma commande
          </Link>
          <button type="button" className="ds-btn ds-btn-secondary" onClick={share}>
            <Icon name={copied ? 'check' : 'share'} size={18} /> {copied ? 'Lien copié' : 'Garder le lien de suivi'}
          </button>
        </div>
      )}
    </div>
  )
}
