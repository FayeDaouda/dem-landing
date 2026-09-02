import React from 'react';

export default function HeroHomePage({ 
    title = "DEM LIVRAISON", 
    subtitle = "Livraison express à moto partout au Sénégal",
    image = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85"
}) {
    return (
        <div
            id="hero"
            data-header-theme="white"
            className="w-full relative overflow-hidden text-white h-screen bg-[#021520]"
        >
            {/* Background Image */}
            <img
                src={image}
                alt="DEM Livraison Hero"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-105 transition-transform duration-1000"
            />
            
            {/* Solid Dark Overlay for text legibility (no gradient) */}
            <div className="absolute inset-0 bg-[#021520]/60 z-[1]" />

            {/* Bottom Content Container */}
            <div
                className="absolute bottom-0 left-0 w-full flex justify-between items-end pb-16 px-6 lg:px-14 z-[2]"
            >
                {/* Bottom Left: Large Title and Subtitle */}
                <div className="flex flex-col items-start gap-3 max-w-4xl">
                    <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-widest bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/40">
                        Plateforme Express &bull; Dakar
                    </span>
                    <h1
                        className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-[104px] leading-[0.92] tracking-tight uppercase font-black text-white"
                        style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
                    >
                        {title}
                    </h1>
                    <p
                        className="font-sans text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-wide text-white/90"
                        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
                    >
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}
