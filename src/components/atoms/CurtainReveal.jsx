import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function CurtainReveal({ children, curtainColor = "#1B273D" }) {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const rectsRef = useRef([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%", // Déclenche quand la section arrive à 75% de l'écran
                once: true,       // Ne joue l'animation qu'une seule fois
            },
            defaults: { ease: "power4.inOut" }
        });

        // Animation des rectangles : ils se réduisent et remontent
        tl.to(
            rectsRef.current,
            {
                height: 0,
                y: 0,
                duration: 0.8,
                stagger: 0.05,
            }
        );

        // On cache le conteneur du rideau à la fin pour ne pas bloquer les clics
        tl.set(overlayRef.current, {
            display: "none",
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Contenu à révéler */}
            <div className="relative z-0">
                {children}
            </div>

            {/* Rideau (Curtain) superposé */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-10 pointer-events-none"
            >
                {[
                    "2.5%",
                    "23.75%",
                    "23.75%",
                    "23.75%",
                    "23.75%",
                    "2.5%",
                ].map((width, i) => (
                    <div
                        key={i}
                        ref={(el) => { rectsRef.current[i] = el; }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: `${i === 0 ? 0 : i === 5 ? 97.5 : 2.5 + (i - 1) * 23.75}%`,
                            width,
                            height: "100%",
                            background: curtainColor,
                            border: "1px solid rgba(0,0,0,0.1)", // Optionnel
                            transformOrigin: "top", // Pour que la réduction se fasse vers le haut
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
