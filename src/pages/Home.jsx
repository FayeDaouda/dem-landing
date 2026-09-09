import { useState } from 'react';
import HeroHomePage from '../components/sections/HeroHomePage.jsx';
import Mission from '../components/sections/Mission.jsx';
import DeliveryJourney from '../components/sections/DeliveryJourney.jsx';
import HorizontalGallery from '../components/sections/HorizontalGallery.jsx';
import ScrollExpandSection from '../components/sections/ScrollExpandSection.jsx';
import PartnersSection from '../components/sections/PartnersSection.jsx';
import DownloadAppCTA from '../components/sections/DownloadAppCTA.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import CircularGallery from '../components/atoms/CircularGallery.jsx';
import SectionHeading from '../components/atoms/SectionHeading.jsx';

const C = {
  cyan: '#00D2FF',
  cyan2: '#0086C8',
  teal: '#00897B',
  dark: '#021520',
  text: '#FFFFFF',
};

const galleryItems = [
  { 
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&auto=format&fit=crop&q=85', 
    text: '< 45 min · Point à point' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85', 
    text: '100% · Traçabilité GPS' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85', 
    text: 'Impact · Revenus dignes' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&auto=format&fit=crop&q=85', 
    text: '< 45 min · Enlèvement Express' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=900&auto=format&fit=crop&q=85', 
    text: '100% · Suivi direct 7j/7' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=85', 
    text: 'Impact · Flotte valorisée' 
  },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.dark, color: C.text, overflowX: 'clip' }}>
      
      {/* ── HERO HOMEPAGE ── */}
      <HeroHomePage
        title="DEM LIVRAISON"
        subtitle="Livraison express à moto partout au Sénégal"
        image="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85"
      />

      {/* ── MISSION ── */}
      <Mission />

      {/* ── DELIVERY JOURNEY ── */}
      <DeliveryJourney />

      {/* ── HORIZONTAL GALLERY ── */}
      <HorizontalGallery theme="white" />

      {/* ── SCROLL EXPAND SHOWCASE ── */}
      <ScrollExpandSection />

      {/* ── VISUAL GALLERY SHOWCASE ── */}
      <section className="relative w-full py-20 px-4 overflow-hidden border-t border-b border-slate-200" style={{ background: '#FFFFFF' }}>
        <div className="max-w-5xl mx-auto text-center mb-8">
          <SectionHeading
            title="DEM en"
            highlight="action"
            subtitle="Nos 3 Piliers Clés"
            titleColor="text-[#021520]"
            highlightClassName="text-[#0086C8]"
            scriptColor="text-[#0086C8]"
            titleSize="text-3xl md:text-5xl"
            subtitleSize="text-xl md:text-2xl lg:text-3xl"
          />
        </div>

        <div className="w-full relative" style={{ height: '560px' }}>
          <CircularGallery
            items={galleryItems}
            bend={1.2}
            textColor="#021520"
            borderRadius={0}
            font="bold 28px Inter, sans-serif"
            scrollSpeed={2}
            scrollEase={0.05}
            autoRotate={true}
            autoRotateSpeed={0.8}
          />
        </div>
      </section>

      {/* ── PARTNERS SECTION ── */}
      <PartnersSection />

      {/* ── DOWNLOAD APP CTA SECTION (Watermark DOWNLOAD) ── */}
      <DownloadAppCTA
        theme="white"
        watermark="DOWNLOAD"
        subtitle="Application Mobile"
        title="Votre livraison express au bout"
        highlight="des doigts."
        description="Téléchargez gratuitement l’application DEM sur iPhone et Android. Commandez en 30 secondes, suivez votre coursier en direct sur la carte et payez en toute sécurité."
        id="download"
      />

      {/* ── CONTACT CTA SECTION (Watermark CONTACT) ── */}
      <ContactCTA
        theme="cyan-deep"
        watermark="CONTACT"
        subtitle="Contactez-nous"
        title="Faites le premier pas vers"
        highlight="l'excellence."
        description="Que vous soyez un particulier, un commerçant ou une entreprise, profitez du réseau de livraison le plus rapide et fiable de Dakar."
        primaryBtnText="Prendre contact"
        primaryBtnLink="/contact"
        primaryBtnIcon="arrow"
        secondaryBtnText="Ouvrir un compte Pro"
        secondaryBtnLink="/dem-pro"
        secondaryBtnIcon="external"
      />

    </div>
  );
}