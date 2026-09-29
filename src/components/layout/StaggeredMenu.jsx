import React, { useCallback, useLayoutEffect, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { socialsData as defaultSocials } from '../../data/socialsData.js';

export const StaggeredMenu = ({
  isOpen = false,
  onClose,
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [],
  socialItems = defaultSocials,
  displaySocials = true,
  socialTitle = 'Réseaux',
  displayItemNumbering = true,
  accentColor = '#5227FF',
  closeOnClickAway = true,
}) => {
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const itemEntranceTweenRef = useRef(null);
  const busyRef = useRef(false);
  const isOpenRef = useRef(isOpen);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
    });
    return () => ctx.revert();
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', '--sm-num-opacity': 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0, opacity: 1, duration: 0.55, ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => { gsap.set(socialLinks, { clearProps: 'opacity' }); }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { busyRef.current = false; });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  // React to isOpen prop changes
  useEffect(() => {
    if (isOpen === isOpenRef.current) return;
    isOpenRef.current = isOpen;
    if (isOpen) {
      playOpen();
    } else {
      playClose();
    }
  }, [isOpen, playOpen, playClose]);

  // Click outside to close
  useEffect(() => {
    if (!closeOnClickAway || !isOpen) return;
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickAway, isOpen, onClose]);

  return (
    <div className="sm-scope">
      {typeof document !== 'undefined' && createPortal(
        <div className="sm-scope" style={{ accentColor }}>
          {/* Pre-layers */}
          <div
            ref={preLayersRef}
            className="sm-prelayers"
            aria-hidden="true"
          >
            {(() => {
              const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
              let arr = [...raw];
              if (arr.length >= 3) {
                const mid = Math.floor(arr.length / 2);
                arr.splice(mid, 1);
              }
              return arr.map((c, i) => (
                <div key={i} className="sm-prelayer" style={{ background: c }} />
              ));
            })()}
          </div>

          {/* Panel */}
          <aside
            id="staggered-menu-panel"
            ref={panelRef}
            className="staggered-menu-panel"
            style={accentColor ? { '--sm-accent': accentColor } : undefined}
            aria-hidden={!isOpen}
            aria-modal={isOpen}
            role="dialog"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="sm-close-btn"
              aria-label="Fermer le menu"
              type="button"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="sm-panel-inner">
              <ul
                className="sm-panel-list"
                role="list"
                data-numbering={displayItemNumbering || undefined}
              >
                {items && items.length ? (
                  items.map((it, idx) => (
                    <li className="sm-panel-itemWrap" key={it.label + idx}>
                      <a
                        className="sm-panel-item"
                        href={it.link}
                        aria-label={it.ariaLabel}
                        data-index={idx + 1}
                        onClick={onClose}
                      >
                        <span className="sm-panel-itemLabel">{it.label}</span>
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="sm-panel-itemWrap" aria-hidden="true">
                    <span className="sm-panel-item">
                      <span className="sm-panel-itemLabel">No items</span>
                    </span>
                  </li>
                )}
              </ul>

              {displaySocials && socialItems && socialItems.length > 0 && (
                <div className="sm-socials">
                  {socialTitle && (
                    <span className="sm-socials-title">{socialTitle}</span>
                  )}
                  <ul className="sm-socials-list" role="list">
                    {socialItems.map((social, idx) => (
                      <li key={social.name || social.label || idx} className="sm-socials-item">
                        <a
                          href={social.url || social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-socials-link"
                          aria-label={social.label || social.name}
                        >
                          {social.label || social.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>,
        document.body
      )}

      <style>{`
.sm-scope .sm-prelayers {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 100vw; height: 100vh;
  pointer-events: none; z-index: 9999;
}
@media (min-width: 768px) {
  .sm-scope .sm-prelayers { width: clamp(260px, 40vw, 420px); }
}
.sm-scope .sm-prelayer {
  position: absolute; top: 0; right: 0; height: 100%; width: 100%;
}
.sm-scope .staggered-menu-panel {
  position: fixed; top: 0; right: 0;
  width: 100vw; height: 100vh;
  background: white;
  display: flex; flex-direction: column;
  padding: 5rem 2rem 2rem 2rem;
  overflow-y: auto; z-index: 10000;
  pointer-events: auto;
}
@media (min-width: 768px) {
  .sm-scope .staggered-menu-panel { width: clamp(260px, 40vw, 420px); }
}
.sm-scope .sm-close-btn {
  position: absolute; top: 1.25rem; right: 1.25rem;
  background: transparent; border: none; cursor: pointer;
  color: #111; padding: 0.5rem;
  display: flex; align-items: center; justify-content: center;
  transition: color 0.2s ease;
  z-index: 10001;
}
.sm-scope .sm-close-btn:hover { color: var(--sm-accent, #000); }
.sm-scope .sm-panel-inner {
  flex: 1; display: flex; flex-direction: column; gap: 1.25rem;
}
.sm-scope .sm-panel-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 0.5rem;
  counter-reset: smItem;
}
.sm-scope .sm-panel-itemWrap {
  position: relative; overflow: hidden; line-height: 1;
}
.sm-scope .sm-panel-item {
  position: relative; color: #000; font-weight: 600;
  font-size: clamp(2.2rem, 7vw, 3.5rem);
  cursor: pointer; line-height: 1.1;
  letter-spacing: -1.5px; text-transform: uppercase;
  display: inline-block; text-decoration: none;
  padding-right: 2.2rem;
  transition: color 0.2s ease;
}
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #000); }
.sm-scope .sm-panel-itemLabel {
  display: inline-block; will-change: transform;
  transform-origin: 50% 100%;
}
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute; top: 0.15em; right: 0;
  font-size: 16px; font-weight: 600;
  color: var(--sm-accent, #000);
  letter-spacing: 0; pointer-events: none; user-select: none;
  opacity: var(--sm-num-opacity, 0);
}
.sm-scope .sm-socials {
  margin-top: auto; padding-top: 2rem;
  display: flex; flex-direction: column; gap: 0.6rem;
}
.sm-scope .sm-socials-title {
  margin: 0; font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--sm-accent, #000);
}
.sm-scope .sm-socials-list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: row; align-items: center;
  gap: 1.25rem; flex-wrap: wrap;
}
.sm-scope .sm-socials-link {
  font-size: 1rem; font-weight: 600; color: #111;
  text-decoration: none; display: inline-block;
  padding: 2px 0;
  text-transform: uppercase; letter-spacing: 0.05em;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #000); }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
