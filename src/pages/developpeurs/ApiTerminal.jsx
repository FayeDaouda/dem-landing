import { useEffect, useRef, useState } from 'react'
import { highlight } from './highlight.jsx'

// Terminal animé du haut de la page /developpeurs : la requête s'écrit,
// la réponse s'affiche, puis scène suivante (devis → livraison → webhook).
// En pause hors de l'écran ; état final direct si l'utilisateur a coupé les
// animations (prefers-reduced-motion). Hauteur fixe : rien ne bouge autour.

const SCENES = [
  {
    tab: 'devis',
    command: 'curl -X POST https://api.dem.sn/v1/quotes \\\n  -H "Authorization: Bearer dem_live_••••" \\\n  -d \'{ "pickup": "Point E", "dropoff": "Almadies" }\'',
    status: '201 Created',
    response: '{\n  "quote_id": "quote_8fK2mQ1x",\n  "price": 1850,\n  "currency": "XOF",\n  "estimated_duration_minutes": 18\n}',
  },
  {
    tab: 'livraison',
    command: 'curl -X POST https://api.dem.sn/v1/deliveries \\\n  -H "Idempotency-Key: CMD-45892" \\\n  -d \'{ "quote_id": "quote_8fK2mQ1x", … }\'',
    status: '201 Created',
    response: '{\n  "id": "del_3kQm9xV2",\n  "status": "SEARCHING_DRIVER",\n  "tracking_url": "https://api.dem.sn/track/…"\n}',
  },
  {
    tab: 'webhook',
    command: '# Votre site reçoit :\nPOST /dem/webhook\nX-DEM-Event: delivery.delivered',
    status: '200 OK',
    response: '{\n  "type": "delivery.delivered",\n  "data": { "object": {\n    "id": "del_3kQm9xV2",\n    "status": "DELIVERED",\n    "external_order_id": "CMD-45892"\n  } }\n}',
  },
]

const TYPE_MS = 18          // vitesse de frappe
const BEFORE_RESPONSE = 450 // « temps réseau »
const LINE_MS = 90          // apparition des lignes de réponse
const HOLD_MS = 2600        // pause avant la scène suivante

export default function ApiTerminal() {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [scene, setScene] = useState(0)
  const [typed, setTyped] = useState(reduce ? SCENES[0].command.length : 0)
  const [lines, setLines] = useState(reduce ? 99 : 0)
  const [visible, setVisible] = useState(true)
  const box = useRef(null)

  // Pause quand le terminal n'est pas à l'écran
  useEffect(() => {
    if (!box.current || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 })
    io.observe(box.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduce || !visible) return
    const s = SCENES[scene]
    const total = s.response.split('\n').length
    let t
    if (typed < s.command.length) {
      t = setTimeout(() => setTyped(n => Math.min(s.command.length, n + 2)), TYPE_MS)
    } else if (lines < total) {
      t = setTimeout(() => setLines(n => n + 1), lines === 0 ? BEFORE_RESPONSE : LINE_MS)
    } else {
      t = setTimeout(() => {
        setScene(i => (i + 1) % SCENES.length)
        setTyped(0)
        setLines(0)
      }, HOLD_MS)
    }
    return () => clearTimeout(t)
  }, [scene, typed, lines, visible, reduce])

  const s = SCENES[scene]
  const responseLines = s.response.split('\n')
  const done = typed >= s.command.length

  return (
    <div ref={box} className="w-full bg-[#0A0F1E] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,134,200,0.45)] font-mono text-[12px] sm:text-[13px] leading-relaxed select-none" aria-hidden="true">
      {/* Barre de fenêtre */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <div className="ml-3 flex gap-1">
          {SCENES.map((sc, i) => (
            <span key={sc.tab} className={`px-2 py-0.5 text-[10.5px] uppercase tracking-wider transition-colors duration-300 ${i === scene ? 'bg-[#00D2FF]/15 text-[#00D2FF]' : 'text-white/35'}`}>
              {sc.tab}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5 h-[350px] sm:h-[318px] overflow-hidden">
        {/* Requête */}
        <pre className="whitespace-pre-wrap break-words text-white/90">
          <span className="text-[#00E08C]">$ </span>
          {highlight(s.command.slice(0, typed), s.tab === 'webhook' ? 'http' : 'bash')}
          {!done && <span className="inline-block w-[7px] h-[14px] -mb-[2px] bg-[#00D2FF] animate-pulse" />}
        </pre>

        {/* Réponse */}
        <div className={`mt-4 transition-opacity duration-300 ${lines > 0 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#00E08C] opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#00E08C]" />
            </span>
            <span className="text-[#00E08C] font-semibold">{s.status}</span>
            <span className="text-white/30">· {s.tab === 'webhook' ? 'signature vérifiée' : 'req_mv78z6a2d27c'}</span>
          </div>
          <pre className="whitespace-pre-wrap break-words text-white/85">
            {highlight(responseLines.slice(0, lines).join('\n'), 'json')}
          </pre>
        </div>
      </div>
    </div>
  )
}
