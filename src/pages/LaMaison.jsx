import { Link } from 'react-router-dom';

export default function LaMaison() {
  return (
    <div className="w-full bg-[#021520] text-white min-h-screen pt-24 pb-20 font-sans">
      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>🏛️</span> Notre Vision & Histoire
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-8">
          La Maison <span className="text-cyan">DEM</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-3xl leading-relaxed font-light mb-12">
          Delivery Express Mobility est née à Dakar d'une conviction : bâtir l'infrastructure de livraison et de mobilité urbaine la plus rapide, fiable et accessible en Afrique de l'Ouest.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
            <span className="text-3xl mb-4 block">🎯</span>
            <h3 className="text-xl font-bold mb-2">Notre Mission</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Connecter les commerçants, les particuliers et les coursiers grâce à une technologie fluide et intuitive qui simplifie le commerce urbain.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
            <span className="text-3xl mb-4 block">⚡</span>
            <h3 className="text-xl font-bold mb-2">Notre Vitesse</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Une flotte de coursiers à moto dispatchés en temps réel pour garantir des délais records de moins de 45 minutes partout à Dakar.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/10">
            <span className="text-3xl mb-4 block">🤝</span>
            <h3 className="text-xl font-bold mb-2">Impact Humain</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Offrir des revenus dignes, réguliers et sécurisés à des centaines de jeunes conducteurs et chefs de flotte indépendants.
            </p>
          </div>
        </div>

        {/* Chiffres clés */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#00D2FF]/15 via-white/[0.02] to-transparent border border-cyan/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">DEM en Chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-black text-cyan">7j/7</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1 uppercase tracking-wider">Service continu</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-cyan">&lt; 45m</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1 uppercase tracking-wider">Délai moyen</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-cyan">100%</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1 uppercase tracking-wider">Suivi en direct</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-black text-cyan">Dakar</div>
              <div className="text-xs sm:text-sm text-white/60 mt-1 uppercase tracking-wider">& Environs</div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan text-[#021520] font-bold hover:bg-white transition-all shadow-lg shadow-cyan/20"
          >
            Prendre contact avec nous →
          </Link>
        </div>
      </section>
    </div>
  );
}
