import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { StaggeredMenu } from "./StaggeredMenu";
import { socialsData } from "../../data/socialsData";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const location = useLocation();
    const headerRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('black');

    // Détection dynamique du thème en fonction des sections visibles
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -85% 0px',
            threshold: 0
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionTheme = entry.target.getAttribute('data-header-theme');
                    if (sectionTheme) {
                        setTheme(sectionTheme);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);
        const sections = document.querySelectorAll('[data-header-theme]');
        sections.forEach(section => observer.observe(section));

        const handleScroll = () => {
            if (window.scrollY < 60) {
                setTheme('black');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    return (
        <>
            <header
                ref={headerRef}
                className={`font-['DM_Sans',sans-serif] w-[calc(100vw-24px)] md:w-[calc(100vw-48px)] lg:w-[calc(100vw-64px)] max-w-[1480px] rounded-none border header-theme-${theme} select-none`}
                style={{
                    position: 'fixed',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '62px',
                    zIndex: 1000,
                    backgroundColor: 'var(--header-bg, rgba(2,21,32,0.92))',
                    borderColor: 'var(--header-border, rgba(0,210,255,0.3))',
                    color: 'var(--header-text, #ffffff)',
                    transition: 'var(--header-transition, all 0.3s cubic-bezier(0.16, 1, 0.3, 1))',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.85)'
                }}
            >
                {/* 4 Corner Crosshairs (Brutalist Technical Accents) */}
                <span className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t-2 border-l-2 border-cyan pointer-events-none z-30" />
                <span className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t-2 border-r-2 border-cyan pointer-events-none z-30" />
                <span className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b-2 border-l-2 border-cyan pointer-events-none z-30" />
                <span className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b-2 border-r-2 border-cyan pointer-events-none z-30" />

                <nav className="flex w-full h-full items-center relative z-10 justify-between">

                    {/* --- GAUCHE (Desktop uniquement) --- */}
                    <div className="hidden lg:flex flex-1 h-full items-center justify-start border-r border-[var(--header-border,rgba(0,210,255,0.25))]">
                        <HeaderLink 
                            to="/notre-histoire" 
                            label="Notre Histoire" 
                        />
                        <HeaderLink 
                            to="/services" 
                            label="Nos Services" 
                        />
                        <HeaderLink 
                            to="/actualites" 
                            label="Actualités" 
                        />
                        {/* <HeaderLink 
                            to="/coursiers" 
                            label="Devenir Coursier" 
                        /> */}
                    </div>

                    {/* --- LOGO CENTRE (Aggressive Cockpit HUD Box) --- */}
                    <NavLink
                        to="/"
                        className="group flex h-full flex-1 lg:flex-none lg:w-[220px] xl:w-[260px] shrink-0 items-center justify-center overflow-hidden cursor-pointer relative px-4 lg:border-r lg:border-l border-[var(--header-border,rgba(0,210,255,0.25))] hover:bg-white/[0.04] transition-colors"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <div
                            className="flex items-center justify-center gap-2.5 transition-transform duration-500 group-hover:-translate-y-[220%]"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                            <img
                                src="/logo.png"
                                alt="DEM"
                                className="w-7 h-7 object-cover shadow-sm rounded-none"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            <span className="font-black text-sm md:text-base uppercase font-['DM_Sans',sans-serif]" style={{ color: 'var(--header-text, inherit)' }}>
                                DEM
                            </span>
                        </div>
                        <p
                            className="absolute w-full px-2 translate-y-[250%] text-center text-[11px] sm:text-xs font-black tracking-[0.16em] text-cyan transition-transform duration-500 uppercase group-hover:translate-y-0 whitespace-nowrap"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                            Service de qualité
                        </p>
                    </NavLink>

                    {/* --- DROITE (Desktop uniquement) --- */}
                    <div className="hidden lg:flex flex-1 h-full items-center justify-end border-l border-[var(--header-border,rgba(0,210,255,0.25))]">
                        <HeaderLink to="/dem-pro" label="DEM PRO" hoverLabel="Pour les entreprises" className="flex-[1.15] min-w-[145px] xl:min-w-[165px]" />
                        <HeaderLink to="/chef-de-flotte" label="Chef de Flotte" hoverLabel="Nos partenaires" className="flex-[1.05] min-w-[135px] xl:min-w-[155px]" />
                        <HeaderLink to="/contact" label="Contact" className="flex-[0.9] min-w-[110px] xl:min-w-[130px] px-5 xl:px-7" />
                    </div>

                    {/* Mobile: Sharp Brutalist Hamburger Button */}
                    <div className="flex lg:hidden h-full items-center px-3 justify-center">
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="flex items-center gap-2 bg-white/10 hover:bg-cyan hover:text-dark border border-white/20 cursor-pointer font-mono font-black tracking-widest text-[11px] uppercase px-3.5 py-2 transition-all rounded-none"
                            style={{ color: 'var(--header-text, inherit)' }}
                            aria-label="Ouvrir le menu"
                            type="button"
                        >
                            <span>MENU</span>
                            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
                                <line x1="0" y1="1" x2="18" y2="1" />
                                <line x1="0" y1="6" x2="18" y2="6" />
                                <line x1="0" y1="11" x2="18" y2="11" />
                            </svg>
                        </button>
                    </div>

                </nav>
            </header>

            {/* Staggered Menu (mobile) */}
            <StaggeredMenu
                isOpen={menuOpen}
                onClose={() => setMenuOpen(false)}
                accentColor="#00D2FF"
                colors={['#021520', '#0A2233', '#005A8C']}
                displaySocials={true}
                socialItems={socialsData}
                items={[
                    { label: 'Accueil', ariaLabel: 'Accueil', link: '/' },
                    { label: 'Notre Histoire', ariaLabel: 'Notre Histoire', link: '/notre-histoire' },
                    { label: 'Nos Services', ariaLabel: 'Nos Services', link: '/services' },
                    { label: 'Actualités', ariaLabel: 'Actualités', link: '/actualites' },
                    { label: 'DEM PRO', ariaLabel: 'DEM PRO', link: '/dem-pro' },
                    { label: 'Chef de Flotte', ariaLabel: 'Chef de Flotte', link: '/chef-de-flotte' },
                    // { label: 'Devenir Coursier', ariaLabel: 'Devenir Coursier', link: '/coursiers' },
                    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
                ]}
            />
        </>
    );
}

// --- Composant Lien de Header Sharp & Agressif ---
function HeaderLink({ to, label, hoverLabel, onClick, className = '' }) {
    const location = useLocation();

    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `
                group/link relative flex h-full grow items-center justify-center px-3 xl:px-5 font-black text-xs xl:text-[12px] tracking-[0.12em] uppercase transition-all duration-200
                border-r border-[var(--header-border,rgba(0,210,255,0.25))] last:border-r-0 hover:bg-white/[0.04] whitespace-nowrap overflow-hidden
                ${isActive ? "text-cyan font-black" : "text-[var(--header-text,inherit)]"}
                ${className}
            `}
            style={{ transition: 'var(--header-transition, all 0.25s ease)' }}
        >
            {hoverLabel ? (
                <>
                    <span
                        className="transition-transform duration-500 group-hover/link:-translate-y-[300%] block font-black"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                        {label}
                    </span>
                    <span
                        className="absolute inset-0 flex items-center justify-center px-2 translate-y-[200%] text-center text-[10.5px] xl:text-[11.5px] font-black font-['DM_Sans',sans-serif] tracking-[0.04em] text-cyan transition-transform duration-500 group-hover/link:translate-y-0 uppercase whitespace-nowrap"
                        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    >
                        {hoverLabel}
                    </span>
                </>
            ) : (
                label
            )}
            <div className={`absolute bottom-0 left-0 h-[2.5px] w-full transition-all duration-300 
                ${location.pathname === to ? 'bg-cyan shadow-[0_0_12px_#00D2FF]' : 'bg-transparent group-hover/link:bg-cyan group-hover/link:shadow-[0_0_8px_#00D2FF]'}
            `} />
        </NavLink>
    );
}
