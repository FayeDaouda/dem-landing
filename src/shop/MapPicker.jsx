import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './tracking.css'
import { DAKAR, L, baseMap, destIcon } from './map.js'
import { Icon } from './ui.jsx'

// Point de livraison sur la carte, en deux temps :
// - un APERÇU dans la page, figé (sur téléphone, le doigt fait défiler la
//   page, il ne « prend » pas la carte) ; un tap l'ouvre en grand ;
// - le MODE PLEIN ÉCRAN, comme les apps de VTC : on déplace la carte sous
//   un repère fixe au centre, l'adresse se met à jour en direct, puis
//   « Confirmer ce point ». Position actuelle à un tap.
// Chargé à la demande (Leaflet) depuis la boutique.
export default function MapPicker({ value, accuracy, onChange, reverse, openOnMount = false, onOpenChange }) {
  const [open, setOpen] = useState(openOnMount)
  const setOpenAndNotify = v => { setOpen(v); onOpenChange?.(v) }

  return (
    <>
      <MapPreview value={value} accuracy={accuracy} onOpen={() => setOpenAndNotify(true)} />
      {open && createPortal(
        <MapSheet
          initial={value}
          reverse={reverse}
          onCancel={() => setOpenAndNotify(false)}
          onConfirm={(lat, lng, address) => { setOpenAndNotify(false); onChange(lat, lng, 'map', address) }}
        />,
        document.body,
      )}
    </>
  )
}

// ── Aperçu figé dans la page ────────────────────────────────────────────────
function MapPreview({ value, accuracy, onOpen }) {
  const el = useRef(null)
  const map = useRef(null)
  const marker = useRef(null)
  const circle = useRef(null)

  useEffect(() => {
    if (!el.current || map.current) return
    const m = baseMap(el.current, {
      zoomButtons: false, dragging: false, touchZoom: false, doubleClickZoom: false,
      scrollWheelZoom: false, boxZoom: false, keyboard: false, tap: false,
    })
    m.setView(value ? [value.lat, value.lng] : DAKAR, value ? 16 : 12)
    map.current = m
    const ro = new ResizeObserver(() => m.invalidateSize())
    ro.observe(el.current)
    return () => { ro.disconnect(); m.remove(); map.current = null; marker.current = null; circle.current = null }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const m = map.current
    if (!m) return
    marker.current?.remove(); marker.current = null
    circle.current?.remove(); circle.current = null
    if (!value) { m.setView(DAKAR, 12); return }
    const ll = [value.lat, value.lng]
    marker.current = L.marker(ll, { icon: destIcon, interactive: false, keyboard: false }).addTo(m)
    if (accuracy) {
      circle.current = L.circle(ll, { radius: accuracy, color: '#b7791f', weight: 1, fillColor: '#f6c76b', fillOpacity: 0.18, interactive: false }).addTo(m)
      m.fitBounds(circle.current.getBounds(), { padding: [20, 20] })
    } else {
      m.setView(ll, 16)
    }
  }, [value, accuracy])

  return (
    <button type="button" className="ds-picker" onClick={onOpen} aria-label={value ? 'Ajuster le point de livraison sur la carte' : 'Placer le point de livraison sur la carte'}>
      <div ref={el} className="ds-picker-map" aria-hidden="true" />
      <span className="ds-picker-cta">
        <Icon name="pin" size={16} />
        {value ? 'Ajuster sur la carte' : 'Placer sur la carte'}
      </span>
    </button>
  )
}

// ── Plein écran : la carte bouge sous un repère fixe ─────────────────────────
function MapSheet({ initial, reverse, onCancel, onConfirm }) {
  const el = useRef(null)
  const map = useRef(null)
  const seq = useRef(0)
  const [center, setCenter] = useState(initial ?? null)
  const [moving, setMoving] = useState(false)
  const [address, setAddress] = useState(null) // null = en recherche
  const [gps, setGps] = useState(false)

  // Page derrière : immobile tant que la carte est ouverte
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onCancel])

  useEffect(() => {
    if (!el.current || map.current) return
    const m = baseMap(el.current, { zoomButtons: !L.Browser.mobile, scrollWheelZoom: 'center', touchZoom: 'center', tap: false })
    m.setView(initial ? [initial.lat, initial.lng] : DAKAR, initial ? 17 : 13)
    m.on('movestart', () => setMoving(true))
    m.on('moveend', () => {
      setMoving(false)
      const c = m.getCenter()
      setCenter({ lat: c.lat, lng: c.lng })
    })
    map.current = m
    const c = m.getCenter()
    setCenter({ lat: c.lat, lng: c.lng })
    setTimeout(() => m.invalidateSize(), 50)
    return () => { m.remove(); map.current = null }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Adresse du point visé, une fois la carte immobile
  useEffect(() => {
    if (!center || moving) return
    const id = ++seq.current
    setAddress(null)
    const t = setTimeout(async () => {
      const found = reverse ? await reverse(center.lat, center.lng) : null
      if (seq.current === id) setAddress(found || 'Point sélectionné sur la carte')
    }, 350)
    return () => clearTimeout(t)
  }, [center, moving, reverse])

  function locate() {
    if (!navigator.geolocation) return
    setGps(true)
    navigator.geolocation.getCurrentPosition(
      pos => { setGps(false); map.current?.setView([pos.coords.latitude, pos.coords.longitude], 18, { animate: true }) },
      () => setGps(false),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  return (
    <div className="ds ds-mapsheet" role="dialog" aria-modal="true" aria-label="Placer le point de livraison">
      <div ref={el} className="ds-mapsheet-map" />

      {/* Repère fixe au centre : se soulève pendant le déplacement */}
      <div className={`ds-mapsheet-pin ${moving ? 'is-moving' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 34 44" width="40" height="52">
          <path d="M17 43s15-13.6 15-25.5A15 15 0 0 0 2 17.5C2 29.4 17 43 17 43z" fill="#d93a3a" stroke="#fff" strokeWidth="2.5" />
          <circle cx="17" cy="17.5" r="5.5" fill="#fff" />
        </svg>
        <span className="ds-mapsheet-shadow" />
      </div>

      <div className="ds-mapsheet-top">
        <button type="button" className="ds-mapsheet-round" onClick={onCancel} aria-label="Fermer la carte">
          <Icon name="x" size={20} />
        </button>
        <div className="ds-mapsheet-title">Déplacez la carte sous le repère</div>
      </div>

      <button type="button" className="ds-mapsheet-round ds-mapsheet-locate" onClick={locate} disabled={gps} aria-label="Ma position actuelle">
        {gps ? <span className="ds-spinner" style={{ borderColor: 'rgba(6,113,186,0.25)', borderTopColor: 'var(--ds-blue)' }} /> : <Icon name="crosshair" size={20} />}
      </button>

      <div className="ds-mapsheet-panel">
        <small>Point de livraison</small>
        <div className="ds-mapsheet-address">
          <Icon name="pin" size={18} />
          {address == null || moving
            ? <span className="ds-skel" style={{ height: 18, width: '70%', display: 'inline-block' }} />
            : <span>{address}</span>}
        </div>
        <button
          type="button" className="ds-btn ds-btn-primary"
          disabled={!center || moving}
          onClick={() => onConfirm(center.lat, center.lng, address)}
        >
          <Icon name="check" size={18} strokeWidth={2.6} /> Confirmer ce point
        </button>
      </div>
    </div>
  )
}
