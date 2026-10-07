import { useEffect, useRef } from 'react'
import './tracking.css'
import { DAKAR, L, baseMap, destIcon } from './map.js'

// Placement de l'adresse de livraison : repère déplaçable, ou tap sur la
// carte pour le poser. Chargé à la demande (Leaflet) depuis la boutique.
export default function MapPicker({ value, accuracy, onChange }) {
  const el = useRef(null)
  const map = useRef(null)
  const marker = useRef(null)
  const circle = useRef(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!el.current || map.current) return
    const m = baseMap(el.current, { scrollWheelZoom: false })
    m.setView(value ? [value.lat, value.lng] : DAKAR, value ? 17 : 12)
    m.on('click', e => onChangeRef.current(e.latlng.lat, e.latlng.lng, 'map'))
    map.current = m
    const ro = new ResizeObserver(() => m.invalidateSize())
    ro.observe(el.current)
    return () => { ro.disconnect(); m.remove(); map.current = null; marker.current = null; circle.current = null }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const m = map.current
    if (!m) return
    if (!value) {
      marker.current?.remove(); marker.current = null
      circle.current?.remove(); circle.current = null
      return
    }
    const ll = [value.lat, value.lng]
    if (!marker.current) {
      marker.current = L.marker(ll, { icon: destIcon, draggable: true, autoPan: true, title: 'Adresse de livraison' }).addTo(m)
      marker.current.on('dragend', () => {
        const p = marker.current.getLatLng()
        onChangeRef.current(p.lat, p.lng, 'drag')
      })
    } else {
      marker.current.setLatLng(ll)
    }
    // Cercle de précision du GPS, tant que la position n'a pas été ajustée
    circle.current?.remove(); circle.current = null
    if (accuracy) {
      circle.current = L.circle(ll, { radius: accuracy, color: '#b7791f', weight: 1, fillColor: '#f6c76b', fillOpacity: 0.18, interactive: false }).addTo(m)
    }
    // Position imprécise : tout le cercle à l'écran, pour voir l'incertitude
    if (circle.current) m.fitBounds(circle.current.getBounds(), { padding: [24, 24], animate: true })
    else if (!m.getBounds().pad(-0.2).contains(ll)) m.setView(ll, Math.max(m.getZoom(), 16), { animate: true })
  }, [value, accuracy])

  return (
    <div className="ds-picker">
      <div ref={el} className="ds-picker-map" aria-label="Carte : placez votre adresse" />
      <span className="ds-picker-hint">{value ? 'Déplacez le repère si besoin' : 'Touchez la carte à l\'endroit de la livraison'}</span>
    </div>
  )
}
