import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import img1 from '../../assets/img/intDemPro/img1.jpeg';
import img2 from '../../assets/img/intDemPro/img2.jpeg';
import img3 from '../../assets/img/intDemPro/img3.jpeg';
import img4 from '../../assets/img/intDemPro/img4.jpeg';
import img5 from '../../assets/img/intDemPro/img5.jpeg';

const SCREENS = [
  {
    id: 1,
    image: img1,
    title: 'Boutique & Catalogue',
    subtitle: 'Partagez votre lien de vente en 1 clic'
  },
  {
    id: 2,
    image: img2,
    title: 'Gestion des Commandes',
    subtitle: 'Centralisez vos ventes et leur statut'
  },
  {
    id: 3,
    image: img3,
    title: 'Portefeuille & Encaissements',
    subtitle: 'Revenus COD & Mobile Money sécurisés'
  },
  {
    id: 4,
    image: img4,
    title: 'Suivi des Livraisons',
    subtitle: 'Traçabilité GPS en direct pour chaque client'
  },
  {
    id: 5,
    image: img5,
    title: 'Factures & Statistiques',
    subtitle: 'Vos chiffres de performance au même endroit'
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

  const checkScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    // Calcul de l'index actif
    const cardWidth = el.querySelector('.screen-card')?.clientWidth || 300;
    const currentIdx = Math.round(el.scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.min(Math.max(currentIdx, 0), SCREENS.length - 1));
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollByAmount = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.screen-card')?.clientWidth || 300;
    const scrollOffset = direction === 'next' ? cardWidth + 24 : -(cardWidth + 24);
    el.scrollBy({ left: scrollOffset, behavior: 'smooth' });
  };

  const scrollToScreen = (index) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('.screen-card')?.clientWidth || 300;
    el.scrollTo({ left: index * (cardWidth + 24), behavior: 'smooth' });
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
        
        {/* En-tête avec titre et commandes de swipe */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-[#0086C8] block mb-2">
              INTERFACE DU PROFIL DEM PRO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#021520] tracking-tight font-['DM_Sans',sans-serif] m-0">
              L'application DEM Pro en action
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-['Poppins',sans-serif] m-0 mt-2 max-w-2xl leading-relaxed">
              Faites glisser pour explorer les différents écrans de votre futur espace professionnel.
            </p>
          </div>

          {/* Boutons Suivant / Précédent & Indicateur */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 mr-2 font-mono text-xs text-slate-400 font-bold">
              <span className="text-[#021520] text-sm">0{activeIndex + 1}</span>
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

        {/* Conteneur Swipeable / Scrollable */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
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
              className="screen-card w-[260px] sm:w-[310px] shrink-0 snap-start bg-white p-4 border border-black/10 hover:border-[#0086C8] transition-all duration-300 shadow-sm hover:shadow-xl group flex flex-col justify-between"
            >
              {/* Image Mobile Frame */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-100 border border-black/5 mb-4">
                <img
                  src={screen.image}
                  alt={screen.title}
                  draggable="false"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500 pointer-events-none"
                />
              </div>

              {/* Méta / Titre */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-[#0086C8]">
                    0{screen.id} · FONCTIONNALITÉ
                  </span>
                </div>
                <h3 className="text-base font-bold uppercase text-[#021520] font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors leading-snug m-0">
                  {screen.title}
                </h3>
                <p className="text-xs text-slate-500 font-['Poppins',sans-serif] mt-1 m-0">
                  {screen.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs / Puces en bas pour mobile & desktop */}
        <div className="flex items-center justify-center gap-2 mt-6">
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
