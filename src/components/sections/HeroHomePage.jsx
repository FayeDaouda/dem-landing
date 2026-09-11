import React, { useState } from 'react';
import { ArrowUpRight, QrCode } from 'lucide-react';
import SectionHeading from '../atoms/SectionHeading.jsx';

export default function HeroHomePage({ 
    title = "DEM", 
    subtitle = "Livraison express partout à Dakar",
    image = "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85"
}) {

    const appStoreUrl = "https://apps.apple.com/us/app/dem-livraison/id6764724342";
    const playStoreUrl = "https://play.google.com/store/apps/details?id=sn.dem.demapp";

    return (
        <div
            id="hero"
            data-header-theme="white"
            className="w-full relative overflow-hidden text-white min-h-screen lg:h-screen bg-[#021520] flex flex-col justify-end"
        >
            {/* Background Image */}
            <img
                src={image}
                alt="DEM Livraison Hero"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-105 transition-transform duration-1000"
            />
            
            {/* Solid Dark Overlay for high contrast legibility (no gradient) */}
            <div className="absolute inset-0 bg-[#021520]/65 z-[1]" />



            {/* Main Content Area */}
            <div className="relative z-[2] w-full px-6 lg:px-14 pb-12 lg:pb-16 pt-36 lg:pt-0 max-w-[1500px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                
                {/* Left Column: Typographic Monumental Title */}
                <div className="flex flex-col items-start gap-3 max-w-3xl">
                    <span className="font-serif italic text-cyan text-2xl sm:text-3xl md:text-4xl tracking-wide font-light -mb-1 block">
                        Application
                    </span>

                    <h1
                        className="font-['DM_Sans',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[100px] leading-[0.9] tracking-tight uppercase font-black text-white"
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
                    >
                        {title}
                    </h1>

                    <p
                        className="font-['Poppins',sans-serif] text-base sm:text-xl md:text-2xl font-light tracking-wide text-white/90 max-w-2xl leading-relaxed"
                        style={{ textShadow: '0 2px 14px rgba(0,0,0,0.8)' }}
                    >
                        {subtitle}
                    </p>
                </div>

                {/* Right Column: Sharp Awwwards Download Module (No gradient, no rounded) */}
                <div className="w-full lg:w-auto shrink-0 flex flex-col gap-4">
                    
                    {/* Architectural Download Box */}
                    <div className="bg-[#021520] border border-white/20 p-6 sm:p-8 flex flex-col gap-6 shadow-2xl backdrop-blur-md">
                        
                        <div className="flex justify-between items-start gap-4 border-b border-white/10 pb-4">
                            <SectionHeading
                                title="Télécharger"
                                highlight="l'App"
                                subtitle="Application"
                                align="left"
                                reverse={true}
                                rotate="-1deg"
                                titleTag="h3"
                                titleSize="text-xl sm:text-2xl"
                                subtitleSize="text-xs sm:text-sm"
                                titleColor="text-white"
                                highlightColor="#00D2FF"
                                scriptColor="text-cyan font-serif italic"
                                className="m-0"
                            />

                        </div>

                        {/* Dual Store Download Buttons (Sharp & Responsive) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            
                            {/* App Store Button */}
                            <a
                                href={appStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between gap-3 px-5 py-3.5 bg-white text-[#021520] hover:bg-cyan hover:text-[#021520] transition-all duration-300 border border-white cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 fill-[#021520] shrink-0" viewBox="0 0 24 24">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.09.65-2.73 1.4-.56.65-.99 1.72-.94 2.76 1.07.08 2.05-.54 2.66-1.29z"/>
                                    </svg>
                                    <div className="flex flex-col text-left leading-tight text-[#021520]">
                                        <span className="text-[9px] uppercase font-bold tracking-widest opacity-80 font-['Raleway',sans-serif]">Disponible sur</span>
                                        <span className="text-sm font-black font-['DM_Sans',sans-serif]">App Store</span>
                                    </div>
                                </div>
                                <ArrowUpRight size={16} className="text-[#021520] opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                            {/* Google Play Button */}
                            <a
                                href={playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between gap-3 px-5 py-3.5 bg-white/5 text-white hover:bg-cyan hover:text-dark hover:border-cyan transition-all duration-300 border border-white/20 cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 fill-current shrink-0 text-cyan group-hover:text-dark transition-colors" viewBox="0 0 24 24">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-.951V2.765c.137-.36.357-.69.609-.951zm11.597 11.597l2.368 2.368-12.78 7.378 10.412-9.746zm0-2.822L4.794.843l12.78 7.379-2.368 2.367zm1.414 1.411l3.774 2.18c1.07.618 1.07 1.626 0 2.244l-3.774 2.18-2.122-2.122 2.122-2.482z"/>
                                    </svg>
                                    <div className="flex flex-col text-left leading-tight">
                                        <span className="text-[9px] uppercase font-bold tracking-widest opacity-70 font-['Raleway',sans-serif]">Disponible sur</span>
                                        <span className="text-sm font-black font-['DM_Sans',sans-serif]">Google Play</span>
                                    </div>
                                </div>
                                <ArrowUpRight size={16} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
