import { Link } from 'react-router-dom';

export default function Services() {
  const serviceList = [
    {
      icon: '⚡',
      title: 'Livraison Express Moto (Point à Point)',
      desc: 'Pour les plis urgents, colis légers et achats immédiats. Prise en charge en quelques minutes et remise en main propre sécurisée.',
      badge: 'Le plus rapide'
    },
    {
      icon: '🏪',
      title: 'E-commerce & Tournées Marchands',
      desc: 'Ramassage groupé en boutique ou entrepôt avec dispatch optimisé vers vos clients finaux partout à Dakar.',
      badge: 'Pour les Pro'
    },
    {
      icon: '💵',
      title: 'Encaissement Cash & Wave à la Livraison (COD)',
      desc: 'Nous récupérons le montant de vos commandes auprès de vos clients et vous reversons les fonds en toute transparence.',
      badge: 'Sécurisé'
    },
    {
      icon: '📦',
      title: 'Courses & Achats sur Mesure',
      desc: 'Besoin d\'acheter un médicament en urgence, de récupérer des clés ou un vêtement au pressing ? DEM s\'occupe de tout.',
      badge: 'Sur mesure'
    },
    {
      icon: '📍',
      title: 'Suivi Temps Réel & Preuve de Dépôt',
      desc: 'Localisation GPS de votre livreur sur carte interactive, code de validation OTP et signature numérique à la réception.',
      badge: 'Inclus 100%'
    },
    {
      icon: '🤝',
      title: 'Contrats Dédiés & Flotte Dédiée',
      desc: 'Mise à disposition de livreurs dédiés aux couleurs de votre enseigne pour des volumes quotidiens garantis.',
      badge: 'Grands Comptes'
    }
  ];

  return (
    <div className="w-full bg-[#021520] text-white min-h-screen pt-24 pb-20 font-sans">
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>📦</span> Nos Solutions
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Nos <span className="text-cyan">Services</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed font-light mb-12">
          Des services de livraison express taillés pour répondre aux exigences des particuliers et des entreprises de Dakar.
        </p>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceList.map((s, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan/15 text-cyan border border-cyan/30">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-cyan transition-colors">{s.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">{s.desc}</p>
              </div>
              <Link 
                to="/contact" 
                className="text-xs font-bold uppercase tracking-wider text-cyan hover:underline inline-flex items-center gap-1.5"
              >
                En savoir plus <span>→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#00D2FF]/20 to-[#005A8C]/20 border border-cyan/30 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Besoin d'un service sur-mesure ?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base mb-8">
            Nos conseillers logistiques évaluent vos volumes et vous proposent une offre adaptée à votre activité.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-7 py-3.5 rounded-xl bg-cyan text-[#021520] font-bold hover:bg-white transition-all">
              Demander un devis
            </Link>
            <Link to="/entreprises" className="px-7 py-3.5 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all">
              Espace Entreprises
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
