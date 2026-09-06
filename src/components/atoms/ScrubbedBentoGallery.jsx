import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, Flip);

const DEFAULT_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&auto=format&fit=crop&q=85', alt: 'DEM Express Moto' },
  { image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85', alt: 'Traçabilité GPS' },
  { image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85', alt: 'Revenus dignes' },
  { image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=85', alt: 'Enlèvement Express' },
  { image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=900&auto=format&fit=crop&q=85', alt: 'Suivi direct 7j/7' },
  { image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=85', alt: 'Flotte valorisée' },
  { image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&auto=format&fit=crop&q=85', alt: 'Dakar logistique' },
  { image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&auto=format&fit=crop&q=85', alt: 'Mobilité urbaine' },
];

export default function ScrubbedBentoGallery({
  items = DEFAULT_ITEMS,
  className = '',
  scrollDistance = '+=120%',
  children
}) {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);

  useGSAP(
    () => {
      const gallery = galleryRef.current;
      const wrap = containerRef.current;
      if (!gallery || !wrap) return;

      const galleryItems = gallery.querySelectorAll('.bento-gallery__item');
      if (!galleryItems.length) return;

      let flipCtx;

      const createTween = () => {
        flipCtx && flipCtx.revert();
        gallery.classList.remove('bento-gallery--final');

        flipCtx = gsap.context(() => {
          // Temporarily add the final class to capture the target state
          gallery.classList.add('bento-gallery--final');
          const flipState = Flip.getState(galleryItems);
          gallery.classList.remove('bento-gallery--final');

          const flip = Flip.to(flipState, {
            simple: true,
            ease: 'expoScale(1, 5)',
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: gallery,
              start: 'center center',
              end: scrollDistance,
              scrub: 1,
              pin: wrap,
              invalidateOnRefresh: true,
            },
          });

          tl.add(flip);
        }, wrap);
      };

      createTween();

      window.addEventListener('resize', createTween);
      return () => {
        window.removeEventListener('resize', createTween);
        flipCtx && flipCtx.revert();
      };
    },
    { scope: containerRef, dependencies: [items, scrollDistance] }
  );

  return (
    <div className={`w-full overflow-hidden bg-dark text-text-main ${className}`}>
      <style>{`
        .bento-gallery-wrap {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .bento-gallery {
          position: relative;
          width: 100%;
          height: 100%;
          flex: none;
          display: grid;
          gap: 1vh;
          grid-template-columns: repeat(3, 32.5vw);
          grid-template-rows: repeat(4, 23vh);
          justify-content: center;
          align-content: center;
        }

        .bento-gallery--final.bento-gallery {
          grid-template-columns: repeat(3, 100vw);
          grid-template-rows: repeat(4, 49.5vh);
          gap: 1vh;
        }

        .bento-gallery__item {
          background-position: 50% 50%;
          background-size: cover;
          flex: none;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .bento-gallery__item img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          display: block;
        }

        .bento-gallery .bento-gallery__item:nth-child(1) { grid-area: 1 / 1 / 3 / 2; }
        .bento-gallery .bento-gallery__item:nth-child(2) { grid-area: 1 / 2 / 2 / 3; }
        .bento-gallery .bento-gallery__item:nth-child(3) { grid-area: 2 / 2 / 4 / 3; }
        .bento-gallery .bento-gallery__item:nth-child(4) { grid-area: 1 / 3 / 3 / 4; }
        .bento-gallery .bento-gallery__item:nth-child(5) { grid-area: 3 / 1 / 5 / 2; }
        .bento-gallery .bento-gallery__item:nth-child(6) { grid-area: 3 / 3 / 5 / 4; }
        .bento-gallery .bento-gallery__item:nth-child(7) { grid-area: 4 / 2 / 5 / 3; }
        .bento-gallery .bento-gallery__item:nth-child(8) { grid-area: 3 / 2 / 4 / 3; }
      `}</style>

      {/* Pinned Bento Gallery Section */}
      <div className="bento-gallery-wrap" ref={containerRef}>
        <div className="bento-gallery" ref={galleryRef}>
          {items.slice(0, 8).map((item, idx) => {
            const src = typeof item === 'string' ? item : item.image;
            const alt = typeof item === 'string' ? `Gallery image ${idx + 1}` : item.alt || '';
            return (
              <div className="bento-gallery__item group" key={idx}>
                <img src={src} alt={alt} loading="lazy" />
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Optional Content Below */}
      {children && (
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-14 py-20">
          {children}
        </div>
      )}
    </div>
  );
}

export { ScrubbedBentoGallery };
