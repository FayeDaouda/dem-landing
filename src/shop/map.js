// Réglages et repères de carte partagés (suivi, placement de l'adresse).
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export { L }

export const TILE_URL = import.meta.env.VITE_MAP_TILE_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
export const TILE_ATTRIBUTION = import.meta.env.VITE_MAP_TILE_ATTRIBUTION
  || '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
export const DAKAR = [14.7167, -17.4677]

export const destIcon = L.divIcon({
  className: '',
  iconSize: [34, 44],
  iconAnchor: [17, 42],
  html: `<svg class="dt-marker-dest" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 43s15-13.6 15-25.5A15 15 0 0 0 2 17.5C2 29.4 17 43 17 43z" fill="#d93a3a" stroke="#fff" stroke-width="2.5"/>
    <circle cx="17" cy="17.5" r="5.5" fill="#fff"/></svg>`,
})

export const driverIcon = L.divIcon({
  className: '',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
  html: `<div class="dt-marker-driver"><span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="16.5" r="3"/><circle cx="18" cy="16.5" r="3"/><path d="M6 16.5l4-7h4l4 7"/><path d="M14 9.5l-1.5-3H10"/></svg></span></div>`,
})

export function baseMap(el, options = {}) {
  const m = L.map(el, { zoomControl: false, attributionControl: true, ...options })
  L.control.zoom({ position: 'topright' }).addTo(m)
  L.tileLayer(TILE_URL, { maxZoom: 19, attribution: TILE_ATTRIBUTION }).addTo(m)
  return m
}
