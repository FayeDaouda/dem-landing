import { Suspense, lazy, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, PAYMENT_METHODS, formatLocalPhone, isValidSenegalMobile, localPhoneDigits } from '../ui.jsx'
import { placeDetails, placesAutocomplete, reverseGeocode } from './api.js'
import { formatKm, formatPrice, plural } from './format.js'
import { QtyControl } from './Catalogue.jsx'
import Sheet from './Sheet.jsx'

// Parcours de commande : Articles · Livraison · Paiement, panier (colonne
// sur ordinateur, barre fixe + feuille sur téléphone), confirmation.

export const STEPS = ['Articles', 'Livraison', 'Paiement']
// Carte chargée seulement à l'étape Livraison (Leaflet)
const MapPicker = lazy(() => import('../MapPicker.jsx'))
const newSessionToken = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

// ── Étapes ───────────────────────────────────────────────────────────────────
export function Steps({ step, onGo }) {
  return (
    <nav className="bq-steps" aria-label="Étapes de la commande">
      <ol>
        {STEPS.map((label, i) => {
          const n = i + 1
          const state = n < step ? 'is-done' : n === step ? 'is-current' : ''
          const inner = (
            <>
              <span className="bq-step-num" aria-hidden="true">{n < step ? <Icon name="check" size={13} strokeWidth={3} /> : `0${n}`}</span>
              <span className="bq-step-label">{label}</span>
            </>
          )
          return (
            <li key={label} className={`bq-step ${state}`} aria-current={n === step ? 'step' : undefined}>
              {n < step
                ? <button type="button" onClick={() => onGo(n)} aria-label={`Revenir à l'étape ${label}`}>{inner}</button>
                : <span>{inner}</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function StepHead({ eyebrow, title, onBack }) {
  return (
    <div className="bq-stephead">
      {onBack && (
        <button type="button" className="bq-iconbtn is-outline" onClick={onBack} aria-label="Étape précédente">
          <Icon name="arrowLeft" size={18} />
        </button>
      )}
      <div>
        <p className="bq-eyebrow"><span aria-hidden="true" />{eyebrow}</p>
        <h2 className="bq-h2">{title}<span className="bq-dot">.</span></h2>
      </div>
    </div>
  )
}

// ── Étape 2 : livraison ──────────────────────────────────────────────────────
export function DeliveryStep({
  address, setAddress, coords, setCoords, landmark, setLandmark, notes, setNotes,
  name, setName, phone, setPhone, remember, setRemember,
  showErrors, outOfZone, outOfZoneMessage, delivery, onRetryQuote,
}) {
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const [gps, setGps] = useState({ loading: false, error: null })
  const [accuracy, setAccuracy] = useState(null) // précision GPS (m) tant que le repère n'est pas ajusté
  const [showMap, setShowMap] = useState(!!coords)
  const [mapOpenNow, setMapOpenNow] = useState(false)
  // Adresse remplie automatiquement (GPS, carte) : remplacée par la suivante ;
  // tapée par le client : jamais écrasée.
  const autoAddress = useRef(false)
  const token = useRef(newSessionToken())
  const debounce = useRef(null)
  const phoneValid = isValidSenegalMobile(phone)

  function onType(v) {
    autoAddress.current = false
    setAddress(v)
    clearTimeout(debounce.current)
    if (v.trim().length < 3) { setSuggestions([]); setOpen(false); return }
    debounce.current = setTimeout(async () => {
      try {
        setSuggestions(await placesAutocomplete(v, token.current))
        setOpen(true)
      } catch { setSuggestions([]) }
    }, 300)
  }

  async function pick(s) {
    setOpen(false)
    setAddress(s.description)
    try {
      const data = await placeDetails(s.place_id, token.current)
      if (data.lat != null && data.lng != null) {
        setAddress(data.address || s.description)
        setCoords({ lat: data.lat, lng: data.lng })
        autoAddress.current = false
        setAccuracy(null)
        setShowMap(true)
      }
    } catch { /* l'adresse texte reste renseignée */ }
    token.current = newSessionToken()
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
        setAddress((await reverseGeocode(lat, lng)) || 'Ma position actuelle')
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

  async function onMapChange(lat, lng, _source, found) {
    setCoords({ lat, lng })
    setAccuracy(null)
    if (address.trim().length < 4 || autoAddress.current) {
      const label = found && found !== 'Point sélectionné sur la carte' ? found : await reverseGeocode(lat, lng)
      if (label) { setAddress(label); autoAddress.current = true }
    }
  }

  const addressError = showErrors && address.trim().length < 4
  const coordsError = showErrors && !coords
  const phoneError = (showErrors || phone.length === 9) && !phoneValid

  return (
    <div className="bq-step-body">
      <fieldset className="bq-panel">
        <legend className="bq-panel-title"><span>01</span>Vos coordonnées</legend>
        <p className="bq-help is-top">Le coursier vous appelle à ce numéro en arrivant.</p>
        <div className="bq-field">
          <label className="bq-label" htmlFor="bq-name">Votre nom <small>(facultatif)</small></label>
          <input id="bq-name" className="bq-input" value={name} onChange={e => setName(e.target.value)} placeholder="Ex. : Awa Diop" autoComplete="name" maxLength={80} />
        </div>
        <div className="bq-field">
          <label className="bq-label" htmlFor="bq-phone">Téléphone</label>
          <div className={`bq-phone ${phoneError ? 'is-invalid' : ''}`}>
            <span className="bq-phone-prefix" aria-hidden="true">+221</span>
            <input
              id="bq-phone" className="bq-input" type="tel" inputMode="numeric" autoComplete="tel-national"
              placeholder="77 123 45 67" aria-invalid={phoneError || undefined}
              aria-describedby={phoneError ? 'bq-phone-err' : undefined}
              value={formatLocalPhone(phone)} onChange={e => setPhone(localPhoneDigits(e.target.value))}
            />
          </div>
          {phoneError && <p id="bq-phone-err" className="bq-help is-error">Numéro invalide, exemple : 77 123 45 67.</p>}
        </div>
      </fieldset>

      <fieldset className="bq-panel">
        <legend className="bq-panel-title"><span>02</span>Adresse de livraison</legend>
        <button type="button" className="bq-btn is-ghost" onClick={useMyPosition} disabled={gps.loading}>
          {gps.loading ? <span className="bq-spinner is-dark" aria-hidden="true" /> : <Icon name="crosshair" size={18} />}
          {gps.loading ? 'Localisation en cours…' : 'Utiliser ma position actuelle'}
        </button>
        {gps.error && <p className="bq-help is-error">{gps.error}</p>}

        <div className="bq-field" style={{ marginTop: 14 }}>
          <label className="bq-label" htmlFor="bq-address">Adresse</label>
          <div className="bq-combo">
            <Icon name="search" size={17} />
            <input
              id="bq-address" className="bq-input" value={address} onChange={e => onType(e.target.value)}
              onFocus={() => suggestions.length && setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="Quartier, rue, numéro…" autoComplete="street-address"
              role="combobox" aria-expanded={open && suggestions.length > 0} aria-controls="bq-suggest" aria-autocomplete="list"
              aria-invalid={addressError || undefined}
            />
            {open && suggestions.length > 0 && (
              <div className="bq-suggest" id="bq-suggest" role="listbox" aria-label="Adresses proposées">
                {suggestions.map(s => (
                  <button key={s.place_id} type="button" role="option" aria-selected="false" onMouseDown={e => e.preventDefault()} onClick={() => pick(s)}>
                    <Icon name="pin" size={16} />
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
            <Suspense fallback={<div className="bq-skel" style={{ height: 190, marginTop: 12 }} />}>
              <MapPicker
                value={coords} accuracy={accuracy} onChange={onMapChange} reverse={reverseGeocode}
                openOnMount={mapOpenNow} onOpenChange={o => { if (!o) setMapOpenNow(false) }}
              />
            </Suspense>
          ) : (
            <button type="button" className="bq-textbtn" onClick={() => { setMapOpenNow(true); setShowMap(true) }} style={{ marginTop: 10 }}>
              <Icon name="pin" size={15} /> Adresse introuvable ? Placez-la sur la carte
            </button>
          )}

          <div aria-live="polite">
            {outOfZone ? (
              <p className="bq-note is-error"><Icon name="x" size={16} /> {outOfZoneMessage || 'Cette adresse est hors de notre zone de livraison.'} Vérifiez le repère ou choisissez une adresse plus proche.</p>
            ) : coords && accuracy ? (
              <p className="bq-note is-warn"><Icon name="crosshair" size={16} /> Position approximative (± {accuracy} m) : déplacez le repère pour l'ajuster.</p>
            ) : coords ? (
              <p className="bq-note is-ok"><Icon name="check" size={16} strokeWidth={2.6} /> Adresse placée sur la carte</p>
            ) : coordsError || addressError ? (
              <p className="bq-help is-error">{addressError ? 'Indiquez l\'adresse de livraison.' : 'Placez votre adresse sur la carte : choisissez une suggestion, utilisez votre position ou touchez la carte.'}</p>
            ) : address.trim().length >= 4 ? (
              <p className="bq-help">Choisissez une suggestion ou placez le repère sur la carte, pour que le coursier vous trouve.</p>
            ) : null}
          </div>
        </div>

        {coords && !outOfZone && <DeliveryQuote delivery={delivery} onRetry={onRetryQuote} />}

        <div className="bq-field" style={{ marginTop: 16 }}>
          <label className="bq-label" htmlFor="bq-landmark">Point de repère <small>(recommandé)</small></label>
          <input id="bq-landmark" className="bq-input" value={landmark} onChange={e => setLandmark(e.target.value)} placeholder="Ex. : face à la pharmacie, portail bleu" maxLength={200} />
        </div>
        <div className="bq-field">
          <label className="bq-label" htmlFor="bq-notes">Instructions <small>(facultatif)</small></label>
          <textarea id="bq-notes" className="bq-input" rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ex. : m'appeler en arrivant" maxLength={500} />
        </div>
      </fieldset>

      <label className="bq-check">
        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
        <span className="bq-check-box" aria-hidden="true"><Icon name="check" size={13} strokeWidth={3} /></span>
        <span>
          <b>Se souvenir de moi</b>
          <small>Nom, téléphone et adresse gardés sur ce téléphone pour la prochaine commande.</small>
        </span>
      </label>
    </div>
  )
}

// Prix de la livraison sous l'adresse
function DeliveryQuote({ delivery, onRetry }) {
  if (delivery.status === 'loading') {
    return <div className="bq-quote is-loading" aria-live="polite"><span className="bq-spinner is-dark" aria-hidden="true" /> Calcul du prix de la livraison…</div>
  }
  if (delivery.status === 'ok') {
    const q = delivery.quote
    const km = formatKm(q.distanceKm)
    return (
      <div className="bq-quote" aria-live="polite">
        <span className="bq-quote-ico" aria-hidden="true"><Icon name="bike" size={18} /></span>
        <span className="bq-quote-text">
          <b>Livraison : {formatPrice(q.total)}</b>
          <small>{[q.pickupArea && `depuis ${q.pickupArea}`, km].filter(Boolean).join(' · ') || 'Coursier DEM'}</small>
        </span>
      </div>
    )
  }
  if (delivery.status === 'error') {
    return (
      <div className="bq-quote is-error" role="alert">
        <span className="bq-quote-text"><b>Prix de la livraison indisponible</b><small>{delivery.message}</small></span>
        <button type="button" className="bq-textbtn" onClick={onRetry}><Icon name="refresh" size={15} /> Réessayer</button>
      </div>
    )
  }
  if (delivery.status === 'no-pickup' || delivery.status === 'legacy') {
    return (
      <div className="bq-quote is-muted">
        <span className="bq-quote-ico" aria-hidden="true"><Icon name="bike" size={18} /></span>
        <span className="bq-quote-text"><b>Livraison calculée par la boutique</b><small>Le prix vous est confirmé à la validation de la commande.</small></span>
      </div>
    )
  }
  return null
}

// ── Étape 3 : paiement et récapitulatif ──────────────────────────────────────
export function PaymentStep({
  merchant, items, itemsTotal, delivery, timing, setTiming, operator, setOperator,
  methods, payMethod, setPayMethod, address, landmark, notes, name, phone, onEdit, error, notice,
}) {
  const po = merchant.paymentOptions
  const both = po.payNow && po.payOnDelivery
  const priced = delivery.status === 'ok'
  const onArrivalText = merchant.legacyPayment
    ? 'Espèces ou mobile money, au coursier'
    : [po.onDeliveryOnline && 'En ligne (Wave / Orange Money)', po.onDeliveryCash && 'ou en espèces'].filter(Boolean).join(' ') || 'À régler au coursier'

  return (
    <div className="bq-step-body">
      {error && <p className="bq-alert is-error" role="alert"><Icon name="x" size={18} /> <span>{error}</span></p>}
      {notice && <p className="bq-alert is-warn" role="alert"><Icon name="refresh" size={18} /> <span>{notice}</span></p>}

      <fieldset className="bq-panel">
        <legend className="bq-panel-title"><span>01</span>Comment voulez-vous payer ?</legend>
        <div className="bq-options" role="radiogroup" aria-label="Moment du paiement">
          {po.payNow && (
            <PayOption
              active={timing === 'NOW'} onClick={() => setTiming('NOW')} single={!both}
              title="Payer maintenant" sub="Wave ou Orange Money, en ligne et sécurisé"
              icon="shield"
            />
          )}
          {po.payOnDelivery && (
            <PayOption
              active={timing === 'ON_DELIVERY'} onClick={() => setTiming('ON_DELIVERY')} single={!both}
              title="Payer à l'arrivée du coursier" sub={onArrivalText}
              icon="bike"
            />
          )}
        </div>

        {timing === 'NOW' && (
          <>
            <p className="bq-label" style={{ marginTop: 18 }} id="bq-op-label">Payer avec</p>
            <div className="bq-methods" role="radiogroup" aria-labelledby="bq-op-label">
              {PAYMENT_METHODS.filter(m => m.value === 'WAVE' || m.value === 'ORANGE_MONEY').map(m => (
                <Method key={m.value} m={m} active={operator === m.value} onClick={() => setOperator(m.value)} />
              ))}
            </div>
            {!priced && <p className="bq-help">Vos articles sont payés maintenant ; la livraison se règle au coursier.</p>}
          </>
        )}
        {timing === 'ON_DELIVERY' && methods.length > 1 && (
          <>
            <p className="bq-label" style={{ marginTop: 18 }} id="bq-m-label">Moyen prévu à l'arrivée</p>
            <div className="bq-methods" role="radiogroup" aria-labelledby="bq-m-label">
              {methods.map(m => <Method key={m.value} m={m} active={payMethod === m.value} onClick={() => setPayMethod(m.value)} />)}
            </div>
          </>
        )}
      </fieldset>

      <section className="bq-panel" aria-labelledby="bq-recap-title">
        <h3 className="bq-panel-title" id="bq-recap-title"><span>02</span>Récapitulatif</h3>
        <ul className="bq-recap-lines">
          {items.map(i => (
            <li key={i.productId}>
              <span>{i.quantity}&nbsp;× {i.name}</span>
              <b>{formatPrice(i.price * i.quantity)}</b>
            </li>
          ))}
        </ul>
        <Totals itemsTotal={itemsTotal} delivery={delivery} timing={timing} />
        <div className="bq-recap-meta">
          <RecapRow icon="pin" label="Livraison" onEdit={() => onEdit(2)}>
            {address}
            {landmark && <small>Repère : {landmark}</small>}
            {notes && <small>{notes}</small>}
          </RecapRow>
          <RecapRow icon="user" label="Contact" onEdit={() => onEdit(2)}>
            {name ? `${name} · ` : ''}+221&nbsp;{formatLocalPhone(phone)}
          </RecapRow>
          <RecapRow icon="bag" label="Articles" onEdit={() => onEdit(1)}>
            {plural(items.reduce((s, i) => s + i.quantity, 0), 'article', 'articles')}
          </RecapRow>
        </div>
      </section>
    </div>
  )
}

function PayOption({ active, onClick, title, sub, icon, single }) {
  return (
    <button
      type="button" role="radio" aria-checked={active}
      className={`bq-option ${active ? 'is-active' : ''} ${single ? 'is-single' : ''}`} onClick={onClick}
    >
      <span className="bq-option-ico" aria-hidden="true"><Icon name={icon} size={19} /></span>
      <span className="bq-option-text"><b>{title}</b><small>{sub}</small></span>
      {!single && <span className="bq-radio" aria-hidden="true" />}
    </button>
  )
}

function Method({ m, active, onClick }) {
  return (
    <button type="button" role="radio" aria-checked={active} className={`bq-method ${active ? 'is-active' : ''}`} onClick={onClick}>
      <span className="bq-method-mark" style={{ background: m.color }} aria-hidden="true">{m.mark}</span>
      {m.label}
      <span className="bq-radio" aria-hidden="true" />
    </button>
  )
}

function RecapRow({ icon, label, children, onEdit }) {
  return (
    <div className="bq-recap-row">
      <span className="bq-recap-ico" aria-hidden="true"><Icon name={icon} size={16} /></span>
      <div className="bq-recap-body"><small className="bq-recap-label">{label}</small>{children}</div>
      <button type="button" className="bq-textbtn" onClick={onEdit} aria-label={`Modifier : ${label}`}>Modifier</button>
    </div>
  )
}

// Articles + livraison = total ; « payer maintenant » = ce total (ou les
// articles seuls quand la boutique fixe la livraison elle-même)
export function Totals({ itemsTotal, delivery, timing, compact }) {
  const priced = delivery.status === 'ok'
  const total = itemsTotal + (priced ? delivery.quote.total : 0)
  let deliveryCell
  if (priced) deliveryCell = formatPrice(delivery.quote.total)
  else if (delivery.status === 'loading') deliveryCell = <span className="bq-muted">Calcul…</span>
  else if (delivery.status === 'idle') deliveryCell = <span className="bq-muted">À l'étape suivante</span>
  else if (delivery.status === 'out-of-zone') deliveryCell = <span className="bq-muted">Hors zone</span>
  else if (delivery.status === 'error') deliveryCell = <span className="bq-muted">Indisponible</span>
  else if (timing === 'NOW') deliveryCell = <span className="bq-muted">Au coursier</span>
  else deliveryCell = <span className="bq-muted">Fixée par la boutique</span>
  const area = priced && delivery.quote.pickupArea

  return (
    <dl className={`bq-totals ${compact ? 'is-compact' : ''}`}>
      <div><dt>Articles</dt><dd>{formatPrice(itemsTotal)}</dd></div>
      <div><dt>Livraison{area ? <small> depuis {area}</small> : null}</dt><dd>{deliveryCell}</dd></div>
      <div className="is-total">
        <dt>{timing === 'NOW' ? 'À payer maintenant' : priced ? 'Total' : 'Total des articles'}</dt>
        <dd>{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}

// ── Panier ───────────────────────────────────────────────────────────────────
function CartLines({ items, editable, onChange, productsById }) {
  return (
    <ul className="bq-lines">
      {items.map(i => (
        <li key={i.productId} className="bq-line">
          <span className="bq-line-thumb" aria-hidden="true">
            {i.image ? <img src={i.image} alt="" loading="lazy" /> : <Icon name="bag" size={16} />}
          </span>
          <span className="bq-line-name">{i.name}<small>{formatPrice(i.price)}</small></span>
          {editable ? (
            <QtyControl
              qty={i.quantity} size="sm" name={i.name}
              max={productsById.get(i.productId)?.quantity ?? 99}
              onChange={q => onChange(i.productId, q)}
            />
          ) : (
            <span className="bq-line-qty">×&nbsp;{i.quantity}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function ActionButton({ action, submitting, className = '' }) {
  return (
    <button type="button" className={`bq-btn ${className}`} onClick={action.onClick} disabled={action.disabled || submitting} aria-busy={submitting || undefined}>
      {submitting ? <span className="bq-spinner" aria-hidden="true" /> : null}
      {submitting ? 'Envoi…' : action.label}
      {!submitting && action.icon && <Icon name={action.icon} size={18} strokeWidth={2.2} className="bq-btn-arrow" />}
    </button>
  )
}

export function CartPanel({
  items, itemsTotal, delivery, timing, step, action, blocker, submitting, onChange, productsById, reassure, closedNote,
}) {
  return (
    <div className="bq-cart has-corners">
      <i className="bq-corner tl" /><i className="bq-corner tr" /><i className="bq-corner bl" /><i className="bq-corner br" />
      <p className="bq-eyebrow"><span aria-hidden="true" />Votre panier</p>
      {items.length === 0 ? (
        <div className="bq-cart-empty">
          <Icon name="bag" size={26} strokeWidth={1.5} />
          <p>Votre panier est vide. Touchez <b>+</b> sur un article pour l'ajouter.</p>
        </div>
      ) : (
        <>
          <CartLines items={items} editable={step === 1} onChange={onChange} productsById={productsById} />
          <Totals itemsTotal={itemsTotal} delivery={delivery} timing={step === 3 ? timing : null} compact />
        </>
      )}
      {closedNote && <p className="bq-closed-note"><Icon name="clock" size={14} /> {closedNote}</p>}
      <div className="bq-cart-cta">
        <ActionButton action={action} submitting={submitting} />
        {blocker
          ? <p className="bq-help is-error is-center" role="status">{blocker}</p>
          : reassure && <p className="bq-reassure"><Icon name="lock" size={13} /> {reassure}</p>}
      </div>
    </div>
  )
}

// Barre fixe en bas (téléphone, tablette)
export function CartBar({ count, amount, amountLabel, action, submitting, blocker, onOpenCart, canOpen }) {
  return (
    <div className="bq-bar" role="region" aria-label="Panier">
      {blocker && <p className="bq-bar-blocker" role="status"><Icon name="x" size={13} strokeWidth={2.6} /> {blocker}</p>}
      <div className="bq-bar-inner">
        <button type="button" className="bq-bar-info" onClick={onOpenCart} disabled={!canOpen} aria-label={canOpen ? `Voir le panier : ${count} article${count > 1 ? 's' : ''}, ${formatPrice(amount)}` : 'Panier vide'}>
          <small>{amountLabel ?? (count ? plural(count, 'article', 'articles') : 'Panier vide')}</small>
          <b>{formatPrice(amount)}</b>
        </button>
        <ActionButton action={action} submitting={submitting} />
      </div>
    </div>
  )
}

export function CartSheet({ open, onClose, items, itemsTotal, delivery, onChange, productsById, action, accentStyle }) {
  return (
    <Sheet
      open={open} onClose={onClose} title="Votre panier" accentStyle={accentStyle}
      footer={items.length ? <ActionButton action={action} submitting={false} /> : null}
    >
      {items.length === 0 ? (
        <div className="bq-cart-empty"><Icon name="bag" size={26} strokeWidth={1.5} /><p>Votre panier est vide.</p></div>
      ) : (
        <>
          <CartLines items={items} editable onChange={onChange} productsById={productsById} />
          <Totals itemsTotal={itemsTotal} delivery={delivery} timing={null} compact />
        </>
      )}
    </Sheet>
  )
}

// ── Commande envoyée ─────────────────────────────────────────────────────────
export function Success({ merchant, result }) {
  const [copied, setCopied] = useState(false)
  const { id, itemsTotal, deliveryTotal, total, timing, demo } = result
  const link = id ? `${window.location.origin}/suivi/${id}` : null
  const po = merchant.paymentOptions

  async function share() {
    if (!link) return
    const text = `Ma commande chez ${merchant.name} — suivi : ${link}`
    if (navigator.share) {
      try { await navigator.share({ title: 'Suivi de commande DEM', text, url: link }); return } catch { /* annulé */ }
    }
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* presse-papiers refusé : le lien reste affiché */ }
  }

  const payLine = timing === 'NOW'
    ? 'Paiement en ligne confirmé'
    : merchant.legacyPayment
      ? 'Vous payez à la réception, comme choisi'
      : `Vous payez à l'arrivée du coursier${po.onDeliveryOnline ? ', en ligne' : ''}${po.onDeliveryCash ? ' ou en espèces' : ''}`

  return (
    <div className="bq-success">
      <span className="bq-success-badge" aria-hidden="true"><Icon name="check" size={30} strokeWidth={2.6} /></span>
      <p className="bq-eyebrow"><span aria-hidden="true" />Commande envoyée</p>
      <h2 className="bq-h1">Merci, c'est noté<span className="bq-dot">.</span></h2>
      <p className="bq-lead">{merchant.name} a bien reçu votre commande.</p>

      <dl className="bq-totals is-compact bq-success-totals">
        <div><dt>Articles</dt><dd>{formatPrice(itemsTotal)}</dd></div>
        <div><dt>Livraison</dt><dd>{deliveryTotal != null ? formatPrice(deliveryTotal) : <span className="bq-muted">Fixée par la boutique</span>}</dd></div>
        <div className="is-total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>
      {id && <p className="bq-ref">N°&nbsp;{id.slice(0, 8).toUpperCase()}</p>}
      {demo && <p className="bq-help is-center">Démonstration : aucune commande n'a été envoyée.</p>}

      <ol className="bq-next">
        <li><span>01</span><div><b>{merchant.name} confirme</b><small>Vous suivez chaque étape en direct.</small></div></li>
        <li><span>02</span><div><b>Un coursier DEM récupère votre commande</b><small>Puis vous la livre à l'adresse indiquée.</small></div></li>
        <li><span>03</span><div><b>{payLine}</b><small>{timing === 'NOW' ? 'Rien à régler à la livraison.' : 'Le montant total est affiché sur votre suivi.'}</small></div></li>
      </ol>

      {link && (
        <div className="bq-success-actions">
          <Link to={`/suivi/${id}`} className="bq-btn"><Icon name="route" size={18} /> Suivre ma commande</Link>
          <button type="button" className="bq-btn is-outline" onClick={share}>
            <Icon name={copied ? 'check' : 'share'} size={18} /> {copied ? 'Lien copié' : 'Garder le lien de suivi'}
          </button>
        </div>
      )}
    </div>
  )
}
