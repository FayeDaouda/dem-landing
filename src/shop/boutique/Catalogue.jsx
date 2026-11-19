import { useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '../ui.jsx'
import Sheet from './Sheet.jsx'
import { formatPrice, safeImage } from './format.js'

// Catalogue : recherche, catégories, « À la une », grille ou liste, fiche
// produit. En lecture seule quand la boutique est en pause.

const photosOf = p => {
  const list = Array.isArray(p.images) ? p.images.map(safeImage).filter(Boolean) : []
  const main = safeImage(p.image)
  return main && !list.includes(main) ? [main, ...list] : list
}
const soldOut = p => p.quantity != null && p.quantity <= 0
const maxQty = p => (p.quantity != null ? p.quantity : 99)

export default function Catalogue({ products, cart, onChange, featuredIds, layout, readOnly, accentStyle }) {
  const [category, setCategory] = useState('Tous')
  const [query, setQuery] = useState('')
  const [opened, setOpened] = useState(null) // produit affiché en fiche

  const categories = useMemo(() => {
    const set = new Set((products || []).map(p => p.category?.trim()).filter(Boolean))
    return [...set].sort((a, b) => a.localeCompare(b, 'fr'))
  }, [products])

  const featured = useMemo(() => {
    // Ordre choisi par la boutique : featuredRank, sinon l'ordre de featuredProductIds
    const order = new Map((featuredIds || []).map((id, i) => [id, i + 1]))
    const rank = p => p.featuredRank ?? order.get(p.id) ?? 99
    return (products || [])
      .filter(p => order.has(p.id) || p.featured === true)
      .sort((a, b) => rank(a) - rank(b))
  }, [products, featuredIds])

  const visible = useMemo(() => {
    let list = products || []
    if (category !== 'Tous') list = list.filter(p => p.category?.trim() === category)
    const q = query.trim().toLocaleLowerCase('fr')
    if (q) list = list.filter(p => `${p.name} ${p.category || ''}`.toLocaleLowerCase('fr').includes(q))
    return list
  }, [products, category, query])

  const filtering = category !== 'Tous' || query.trim() !== ''

  if (products === null) {
    return (
      <div className="bq-grid" aria-busy="true" aria-label="Chargement du catalogue">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="bq-card">
            <div className="bq-card-media bq-skel" />
            <div className="bq-card-body">
              <div className="bq-skel" style={{ height: 14, width: '80%' }} />
              <div className="bq-skel" style={{ height: 16, width: '45%', marginTop: 10 }} />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bq-empty">
        <Icon name="bag" size={30} strokeWidth={1.5} />
        <p>Cette boutique n'a pas encore d'articles en ligne.</p>
      </div>
    )
  }

  const card = (p, i, variant) => (
    <ProductCard
      key={`${variant}-${p.id}`} product={p} qty={cart[p.id] || 0} index={i} variant={variant}
      readOnly={readOnly} onChange={q => onChange(p.id, q)} onOpen={() => setOpened(p)}
    />
  )

  return (
    <div className="bq-catalogue">
      {products.length > 3 && (
        <div className="bq-search">
          <Icon name="search" size={18} />
          <label htmlFor="bq-search" className="bq-sr">Rechercher un article</label>
          <input
            id="bq-search" type="search" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un article" autoComplete="off" enterKeyHint="search"
          />
          {query && (
            <button type="button" className="bq-search-clear" onClick={() => setQuery('')} aria-label="Effacer la recherche">
              <Icon name="x" size={16} />
            </button>
          )}
        </div>
      )}

      {categories.length > 1 && (
        <div className="bq-chips" role="group" aria-label="Catégories">
          {['Tous', ...categories].map(c => (
            <button
              key={c} type="button" aria-pressed={category === c}
              className={`bq-chip ${category === c ? 'is-active' : ''}`} onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
      )}

      {!filtering && featured.length > 0 && (
        <section className="bq-featured" aria-labelledby="bq-featured-title">
          <h2 id="bq-featured-title" className="bq-subhead">À la une</h2>
          <div className="bq-featured-row">{featured.map((p, i) => card(p, i, 'featured'))}</div>
        </section>
      )}

      {filtering && (
        <p className="bq-count" aria-live="polite">
          {visible.length === 0 ? 'Aucun article' : `${visible.length} article${visible.length > 1 ? 's' : ''}`}
          {query.trim() ? ` pour « ${query.trim()} »` : ''}
        </p>
      )}

      {visible.length === 0 ? (
        <div className="bq-empty">
          <Icon name="search" size={28} strokeWidth={1.5} />
          <p>Aucun article ne correspond à votre recherche.</p>
          <button type="button" className="bq-textbtn" onClick={() => { setQuery(''); setCategory('Tous') }}>Voir tout le catalogue</button>
        </div>
      ) : (
        <div className={layout === 'list' ? 'bq-list' : 'bq-grid'}>
          {visible.map((p, i) => card(p, i, layout === 'list' ? 'list' : 'grid'))}
        </div>
      )}

      <ProductSheet
        product={opened} qty={opened ? cart[opened.id] || 0 : 0} readOnly={readOnly} accentStyle={accentStyle}
        onClose={() => setOpened(null)}
        onConfirm={q => { onChange(opened.id, q); setOpened(null) }}
      />
    </div>
  )
}

function Thumb({ product, sizes }) {
  const [failed, setFailed] = useState(false)
  const src = photosOf(product)[0]
  return src && !failed
    ? <img src={src} alt="" loading="lazy" decoding="async" sizes={sizes} onError={() => setFailed(true)} />
    : <span className="bq-noimg"><Icon name="bag" size={28} strokeWidth={1.4} /></span>
}

function ProductCard({ product: p, qty, index, variant, readOnly, onChange, onOpen }) {
  const out = soldOut(p)
  const low = !out && p.quantity != null && p.quantity <= 5
  return (
    <article
      className={`bq-card is-${variant} ${qty ? 'is-in-cart' : ''} ${out ? 'is-out' : ''}`}
      style={{ '--i': Math.min(index, 10) }}
    >
      <button type="button" className="bq-card-media" onClick={onOpen} tabIndex={-1} aria-hidden="true">
        <Thumb product={p} />
        {out && <span className="bq-soldout">Épuisé</span>}
      </button>
      <div className="bq-card-body">
        <h3 className="bq-card-name">
          <button type="button" onClick={onOpen}>{p.name}</button>
        </h3>
        {variant === 'list' && p.description && <p className="bq-card-desc">{p.description}</p>}
        {low && <span className="bq-stock">Plus que {p.quantity}</span>}
        <div className="bq-card-foot">
          {p.defaultPrice != null
            ? <span className="bq-price">{formatPrice(p.defaultPrice)}</span>
            : <span className="bq-price is-muted">Prix à confirmer</span>}
          {!readOnly && (
            <QtyControl
              qty={qty} max={maxQty(p)} disabled={out} name={p.name}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export function QtyControl({ qty, max, disabled, name, onChange, size }) {
  if (qty === 0) {
    return (
      <button
        type="button" className={`bq-add ${size === 'sm' ? 'is-sm' : ''}`} onClick={() => onChange(1)} disabled={disabled}
        aria-label={disabled ? `${name} : épuisé` : `Ajouter ${name} au panier`}
      >
        <Icon name="plus" size={18} strokeWidth={2.4} />
      </button>
    )
  }
  return (
    <div className={`bq-stepper ${size === 'sm' ? 'is-sm' : ''}`} role="group" aria-label={`Quantité de ${name}`}>
      <button type="button" onClick={() => onChange(qty - 1)} aria-label={qty === 1 ? `Retirer ${name} du panier` : `Retirer un ${name}`}>
        <Icon name="minus" size={16} strokeWidth={2.4} />
      </button>
      <output aria-live="polite">{qty}</output>
      <button type="button" onClick={() => onChange(qty + 1)} disabled={qty >= max} aria-label={`Ajouter un ${name}`}>
        <Icon name="plus" size={16} strokeWidth={2.4} />
      </button>
    </div>
  )
}

// ── Fiche produit ────────────────────────────────────────────────────────────
function ProductSheet({ product, qty, readOnly, accentStyle, onClose, onConfirm }) {
  const [count, setCount] = useState(1)
  const [slide, setSlide] = useState(0)
  const track = useRef(null)

  useEffect(() => {
    if (product) { setCount(Math.max(1, qty)); setSlide(0) }
  }, [product]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!product) return <Sheet open={false} onClose={onClose} />
  const p = product
  const photos = photosOf(p)
  const out = soldOut(p)
  const max = maxQty(p)
  const price = p.defaultPrice ?? 0

  const footer = readOnly ? null : (
    <div className="bq-sheet-actions">
      <div className="bq-stepper is-lg" role="group" aria-label="Quantité">
        <button type="button" onClick={() => setCount(c => Math.max(1, c - 1))} disabled={count <= 1 || out} aria-label="Un de moins">
          <Icon name="minus" size={18} strokeWidth={2.4} />
        </button>
        <output aria-live="polite">{count}</output>
        <button type="button" onClick={() => setCount(c => Math.min(max, c + 1))} disabled={count >= max || out} aria-label="Un de plus">
          <Icon name="plus" size={18} strokeWidth={2.4} />
        </button>
      </div>
      <button type="button" className="bq-btn" onClick={() => onConfirm(count)} disabled={out}>
        {out ? 'Épuisé' : qty ? 'Mettre à jour' : 'Ajouter au panier'}
        {!out && p.defaultPrice != null && <span className="bq-btn-amount">{formatPrice(price * count)}</span>}
      </button>
    </div>
  )

  return (
    <Sheet open onClose={onClose} label={p.name} wide accentStyle={accentStyle} footer={footer}>
      <div className="bq-pd">
        <div className="bq-pd-media">
          {photos.length > 0 ? (
            <>
              <div
                className="bq-pd-track" ref={track}
                onScroll={e => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
              >
                {photos.map((src, i) => <PdPhoto key={src} src={src} eager={i === 0} />)}
              </div>
              {photos.length > 1 && (
                <div className="bq-pd-dots" role="group" aria-label="Photos">
                  {photos.map((src, i) => (
                    <button
                      key={src} type="button" aria-label={`Photo ${i + 1} sur ${photos.length}`} aria-current={slide === i}
                      onClick={() => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' })}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <span className="bq-noimg is-lg"><Icon name="bag" size={44} strokeWidth={1.2} /></span>
          )}
          {out && <span className="bq-soldout">Épuisé</span>}
        </div>
        <div className="bq-pd-info">
          {p.category && <p className="bq-eyebrow"><span aria-hidden="true" />{p.category}</p>}
          <h2 className="bq-pd-name">{p.name}</h2>
          <p className="bq-pd-price">{p.defaultPrice != null ? formatPrice(price) : 'Prix à confirmer'}</p>
          {p.quantity != null && p.quantity > 0 && p.quantity <= 5 && <p className="bq-stock">Plus que {p.quantity} en stock</p>}
          {p.description && <p className="bq-pd-desc">{p.description}</p>}
          {readOnly && <p className="bq-pd-note"><Icon name="pause" size={15} /> Commandes en pause pour le moment</p>}
          {!readOnly && qty > 0 && (
            <button type="button" className="bq-textbtn is-danger" onClick={() => onConfirm(0)}>Retirer du panier</button>
          )}
        </div>
      </div>
    </Sheet>
  )
}

function PdPhoto({ src, eager }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="bq-pd-slide">
      {failed
        ? <span className="bq-noimg is-lg"><Icon name="bag" size={44} strokeWidth={1.2} /></span>
        : <img src={src} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />}
    </div>
  )
}
