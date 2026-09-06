import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsDesktop from '../../utils/useIsDesktop';

gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          }
        });
      }

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const themeStyles = darkTheme 
    ? { bg: 'bg-[#021520]', text: 'text-white', muted: 'text-white/70', accent: 'text-[#00D2FF]', border: 'border-cyan/30' }
    : { bg: 'bg-white', text: 'text-[#021520]', muted: 'text-slate-600', accent: 'text-[#0086C8]', border: 'border-[#0086C8]/20' };

  return (
    <section 
      ref={containerRef}
      className={`${themeStyles.bg} py-24 lg:py-32 px-6 lg:px-12 overflow-hidden border-t border-b ${darkTheme ? 'border-white/[0.06]' : 'border-slate-100'}`}
    >
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse && isDesktop ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}>
        
        {/* Image Section */}
        <div 
          ref={imageRef}
          className="w-full lg:w-1/2 aspect-[4/5] relative overflow-hidden rounded-2xl shadow-2xl"
        >
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className={`absolute inset-0 border-[1px] ${themeStyles.border} m-4 pointer-events-none rounded-xl`} />
        </div>

        {/* Text Section */}
        <div 
          ref={textRef}
          className="w-full lg:w-1/2 flex flex-col gap-6"
        >
          <div className="flex flex-col">
            <span className={`font-serif italic ${themeStyles.accent} text-lg lg:text-xl mb-2`}>
              {chapterNumber}
            </span>
            <h2 className={`text-4xl lg:text-6xl font-bold uppercase ${themeStyles.text} leading-tight`}>
              {title}
            </h2>
            {subtitle && (
              <span className={`font-serif italic ${themeStyles.accent} text-3xl lg:text-4xl mt-2 rotate-[-2deg]`}>
                {subtitle}
              </span>
            )}
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
