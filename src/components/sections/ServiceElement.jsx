import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { SplitText } from "../../utils/SplitText.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MiniTitleWithBar from "../atoms/MiniTitleWithBar.jsx";
import CarouselParallax from "./CarouselParallax.jsx";
import CoursierSimulator from "../atoms/CoursierSimulator.jsx";
import useIsDesktop from "../../hooks/useIsDesktop.js";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceElement({
    id,
    title,
    subtitle,
    content,
    detailedDescription,
    highlights = [],
    keys,
    img,
    miniTitleWithBar,
    linkText,
    linkUrl,
    projects,
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

    // Calcul du spacer height
    useLayoutEffect(() => {
        if (!compRef.current) return;

        const compPaddingTop = parseFloat(
            window.getComputedStyle(compRef.current).paddingTop
        );
        setSpacerHeight(compPaddingTop);
    }, []);

    // Animations GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            document.fonts.ready.then(() => {
                const el = sectionRef.current;
                const header = sectionHeader.current;
                const headerWrap = headerWrapper.current;
                const image = el?.nextElementSibling?.querySelector("img");
                const keysContainer = keysRef.current;

                if (!el || !header || !headerWrap || !image || !keysContainer) return;

                // Nettoyage des ScrollTriggers existants
                cleanupScrollTriggers();

                // Initialisation des animations
                initializeSplitTexts(el, keysContainer);
                createPinAnimation(headerWrap, image);

                if (isDesktop) {
                    createContentAnimations(el);
                    createKeysAnimation(keysContainer);
                }

                // Refresh après création
                setTimeout(() => ScrollTrigger.refresh(), 150);
            });
        }, sectionRef);

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
        const contentDiv = el.querySelector(".content");
        if (contentDiv) {
            new SplitText(contentDiv, { type: "lines" });
        }

        try {
            const keyNodes = keysContainer.querySelectorAll(".keys");
            if (keyNodes.length) {
                new SplitText(keyNodes, { type: "lines" });
            }
        } catch (error) {
            console.warn("SplitText keys error:", error);
        }
    };

    // Création de l'animation de pin
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

    // Animations du contenu
    const createContentAnimations = (el) => {
        const contentDiv = el.querySelector(".content");
        if (!contentDiv) return;

        const splitContent = new SplitText(contentDiv, { type: "lines" });

        // Animation scroll du contenu
        gsap.fromTo(contentDiv,
            { y: 0 },
            {
                y: () => {
                    const parentHeight = el.offsetHeight - 200;
                    const contentHeight = contentDiv.offsetHeight;
                    return parentHeight - contentHeight;
                },
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                    id: `content-scroll-${id}`,
                }
            }
        );

        // Animation des lignes du contenu
        if (splitContent.lines?.length) {
            gsap.from(splitContent.lines, {
                yPercent: 100,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    end: "top 60%",
                    toggleActions: "play reverse play reverse",
                    scrub: true,
                    id: `content-lines-${id}`,
                }
            });
        }
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
        <div ref={compRef} className="lg:px-12 pb-16 border-t border-black/10" id={id}>
            <div ref={sectionRef}>
                {/* Header Section */}
                <div ref={headerWrapper} className="pin-wrapper z-10 w-full">
                    <div ref={sectionHeader} className={`flex flex-wrap pt-24 bg-white ${paddingClass}`}>
                        <div className="w-full md:w-1/2 pl-0">
                            <small className="inline-block px-2.5 py-1 rounded-none text-[0.72rem] font-semibold uppercase tracking-wider bg-cyan/15 text-cyan-dark font-['Raleway',sans-serif]">
                                {subtitle}
                            </small>
                            <h1 className="mt-3 mb-0 text-3xl sm:text-4xl md:text-5xl font-black uppercase font-['DM_Sans',sans-serif] text-dark">
                                <span className="font-['Poppins',sans-serif] text-cyan-2 mr-1">{"/>"} </span>
                                {title}
                            </h1>
                        </div>
                        <div className="hidden md:block md:w-1/2" />
                    </div>
                    <div className="w-full h-5 bg-gradient-to-b from-white to-transparent" />
                </div>

                {/* Content Section */}
                <div className="w-full">
                    <div className={`flex flex-wrap justify-between relative ${paddingClass}`}>
                        <div className="w-full md:w-1/2 relative pl-0 mb-6 md:mb-0">
                            <p className="content m-0 font-['Poppins',sans-serif] text-base leading-relaxed text-dark max-w-[500px]">
                                {content}
                            </p>
                        </div>

                        <div ref={keysRef} className="w-full md:w-1/2 pl-0 flex flex-col">
                            <div className="font-['Raleway',sans-serif]">
                                {keys?.length > 0 ? (
                                    keys.map((key, index) => (
                                        <h3 key={index} className="font-semibold text-lg md:text-xl text-dark my-1 keys font-['Raleway',sans-serif]">
                                            {key}
                                        </h3>
                                    ))
                                ) : (
                                    <h3 className="font-semibold text-lg md:text-xl text-muted my-1 keys font-['Raleway',sans-serif]">
                                        No keys provided
                                    </h3>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Section */}
            {
                img && (
                    <div className="w-full my-8 overflow-hidden h-[clamp(280px,60vw,600px)] rounded-none shadow-xl">
                        <img
                            src={img}
                            alt={title}
                            className="w-full h-full object-cover rounded-none"
                        />
                    </div>
                )
            }

            {/* Descriptive Section below the Image */}
            <div className={`mt-8 mb-4 ${paddingClass}`}>
                <MiniTitleWithBar content={miniTitleWithBar || "EXCELLENCE OPÉRATIONNELLE"} />
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <p className="font-['Poppins',sans-serif] text-base md:text-lg leading-relaxed text-dark/80 m-0">
                            {detailedDescription || content}
                        </p>
                        <div className="pt-2">
                            <Link
                                to={linkUrl || "/contact"}
                                className="inline-flex items-center gap-3 uppercase tracking-wider text-xs sm:text-sm font-bold px-6 py-3.5 rounded-none border border-cyan-2 text-cyan-2 hover:bg-cyan-2 hover:text-white transition-all duration-250 cursor-pointer"
                            >
                                <span>{linkText ? `EN SAVOIR PLUS — ${linkText}` : "EN SAVOIR PLUS"}</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {highlights?.length > 0 && (
                        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="p-4 rounded-none bg-slate-50 border border-slate-100 flex items-center justify-between">
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

            {/* Simulateur interactif de gains (pour le service coursiers) */}
            {(hasSimulator || id === "coursiers-dem") && (
                <div className={`mt-8 ${paddingClass}`}>
                    <CoursierSimulator
                        ratePerDelivery={simulator?.ratePerDelivery || 1200}
                        title="Simulateur de revenus coursier DEM"
                        subtitle="Ajustez le curseur selon le nombre de livraisons par jour pour projeter vos revenus réels"
                    />
                </div>
            )}

            {/* Projects / Carousel Section (conservé en commentaire pour réactivation à la demande) */}
            {/* {
                projects && (
                    <div className={`mt-12 ${paddingClass}`}>
                        <MiniTitleWithBar content={miniTitleWithBar} />
                        <div className="mt-5">
                            <CarouselParallax projects={projects} />
                        </div>
                    </div>
                )
            } */}
        </div>
    );
}
