import { useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useDemProAnimations
 * Hook centralisé qui applique des animations ScrollTrigger spectaculaires
 * sur la page DemPro via des sélecteurs data-anim="xxx".
 *
 * Usage dans le JSX : data-anim="curtain-up" | "split-rise" | "card-stagger" | "line-in" | "slide-left" | "slide-right" | "expand-in"
 */
export default function useDemProAnimations(deps = []) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ══════════════════════════════════════════════════════
      // 1. CURTAIN REVEAL — un rideau se lève (overflow:hidden)
      //    data-anim="curtain-up"
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="curtain-up"]').forEach((el) => {
        // Wrap le texte dans un clipper
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'overflow:hidden;display:block;';
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);

        gsap.fromTo(el,
          { yPercent: 110, opacity: 1 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 88%',
              once: true,
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════
      // 2. SPLIT TEXT RISE — chaque mot monte depuis overflow hidden
      //    data-anim="split-rise"
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="split-rise"]').forEach((el) => {
        const words = el.innerText.split(' ');
        el.innerHTML = words
          .map(w => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;">
                       <span class="word-inner" style="display:inline-block;">${w}&nbsp;</span>
                     </span>`)
          .join('');

        const inners = el.querySelectorAll('.word-inner');
        gsap.fromTo(inners,
          { yPercent: 105 },
          {
            yPercent: 0,
            duration: 1.0,
            ease: 'expo.out',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════
      // 3. CARD STAGGER — cartes qui montent en escalier
      //    data-anim="card-stagger" sur le parent, les enfants directs sont animés
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="card-stagger"]').forEach((parent) => {
        const cards = parent.children;
        gsap.fromTo(cards,
          { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          {
            y: 0,
            opacity: 1,
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.9,
            ease: 'expo.out',
            stagger: { amount: 0.6, from: 'start' },
            scrollTrigger: {
              trigger: parent,
              start: 'top 82%',
              once: true,
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════
      // 4. SLIDE FROM LEFT — glisse depuis la gauche
      //    data-anim="slide-left"
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="slide-left"]').forEach((el) => {
        gsap.fromTo(el,
          { xPercent: -12, opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          {
            xPercent: 0,
            opacity: 1,
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════
      // 5. SLIDE FROM RIGHT — glisse depuis la droite
      //    data-anim="slide-right"
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="slide-right"]').forEach((el) => {
        gsap.fromTo(el,
          { xPercent: 12, opacity: 0, clipPath: 'inset(0 0 0 100%)' },
          {
            xPercent: 0,
            opacity: 1,
            clipPath: 'inset(0 0 0 0%)',
            duration: 1.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════
      // 6. EXPAND IN — scale depuis 0.85 + clip
      //    data-anim="expand-in"
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="expand-in"]').forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.86, opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' },
          {
            scale: 1,
            opacity: 1,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 86%',
              once: true,
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════
      // 7. LINE DRAW — une ligne se dessine de gauche à droite
      //    data-anim="line-in"
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="line-in"]').forEach((el) => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.0,
            ease: 'expo.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            }
          }
        );
      });

      // ══════════════════════════════════════════════════════
      // 8. ROW STAGGER (comparaison gauche/droite alternée)
      //    data-anim="row-stagger" sur le parent
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="row-stagger"]').forEach((parent) => {
        const rows = parent.querySelectorAll('[data-anim-child]');
        rows.forEach((row, i) => {
          const dir = row.dataset.animChild === 'right' ? 1 : -1;
          gsap.fromTo(row,
            { x: dir * 50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.85,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 88%',
                once: true,
              }
            }
          );
        });
      });

      // ══════════════════════════════════════════════════════
      // 9. COUNTER NUMBER (chiffre qui compte de 0 à target)
      //    data-anim="count" data-target="3000" data-suffix="+"
      // ══════════════════════════════════════════════════════
      document.querySelectorAll('[data-anim="count"]').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + (decimals > 0
              ? counter.val.toFixed(decimals)
              : Math.round(counter.val)) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          }
        });
      });

    });

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
