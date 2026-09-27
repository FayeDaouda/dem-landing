import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, PhoneCall, Download, Check, Mail, ExternalLink } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading.jsx';

gsap.registerPlugin(ScrollTrigger);

/**
 * ContactCTA - Section d'impact et d'appel à l'action entièrement paramétrable
 *
 * @param {Object} props
 * @param {'white' | 'light' | 'dark' | 'slate'} [props.theme='white'] - Thème visuel (défaut 'white' comme le screenshot)
 * @param {string} [props.watermark='CONTACT'] - Texte filigrane géant en arrière-plan
 * @param {string} [props.subtitle='Contactez-nous'] - Sous-titre cursif élégant
 * @param {string} [props.title='Faites le premier pas vers'] - Titre principal
 * @param {string} [props.highlight="l'excellence."] - Mot(s) mis en valeur en couleur cyan
 * @param {string} [props.highlightColor] - Couleur CSS personnalisée pour le texte mis en valeur
 * @param {string} [props.kicker] - Surtitre / badge technique optionnel (ex: "// PERFORMANCE FLOTTE")
 * @param {string} [props.description] - Paragraphe descriptif
 * @param {Array<string | { text: string, icon?: React.ReactNode }>} [props.bullets] - Liste de points forts / garanties
 * @param {string} [props.bulletsTitle] - Surtitre optionnel pour les bullets
 * @param {'center' | 'left'} [props.align='center'] - Alignement du contenu
 * @param {boolean} [props.showButtons=true] - Afficher ou masquer les boutons
 * @param {string} [props.primaryBtnText] - Texte bouton principal (si vide, aucun bouton n'est affiché)
 * @param {string} [props.primaryBtnLink] - Lien href du bouton principal
 * @param {string | React.ReactNode} [props.primaryBtnIcon] - 'download' | 'arrow' | 'phone' | 'mail' | 'external'
 * @param {Function} [props.primaryBtnOnClick] - Handler clic du bouton principal
 * @param {string} [props.secondaryBtnText] - Texte bouton secondaire (si vide, aucun bouton secondaire n'est affiché)
 * @param {string} [props.secondaryBtnLink] - Lien href du bouton secondaire
 * @param {string | React.ReactNode} [props.secondaryBtnIcon] - 'phone' | 'arrow' | 'download' | 'mail' | 'external'
 * @param {Function} [props.secondaryBtnOnClick] - Handler clic du bouton secondaire
 * @param {Array<{ text: string, link?: string, onClick?: Function, icon?: string, variant?: string }>} [props.buttons] - Tableau optionnel de boutons personnalisés
 * @param {string} [props.className=''] - Classes CSS additionnelles
 * @param {string} [props.padding='py-20 md:py-32'] - Classes de padding vertical
 * @param {string} [props.id] - Identifiant HTML pour ancrage
 * @param {React.ReactNode} [props.children] - Contenu personnalisé supplémentaire
 */
export default function ContactCTA({
  theme = 'white',
  watermark = 'CONTACT',
  subtitle = 'Contactez-nous',
  title = 'Faites le premier pas vers',
  highlight = "l'excellence.",
  highlightColor,
  kicker,
  description = `Que vous soyez un particulier, un commerçant ou une entreprise, profitez du réseau de livraison le plus rapide et fiable de Dakar.`,
  bullets = [],
  bulletsTitle,
  align = 'center',
  showButtons = true,
  primaryBtnText = null,
  primaryBtnLink = '#',
  primaryBtnIcon = 'download',
  primaryBtnOnClick = null,
  secondaryBtnText = null,
  secondaryBtnLink = '#',
  secondaryBtnIcon = 'phone',
  secondaryBtnOnClick = null,
  buttons = [],
  className = '',
  padding = 'py-20 md:py-32',
  id,
  children,
}) {
  const sectionRef = useRef(null);

  const isCyanDeep = theme === 'cyan-deep';
  const isCyanLight = theme === 'cyan-light' || theme === 'cyan light' || theme === 'cyan';
  const isLight = (theme === 'white' || theme === 'light' || theme === 'slate' || isCyanLight) && !isCyanDeep;
  const isSlate = theme === 'slate';
  const isCenter = align === 'center';

  // Helper pour restituer les icônes
  const renderIcon = (iconName, isSecondary = false) => {
    if (!iconName || iconName === 'none') return null;
    if (React.isValidElement(iconName)) return iconName;
    switch (iconName) {
      case 'download':
        return <Download size={18} />;
      case 'arrow':
        return <ArrowRight size={18} />;
      case 'phone':
        return <PhoneCall size={18} className={isLight ? 'text-[#0086C8]' : 'text-cyan'} />;
      case 'mail':
        return <Mail size={18} className={isLight ? 'text-[#0086C8]' : 'text-cyan'} />;
      case 'external':
        return <ExternalLink size={18} />;
      case 'check':
        return <Check size={18} />;
      default:
        return null;
    }
  };

  // Déterminer la liste des boutons à afficher (aucun bouton n'est obligatoire !)
  const resolvedButtons = [];
  if (showButtons) {
    if (buttons && buttons.length > 0) {
      resolvedButtons.push(...buttons);
    } else {
      if (primaryBtnText) {
        resolvedButtons.push({
          text: primaryBtnText,
          link: primaryBtnLink,
          icon: primaryBtnIcon,
          onClick: primaryBtnOnClick,
          variant: 'primary',
        });
      }
      if (secondaryBtnText) {
        resolvedButtons.push({
          text: secondaryBtnText,
          link: secondaryBtnLink,
          icon: secondaryBtnIcon,
          onClick: secondaryBtnOnClick,
          variant: 'secondary',
        });
      }
    }
  }

  // Styles de conteneur selon le thème
  let bgClass = 'bg-white text-dark border-slate-200';
  let watermarkClass = 'text-slate-900/[0.04]';
  let descClass = 'text-slate-600';
  let defaultHighlightColor = 'var(--color-cyan-2, #0086C8)';
  let scriptColor = 'text-[#0086C8]';

  if (isCyanLight) {
    bgClass = 'bg-gradient-to-b from-[#EAF8FC] to-[#F4FCFD] text-[#021520] border-[#00D2FF]/30';
    watermarkClass = 'text-[#0086C8]/[0.08]';
    descClass = 'text-slate-700';
    defaultHighlightColor = 'var(--color-cyan-2, #0086C8)';
    scriptColor = 'text-[#0086C8]';
  } else if (isSlate) {
    bgClass = 'bg-slate-50 text-dark border-black/10';
    watermarkClass = 'text-slate-900/[0.04]';
    descClass = 'text-slate-600';
    defaultHighlightColor = 'var(--color-cyan-2, #0086C8)';
    scriptColor = 'text-[#0086C8]';
  } else if (isCyanDeep) {
    bgClass = 'bg-cyan-deep text-white border-white/[0.08]';
    watermarkClass = 'text-white/[0.03]';
    descClass = 'text-slate-200';
    defaultHighlightColor = 'var(--cyan, #00D2FF)';
    scriptColor = 'text-[#00D2FF]';
  } else if (!isLight) {
    bgClass = 'bg-[#021520] text-white border-white/[0.08]';
    watermarkClass = 'text-white/[0.03]';
    descClass = 'text-slate-300';
    defaultHighlightColor = 'var(--cyan, #00D2FF)';
    scriptColor = 'text-[#00D2FF]';
  }

  const finalHighlightColor = highlightColor || defaultHighlightColor;

  // ── GSAP ScrollTrigger animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sec = sectionRef.current;

      // 1. Filigrane : scale compress + reveal horizontal
      gsap.fromTo('[data-ctc="watermark"]',
        { scale: 1.5, clipPath: 'inset(0 50% 0 50%)' },
        {
          scale: 1, clipPath: 'inset(0 0% 0 0%)',
          duration: 1.8, ease: 'expo.out',
          scrollTrigger: { trigger: sec, start: 'top 82%', once: true }
        }
      );

      // 2. Titre : split word curtain sur le heading de SectionHeading
      const titleEl = sec.querySelector('[data-ctc="heading-wrap"] h2, [data-ctc="heading-wrap"] h3, [data-ctc="heading-wrap"] h1');
      if (titleEl) {
        const words = titleEl.textContent.trim().split(' ');
        titleEl.innerHTML = words.map(w =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;">` +
          `<span style="display:inline-block;" class="ctc-word">${w}\u00a0</span>` +
          `</span>`
        ).join('');
        gsap.fromTo(titleEl.querySelectorAll('.ctc-word'),
          { yPercent: 110 },
          {
            yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.05,
            scrollTrigger: { trigger: sec, start: 'top 80%', once: true }
          }
        );
      }

      // 3. Description : slide + clip depuis le bas avec skew
      gsap.fromTo('[data-ctc="desc"]',
        { y: 50, clipPath: 'inset(0 0 100% 0)', skewY: 1.5 },
        {
          y: 0, clipPath: 'inset(0 0 0% 0)', skewY: 0,
          duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '[data-ctc="desc"]', start: 'top 90%', once: true }
        }
      );

      // 4. Bullets : curtain stagger depuis bas
      gsap.fromTo('[data-ctc="bullet"]',
        { y: 40, clipPath: 'inset(100% 0 0 0)' },
        {
          y: 0, clipPath: 'inset(0% 0 0 0)',
          duration: 0.8, ease: 'expo.out',
          stagger: { amount: 0.55, from: 'start' },
          scrollTrigger: { trigger: '[data-ctc="bullets"]', start: 'top 88%', once: true }
        }
      );

      // 5. Boutons : expand depuis centre + slide up
      gsap.fromTo('[data-ctc="btn"]',
        { y: 60, clipPath: 'inset(0 48% 0 48%)', scale: 0.9 },
        {
          y: 0, clipPath: 'inset(0 0% 0 0%)', scale: 1,
          duration: 0.45, ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-ctc="btns"]', start: 'top 92%', once: true }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative w-full ${padding} px-6 overflow-hidden border-t ${bgClass} font-['DM_Sans',sans-serif] ${className}`}
    >
      {/* ── 1. FILIGRANE TYPOGRAPHIQUE GÉANT EN ARRIÈRE-PLAN ── */}
      {watermark && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            data-ctc="watermark"
            className={`font-black text-[17vw] leading-none uppercase tracking-tighter whitespace-nowrap font-['DM_Sans',sans-serif] ${watermarkClass}`}
          >
            {watermark}
          </span>
        </div>
      )}

      {/* ── 2. CONTENU PRINCIPAL ── */}
      <div
        className={`relative z-10 max-w-4xl mx-auto flex flex-col ${
          isCenter ? 'items-center text-center' : 'items-start text-left'
        }`}
      >
        {/* Titre avec sous-titre cursif — style original */}
        <div data-ctc="heading-wrap">
          <SectionHeading
            align={align}
            title={title}
            highlight={highlight}
            subtitle={subtitle}
            titleColor={isLight ? 'text-dark' : 'text-white'}
            highlightColor={finalHighlightColor}
            highlightClassName={isLight ? 'text-[#0086C8]' : 'text-[#00D2FF]'}
            scriptColor={scriptColor}
            titleSize="text-3xl md:text-5xl lg:text-6xl"
            subtitleSize="text-xl md:text-2xl lg:text-3xl"
            className="mb-6"
          />
        </div>

        {description && (
          <p
            data-ctc="desc"
            className={`${descClass} text-base md:text-lg max-w-2xl leading-relaxed mb-8 font-['Poppins',sans-serif]`}
          >
            {description}
          </p>
        )}

        {/* ── 3. LISTE DE PUCES / GARANTIES OPTIONNELLES ── */}
        {bullets && bullets.length > 0 && (
          <div data-ctc="bullets" className={`w-full max-w-3xl my-6 ${isCenter ? 'mx-auto' : ''}`}>
            {bulletsTitle && (
              <span
                className={`text-[11px] font-mono font-bold uppercase tracking-widest block mb-3 ${
                  isLight ? 'text-slate-500' : 'text-cyan'
                }`}
              >
                {bulletsTitle}
              </span>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {bullets.map((bullet, idx) => {
                const text = typeof bullet === 'string' ? bullet : bullet.text;
                return (
                  <div
                    key={idx}
                    data-ctc="bullet"
                    className={`flex items-start gap-3 p-3.5 border transition-colors ${
                      isLight
                        ? 'bg-slate-50/90 border-slate-200 hover:bg-slate-100/90 text-dark'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white/90'
                    }`}
                  >
                    <span
                      className={`shrink-0 mt-0.5 p-1 ${
                        isLight ? 'text-[#0086C8] bg-cyan/15' : 'text-cyan bg-cyan/20'
                      }`}
                    >
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="text-xs sm:text-sm font-medium font-['Poppins',sans-serif] leading-snug">
                      {text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Emplacement pour contenu personnalisé (enfants) */}
        {children}

        {/* ── 4. BOUTONS D'ACTION (STRICTEMENT OPTIONNELS) ── */}
        {resolvedButtons.length > 0 && (
          <div
            data-ctc="btns"
            className={`flex flex-wrap items-center gap-4 mt-8 ${
              isCenter ? 'justify-center' : 'justify-start'
            }`}
          >
            {resolvedButtons.map((btn, index) => {
              const isPrimary = btn.variant === 'primary' || (!btn.variant && index === 0);
              const iconElement = renderIcon(btn.icon, !isPrimary);

              const btnClasses = isPrimary
                ? 'inline-flex items-center gap-3 px-8 py-4 font-bold text-xs sm:text-sm tracking-wider uppercase text-[#021520] bg-[#00D2FF] hover:bg-[#0086C8] hover:text-white transition-all duration-300 rounded-none border border-[#00D2FF] shadow-sm cursor-pointer'
                : `inline-flex items-center gap-3 px-8 py-4 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 rounded-none cursor-pointer ${
                    isLight
                      ? 'text-[#021520] bg-slate-100 border border-slate-300 hover:bg-slate-200'
                      : 'text-white bg-white/[0.04] border border-white/20 hover:border-[#00D2FF]/60 hover:bg-white/[0.08]'
                  }`;

              if (btn.onClick) {
                return (
                  <button
                    key={index}
                    data-ctc="btn"
                    type="button"
                    onClick={btn.onClick}
                    className={btnClasses}
                  >
                    {iconElement}
                    <span>{btn.text}</span>
                    {isPrimary && btn.icon !== 'arrow' && <ArrowRight size={16} />}
                  </button>
                );
              }

              return (
                <a
                  key={index}
                  data-ctc="btn"
                  href={btn.link || '#'}
                  className={btnClasses}
                >
                  {iconElement}
                  <span>{btn.text}</span>
                  {isPrimary && btn.icon !== 'arrow' && <ArrowRight size={16} />}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
