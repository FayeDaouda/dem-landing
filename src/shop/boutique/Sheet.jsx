import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../ui.jsx'

// Fenêtre de la boutique : feuille qui monte du bas sur téléphone, fenêtre
// centrée sur ordinateur. Échap et le voile la ferment ; le focus y entre,
// y reste (Tab boucle) et revient sur le bouton d'origine à la fermeture.
export default function Sheet({ open, onClose, title, label, children, footer, wide = false, accentStyle }) {
  const panel = useRef(null)
  const titleId = useId()
  // Fermeture lue au moment voulu : un onClose recréé à chaque rendu ne
  // relance pas l'effet (le focus ne saute pas pendant la saisie)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () => [...(panel.current?.querySelectorAll(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ) || [])]
    requestAnimationFrame(() => (panel.current?.querySelector('[data-autofocus]') || focusables()[0])?.focus())
    const onKey = e => {
      if (e.key === 'Escape') { e.stopPropagation(); closeRef.current() }
      if (e.key !== 'Tab') return
      const list = focusables()
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      if (opener && typeof opener.focus === 'function') opener.focus()
    }
  }, [open])

  if (!open) return null
  return createPortal(
    <div className="bq bq-sheet-root" style={accentStyle}>
      <div className="bq-sheet-veil" onClick={onClose} aria-hidden="true" />
      <div
        ref={panel}
        className={`bq-sheet ${wide ? 'is-wide' : ''}`}
        role="dialog" aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : label}
      >
        <span className="bq-sheet-grip" aria-hidden="true" />
        <div className="bq-sheet-head">
          {title && <h2 id={titleId} className="bq-sheet-title">{title}</h2>}
          <button type="button" className="bq-iconbtn bq-sheet-close" onClick={onClose} aria-label="Fermer">
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="bq-sheet-body">{children}</div>
        {footer && <div className="bq-sheet-foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
