import React from 'react';
import ScrollExpand from './ScrollExpand.jsx';
import SectionHeading from '../atoms/SectionHeading.jsx';

export default function ScrollExpandSection() {
  return (
    <div className="w-full relative bg-[#021520]">
      <ScrollExpand
        src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85"
        alt="DEM Livraison Express au Sénégal"
        title="LIVRAISON EN TEMPS RÉEL"
        scrollHint="Faites défiler pour explorer"
        useWindowScroll
        startWidth={42}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={1.2}
        holdDistance={0.35}
        smoothing={0.1}
        overlayScrim={0.85}
        enabled
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto text-white">
            <SectionHeading
              subtitle="L'excellence logistique"
              title="LA MOBILITÉ CONNECTÉE"
              highlight="AU SÉNÉGAL"
              align="center"
              titleColor="text-white"
              highlightClassName="text-[#00D2FF]"
              scriptColor="text-[#00D2FF]"
              titleSize="text-3xl md:text-5xl lg:text-6xl"
              subtitleSize="text-xl md:text-2xl"
              className="mb-8 mt-2"
            />
            <p className="font-sans text-base md:text-lg leading-relaxed mb-6 opacity-90 max-w-3xl">
              DEM redéfinit les standards de la livraison express à Dakar. De la commande instantanée sur smartphone jusqu'à la remise sécurisée en main propre, chaque course est orchestrée par une technologie de géolocalisation de pointe et des coursiers rigoureusement formés.
            </p>
            <p className="font-sans text-sm md:text-base leading-relaxed opacity-90 max-w-2xl">
              Particuliers, restaurants, e-commerces et grandes entreprises : bénéficiez d'une traçabilité GPS 100% en direct, de paiements digitaux fluides (Wave, Orange Money) et d'un réseau disponible 7j/7 pour propulser vos activités.
            </p>
          </div>
        </div>
      </ScrollExpand>
    </div>
  );
}
