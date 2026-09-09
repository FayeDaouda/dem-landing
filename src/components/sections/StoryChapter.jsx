import React from 'react';
import useIsDesktop from '../../utils/useIsDesktop';
import HorizontalCurtainReveal from '../atoms/HorizontalCurtainReveal';

export default function StoryChapter({
  chapterNumber,
  title,
  subtitle,
  content = [],
  image,
  reverse = false,
  darkTheme = false
}) {
  const isDesktop = useIsDesktop();

  const themeStyles = darkTheme 
    ? { 
        bg: 'bg-[#021520]', 
        text: 'text-white', 
        muted: 'text-white/70', 
        accent: 'text-[#00D2FF]', 
        border: 'border-cyan/30',
        curtain: '#021520'
      }
    : { 
        bg: 'bg-white', 
        text: 'text-[#021520]', 
        muted: 'text-slate-600', 
        accent: 'text-[#0086C8]', 
        border: 'border-[#0086C8]/20',
        curtain: '#ffffff'
      };

  return (
    <section 
      className={`${themeStyles.bg} py-24 lg:py-32 px-6 lg:px-12 overflow-hidden border-t border-b ${darkTheme ? 'border-white/[0.06]' : 'border-slate-100'}`}
    >
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse && isDesktop ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
        
        {/* Image Section */}
        <div 
          className="w-full lg:w-1/2 aspect-[4/5] relative overflow-hidden rounded-0 shadow-2xl"
        >
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className={`absolute inset-0 border-[1px] ${themeStyles.border} m-4 pointer-events-none rounded-0`} />
        </div>

        {/* Text Section */}
        <div 
          className="w-full lg:w-1/2 flex flex-col gap-6"
        >
          <div className="flex flex-col">
            {chapterNumber && (
              <span className={`text-xs md:text-sm font-bold uppercase tracking-widest ${themeStyles.accent} mb-3`}>
                {chapterNumber}
              </span>
            )}

            {/* Sous-titre cursif / serif placé en premier */}
            {subtitle && (
              <span className={`font-serif italic ${themeStyles.accent} text-3xl lg:text-4xl mb-2 rotate-[-2deg] origin-left inline-block`}>
                {subtitle}
              </span>
            )}

            {/* Titre principal sans-serif avec animation HorizontalCurtainReveal */}
            <HorizontalCurtainReveal curtainColor={themeStyles.curtain}>
              <h2 className={`text-4xl lg:text-6xl font-bold uppercase ${themeStyles.text} leading-tight`}>
                {title}
              </h2>
            </HorizontalCurtainReveal>
          </div>

          <div className="space-y-6 mt-4">
            {content.map((paragraph, index) => (
              <p 
                key={index}
                className={`text-lg lg:text-xl leading-relaxed ${themeStyles.muted}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
