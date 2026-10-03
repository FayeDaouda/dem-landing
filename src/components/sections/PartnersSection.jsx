import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import SectionHeading from '../atoms/SectionHeading.jsx';
import lisca from "../../assets/img/logoPartenaires/lisca.png"
import samirpay from "../../assets/img/logoPartenaires/samirpay.png"
import sonatel from "../../assets/img/logoPartenaires/sonatel.jpg"
import foodByNight from "../../assets/img/logoPartenaires/foodByNight.jpg"
import terangaXTrading from "../../assets/img/logoPartenaires/terangaXTrading.jpg"

const PARTNERS = [
    { name: "Lisca", category: "Paiement Mobile", image: lisca },
    { name: "SamirPay", category: "Paiement Digital", image: samirpay },
    { name: "Sonatel", category: "Restauration Express", image: sonatel },
    { name: "Food By Night", category: "Restauration Express", image: foodByNight },
    { name: "Teranga X Trading", category: "Restauration Express", image: terangaXTrading },
];

export default function PartnersSection() {
    const trackRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth / 2;
        animRef.current = gsap.to(track, {
            x: -totalWidth,
            duration: 30,
            ease: 'none',
            repeat: -1,
        });

        const handleMouseEnter = () => animRef.current?.pause();
        const handleMouseLeave = () => animRef.current?.play();

        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            animRef.current?.kill();
            track.removeEventListener('mouseenter', handleMouseEnter);
            track.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    // Puisqu'il n'y a que 3 partenaires, on les répète plusieurs fois pour remplir l'écran
    const basePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];
    const duplicatedPartners = [...basePartners, ...basePartners];

    return (
        <section className="bg-[#021520] py-24 text-white border-t border-b border-white/[0.06] overflow-hidden relative">
            <div className="max-w-4xl mx-auto text-center px-4 mb-12">
                <SectionHeading
                    title="Ils nous font"
                    highlight="confiance"
                    subtitle="Partenaires & Écosystème"
                    titleColor="text-white"
                    highlightClassName="text-[#00D2FF]"
                    scriptColor="text-[#00D2FF]"
                    titleSize="text-3xl md:text-5xl lg:text-6xl"
                    subtitleSize="text-xl md:text-2xl lg:text-3xl"
                />
                <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed text-center mt-4">
                    Commerçants, plateformes e-commerce, restaurants et entreprises font confiance à DEM pour acheminer leurs commandes chaque jour à Dakar.
                </p>
            </div>

            <div className="relative w-full overflow-hidden mb-16">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#021520] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#021520] to-transparent z-10 pointer-events-none" />

                <div
                    ref={trackRef}
                    className="flex items-center gap-12 md:gap-24 w-max px-8"
                >
                    {duplicatedPartners.map((partner, index) => {
                        return (
                            <div
                                key={index}
                                className="flex items-center gap-4 text-slate-400 hover:text-[#00D2FF] transition-all duration-300 cursor-pointer py-3 px-6 bg-white/[0.02] border border-white/[0.05] hover:border-[#00D2FF]/30 group"
                            >
                                <div className="w-16 h-12 flex items-center justify-center  p-1.5  overflow-hidden rounded">
                                    <img src={partner.image} alt={partner.name} className="max-w-full max-h-full object-contain" />
                                </div>
                                <div className="text-left">
                                    <span className="font-sans font-bold tracking-wider uppercase text-sm md:text-base text-white block group-hover:text-[#00D2FF] transition-colors">
                                        {partner.name}
                                    </span>
                                    {/* <span className="text-[11px] text-slate-400 block font-medium">
                                        {partner.category}
                                    </span> */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-center">
                <a
                    href="mailto:contact@dem.sn"
                    className="inline-flex items-center gap-3 px-6 py-3 font-bold text-sm tracking-wide uppercase text-white bg-[#00D2FF]/10 border border-[#00D2FF]/30 hover:bg-[#00D2FF]/20 transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.15)]"
                >
                    <span>Devenir partenaire commercial</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
