import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../../assets/img/intDemPro/img1.jpeg';
import img2 from '../../assets/img/intDemPro/img2.jpeg';
import img3 from '../../assets/img/intDemPro/img3.jpeg';
import img4 from '../../assets/img/intDemPro/img4.jpeg';
import img5 from '../../assets/img/intDemPro/img5.jpeg';

const SCREENS = [
  {
    id: 1,
    image: img4,
    title: 'Boutique & Catalogue',
    subtitle: 'Gérez vos produits, prix et stocks réutilisables'
  },
  {
    id: 2,
    image: img1,
    title: 'Commandes Reçues',
    subtitle: 'Centralisez et traitez vos ventes en ligne'
  },
  {
    id: 3,
    image: img2,
    title: 'Accueil & Expéditions',
    subtitle: 'Livraisons simples, groupées ou programmées'
  },
  {
    id: 4,
    image: img5,
    title: 'Portefeuille & Retraits',
    subtitle: 'Retraits instantanés vers Wave et Orange Money'
  },
  {
    id: 5,
    image: img3,
    title: 'Finances & Statistiques',
    subtitle: 'Suivi du chiffre d\'affaires et historique des ventes'
  },
];

export default function DemProInterfaceGallery() {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Gestion du drag à la souris
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const checkScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;

    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const isAtStart = el.scrollLeft <= 10;
    const isAtEnd = el.scrollLeft >= maxScrollLeft - 15;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);

    if (isAtEnd) {
      setActiveIndex(SCREENS.length - 1);
      return;
    }

    if (isAtStart) {
      setActiveIndex(0);
      return;
    }

    // Calcul de la carte la plus proche du début / centre du conteneur
    const cards = el.querySelectorAll('.screen-card');
    if (!cards.length) return;

    const containerRect = el.getBoundingClientRect();
    let closestIdx = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const distance = Math.abs(cardRect.left - containerRect.left);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scrollToScreen = (index) => {
    const el = sliderRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.screen-card');
    if (cards[index]) {
      const card = cards[index];
      const elRect = el.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const targetScroll = el.scrollLeft + (cardRect.left - elRect.left);
      el.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  const scrollByAmount = (direction) => {
    const nextIdx = direction === 'next'
      ? Math.min(activeIndex + 1, SCREENS.length - 1)
      : Math.max(activeIndex - 1, 0);
    scrollToScreen(nextIdx);
  };

  // Gestion du glisser-déposer souris
  const handleMouseDown = (e) => {
    const el = sliderRef.current;
    if (!el) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = sliderRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) setHasMoved(true);
    el.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-black/10 overflow-hidden select-none">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
        
        {/* En-tête avec titre et commandes de swipe (commandes masquées sur PC) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-[#0086C8] block mb-2">
              INTERFACE DU PROFIL DEM PRO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#021520] tracking-tight font-['DM_Sans',sans-serif] m-0">
              L'application DEM Pro en action
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-['Poppins',sans-serif] m-0 mt-2 max-w-2xl leading-relaxed">
              <span className="hidden lg:inline">Découvrez les 5 écrans clés de votre futur espace professionnel.</span>
              <span className="lg:hidden">Faites glisser pour explorer les différents écrans de votre futur espace professionnel.</span>
            </p>
          </div>

          {/* Boutons Suivant / Précédent & Indicateur (Affichés uniquement sur mobile/tablette) */}
          <div className="flex lg:hidden items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 mr-2 font-mono text-xs text-slate-400 font-bold">
              <span className="text-[#0086C8] text-sm">0{activeIndex + 1}</span>
              <span>/</span>
              <span>0{SCREENS.length}</span>
            </div>

            <button
              type="button"
              onClick={() => scrollByAmount('prev')}
              disabled={!canScrollLeft}
              aria-label="Écran précédent"
              className={`w-12 h-12 flex items-center justify-center border transition-all ${
                canScrollLeft
                  ? 'bg-white border-black/15 text-[#021520] hover:bg-[#021520] hover:text-white cursor-pointer shadow-sm'
                  : 'bg-slate-100 border-black/5 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scrollByAmount('next')}
              disabled={!canScrollRight}
              aria-label="Écran suivant"
              className={`w-12 h-12 flex items-center justify-center border transition-all ${
                canScrollRight
                  ? 'bg-white border-black/15 text-[#021520] hover:bg-[#021520] hover:text-white cursor-pointer shadow-sm'
                  : 'bg-slate-100 border-black/5 text-slate-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Grille sur PC (5 colonnes directes sans carrousel) / Carrousel swipeable sur mobile & tablette */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex lg:grid lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-4 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 pt-2 snap-x snap-mandatory lg:snap-none scroll-smooth no-scrollbar ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab lg:cursor-default'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {SCREENS.map((screen, idx) => (
            <div
              key={screen.id}
              onClick={() => {
                if (!hasMoved) scrollToScreen(idx);
              }}
              className={`screen-card w-[260px] sm:w-[300px] lg:w-full shrink-0 lg:shrink snap-start bg-white p-3.5 sm:p-4 border transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col justify-between cursor-pointer lg:cursor-default ${
                activeIndex === idx
                  ? 'border-[#0086C8] ring-2 ring-[#0086C8]/20 shadow-md lg:ring-0 lg:border-black/10'
                  : 'border-black/10 hover:border-[#0086C8]/60'
              }`}
            >
              {/* Image Mobile Frame */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-100 border border-black/5 mb-3.5">
                <img
                  src={screen.image}
                  alt={screen.title}
                  draggable="false"
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500 pointer-events-none"
                />
              </div>

              {/* Méta / Titre */}
              <div className="pt-3 border-t border-slate-100 flex-1 flex flex-col justify-between">
                <div>
                  {/* <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#0086C8] block mb-1">
                    0{idx + 1} · {screen.title.toUpperCase()}
                  </span> */}
                  <h3 className="text-sm sm:text-base font-bold uppercase text-[#021520] font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors leading-snug m-0">
                    {screen.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 font-['Poppins',sans-serif] mt-1.5 m-0 leading-relaxed">
                  {screen.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs / Puces en bas (affichés uniquement sur mobile/tablette) */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-6">
          {SCREENS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToScreen(idx)}
              aria-label={`Aller à l'écran ${idx + 1}`}
              className={`h-2 transition-all rounded-none cursor-pointer ${
                activeIndex === idx
                  ? 'w-8 bg-[#0086C8]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
