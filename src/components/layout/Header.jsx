import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { StaggeredMenu } from "./StaggeredMenu";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('black');

    useGSAP(() => {
        const el = headerRef.current;
        if (!el) return;
    }, [location.pathname]);

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
                className={`font-sans overflow-hidden w-[calc(100vw-20px)] md:w-[calc(100vw-40px)] lg:w-[calc(100vw-60px)] max-w-[1420px] rounded-2xl shadow-2xl border header-theme-${theme}`}
                style={{
                    position: 'fixed',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    height: '66px',
                    zIndex: 1000,
                    backgroundColor: 'var(--header-bg, rgba(2,21,32,0.88))',
                    borderColor: 'var(--header-border, rgba(0,210,255,0.22))',
                    color: 'var(--header-text, #ffffff)',
                    transition: 'var(--header-transition, all 0.35s cubic-bezier(0.4, 0, 0.2, 1))',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                }}
            >
                <nav className="flex w-full h-full items-center relative z-10 justify-between">

                    {/* --- GAUCHE (Desktop uniquement) --- */}
                    <div className="hidden lg:flex flex-1 h-full items-center justify-start border-r border-[var(--header-border,rgba(0,210,255,0.2))] transition-colors duration-400">
                        <HeaderLink to="/la-maison" label="La maison" />
                        <HeaderLink to="/services" label="Services" />
                        <HeaderLink to="/livreurs" label="Devenir Livreur" />
                    </div>

                    {/* --- LOGO CENTRE --- */}
                    <NavLink
                        to="/"
                        className="group flex h-full flex-1 lg:flex-none lg:w-[320px] shrink-0 items-center justify-center overflow-hidden cursor-pointer relative px-6 lg:border-r lg:border-l border-[var(--header-border,rgba(0,210,255,0.2))] transition-colors duration-400"
                        style={{ backgroundColor: 'transparent' }}
                    >
                        <div
                            className="flex items-center justify-center gap-3 transition-transform duration-500 group-hover:-translate-y-[200%]"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.49, 0.03, 0.13, 0.99)' }}
                        >
                            <img
                                src="/logo.png"
                                alt="DEM"
                                className="w-8 h-8 md:w-9 md:h-9 rounded-lg object-cover shadow-sm"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            <span className="font-black text-sm md:text-base tracking-[0.14em] uppercase" style={{ color: 'var(--header-text, inherit)' }}>
                                DEM LIVRAISON
                            </span>
                        </div>
                        <p
                            className="absolute w-full px-4 translate-y-[200%] text-center text-xs md:text-sm font-semibold tracking-wide text-cyan transition-transform duration-500 group-hover:translate-y-0"
                            style={{ transitionTimingFunction: 'cubic-bezier(0.49, 0.03, 0.13, 0.99)' }}
                        >
                            Livraison express à moto ⚡
                        </p>
                    </NavLink>

                    {/* --- DROITE (Desktop uniquement) --- */}
                    <div className="hidden lg:flex flex-1 h-full items-center justify-end border-l border-[var(--header-border,rgba(0,210,255,0.2))] transition-colors duration-400">
                        <HeaderLink to="/entreprises" label="Pour les entreprises" />
                        <HeaderLink to="/flotte" label="Chef de Flotte" />
                        <HeaderLink to="/contact" label="Contact" />
                    </div>

                    {/* Mobile: Hamburger Button */}
                    <div className="flex lg:hidden h-full items-center px-4 justify-center">
                        <button
                            onClick={() => setMenuOpen(true)}
                            className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 cursor-pointer font-bold tracking-widest text-xs uppercase px-3.5 py-2 rounded-lg transition-colors"
                            style={{ color: 'var(--header-text, inherit)' }}
                            aria-label="Ouvrir le menu"
                            type="button"
                        >
                            <span>MENU</span>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                <line x1="0" y1="1" x2="20" y2="1" />
                                <line x1="0" y1="7" x2="20" y2="7" />
                                <line x1="0" y1="13" x2="20" y2="13" />
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
                items={[
                    { label: 'Accueil', ariaLabel: 'Accueil', link: '/' },
                    { label: 'La maison', ariaLabel: 'La maison', link: '/la-maison' },
                    { label: 'Services', ariaLabel: 'Services', link: '/services' },
                    { label: 'Devenir Livreur', ariaLabel: 'Devenir Livreur', link: '/livreurs' },
                    { label: 'Pour les entreprises', ariaLabel: 'Pour les entreprises', link: '/entreprises' },
                    { label: 'Chef de Flotte', ariaLabel: 'Chef de Flotte', link: '/flotte' },
                    { label: 'Contact', ariaLabel: 'Contact', link: '/contact' },
                ]}
            />
        </>
    );
}

// --- Composant Lien de Header ---
function HeaderLink({ to, label, onClick }) {
    const location = useLocation();

    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) => `
                group/link relative flex h-full grow items-center justify-center px-4 xl:px-6 font-bold text-xs xl:text-[13px] tracking-wider transition-all duration-300
                border-r border-[var(--header-border,rgba(0,210,255,0.2))] last:border-r-0 hover:bg-white/5 whitespace-nowrap
                ${isActive ? "text-cyan font-extrabold" : "text-[var(--header-text,inherit)]"}
            `}
            style={{ transition: 'var(--header-transition, all 0.3s ease)' }}
        >
            {label}
            <div className={`absolute bottom-0 left-0 h-[2.5px] w-full transition-colors duration-300 
                ${location.pathname === to ? 'bg-cyan' : 'bg-transparent group-hover/link:bg-cyan'}
            `} />
        </NavLink>
    );
}
