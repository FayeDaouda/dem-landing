import { Link } from 'react-router-dom';

export default function ServicesHero({ services = [] }) {
  const scrollToService = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[#FAFCFD] border-b border-black/10 overflow-hidden">
      {/* Background subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#021520 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Layout principal du Hero : Phrase d'entrée + Déclaration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Colonne Gauche : La Phrase d'Entrée Maîtresse */}
          <div className="lg:col-span-8">
            <span className="font-serif italic text-base sm:text-lg text-[#0086C8] block mb-4">
              Notre engagement fondamental
            </span>
            <h1 className="font-['DM_Sans',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#021520] tracking-tight leading-[1.08] m-0">
              « Nous ne faisons pas beaucoup de choses : <br className="hidden sm:inline" />
              <span className="text-[#0086C8]">nous faisons une seule chose,</span> <br className="hidden sm:inline" />
              mais nous la faisons bien. »
            </h1>
          </div>

          {/* Colonne Droite : Explication & Positionnement DEM */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full pt-2">
            <div className="space-y-4">
              <p className="font-['Poppins',sans-serif] text-base sm:text-lg text-slate-700 leading-relaxed m-0">
                La mobilité et la livraison urbaine rapide, fiable et sécurisée partout à Dakar. Zéro dispersion, zéro compromis : nous concentrons 100% de nos ressources sur une exécution rigoureuse au service de vos envois.
              </p>
            </div>

          </div>

        </div>

        {/* ── BANDE DES 5 SERVICES DEM (Accès direct en 5 points) ── */}
        <div className="mt-14 pt-10 border-t border-black/10">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0086C8] font-['Raleway',sans-serif]">
              Nos Services · Vue d'ensemble
            </span>
            <span className="text-xs text-slate-400 font-serif italic">
              Cliquez pour accéder au détail
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-black/10 divide-y sm:divide-y-0 sm:divide-x divide-black/10 bg-white shadow-sm">
            {services.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => scrollToService(srv.id)}
                className="p-5 text-left flex flex-col justify-between hover:bg-[#FAFCFD] transition-colors group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0086C8] font-serif italic">
                      /{srv.number}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200">
                      {srv.badge}
                    </span>
                  </div>
                  <h3 className="font-['DM_Sans',sans-serif] text-sm sm:text-base font-bold text-[#021520] group-hover:text-[#0086C8] transition-colors leading-snug m-0">
                    {srv.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-[#0086C8]">
                  <span className="text-[11px] font-['Raleway',sans-serif] uppercase font-semibold">
                    Voir
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-y-0.5">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
