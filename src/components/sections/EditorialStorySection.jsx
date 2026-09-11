import MiniTitleWithBar from '../atoms/MiniTitleWithBar.jsx';

export default function EditorialStorySection({
  id,
  theme = "light", // "light" | "dark"
  imagePosition = "right", // "right" | "left"
  
  // Text elements
  chapterNumber,
  title,
  highlight,
  highlightColor,
  paragraphs = [],
  quote,
  metrics = [],
  pillars = [],
  children,
  
  // Images elements
  mainImage,
  secondaryImage,
  floatingBadge,
  
  className = ""
}) {
  const isDark = theme === "dark";
  const isImageLeft = imagePosition === "left";

  const accentColor = highlightColor || (isDark ? "#00D2FF" : "#0086C8");

  return (
    <section 
      id={id}
      className={`relative py-24 lg:py-36 px-6 lg:px-16 border-b overflow-hidden ${
        isDark 
          ? "bg-[#021520] text-white border-white/10" 
          : "bg-white text-[#021520] border-black/10"
      } ${className}`}
    >
      {/* Halo décoratif subtil pour le thème sombre */}
      {isDark && (
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D2FF]/5 blur-[120px] rounded-full pointer-events-none" />
      )}

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── COLONNE TEXTE ÉDITORIAL ── */}
          <div 
            className={`lg:col-span-6 magazine-reveal flex flex-col justify-between ${
              isImageLeft ? "order-1 lg:order-2" : "order-1"
            }`}
          >
            <div>
              {chapterNumber && (
                <MiniTitleWithBar content={chapterNumber} />
              )}

              {title && (
                <h2 
                  className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mt-4 mb-6 ${
                    isDark ? "text-white" : "text-[#021520]"
                  }`}
                >
                  {title} {highlight && <br />}
                  {highlight && (
                    <span 
                      className="font-serif italic font-normal lowercase"
                      style={{ color: accentColor }}
                    >
                      {highlight}
                    </span>
                  )}
                </h2>
              )}

              {/* Paragraphes éditoriaux */}
              {paragraphs?.length > 0 && (
                <div 
                  className={`space-y-6 text-base sm:text-lg leading-relaxed font-['Poppins',sans-serif] mt-8 ${
                    isDark ? "text-white/80" : "text-slate-700"
                  }`}
                >
                  {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Citation éditoriale optionnelle */}
              {quote && (
                <blockquote 
                  className={`p-6 border-l-4 my-8 font-serif italic text-xl sm:text-2xl leading-snug ${
                    isDark 
                      ? "bg-white/[0.04] text-white" 
                      : "bg-slate-50 text-[#021520]"
                  }`}
                  style={{ borderColor: accentColor }}
                >
                  {typeof quote === "string" ? quote : quote.text}
                  {quote?.author && (
                    <span className="block text-xs uppercase font-sans tracking-widest font-bold mt-3 opacity-60 not-italic">
                      — {quote.author}
                    </span>
                  )}
                </blockquote>
              )}

              {/* Contenu personnalisé injecté */}
              {children}

              {/* Métriques / Chiffres clés optionnels */}
              {metrics?.length > 0 && (
                <div 
                  className={`grid grid-cols-2 gap-4 pt-10 border-t mt-10 ${
                    isDark ? "border-white/10" : "border-black/10"
                  }`}
                >
                  {metrics.map((m, idx) => (
                    <div 
                      key={idx} 
                      className={`p-5 border ${
                        isDark 
                          ? "bg-white/[0.04] border-white/10" 
                          : "bg-slate-50 border-black/10"
                      }`}
                    >
                      <span 
                        className="font-['DM_Sans',sans-serif] text-3xl sm:text-4xl font-black block mb-1"
                        style={{ color: accentColor }}
                      >
                        {m.value}
                      </span>
                      <span 
                        className={`text-xs uppercase tracking-wider font-bold block ${
                          isDark ? "text-white/70" : "text-slate-600"
                        }`}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Piliers numérotés optionnels */}
              {pillars?.length > 0 && (
                <div 
                  className={`space-y-4 pt-8 border-t mt-8 ${
                    isDark ? "border-white/10" : "border-black/10"
                  }`}
                >
                  {pillars.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`flex items-start gap-4 p-4 border ${
                        isDark 
                          ? "bg-white/[0.03] border-white/10" 
                          : "bg-slate-50 border-black/10"
                      }`}
                    >
                      <span 
                        className="font-serif italic text-lg"
                        style={{ color: accentColor }}
                      >
                        {item.number || `0${idx + 1}.`}
                      </span>
                      <div>
                        <h4 
                          className={`text-sm font-bold uppercase font-['DM_Sans',sans-serif] ${
                            isDark ? "text-white" : "text-[#021520]"
                          }`}
                        >
                          {item.title}
                        </h4>
                        <p 
                          className={`text-xs m-0 font-['Poppins',sans-serif] ${
                            isDark ? "text-white/60" : "text-slate-600"
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>


          {/* ── COLONNE IMAGES EN PARALLAXE ÉTAGÉE (DÉCALÉE VERS LE BAS) ── */}
          <div 
            className={`lg:col-span-6 relative mt-16 sm:mt-24 md:mt-32 lg:mt-48 xl:mt-60 pb-20 sm:pb-28 lg:pb-36 ${
              isImageLeft ? "order-2 lg:order-1" : "order-2"
            }`}
          >
            <div className="relative w-full">
              
              {/* Image Principale */}
              {mainImage && (
                <div 
                  className={`parallax-item relative z-10 w-full ${mainImage.aspect || "aspect-[4/5]"} ${
                    isDark ? "bg-black border border-white/15" : "bg-slate-200 border border-black/10"
                  } shadow-2xl overflow-hidden`}
                  data-speed={mainImage.speed || "0.1"}
                  data-direction={mainImage.direction || "up"}
                >
                  <img 
                    src={mainImage.src} 
                    alt={mainImage.alt || title || "Illustration"}
                    className={`w-full h-full object-cover ${
                      mainImage.grayscale !== false 
                        ? "grayscale contrast-125 hover:grayscale-0 transition-all duration-700" 
                        : "opacity-90 hover:opacity-100 transition-opacity duration-500"
                    }`}
                  />
                  {mainImage.tag && (
                    <div 
                      className={`absolute top-4 left-4 text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 font-bold ${
                        isDark ? "bg-[#00D2FF] text-[#021520]" : "bg-[#021520] text-white"
                      }`}
                    >
                      {mainImage.tag}
                    </div>
                  )}
                </div>
              )}

              {/* Image Secondaire Superposée (Débordant vers le bas) */}
              {secondaryImage && (
                <div 
                  className={`parallax-item absolute -bottom-16 sm:-bottom-20 ${
                    isImageLeft 
                      ? "left-0 sm:-left-4 lg:-left-8" 
                      : "right-0 sm:-right-4 lg:-right-8"
                  } w-3/4 sm:w-2/3 ${secondaryImage.aspect || "aspect-[3/4]"} ${
                    isDark 
                      ? "bg-[#0086C8] border-4 border-[#021520]" 
                      : "bg-[#021520] border-4 border-white"
                  } shadow-2xl z-20 overflow-hidden`}
                  data-speed={secondaryImage.speed || "0.25"}
                  data-direction={secondaryImage.direction || "up"}
                >
                  <img 
                    src={secondaryImage.src} 
                    alt={secondaryImage.alt || "Détail"}
                    className="w-full h-full object-cover"
                  />
                  {(secondaryImage.title || secondaryImage.subtitle) && (
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
                      {secondaryImage.subtitle && (
                        <span 
                          className="font-serif italic text-xs block mb-0.5"
                          style={{ color: isDark ? "#00D2FF" : "#00D2FF" }}
                        >
                          {secondaryImage.subtitle}
                        </span>
                      )}
                      {secondaryImage.title && (
                        <span className="text-xs font-bold uppercase tracking-wider block">
                          {secondaryImage.title}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Cartouche d'Accroche Flottant */}
              {floatingBadge && (
                <div 
                  className={`parallax-item absolute top-1/3 ${
                    isImageLeft 
                      ? "-right-2 sm:-right-6 lg:-right-10" 
                      : "-left-2 sm:-left-6 lg:-left-10"
                  } ${
                    floatingBadge.bg || "bg-[#00D2FF]"
                  } ${
                    floatingBadge.textColor || "text-[#021520]"
                  } p-4 sm:p-6 shadow-xl z-30 max-w-[190px] sm:max-w-[230px] border border-black/10`}
                  data-speed={floatingBadge.speed || "0.18"}
                  data-direction={floatingBadge.direction || "down"}
                >
                  {floatingBadge.tag && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
                      {floatingBadge.tag}
                    </span>
                  )}
                  {floatingBadge.text && (
                    <p className="text-xs font-black uppercase leading-tight m-0 font-['DM_Sans',sans-serif]">
                      {floatingBadge.text}
                    </p>
                  )}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
