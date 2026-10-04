import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SUBJECT_OPTIONS = [
  "Devenir Coursier DEM",
  "Je suis DEM Pro",
  "Investir",
  "Programme Chef de Flotte",
  "Suivi de commande, Renseignement & Réclamation",
  "Demander un appel avec un agent"
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialSubject = searchParams.get('subject') || '';
  const initialMessage = searchParams.get('message') || '';

  const [sent, setSent] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    const urlSub = searchParams.get('subject');
    const urlMsg = searchParams.get('message');
    if (urlSub) setSelectedSubject(urlSub);
    if (urlMsg) setMessage(urlMsg);
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSubject) return;
    setSent(true);
  };

  return (
    <div className="w-full bg-[#021520] text-white min-h-screen pt-24 pb-20 font-sans">
      <section className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 pt-12 pb-16">

        {/* En-tête */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-cyan/10 border border-cyan/30 text-cyan text-xs font-semibold uppercase tracking-wider mb-6">
          Support & Assistance 7j/7
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
              href="https://wa.me/221784448524"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-none bg-[#00E08C]/10 border border-[#00E08C]/30 flex items-center justify-between group hover:border-[#00E08C] hover:bg-[#00E08C]/15 transition-all block"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00E08C] block mb-1">WhatsApp Direct</span>
                <span className="text-lg font-bold text-white group-hover:text-[#00E08C] transition-colors">+221 78 444 85 24</span>
                <p className="text-xs text-white/60 mt-1">Réponse instantanée 7j/7</p>
              </div>
              <span className="text-3xl">💬</span>
            </a>

            {/* Email Box */}
            <div className="p-6 rounded-none bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan block mb-1">Email Officiel</span>
              <a href="mailto:contact@dem.sn" className="text-lg font-bold text-white hover:text-cyan transition-colors">
                contact@dem.sn
              </a>
              <p className="text-xs text-white/60 mt-1">Pour les demandes générales et presse</p>
            </div>

            {/* Téléphone Box */}
            <div className="p-6 rounded-none bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan block mb-1">Standard Téléphonique</span>
              <a href="tel:+221784448524" className="text-lg font-bold text-white hover:text-cyan transition-colors">
                +221 78 444 85 24
              </a>
              <p className="text-xs text-white/60 mt-1">Du Lundi au Dimanche (08h00 - 22h00)</p>
            </div>

            {/* Siège Box */}
            <div className="p-6 rounded-none bg-white/[0.04] border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan block mb-1">Siège Principal</span>
              <div className="text-sm font-semibold text-white">
                Mermoz
              </div>
              <p className="text-xs text-white/60 mt-1">Dakar, Sénégal</p>
            </div>

          </div>

          {/* Formulaire de Contact */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-none bg-white/[0.03] border border-white/10">
            <h2 className="text-2xl font-bold mb-2">Envoyez-nous un message</h2>
            <p className="text-xs sm:text-sm text-white/70 mb-6">Nous vous répondons en moins de 2 heures ouvrées.</p>

            {sent ? (
              <div className="p-8 rounded-none bg-cyan/15 border border-cyan/40 text-center">
                <span className="text-4xl mb-3 block">✉️</span>
                <h3 className="text-xl font-bold text-cyan mb-2">Message envoyé avec succès !</h3>
                <p className="text-sm text-white/80">
                  Merci de nous avoir contactés. Notre service client traitera votre demande concernant « {selectedSubject} » dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Votre Nom</label>
                    <input required type="text" placeholder="Ex: Fatou Ndiaye" className="w-full px-4 py-3 rounded-none bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Email ou Téléphone</label>
                    <input required type="text" placeholder="Ex: fatou@example.com" className="w-full px-4 py-3 rounded-none bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm" />
                  </div>
                </div>

                {/* Objet du message sous forme d'options sélectionnables (type points/boutons) */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                      Objet du message <span className="text-cyan">*</span>
                    </label>
                    <span className="text-[11px] text-white/40 italic">
                      Sélection obligatoire
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SUBJECT_OPTIONS.map((option) => {
                      const isSelected = selectedSubject === option;
                      return (
                        <button
                          type="button"
                          key={option}
                          onClick={() => setSelectedSubject(option)}
                          className={`flex items-center gap-3 p-3 text-left text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer rounded-none select-none ${
                            isSelected
                              ? 'bg-cyan/15 border-cyan text-white shadow-[0_0_12px_rgba(0,210,255,0.25)]'
                              : 'bg-white/[0.04] border-white/15 text-white/70 hover:border-white/35 hover:text-white hover:bg-white/[0.07]'
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'border-cyan bg-cyan' : 'border-white/40'
                            }`}
                          >
                            {isSelected && (
                              <span className="w-1.5 h-1.5 bg-[#021520] block" />
                            )}
                          </span>
                          <span className="leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">Votre Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Détaillez votre demande ici..."
                    className="w-full px-4 py-3 rounded-none bg-white/[0.06] border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-cyan text-sm"
                  ></textarea>
                </div>

                {/* Bouton d'envoi bloqué si aucun objet n'est choisi */}
                <button
                  type="submit"
                  disabled={!selectedSubject}
                  className={`w-full py-3.5 rounded-none font-bold text-sm uppercase tracking-wider transition-all shadow-lg ${
                    selectedSubject
                      ? 'bg-cyan text-[#021520] hover:bg-white cursor-pointer shadow-cyan/20'
                      : 'bg-white/10 text-white/40 cursor-not-allowed border border-white/10'
                  }`}
                >
                  {selectedSubject ? "Envoyer le message →" : "Sélectionnez un objet ci-dessus pour envoyer"}
                </button>
              </form>
            )}
          </div>

        </div>

      </section>
    </div>
  );
}
