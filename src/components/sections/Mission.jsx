import React from 'react';
import HorizontalCurtainReveal from '../atoms/HorizontalCurtainReveal';

const Mission = ({
    theme = 'dark', // 'dark' | 'light'
    className = ''
}) => {
    const isDark = theme === 'dark';
    const curtainBg = isDark ? '#021520' : '#ffffff';

    return (
        <section className={`w-full py-24 px-6 lg:px-12 transition-colors duration-300 ${isDark ? 'bg-[#021520] text-white' : 'bg-white text-[#021520]'
            } ${className}`}>
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">

                {/* 1. Titre & Badge Visuel */}
                <div className="col-span-1 flex flex-col justify-between">
                    <div>
                        <HorizontalCurtainReveal curtainColor={curtainBg}>
                            <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-4">
                                La Mission
                            </h2>
                        </HorizontalCurtainReveal>
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#00D2FF]">
                            Delivery Express Mobility
                        </span>
                    </div>
                </div>

                {/* 2. Main Text */}
                <div className="col-span-1 md:col-span-2">
                    <HorizontalCurtainReveal curtainColor={curtainBg}>
                        <p className="font-sans text-2xl md:text-3xl lg:text-[38px] leading-[1.3] tracking-tight font-medium">
                            <span className="text-[#00D2FF] font-bold">DEM (Delivery Express Mobility)</span> réinvente la logistique et la livraison urbaine en Afrique de l'Ouest. Grâce à une technologie connectée en temps réel, nous propulsons une flotte de coursiers qualifiés pour relier commerçants, entreprises et particuliers avec une rapidité record de <span className="underline decoration-[#00D2FF] decoration-2 underline-offset-4">moins de 45 minutes</span> partout à Dakar.
                        </p>
                    </HorizontalCurtainReveal>
                </div>

            </div>
        </section>
    );
};

export default Mission;
