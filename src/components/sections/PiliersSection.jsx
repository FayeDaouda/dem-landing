export default function PiliersSection({ piliers = [] }) {
  return (
    <section className="w-full py-24 lg:py-32 bg-[#ffffff] text-[#021520] border-b border-black/10 relative overflow-hidden">
      {/* Background architectural grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#021520 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header des Piliers */}
        <div className="max-w-3xl mb-16 lg:mb-20">

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#021520] leading-[1.08] m-0 font-['DM_Sans',sans-serif]">
            Nos Piliers  <br />
            <span className="text-[#0086C8]">d'Excellence</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#021520]/70 font-['Poppins',sans-serif] leading-relaxed m-0">
            Une exécution logistique irréprochable ne doit rien au hasard. Quatre principes non négociables guident chez DEM chaque procédure, chaque algorithme, chaque coursier et chaque échange.
          </p>
        </div>

        {/* Grille des 4 Piliers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-black/[0.02]">
          {piliers.map((pilier) => {
            return (
              <div
                key={pilier.id}
                className="p-8 lg:p-10 flex flex-col justify-between transition-colors relative bg-[#0086C8]/[0.2]"
              >
                <div>
                  {/* Top indicator & number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif italic text-2xl font-light text-[#0086C8]">
                      {pilier.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border bg-[#0086C8]/20 text-[#021520] border-[#0086C8]">
                      {pilier.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#021520] font-['DM_Sans',sans-serif] mb-4 leading-snug">
                    {pilier.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#021520]/70 font-['Poppins',sans-serif] leading-relaxed mb-6">
                    {pilier.description}
                  </p>
                </div>

                {/* Points clés d'engagement */}
                <div className="pt-6 border-t border-black/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#021520]/40 block mb-3 font-['Raleway',sans-serif]">
                    NOS Engagements :
                  </span>
                  <ul className="space-y-2 p-0 m-0 list-none">
                    {pilier.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#021520]/80 font-['Poppins',sans-serif] leading-tight">
                        <span className="w-1 h-1 bg-[#0086C8] rounded-none mt-1.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
