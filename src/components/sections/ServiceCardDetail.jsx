import { Link } from 'react-router-dom';

export default function ServiceCardDetail({
  id,
  number,
  title,
  subtitle,
  badge,
  audience,
  summary,
  detailedDescription,
  methodeTravail,
  valeurAjoutee,
  highlights = [],
  points = [],
  keys = [],
  img,
  linkText,
  linkUrl,
  isReversed = false
}) {
  return (
    <article
      id={id}
      className="scroll-mt-24 border-b border-black/10 py-20 lg:py-28 bg-white first:pt-16"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header du service */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-black/10">
          <div className="flex items-center gap-3">
            <span className="font-serif italic text-2xl sm:text-3xl font-light text-[#0086C8]">
              /{number}
            </span>
            <span className="text-xs uppercase font-bold tracking-widest text-slate-500 font-['Raleway',sans-serif]">
              {subtitle}
            </span>
          </div>
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            {badge}
          </span>
        </div>

        {/* Contenu principal : 2 colonnes équilibrées */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start`}>
          
          {/* Colonne Descriptif & Méthode de travail */}
          <div className={`lg:col-span-7 space-y-8 ${isReversed ? 'lg:order-2' : ''}`}>
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-[#021520] tracking-tight leading-tight m-0 font-['DM_Sans',sans-serif]">
                {title}
              </h2>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-['Poppins',sans-serif]">
                <span className="font-bold text-slate-700">Public cible :</span>
                <span>{audience}</span>
              </div>
            </div>

            <p 
              className="text-base sm:text-lg text-slate-700 font-['Poppins',sans-serif] leading-relaxed m-0 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: summary }}
            />

            <p className="text-sm sm:text-base text-slate-600 font-['Poppins',sans-serif] leading-relaxed m-0">
              {detailedDescription}
            </p>

            {/* Encadré Méthode de Travail DEM */}
            <div className="p-6 bg-[#FAFCFD] border-l-4 border-[#0086C8] border-y border-r border-slate-200">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0086C8] font-['Raleway',sans-serif] block mb-2">
                Notre méthode de travail
              </span>
              <p className="text-sm text-slate-700 font-['Poppins',sans-serif] leading-relaxed m-0">
                {methodeTravail}
              </p>
            </div>

            {/* Encadré Valeur Ajoutée */}
            <div className="p-6 bg-[#021520] text-white border border-black/10">
              <span className="font-serif italic text-xs text-[#00D2FF] block mb-1">
                La valeur ajoutée DEM
              </span>
              <p className="text-sm sm:text-base font-bold text-white font-['DM_Sans',sans-serif] leading-snug m-0">
                {valeurAjoutee}
              </p>
            </div>

            {/* Points clés d'exécution */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 font-['Raleway',sans-serif] block mb-4">
                Points clés opérationnels
              </span>
              <ul className="space-y-2.5 p-0 m-0 list-none">
                {keys.map((key, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-['Poppins',sans-serif]">
                    <span className="w-1.5 h-1.5 bg-[#0086C8] rounded-none mt-2 shrink-0" />
                    <span>{key}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            {linkText && (
              <div className="pt-4">
                <Link
                  to={linkUrl || "/contact"}
                  className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#021520] text-white hover:bg-[#0086C8] text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                >
                  <span>{linkText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* Colonne Média & Indicateurs Chiffrés */}
          <div className={`lg:col-span-5 space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
            
            {/* Image avec cadre et badge */}
            {img && (
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden border border-black/10 shadow-lg bg-slate-100">
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#021520]/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white border border-white/20">
                  SERVICE /{number} · DAKAR
                </div>
              </div>
            )}

            {/* Indicateurs chiffrés / Points / Highlights */}
            {(highlights?.length > 0 || points?.length > 0) && (
              <div className="border border-black/10 bg-[#FAFCFD] divide-y divide-black/10">
                <div className="p-4 bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-600 font-['Raleway',sans-serif]">
                  {points?.length > 0 ? "Avantages & Engagement DEM" : "Standards & Indicateurs DEM"}
                </div>
                {points?.length > 0 ? (
                  <div className="p-0">
                    <ul className="list-none p-0 m-0 divide-y divide-black/10">
                      {points.map((point, idx) => (
                        <li key={idx} className="p-4 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-[#0086C8] rounded-none mt-1.5 shrink-0" />
                          <span className="text-sm font-semibold text-[#021520] font-['DM_Sans',sans-serif]">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  highlights.map((item, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between">
                      <span className="text-xs uppercase font-medium text-slate-500 font-['Raleway',sans-serif]">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-[#021520] font-['DM_Sans',sans-serif]">
                        {item.value}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </article>
  );
}
