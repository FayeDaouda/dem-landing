import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalCurtainReveal({ children, curtainColor = "#1B273D" }) {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const rectsRef = useRef([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const calculateLines = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            // On cherche l'élément enfant direct (le texte)
            const textElement = container.querySelector('.relative.z-0 > *');
            if (!textElement) return;

            const computedStyle = window.getComputedStyle(textElement);
            let lineHeight = parseFloat(computedStyle.lineHeight);
            
            // Si le line-height n'est pas explicite (ex: 'normal'), on l'estime
            if (isNaN(lineHeight)) {
                const fontSize = parseFloat(computedStyle.fontSize);
                lineHeight = fontSize * 1.25; 
            }

            const containerHeight = container.clientHeight;
            // On calcule le nombre de lignes en fonction de la hauteur totale et de la hauteur d'une ligne
            const numLines = Math.max(1, Math.ceil(containerHeight / lineHeight));
            
            const newRows = [];
            for (let i = 0; i < numLines; i++) {
                newRows.push({
                    height: lineHeight,
                    top: i * lineHeight
                });
            }
            setRows(newRows);
        };

        // Calcul initial avec un petit délai pour s'assurer que les polices sont chargées
        const timer = setTimeout(calculateLines, 100);
        
        window.addEventListener('resize', calculateLines);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', calculateLines);
        };
    }, []);

    useGSAP(() => {
        if (!containerRef.current || rows.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                once: true,
            },
            defaults: { ease: "power4.inOut" }
        });

        // Animation des rectangles : ils se réduisent sur la largeur vers la droite
        tl.to(
            rectsRef.current.slice(0, rows.length), // on s'assure de n'animer que ceux qui existent
            {
                width: 0,
                duration: 1.2,
                stagger: 0.1,
            }
        );

        tl.set(overlayRef.current, {
            display: "none",
        });

    }, { scope: containerRef, dependencies: [rows] });

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Contenu à révéler */}
            <div className="relative z-0">
                {children}
            </div>

            {/* Rideau (Curtain) superposé */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
            >
                {rows.map((row, i) => (
                    <div
                        key={i}
                        ref={(el) => { rectsRef.current[i] = el; }}
                        style={{
                            position: "absolute",
                            right: 0,
                            top: `${row.top}px`,
                            width: "100%",
                            height: `${row.height + 1}px`, // +1px pour éviter les micro-trous entre les lignes
                            background: curtainColor,
                            transformOrigin: "right",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
