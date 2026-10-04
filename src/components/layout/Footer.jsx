import { ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full bg-dark text-white border-t border-white/10 relative z-10 overflow-hidden">
            {/* Conteneur Principal */}
            <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-10 md:pt-14 pb-6 relative z-10">

                {/* ── 1. SECTION DU HAUT : BRANDING & NAVIGATION ── */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 mb-8 md:mb-12 relative">

                    {/* GAUCHE : Titre DEM, Logo, Description, Email */}
                    <div className="flex flex-col lg:w-[42%] justify-between">
                        <div>
                            {/* Titre DEM ® */}
                            <div className="flex items-start gap-1 mb-3">
                                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white uppercase font-sans">
                                    DEM
                                </h2>
                                <span className="text-red font-bold text-lg mt-0.5">®</span>
                            </div>


                            {/* Description */}
                            <p className="text-white/70 text-xs sm:text-sm font-sans leading-relaxed max-w-sm mb-6">
                                DEM Delivery Express Mobility est votre partenaire de confiance pour la livraison express et le transport de colis à Dakar et au Sénégal.
                            </p>
                        </div>

                        {/* Email cliquable */}
                        <div>
                            <a
                                href="mailto:contact@dem.sn"
                                className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white underline decoration-white/30 underline-offset-[8px] hover:decoration-cyan hover:text-cyan transition-all duration-300 font-sans inline-block break-all"
                            >
                                contact@dem.sn
                            </a>
                        </div>
                    </div>

                    {/* DROITE : Top-bar (Année + Bouton) & 5 Colonnes */}
                    <div className="flex flex-col lg:w-[56%] justify-between">

                        {/* Barre supérieure droite : © 2026 ─── [Bouton Haut] */}
                        <div className="flex justify-end items-center gap-4 mb-6 md:mb-8">
                            <div className="flex items-center gap-3">
                                <span className="text-white/80 font-sans text-base md:text-lg font-medium tracking-wide">
                                    © {new Date().getFullYear()}
                                </span>
                                <div className="w-12 sm:w-16 h-[2px] bg-red rounded-full"></div>
                            </div>

                            <button
                                onClick={scrollToTop}
                                aria-label="Retour en haut"
                                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/25 flex items-center justify-center text-white/85 hover:bg-white hover:text-dark hover:border-white transition-all duration-300 cursor-pointer shrink-0 shadow"
                            >
                                <ArrowUp size={18} strokeWidth={2} />
                            </button>
                        </div>

                        {/* Les 5 Colonnes de navigation */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-5">

                            {/* Colonne 1 : DÉCOUVRIR */}
                            <div className="flex flex-col gap-2.5">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold mb-0.5">
                                    Découvrir
                                </span>
                                <Link to="/" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Accueil</Link>
                                <Link to="/notre-histoire" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Notre Histoire</Link>
                                <Link to="/services" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Nos Services</Link>
                                <Link to="/actualites" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Actualités</Link>
                                <a href="/download" className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Télécharger</a>
                            </div>

                            {/* Colonne 2 : REJOINDRE */}
                            <div className="flex flex-col gap-2.5">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold mb-0.5">
                                    Rejoindre
                                </span>
                                <Link to="/dem-pro" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">DEM PRO</Link>
                                <Link to="/chef-de-flotte" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Chef de Flotte</Link>
                                {/* <Link to="/coursiers" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Devenir Coursier</Link> */}
                            </div>

                            {/* Colonne 3 : ÉCHANGER */}
                            <div className="flex flex-col gap-2.5">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold mb-0.5">
                                    Échanger
                                </span>
                                <Link to="/contact" onClick={scrollToTop} className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Contact</Link>
                                <a href="mailto:contact@dem.sn" className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Partenaires</a>
                                <a href="mailto:contact@dem.sn" className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Support 7j/7</a>
                            </div>

                            {/* Colonne 4 : APPS */}
                            <div className="flex flex-col gap-2.5">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold mb-0.5">
                                    Applications
                                </span>
                                <a href="https://apps.apple.com/us/app/dem-livraison/id6764724342" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">App Store</a>
                                <a href="https://play.google.com/store/apps/details?id=sn.dem.demapp" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors">Google Play</a>
                                <span className="text-xs sm:text-sm text-white/80">Livraison express</span>
                            </div>

                            {/* Colonne 5 : RÉSEAUX SOCIAUX */}
                            <div className="flex flex-col gap-2.5 col-span-2 sm:col-span-1">
                                <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold mb-0.5">
                                    Réseaux
                                </span>
                                <div className="flex items-center gap-2.5">
                                    {/* Facebook */}
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-white hover:bg-white hover:text-dark transition-all"
                                        aria-label="Facebook"
                                    >
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    {/* Instagram */}
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-white hover:bg-white hover:text-dark transition-all"
                                        aria-label="Instagram"
                                    >
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    {/* TikTok */}
                                    <a
                                        href="https://tiktok.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:border-white hover:bg-white hover:text-dark transition-all"
                                        aria-label="TikTok"
                                    >
                                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-4.52z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* ── 2. SECTION INTERMÉDIAIRE : TÉLÉPHONE, SIÈGE, HORAIRES ── */}
                <div className="border-t border-white/10 py-6 md:py-7 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {/* Téléphone */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold">
                            Téléphone
                        </span>
                        <a href="tel:+221784448524" className="text-xs sm:text-sm font-sans font-medium text-white tracking-wide hover:text-cyan transition-colors">
                            +221 78 444 85 24
                        </a>
                    </div>

                    {/* Siège Principal */}
                    <div className="flex flex-col gap-1.5 md:items-center text-left md:text-center">
                        <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold">
                            Siège Principal
                        </span>
                        <span className="text-xs sm:text-sm font-sans font-medium text-white tracking-wide uppercase">
                            MERMOZ · DAKAR, SÉNÉGAL
                        </span>
                    </div>

                    {/* Horaires */}
                    <div className="flex flex-col gap-1.5 md:items-end text-left md:text-right">
                        <span className="text-[10px] tracking-[0.18em] uppercase text-white/50 font-sans font-semibold">
                            Lundi — Dimanche
                        </span>
                        <span className="text-xs sm:text-sm font-sans font-medium text-white tracking-wide">
                            08:00 AM — 22:00 PM (7J/7)
                        </span>
                    </div>
                </div>

                {/* ── 3. BAS DE PAGE (Mentions & Légal) ── */}
                <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4 text-[10px] tracking-[0.15em] uppercase text-white/45 font-sans relative z-10">
                    <p className="m-0">© COPYRIGHT {new Date().getFullYear()} DEM | TOUS DROITS RÉSERVÉS</p>
                    <div className="flex flex-wrap gap-5 items-center text-white/50">
                        <Link to="/terms" onClick={scrollToTop} className="hover:text-white transition-colors">
                            Termes & Conditions
                        </Link>
                        <Link to="/privacy" onClick={scrollToTop} className="hover:text-white transition-colors">
                            Confidentialité
                        </Link>
                        <Link to="/delete-account" onClick={scrollToTop} className="hover:text-white transition-colors">
                            Suppression de compte
                        </Link>
                    </div>
                </div>

            </div>

            {/* ── 4. EFFET TYPOGRAPHIQUE FILIGRANE XXL STYLE CADENCE ── */}
            <div className="w-full overflow-hidden select-none pointer-events-none flex items-center justify-center opacity-[0.045] pt-2 pb-2">
                <span className="font-sans font-black uppercase tracking-tighter text-white whitespace-nowrap text-[12vw] xl:text-[180px] leading-none block">
                    delivery express mobility
                </span>
            </div>
        </footer>
    );
}
