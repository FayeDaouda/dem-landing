import { useState } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full bg-[#021520] text-white min-h-screen pt-24 pb-20 font-sans">
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">

        {/* En-tête */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          <span>📞</span> Support & Assistance 7j/7
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6">
          Contactez <span className="text-cyan">DEM</span>
        </h1>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed font-light mb-12">
          Une question sur une livraison ? Un partenariat entreprise ou une assistance sur votre compte ? Notre équipe basée à Dakar est à votre écoute.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Coordonnées */}
          <div className="lg:col-span-5 space-y-6">

            {/* WhatsApp Box */}
            <a
              href="https://wa.me/221770000000"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-gradient-to-r from-[#00E08C]/15 to-transparent border border-[#00E08C]/30 flex items-center justify-between group hover:border-[#00E08C] transition-all block"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E08C] block mb-1">WhatsApp Direct</span>
                <span className="text-lg font-bold text-white group-hover:text-[#00E08C] transition-colors">+221 77 000 00 00</span>
                <p className="text-xs text-white/60 mt-1">Réponse instantanée 7j/7</p>
              </div>
              <span className="text-3xl">💬</span>
            </a>

            {/* Email Box */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan block mb-1">Email Officiel</span>
              <a href="mailto:contact@dem.sn" className="text-lg font-bold text-white hover:text-cyan transition-colors">
                contact@dem.sn
              </a>
              <p className="text-xs text-white/60 mt-1">Pour les demandes générales et presse</p>
            </div>

            {/* Téléphone Box */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan block mb-1">Standard Téléphonique</span>
              <div className="text-lg font-bold text-white">
                +221 33 000 00 00
              </div>
              <p className="text-xs text-white/60 mt-1">Du Lundi au Dimanche (08h00 - 22h00)</p>
            </div>

            {/* Siège Box */}
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan block mb-1">Siège Principal</span>
              <div className="text-sm font-semibold text-white">
                KM 2,5 Boulevard du Centenaire
              </div>
              <p className="text-xs text-white/60 mt-1">Dakar, Sénégal</p>
            </div>

          </div>

          {/* Formulaire de Contact */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Envoyez-nous un message</h2>
            <p className="text-xs sm:text-sm text-white/70 mb-6">Nous vous répondons en moins de 2 heures ouvrées.</p>

            {sent ? (
              <div className="p-8 rounded-2xl bg-cyan/15 border border-cyan/40 text-center">
                <span className="text-4xl mb-3 block">✉️</span>
                <h3 className="text-xl font-bold text-cyan mb-2">Message envoyé avec succès !</h3>
                <p className="text-sm text-white/80">
                  Merci de nous avoir contactés. Notre service client traitera votre demande dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Votre Nom</label>
                    <input required type="text" placeholder="Ex: Fatou Ndiaye" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Email ou Téléphone</label>
                    <input required type="text" placeholder="Ex: fatou@example.com" className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Objet du message</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-[#081624] border border-white/15 text-white focus:outline-none focus:border-cyan text-sm">
                    <option value="general">Renseignement général</option>
                    <option value="livreur">Devenir Livreur DEM</option>
                    <option value="entreprise">Partenariat Entreprise / Marchand</option>
                    <option value="flotte">Programme Chef de Flotte</option>
                    <option value="support">Suivi de commande & Réclamation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Votre Message</label>
                  <textarea required rows={4} placeholder="Détaillez votre demande ici..." className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm"></textarea>
                </div>

                <button type="submit" className="w-full py-3.5 rounded-xl bg-cyan text-[#021520] font-bold text-base hover:bg-white transition-all shadow-lg shadow-cyan/20 cursor-pointer">
                  Envoyer le message →
                </button>
              </form>
            )}
          </div>

        </div>

      </section>
    </div>
  );
}
