import { Suspense, lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './shop/position.css'
import { API_URL, Icon, useLightPage, useNoZoom } from './shop/ui.jsx'

// Carte (Leaflet) chargée seulement si le destinataire en a besoin
const MapPicker = lazy(() => import('./shop/MapPicker.jsx'))

// « Il envoie sa position » — page ouverte depuis le SMS DEM
// (api.dem.sn/p/:token → dem.sn/position/:token). Le destinataire, sans
// app ni compte, partage sa position GPS (ajustable sur la carte) et un
// repère ; le client DEM la reçoit en direct pour sa course.
// La page ne montre que le prénom du client (ou le nom du commerce).

const BLUE = '#0757B4'

async function reverse(lat, lng) {
  try {
    const res = await fetch(`${API_URL}/public/places/reverse-geocode?lat=${lat}&lng=${lng}`)
    if (!res.ok) return null
    const data = await res.json()
    return data.address || data.label || null
  } catch {
    return null
  }
}

export default function Position() {
  const { token } = useParams()
  useNoZoom()
  useLightPage(BLUE)

  const [info, setInfo] = useState(null)      // { from, receiverName, shared }
  const [error, setError] = useState(null)    // message bloquant (lien expiré…)
  const [coords, setCoords] = useState(null)  // { lat, lng }
  const [accuracy, setAccuracy] = useState(null)
  const [address, setAddress] = useState('')
  const [landmark, setLandmark] = useState('')
  const [gps, setGps] = useState({ loading: false, error: null })
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(`${API_URL}/public/position/${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then(async res => {
        const data = await res.json().catch(() => ({}))
        if (!alive) return
        if (!res.ok) setError(data.message || 'Lien introuvable.')
        else setInfo(data)
      })
      .catch(() => alive && setError('Connexion impossible. Vérifiez votre réseau puis rechargez la page.'))
    return () => { alive = false }
  }, [token])

  function locate() {
    if (!navigator.geolocation) {
      setGps({ loading: false, error: 'Votre téléphone ne donne pas sa position : placez-vous sur la carte.' })
      return
    }
    setGps({ loading: true, error: null })
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng, accuracy: acc } = pos.coords
        setCoords({ lat, lng })
        setAccuracy(acc > 60 ? Math.round(acc) : null)
        setGps({ loading: false, error: null })
        setAddress((await reverse(lat, lng)) || '')
      },
      err => setGps({
        loading: false,
        error: err.code === err.PERMISSION_DENIED
          ? 'Localisation refusée. Autorisez-la dans votre navigateur, ou placez-vous sur la carte.'
          : 'Position introuvable. Sortez un instant à l\'extérieur, ou placez-vous sur la carte.',
      }),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    )
  }

  function onMapChange(lat, lng, _source, found) {
    setCoords({ lat, lng })
    setAccuracy(null)
    setAddress(found && found !== 'Point sélectionné sur la carte' ? found : '')
  }

  async function send() {
    if (!coords || sending) return
    setSending(true)
    setSendError(null)
    try {
      const res = await fetch(`${API_URL}/public/position/${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: coords.lat, longitude: coords.lng, accuracy, landmark: landmark.trim() || undefined }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (res.status === 410) setError(data.message)
        else setSendError(data.message || 'Envoi impossible. Réessayez.')
        return
      }
      setSent(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setSendError('Connexion impossible. Vérifiez votre réseau puis réessayez.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="dp">
      <header className="dp-top">
        <Logo />
      </header>

      <main className="dp-main">
        {error ? (
          <section className="dp-card dp-center" role="alert">
            <span className="dp-badge dp-badge-muted"><Icon name="linkOff" size={26} /></span>
            <h1 className="dp-title-dark">Lien plus valable</h1>
            <p className="dp-muted">{error}</p>
          </section>
        ) : !info ? (
          <section className="dp-hero" aria-busy="true">
            <div className="dp-skel dp-skel-l" />
            <div className="dp-skel dp-skel-s" />
          </section>
        ) : sent ? (
          <Sent from={info.from} onEdit={() => setSent(false)} />
        ) : (
          <>
            <section className="dp-hero">
              <span className="dp-chip"><Icon name="box" size={14} /> Un colis arrive</span>
              <h1 className="dp-title">
                {info.receiverName ? `${info.receiverName}, ` : ''}<span className="dp-hl">{info.from}</span> veut vous livrer un colis.
              </h1>
              <p className="dp-sub">Indiquez où vous êtes : le livreur DEM viendra directement à vous. Sans application.</p>
            </section>

            <section className="dp-card">
              {!coords ? (
                <>
                  <button type="button" className="dp-cta" onClick={locate} disabled={gps.loading}>
                    {gps.loading
                      ? <><span className="dp-spin" aria-hidden="true" /> Recherche de votre position…</>
                      : <><Icon name="crosshair" size={20} /> Envoyer ma position</>}
                  </button>
                  {gps.error && <p className="dp-error" role="alert">{gps.error}</p>}
                  <div className="dp-or"><span>ou</span></div>
                  <Suspense fallback={<div className="dp-map-skel" />}>
                    <MapPicker value={null} accuracy={null} onChange={onMapChange} reverse={reverse} />
                  </Suspense>
                </>
              ) : (
                <>
                  <div className="dp-step"><span className="dp-num">1</span> Votre position</div>
                  <Suspense fallback={<div className="dp-map-skel" />}>
                    <MapPicker value={coords} accuracy={accuracy} onChange={onMapChange} reverse={reverse} />
                  </Suspense>
                  <p className="dp-addr">
                    <Icon name="pin" size={16} />
                    <span>{address || 'Position trouvée'}</span>
                  </p>
                  {accuracy && <p className="dp-hint">Position approximative (± {accuracy} m) : touchez la carte pour l'ajuster.</p>}

                  <label className="dp-step" htmlFor="dp-landmark"><span className="dp-num">2</span> Un repère <span className="dp-opt">(facultatif)</span></label>
                  <textarea
                    id="dp-landmark"
                    className="dp-input"
                    rows={2}
                    maxLength={160}
                    placeholder="Ex. : portail vert, en face de la pharmacie"
                    value={landmark}
                    onChange={e => setLandmark(e.target.value)}
                  />

                  {sendError && <p className="dp-error" role="alert">{sendError}</p>}
                  <button type="button" className="dp-cta" onClick={send} disabled={sending}>
                    {sending
                      ? <><span className="dp-spin" aria-hidden="true" /> Envoi…</>
                      : <>Envoyer à {info.from} <Icon name="arrowRight" size={18} /></>}
                  </button>
                  <button type="button" className="dp-link" onClick={locate} disabled={gps.loading}>
                    <Icon name="refresh" size={15} /> Reprendre ma position actuelle
                  </button>
                </>
              )}
            </section>

            <p className="dp-foot"><Icon name="lock" size={14} /> Votre position n'est envoyée qu'à {info.from}, pour cette livraison.</p>
          </>
        )}
      </main>
    </div>
  )
}

function Sent({ from, onEdit }) {
  return (
    <section className="dp-hero dp-center">
      <span className="dp-badge"><Icon name="check" size={30} strokeWidth={2.6} /></span>
      <h1 className="dp-title">Position <span className="dp-hl">envoyée.</span></h1>
      <p className="dp-sub">{from} l'a reçue. Le livreur DEM saura où vous trouver. Gardez votre téléphone à portée : il peut vous appeler.</p>
      <button type="button" className="dp-ghost" onClick={onEdit}>Corriger ma position</button>
      <a className="dp-ghost dp-ghost-plain" href="/download">Découvrir l'app DEM</a>
    </section>
  )
}

function Logo() {
  return (
    <a href="/" className="dp-logo" aria-label="DEM, accueil">
      <span className="dp-lines" aria-hidden="true"><i /><i /><i /></span>
      <span className="dp-word">DEM</span>
    </a>
  )
}
