import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "../../utils/SplitText.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MiniTitleWithBar from "../atoms/MiniTitleWithBar.jsx";
import CoursierSimulator from "../atoms/CoursierSimulator.jsx";
import useIsDesktop from "../../hooks/useIsDesktop.js";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceElement({
    id,
    number,
    title,
    subtitle,
    summary,
    content,
    detailedDescription,
    methodeTravail,
    valeurAjoutee,
    highlights = [],
    keys = [],
    img,
    miniTitleWithBar,
    linkText,
    linkUrl,
    badge,
    audience,
    hasSimulator,
    simulator
}) {
    const isDesktop = useIsDesktop();
    const [spacerHeight, setSpacerHeight] = useState(0);

    const sectionRef = useRef(null);
    const compRef = useRef(null);
    const headerWrapper = useRef(null);
    const sectionHeader = useRef(null);
    const keysRef = useRef(null);
    const imageContainerRef = useRef(null);

    const mainContent = summary || content;

    // Calcul du spacer height
    useLayoutEffect(() => {
        if (!compRef.current) return;

        const compPaddingTop = parseFloat(
            window.getComputedStyle(compRef.current).paddingTop
        );
        setSpacerHeight(compPaddingTop);
    }, []);

    // Animations GSAP (Pin Header + Scroll Scrub)
    useEffect(() => {
        const ctx = gsap.context(() => {
            document.fonts.ready.then(() => {
                const el = sectionRef.current;
                const header = sectionHeader.current;
                const headerWrap = headerWrapper.current;
                const imageEl = imageContainerRef.current?.querySelector("img");
                const keysContainer = keysRef.current;

                if (!el || !header || !headerWrap || !imageEl || !keysContainer) return;

                // Nettoyage des ScrollTriggers existants
                cleanupScrollTriggers();

                // Initialisation des animations
                initializeSplitTexts(el, keysContainer);
                createPinAnimation(headerWrap, imageEl);

                if (isDesktop) {
                    createKeysAnimation(keysContainer);
                }

                // Refresh après création
                setTimeout(() => ScrollTrigger.refresh(), 150);
            });
        }, compRef);

        return () => {
            ctx.revert();
            cleanupScrollTriggers();
        };
    }, [id, isDesktop]);

    // Nettoyage des ScrollTriggers
    const cleanupScrollTriggers = () => {
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger === sectionRef.current ||
                trigger.trigger === headerWrapper.current ||
                (trigger.vars && trigger.vars.id && trigger.vars.id.includes(id))) {
                trigger.kill();
            }
        });
    };

    // Initialisation des SplitText
    const initializeSplitTexts = (el, keysContainer) => {
        try {
            const keyNodes = keysContainer.querySelectorAll(".keys");
            if (keyNodes.length) {
                new SplitText(keyNodes, { type: "lines" });
            }
        } catch (error) {
            console.warn("SplitText keys error:", error);
        }
    };

    // Création de l'animation de PIN HEADER
    const createPinAnimation = (headerWrap, image) => {
        const headerWrapHeight = headerWrap.offsetHeight;
        const endValue = `bottom top+=${-20 + headerWrapHeight}px`;

        ScrollTrigger.create({
            trigger: headerWrap,
            start: "top top",
            endTrigger: image,
            end: endValue,
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
            id: `pin-${id}`
        });
    };

    // Animation des keys
    const createKeysAnimation = (keysContainer) => {
        const splitKeys = new SplitText(keysContainer.querySelectorAll(".keys"), {
            type: "lines"
        });

        if (splitKeys?.lines?.length > 0) {
            gsap.from(splitKeys.lines, {
                yPercent: 150,
                autoAlpha: 0,
                stagger: 0.05,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: keysContainer,
                    start: "top bottom-=200px",
                    end: "bottom center",
                    toggleActions: "play reverse play reverse",
                    scrub: true,
                    id: `keys-${id}`
                }
            });
        }
    };

    const paddingClass = isDesktop ? "" : "px-5";

    return (
        <div ref={compRef} className="lg:px-12 pb-16 border-t border-black/10 scroll-mt-20" id={id}>
            <div ref={sectionRef}>
                {/* ── PIN HEADER SECTION (GSAP SCROLL PIN) ── */}
                <div ref={headerWrapper} className="pin-wrapper z-20 w-full">
                    <div ref={sectionHeader} className={`flex flex-wrap pt-20 pb-4 bg-white ${paddingClass}`}>
                        <div className="w-full md:w-2/3 pl-0">
                            <div className="flex items-center gap-3 mb-2">
                                
                                {badge && (
                                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                                        {badge}
                                    </span>
                                )}
                            </div>
                            <h2 className="mt-2 mb-0 text-3xl sm:text-4xl md:text-5xl font-black uppercase font-['DM_Sans',sans-serif] text-dark leading-tight">
                                <span className="font-['Poppins',sans-serif] text-[#0086C8] mr-2">{"/>"}</span>
                                {title}
                            </h2>
                        </div>
                        <div className="hidden md:flex md:w-1/3 items-end justify-end pb-2">
                            {audience && (
                                <span className="text-xs text-slate-500 font-['Poppins',sans-serif] text-right">
                                    <strong className="text-slate-700">Cible :</strong> {audience}
                                </span>
                            )}
                        </div>
                    </div>
                    {/* Dégradé doux pour séparer le header épinglé du contenu qui défile */}
                    <div className="w-full h-6 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none" />
                </div>

                {/* ── CONTENT SECTION (DÉFILE SOUS LE HEADER PINNÉ) ── */}
                <div className="w-full pt-4">
                    <div className={`flex flex-wrap justify-between relative ${paddingClass}`}>
                        
                        {/* Colonne gauche : Description & Pitch */}
                        <div className="w-full md:w-1/2 relative pl-0 mb-6 md:mb-0 pr-0 md:pr-8">
                            <p className="m-0 font-['Poppins',sans-serif] text-base sm:text-lg leading-relaxed text-dark max-w-[550px]">
                                {mainContent}
                            </p>
                            
                            {/* Méthode de travail intégrée */}
                            {methodeTravail && (
                                <div className="mt-6 p-5 bg-[#FAFCFD] border-l-4 border-[#0086C8] border-y border-r border-slate-200">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#0086C8] font-['Raleway',sans-serif] block mb-1.5">
                                        Notre méthode de travail
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-700 font-['Poppins',sans-serif] leading-relaxed m-0">
                                        {methodeTravail}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Colonne droite : Keys & Points d'engagement */}
                        <div ref={keysRef} className="w-full md:w-1/2 pl-0 flex flex-col justify-between">
                            <div className="font-['Raleway',sans-serif]">
                                {keys?.length > 0 ? (
                                    keys.map((key, index) => (
                                        <h3 key={index} className="font-semibold text-base sm:text-lg text-dark my-2 keys font-['Raleway',sans-serif] flex items-start gap-2.5">
                                            <span className="w-1.5 h-1.5 bg-[#0086C8] rounded-none mt-2.5 shrink-0" />
                                            <span>{key}</span>
                                        </h3>
                                    ))
                                ) : (
                                    <h3 className="font-semibold text-base text-muted my-1 keys font-['Raleway',sans-serif]">
                                        Standards d'excellence opérationnelle
                                    </h3>
                                )}
                            </div>

                            {/* Encadré Valeur Ajoutée DEM */}
                            {valeurAjoutee && (
                                <div className="mt-6 p-5 bg-[#021520] text-white border border-black/10">
                                    <span className="font-serif italic text-xs text-[#00D2FF] block mb-1">
                                        La valeur ajoutée DEM
                                    </span>
                                    <p className="text-xs sm:text-sm font-bold text-white font-['DM_Sans',sans-serif] leading-snug m-0">
                                        {valeurAjoutee}
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* ── IMAGE SECTION (DÉCLENCHEUR DU DÉCROCHAGE / UNPIN DU HEADER) ── */}
            {img && (
                <div ref={imageContainerRef} className="w-full my-10 overflow-hidden h-[clamp(280px,50vw,540px)] rounded-none shadow-xl border border-black/10 relative">
                    <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover rounded-none grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            )}

            {/* ── DESCRIPTIVE SECTION BELOW THE IMAGE (STANDARDS & CTA) ── */}
            <div className={`mt-8 mb-4 ${paddingClass}`}>
                <MiniTitleWithBar content={miniTitleWithBar || "EXCELLENCE OPÉRATIONNELLE DAKAR"} />
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <p className="font-['Poppins',sans-serif] text-base md:text-lg leading-relaxed text-dark/80 m-0">
                            {detailedDescription || mainContent}
                        </p>
                        <div className="pt-2">
                            <Link
                                to={linkUrl || "/contact"}
                                className="inline-flex items-center gap-3 uppercase tracking-wider text-xs sm:text-sm font-bold px-6 py-3.5 rounded-none border border-[#0086C8] text-[#0086C8] hover:bg-[#0086C8] hover:text-white transition-all duration-200 cursor-pointer"
                            >
                                <span>{linkText ? `EN SAVOIR PLUS — ${linkText}` : "EN SAVOIR PLUS"}</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {highlights?.length > 0 && (
                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="p-4 rounded-none bg-slate-50 border border-slate-200 flex items-center justify-between">
                                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 font-['Raleway',sans-serif]">
                                        {item.label}
                                    </span>
                                    <span className="text-sm font-bold text-dark font-['DM_Sans',sans-serif]">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── SIMULATEUR DES COURSIERS (INTÉGRÉ DIRECTEMENT AU SERVICE DES COURSIERS) ── */}
            {(hasSimulator || id === "flotte-dediee" || id === "coursiers-dem") && (
                <div className={`mt-10 pt-8 border-t border-black/10 ${paddingClass}`}>
                    <div className="mb-4">
                        <span className="font-serif italic text-sm text-[#0086C8] block mb-1">
                            Transparence & Rémunération
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black uppercase text-dark tracking-tight font-['DM_Sans',sans-serif] m-0">
                            Simulateur de revenus coursier DEM
                        </h3>
                    </div>
                    <CoursierSimulator
                        ratePerDelivery={simulator?.ratePerDelivery || 1200}
                        title="Calculateur de gains en direct"
                        subtitle="Ajustez le curseur selon le nombre de livraisons par jour pour projeter vos revenus réels à Dakar"
                    />
                </div>
            )}
        </div>
    );
}
