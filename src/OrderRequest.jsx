import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './shop/shop.css'
import './shop/boutique.css'
import { Icon, PAYMENT_METHODS, isInZone, isValidSenegalMobile, recentOrders, rememberOrder, useLightPage } from './shop/ui.jsx'
import { fetchDeliveryQuote, fetchMerchant, fetchProducts, normalizeMerchant, submitOrder } from './shop/boutique/api.js'
import { accentVars, forgetClient, formatPrice, loadClient, plural, saveClient, shopStatus } from './shop/boutique/format.js'
import {
  Announcement, NotFoundShop, PausedNotice, ShopFooter, TopBar, TrustRow, Vitrine, VitrineSkeleton,
} from './shop/boutique/Storefront.jsx'
import Catalogue from './shop/boutique/Catalogue.jsx'
import {
  CartBar, CartPanel, CartSheet, DeliveryStep, PaymentStep, StepHead, Steps, Success,
} from './shop/boutique/Checkout.jsx'

// Boutique publique d'un commerçant DEM Pro (dem.sn/commander/:id), ouverte
// le plus souvent depuis WhatsApp, sur téléphone. Vitrine personnalisée par
// la boutique (bannière, accent, horaires…), catalogue, puis trois étapes :
// Articles · Livraison · Paiement. Prix complet (articles + livraison) dès
// que l'adresse est placée, quand le serveur sait le calculer ; sinon,
// livraison fixée par la boutique comme avant. Appels réseau : shop/boutique/api.js.

const ONLINE = ['WAVE', 'ORANGE_MONEY']

// Moyens proposés pour « payer à l'arrivée » selon la boutique
function arrivalMethods(merchant) {
  if (!merchant) return []
  if (merchant.legacyPayment) return PAYMENT_METHODS
  const po = merchant.paymentOptions
  return PAYMENT_METHODS.filter(m => (m.value === 'CASH' && po.onDeliveryCash) || (ONLINE.includes(m.value) && po.onDeliveryOnline))
}

export default function OrderRequest() {
  const { merchantId } = useParams()
  const navigate = useNavigate()
  useLightPage('#F6F8FB')

  const [merchant, setMerchant] = useState(null)
  const [loadState, setLoadState] = useState('loading') // loading | ready | notfound
  const [products, setProducts] = useState(null)
  const [cart, setCart] = useState({})
  const [step, setStep] = useState(1)
  const [cartOpen, setCartOpen] = useState(false)

  // Coordonnées retenues (« Se souvenir de moi »)
  const saved = useMemo(() => loadClient(), [])
  const [name, setName] = useState(saved?.name || '')
  const [phone, setPhone] = useState(saved?.phone || '')
  const [address, setAddress] = useState(saved?.address || '')
  const [coords, setCoords] = useState(saved?.coords?.lat != null ? saved.coords : null)
  const [landmark, setLandmark] = useState(saved?.landmark || '')
  const [notes, setNotes] = useState('')
  const [remember, setRemember] = useState(true)

  const [timing, setTiming] = useState('ON_DELIVERY')
  const [operator, setOperator] = useState('WAVE')
  const [payMethod, setPayMethod] = useState(null)
  const [delivery, setDelivery] = useState({ status: 'idle' })
  const [quoteNonce, setQuoteNonce] = useState(0)

  const [website, setWebsite] = useState('') // pot de miel anti-robot
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [notice, setNotice] = useState(null)
  const [result, setResult] = useState(null)

  // ── Chargement ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    fetchMerchant(merchantId)
      .then(m => {
        if (cancelled) return
        setMerchant(m)
        setTiming(m.paymentOptions.payNow ? 'NOW' : 'ON_DELIVERY')
        setPayMethod(arrivalMethods(m)[0]?.value ?? null)
        setLoadState('ready')
      })
      .catch(() => { if (!cancelled) setLoadState('notfound') })
    return () => { cancelled = true }
  }, [merchantId])

  useEffect(() => {
    if (loadState !== 'ready') return
    fetchProducts(merchantId).then(setProducts).catch(() => setProducts([]))
  }, [loadState, merchantId])

  // Titre de l'onglet (et de l'aperçu côté navigateur)
  useEffect(() => {
    if (!merchant) return
    const prev = document.title
    const label = /^boutique\b/i.test(merchant.name) ? merchant.name : `Boutique ${merchant.name}`
    document.title = `${label} — commander en ligne | DEM`
    return () => { document.title = prev }
  }, [merchant])

  // ── En-tête : nom de la boutique dans la barre une fois la vitrine passée ──
  const idRef = useRef(null)
  const [pastShop, setPastShop] = useState(false)
  useEffect(() => {
    const el = idRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setPastShop(!e.isIntersecting && e.boundingClientRect.top < 0), { rootMargin: '-56px 0px 0px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [loadState, step, result])

  // Chaque étape repart du haut de page
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [step, result])

  // ── Panier ─────────────────────────────────────────────────────────────────
  const productsById = useMemo(() => new Map((products || []).map(p => [p.id, p])), [products])
  const items = useMemo(() => Object.entries(cart)
    .filter(([, q]) => q > 0)
    .map(([productId, quantity]) => {
      const p = productsById.get(productId)
      return p ? { productId, name: p.name, price: p.defaultPrice ?? 0, quantity, image: p.image } : null
    })
    .filter(Boolean), [cart, productsById])
  const itemCount = items.reduce((s, i) => s + i.quantity, 0)
  const itemsTotal = items.reduce((s, i) => s + i.price * i.quantity, 0)
  const setQty = useCallback((id, q) => setCart(c => ({ ...c, [id]: Math.max(0, q) })), [])

  // ── Devis de la livraison (dès que l'adresse est placée) ───────────────────
  const zoneOut = !!coords && !!merchant && !isInZone(merchant.deliveryZone, coords.lat, coords.lng)
  useEffect(() => {
    if (!merchant) return
    if (!coords) { setDelivery({ status: 'idle' }); return }
    if (zoneOut) { setDelivery({ status: 'out-of-zone', message: null }); return }
    if (!merchant.quoteSupported) { setDelivery({ status: 'legacy' }); return }
    if (!merchant.hasDefaultPickup) { setDelivery({ status: 'no-pickup' }); return }
    const ctrl = new AbortController()
    setDelivery(d => (d.status === 'ok' ? { ...d, status: 'loading' } : { status: 'loading' }))
    // Debounce : le devis est limité à 30 appels par minute
    const t = setTimeout(async () => {
      try {
        const r = await fetchDeliveryQuote(merchantId, coords.lat, coords.lng, ctrl.signal)
        if (ctrl.signal.aborted) return
        // Quartier de départ : celui affiché par la boutique d'abord (la zone
        // tarifaire du serveur peut être approximative)
        setDelivery(r.status === 'ok' && merchant.shop.area ? { ...r, quote: { ...r.quote, pickupArea: merchant.shop.area } } : r)
      } catch { /* annulé */ }
    }, 450)
    return () => { clearTimeout(t); ctrl.abort() }
  }, [merchant, merchantId, coords, zoneOut, quoteNonce])

  const priced = delivery.status === 'ok'
  const deliveryTotal = priced ? delivery.quote.total : null
  const grandTotal = itemsTotal + (deliveryTotal ?? 0)
  const outOfZone = zoneOut || delivery.status === 'out-of-zone'

  // ── État de la boutique ────────────────────────────────────────────────────
  const paused = !!merchant?.shop.paused
  const status = useMemo(() => (merchant ? shopStatus(merchant.shop.hours) : null), [merchant])
  const accentStyle = useMemo(() => accentVars(merchant?.shop.accent), [merchant])
  const previous = useMemo(
    () => recentOrders().find(o => o.merchantId === merchantId),
    [merchantId, result], // eslint-disable-line react-hooks/exhaustive-deps
  )

  // ── Étapes ─────────────────────────────────────────────────────────────────
  const methods = arrivalMethods(merchant)
  const blocker =
    step === 1 ? (items.length ? null : 'Ajoutez au moins un article')
    : step === 2 ? (!isValidSenegalMobile(phone) ? 'Indiquez un numéro de téléphone valide'
      : address.trim().length < 4 ? 'Indiquez l\'adresse de livraison'
      : !coords ? 'Placez votre adresse sur la carte'
      : outOfZone ? 'Adresse hors de la zone de livraison'
      : delivery.status === 'loading' ? 'Calcul du prix de la livraison…'
      : delivery.status === 'error' ? 'Prix de la livraison indisponible : réessayez'
      : null)
    : (timing === 'ON_DELIVERY' && methods.length > 1 && !payMethod ? 'Choisissez un moyen de paiement' : null)

  function goTo(n) {
    setTouched(false)
    setSubmitError(null)
    setStep(n)
  }

  function next() {
    setCartOpen(false)
    if (blocker) { setTouched(true); return }
    goTo(Math.min(3, step + 1))
  }

  async function submit() {
    if (blocker) { setTouched(true); return }
    setSubmitting(true)
    setSubmitError(null)
    setNotice(null)
    const legacyNoTiming = merchant.legacyPayment && !merchant.paymentOptions.payNow
    const body = {
      customerName: name.trim() || undefined,
      customerPhone: `+221${phone}`,
      deliveryAddress: address.trim(),
      deliveryLatitude: coords?.lat ?? undefined,
      deliveryLongitude: coords?.lng ?? undefined,
      landmark: landmark.trim() || undefined,
      notes: notes.trim() || undefined,
      items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
      ...(legacyNoTiming ? {} : { paymentTiming: timing }),
      ...(timing === 'NOW'
        ? { operatorName: operator }
        : payMethod ? { customerPaymentMethod: payMethod } : {}),
      // Prix affiché, comparé par le serveur (jamais repris) — seulement s'il
      // vient du serveur
      ...(priced ? { expectedDeliveryTotal: deliveryTotal } : {}),
      channel: 'web',
      website,
    }

    const r = await submitOrder(merchantId, body)
    setSubmitting(false)

    if (!r.ok) {
      if (r.code === 'DELIVERY_PRICE_CHANGED' && r.data?.delivery) {
        const d = r.data.delivery
        setDelivery({ status: 'ok', quote: { total: Math.round(d.total), price: d.price, demFee: d.demFee, distanceKm: d.distanceKm, pickupArea: merchant.shop.area || d.pickupArea || null } })
        setNotice(`Le prix de la livraison a changé : ${formatPrice(d.total)}. Vérifiez le nouveau total puis validez à nouveau.`)
        return
      }
      if (r.code === 'PAYMENT_TIMING_NOT_ALLOWED' && r.data?.paymentOptions) {
        const m = normalizeMerchant({ ...rawOf(merchant), paymentOptions: r.data.paymentOptions })
        setMerchant(prev => ({ ...prev, paymentOptions: m.paymentOptions, legacyPayment: false }))
        setTiming(m.paymentOptions.payNow ? 'NOW' : 'ON_DELIVERY')
        setSubmitError(r.message)
        return
      }
      if (r.code === 'OUT_OF_ZONE') {
        setDelivery({ status: 'out-of-zone', message: r.message })
        setSubmitError(r.message)
        goTo(2)
        setTouched(true)
        return
      }
      if (r.code === 'SHOP_PAUSED') {
        setMerchant(prev => ({ ...prev, shop: { ...prev.shop, paused: true } }))
        setStep(1)
        return
      }
      setSubmitError(r.message)
      return
    }

    const data = r.data || {}
    if (remember) saveClient({ name: name.trim(), phone, address: address.trim(), coords, landmark: landmark.trim() })
    else forgetClient()
    if (data.id) rememberOrder({ id: data.id, merchantId, merchantName: merchant.name })
    // Payer maintenant : direction le suivi, qui ouvre Wave / Orange Money
    if (data.awaitingPayment && data.id) {
      navigate(`/suivi/${data.id}`, { state: { payment: data.payment ?? null } })
      return
    }
    const serverDelivery = data.delivery?.total ?? deliveryTotal
    const productAmount = data.productAmount ?? itemsTotal
    setResult({
      id: data.id ?? null,
      itemsTotal: productAmount,
      deliveryTotal: serverDelivery ?? null,
      total: data.totalAmount ?? productAmount + (serverDelivery ?? 0),
      timing: data.paymentTiming || timing,
      demo: !!data.demo,
    })
  }

  // ── Bouton principal ───────────────────────────────────────────────────────
  const amountNow = timing === 'NOW' ? grandTotal : null
  const action = step === 1
    ? { label: 'Commander', onClick: next, disabled: items.length === 0, icon: 'arrowRight' }
    : step === 2
      ? { label: 'Continuer', onClick: next, disabled: false, icon: 'arrowRight' }
      : timing === 'NOW'
        ? { label: `Payer ${formatPrice(amountNow)}`, onClick: submit, disabled: false, icon: null }
        : { label: 'Envoyer la commande', onClick: submit, disabled: false, icon: 'arrowRight' }

  const reassure = step === 3
    ? timing === 'NOW' ? 'Paiement sécurisé Wave / Orange Money' : 'Vous payez à l\'arrivée du coursier'
    : 'Livraison DEM suivie en direct'
  const closedNote = status && !status.open && status.opensAt
    ? `Boutique fermée : commande préparée dès l'ouverture (${status.opensAt}).`
    : null

  const showBar = loadState === 'ready' && !paused && !result
  const barAmountLabel = step === 3
    ? (timing === 'NOW' ? 'À payer maintenant' : priced ? 'Total' : 'Articles')
    : step === 2 && priced ? `${plural(itemCount, 'article', 'articles')} + livraison` : null

  return (
    <div className="ds ds-order bq" style={accentStyle}>
      <TopBar merchant={merchant} showMerchant={pastShop} />

      {loadState === 'notfound' ? (
        <NotFoundShop />
      ) : loadState === 'loading' ? (
        <VitrineSkeleton />
      ) : (
        <>
          <Vitrine merchant={merchant} status={status} compact={step > 1 || !!result} idRef={idRef} />
          {step === 1 && !result && (
            <>
              {paused && <PausedNotice message={merchant.shop.pausedMessage} />}
              {!paused && <Announcement text={merchant.shop.announcement} />}
              <TrustRow paymentOptions={merchant.paymentOptions} />
            </>
          )}

          <main className="bq-wrap bq-main">
            {result ? (
              <Success merchant={merchant} result={result} />
            ) : (
              <div className={`bq-layout ${paused ? 'is-paused' : ''}`}>
                <section className="bq-col" aria-label="Commande">
                  {previous && step === 1 && !paused && (
                    <Link to={`/suivi/${previous.id}`} className="bq-previous">
                      <Icon name="route" size={17} />
                      <span><b>Votre commande du {new Date(previous.at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}</b><small>Voir où elle en est</small></span>
                      <Icon name="arrowRight" size={17} />
                    </Link>
                  )}
                  {!paused && <Steps step={step} onGo={goTo} />}

                  {step === 1 && (
                    <>
                      <div className="bq-sechead">
                        <p className="bq-eyebrow"><span aria-hidden="true" />Le catalogue</p>
                        <h2 className="bq-h2">
                          {paused ? 'Nos articles' : 'Choisissez vos articles'}<span className="bq-dot">.</span>
                          {products?.length ? <small className="bq-h2-count">{plural(products.length, 'article', 'articles')}</small> : null}
                        </h2>
                      </div>
                      <Catalogue
                        products={products} cart={cart} onChange={setQty}
                        featuredIds={merchant.shop.featuredProductIds} layout={merchant.shop.layout}
                        readOnly={paused} accentStyle={accentStyle}
                      />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <StepHead eyebrow="Étape 2 sur 3" title="Où livrer ?" onBack={() => goTo(1)} />
                      <DeliveryStep
                        address={address} setAddress={setAddress} coords={coords} setCoords={setCoords}
                        landmark={landmark} setLandmark={setLandmark} notes={notes} setNotes={setNotes}
                        name={name} setName={setName} phone={phone} setPhone={setPhone}
                        remember={remember} setRemember={setRemember}
                        showErrors={touched} outOfZone={outOfZone} outOfZoneMessage={delivery.message}
                        delivery={delivery} onRetryQuote={() => setQuoteNonce(n => n + 1)}
                      />
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <StepHead eyebrow="Étape 3 sur 3" title="Paiement" onBack={() => goTo(2)} />
                      <PaymentStep
                        merchant={merchant} items={items} itemsTotal={itemsTotal} delivery={delivery}
                        timing={timing} setTiming={t => { setTiming(t); setNotice(null) }}
                        operator={operator} setOperator={setOperator}
                        methods={methods} payMethod={payMethod} setPayMethod={setPayMethod}
                        address={address} landmark={landmark} notes={notes} name={name} phone={phone}
                        onEdit={goTo} error={submitError} notice={notice}
                      />
                    </>
                  )}

                  {/* Pot de miel — invisible, hors du parcours clavier */}
                  <div aria-hidden="true" className="bq-honeypot">
                    <label htmlFor="website">Ne pas remplir</label>
                    <input id="website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
                  </div>
                </section>

                {!paused && (
                  <aside className="bq-aside" aria-label="Votre panier">
                    <CartPanel
                      items={items} itemsTotal={itemsTotal} delivery={delivery} timing={timing} step={step}
                      action={action} blocker={touched ? blocker : null} submitting={submitting}
                      onChange={setQty} productsById={productsById} reassure={reassure} closedNote={closedNote}
                    />
                  </aside>
                )}
              </div>
            )}
          </main>

          {showBar && (
            <CartBar
              count={itemCount}
              amount={step === 3 && timing === 'NOW' ? amountNow : step >= 2 ? grandTotal : itemsTotal}
              amountLabel={barAmountLabel}
              action={action} submitting={submitting} blocker={touched ? blocker : null}
              canOpen={step === 1 && items.length > 0} onOpenCart={() => setCartOpen(true)}
            />
          )}
          <CartSheet
            open={cartOpen && step === 1} onClose={() => setCartOpen(false)}
            items={items} itemsTotal={itemsTotal} delivery={delivery} onChange={setQty}
            productsById={productsById} action={action} accentStyle={accentStyle}
          />
        </>
      )}

      <ShopFooter padBottom={showBar ? 96 : 0} />
    </div>
  )
}

// Pour renormaliser des options de paiement renvoyées par le serveur
function rawOf(merchant) {
  return { businessName: merchant.name, avatar: merchant.avatar, deliveryZone: merchant.deliveryZone }
}
