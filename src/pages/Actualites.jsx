import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import { actualitesData, actualitesCategories } from '../data/actualitesData.js';

export default function Actualites() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtrage des articles selon la catégorie et la recherche
  const filteredArticles = useMemo(() => {
    return actualitesData.filter((article) => {
      const matchesCategory = activeCategory === "Tous" || article.category === activeCategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Article vedette (le premier marqué featured)
  const featuredArticle = useMemo(() => {
    return actualitesData.find(a => a.featured) || actualitesData[0];
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="w-full bg-white text-dark min-h-screen font-['DM_Sans',sans-serif] selection:bg-[#00D2FF] selection:text-[#021520]">
      
      {/* ── 1. HERO SECTION EDITORIALE AWWWARDS ── */}
      <PageHeroSection
        contentMiniBar="NEWSROOM & ACTUALITÉS OFFICIELLES"
        firstTitle="L'actualité de la mobilité & du commerce à Dakar."
        secondTitle="Déploiements technologiques, vie de notre flotte, partenariats e-commerce et chroniques du dernier kilomètre."
      />

      {/* ── 2. BANDEAU DE MÉTRIQUES & TICKER NEWSROOM ── */}
      <section className="border-t border-b border-black/10 bg-[#021520] text-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { num: "Hebdo", label: "Rythme de publication", sub: "Communiqués, tech logs & reportages" },
            { num: "500+", label: "Coursiers actifs", sub: "Sur le terrain chaque jour à Dakar" },
            { num: "24h", label: "Reversement COD garanti", sub: "Fintech intégrée Wave & OM" },
            { num: "100%", label: "Traçabilité & Éthique", sub: "Suivi en direct et protection sociale" }
          ].map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <span className="font-['DM_Sans',sans-serif] font-black text-3xl sm:text-4xl text-[#00D2FF] mb-2 block">
                {item.num}
              </span>
              <div>
                <h4 className="uppercase text-[11px] font-bold tracking-widest text-white mb-1 font-['Raleway',sans-serif]">
                  {item.label}
                </h4>
                <p className="text-xs text-white/60 m-0 leading-relaxed font-['Poppins',sans-serif]">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── 3. ARTICLE VEDETTE (À LA UNE) ── */}
      {featuredArticle && activeCategory === "Tous" && !searchQuery && (
        <section className="py-16 lg:py-24 px-6 lg:px-16 border-b border-black/10 bg-slate-50">
          <div className="max-w-[1400px] mx-auto">
            
            <div className="mb-8">
              <MiniTitleWithBar content="À LA UNE CETTE SEMAINE" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 border border-black/10 bg-white shadow-2xl overflow-hidden group">
              
              {/* Image Vedette avec effet de zoom */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#021520] border-b lg:border-b-0 lg:border-r border-black/10 min-h-[320px] lg:min-h-[480px]">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#021520] text-white text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 font-bold border border-white/20">
                  {featuredArticle.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-white text-[#021520] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 border border-black/10">
                  {featuredArticle.readTime}
                </div>
              </div>

              {/* Contenu Éditorial Vedette */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-500 font-mono mb-4">
                    <span>{featuredArticle.date}</span>
                    <span>•</span>
                    <span className="text-[#0086C8] font-bold">Exclusivité DEM</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#021520] tracking-tight leading-tight mb-4 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredArticle.tags?.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase font-mono font-bold px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={featuredArticle.author.avatar} 
                      alt={featuredArticle.author.name}
                      className="w-10 h-10 object-cover border border-black/10" 
                    />
                    <div>
                      <span className="text-xs font-bold text-[#021520] block font-['DM_Sans',sans-serif]">
                        {featuredArticle.author.name}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                        {featuredArticle.author.role}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-5 py-3 bg-[#021520] text-white hover:bg-[#0086C8] transition-colors cursor-pointer"
                  >
                    <span>Lire</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>
      )}


      {/* ── 4. BARRE DE FILTRES ET RECHERCHE INTERACTIVE ── */}
      <section className="py-8 px-6 lg:px-16 border-b border-black/10 bg-white sticky top-[62px] z-20 backdrop-blur-md bg-white/95">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Boutons Catégories */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {actualitesCategories.map((category) => {
              const count = category === "Tous" 
                ? actualitesData.length 
                : actualitesData.filter(a => a.category === category).length;
              
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#021520] text-white border-[#021520] shadow-md"
                      : "bg-slate-50 text-slate-700 border-black/10 hover:border-black/30 hover:bg-white"
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 font-mono ${
                    isActive ? "bg-[#00D2FF] text-[#021520]" : "bg-black/10 text-slate-600"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Champ Recherche Sharp */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              placeholder="Rechercher un article, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-black/15 text-xs py-2.5 pl-9 pr-4 text-[#021520] placeholder:text-slate-400 focus:outline-none focus:border-[#0086C8] font-['Poppins',sans-serif]"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-dark text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

        </div>
      </section>


      {/* ── 5. GRILLE DES ARTICLES MAGAZINE AWWWARDS ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="flex justify-between items-baseline mb-12">
            <div>
              <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8] block mb-1">
                Archives & Publications Récentes
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#021520] tracking-tight">
                {activeCategory === "Tous" ? "Toutes les actualités" : activeCategory}
              </h2>
            </div>
            <span className="text-xs font-mono uppercase text-slate-500">
              {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-16 border border-dashed border-black/20 text-center bg-slate-50">
              <span className="text-4xl block mb-3">🔍</span>
              <h3 className="text-xl font-bold uppercase text-[#021520] mb-2 font-['DM_Sans',sans-serif]">
                Aucun article ne correspond à votre recherche
              </h3>
              <p className="text-sm text-slate-600 font-['Poppins',sans-serif] mb-6">
                Essayez un autre mot-clé ou réinitialisez vos filtres pour voir les autres publications.
              </p>
              <button
                type="button"
                onClick={() => { setActiveCategory("Tous"); setSearchQuery(""); }}
                className="px-6 py-3 bg-[#021520] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0086C8] transition-colors cursor-pointer"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-black/10 divide-y md:divide-y-0 md:divide-x divide-black/10 bg-white">
              {filteredArticles.map((article) => (
                <article 
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="flex flex-col justify-between p-6 sm:p-8 hover:bg-slate-50/80 transition-all duration-300 group cursor-pointer border-b border-black/10"
                >
                  <div>
                    {/* Image Vignette */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 mb-6 border border-black/10">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#021520] text-white text-[9px] font-mono uppercase font-bold tracking-widest">
                        {article.category}
                      </span>
                    </div>

                    {/* Méta Date & Lecture */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase mb-3">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>

                    {/* Titre Article */}
                    <h3 className="text-xl font-bold uppercase text-[#021520] tracking-tight leading-snug mb-3 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                      {article.title}
                    </h3>

                    {/* Extrait */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] line-clamp-3 mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  <div>
                    {/* Auteur & Flèche */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={article.author.avatar} 
                          alt={article.author.name}
                          className="w-7 h-7 object-cover border border-black/10" 
                        />
                        <span className="text-xs font-semibold text-[#021520]">
                          {article.author.name}
                        </span>
                      </div>

                      <span className="w-8 h-8 flex items-center justify-center bg-slate-100 group-hover:bg-[#0086C8] group-hover:text-white transition-colors text-dark">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          )}

        </div>
      </section>


      {/* ── 6. ESPACE PRESSE, KIT MÉDIA & CONTACT JOURNALISTES ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-white/10 bg-[#021520] text-white">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5">
              <span className="font-serif italic text-lg sm:text-xl font-light text-[#00D2FF] block mb-2">
                Relations Presse & Médias
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
                Espace Presse <br />
                <span className="font-serif italic font-normal text-[#00D2FF] lowercase">& kit média officiel.</span>
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-['Poppins',sans-serif] mb-8">
                Vous êtes journaliste, rédacteur ou analyste économique ? Accédez à nos communiqués officiels, nos visuels haute résolution et nos chiffres clés certifiés sur la logistique au Sénégal.
              </p>

              <div className="space-y-4">
                <a 
                  href="mailto:presse@dem.sn"
                  className="flex items-center justify-between p-4 bg-white/[0.04] border border-white/15 hover:border-[#00D2FF] transition-colors group"
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#00D2FF] block">
                      Contact Presse & Interviews
                    </span>
                    <span className="text-sm font-bold text-white group-hover:text-[#00D2FF] transition-colors">
                      presse@dem.sn
                    </span>
                  </div>
                  <span className="text-xs font-mono text-white/50 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>

                <div className="p-4 bg-white/[0.04] border border-white/15">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#00D2FF] block mb-1">
                    Porte-Parole & Direction
                  </span>
                  <span className="text-xs text-white/80 block leading-relaxed">
                    Entretiens disponibles sur rendez-vous à notre siège de Dakar ou en visioconférence.
                  </span>
                </div>
              </div>
            </div>

            {/* Téléchargement Kit Médias & Logo */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest block mb-3">
                    KIT GRAPHIQUE 2026
                  </span>
                  <h4 className="text-lg font-bold uppercase text-white mb-2">
                    Logos Officiels & Charte
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed m-0 mb-6">
                    Fichiers SVG vectoriels, PNG haute résolution, déclinaisons sombres et claires et charte typographique.
                  </p>
                </div>
                <a 
                  href="/logo.png" 
                  download="DEM_Logo_Pack.png"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D2FF] hover:underline"
                >
                  <span>Télécharger le logo DEM (PNG)</span>
                  <span>↓</span>
                </a>
              </div>

              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest block mb-3">
                    DOSSIER DE PRESSE
                  </span>
                  <h4 className="text-lg font-bold uppercase text-white mb-2">
                    Fiche Repères & Métriques
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed m-0 mb-6">
                    Chiffres clés du dernier kilomètre, chronologie de fondation et biographies des dirigeants.
                  </p>
                </div>
                <Link 
                  to="/notre-histoire"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D2FF] hover:underline"
                >
                  <span>Consulter notre manifeste</span>
                  <span>→</span>
                </Link>
              </div>

              <div className="sm:col-span-2 p-6 sm:p-8 bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF] block mb-1 font-mono">
                    BULLETIN TRIMESTRIEL
                  </span>
                  <h4 className="text-base sm:text-lg font-bold uppercase text-white m-0">
                    Abonnez-vous aux communiqués stratégiques
                  </h4>
                </div>
                
                {newsletterSubscribed ? (
                  <div className="px-4 py-2 bg-[#00D2FF] text-[#021520] text-xs font-bold uppercase font-mono">
                    ✓ Inscription confirmée
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex w-full sm:w-auto">
                    <input 
                      type="email" 
                      required
                      placeholder="Votre email pro..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-[#021520] border border-white/20 text-xs px-3 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D2FF] w-full sm:w-48"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2.5 bg-[#00D2FF] text-[#021520] text-xs font-black uppercase tracking-wider hover:bg-white transition-colors cursor-pointer shrink-0"
                    >
                      S'inscrire
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ── 7. LECTEUR MODAL D'ARTICLE (MODAL READER) ── */}
      {selectedArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-black/15 shadow-2xl p-6 sm:p-10 lg:p-14 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton Fermer */}
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 w-10 h-10 border border-black/10 flex items-center justify-center text-dark hover:bg-[#021520] hover:text-white transition-colors cursor-pointer font-mono font-bold"
              aria-label="Fermer l'article"
            >
              ✕
            </button>

            {/* Méta En-tête Article */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase text-slate-500 mb-4">
              <span className="px-2.5 py-1 bg-[#021520] text-white font-bold tracking-widest text-[9px]">
                {selectedArticle.category}
              </span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            {/* Titre */}
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#021520] tracking-tight leading-tight mb-6 font-['DM_Sans',sans-serif]">
              {selectedArticle.title}
            </h2>

            {/* Auteur */}
            <div className="flex items-center gap-3.5 pb-6 border-b border-black/10 mb-8">
              <img 
                src={selectedArticle.author.avatar} 
                alt={selectedArticle.author.name}
                className="w-11 h-11 object-cover border border-black/10" 
              />
              <div>
                <span className="text-sm font-bold text-[#021520] block font-['DM_Sans',sans-serif]">
                  {selectedArticle.author.name}
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">
                  {selectedArticle.author.role}
                </span>
              </div>
            </div>

            {/* Image d'illustration de l'article */}
            <div className="relative aspect-[16/9] w-full overflow-hidden mb-8 border border-black/10 bg-[#021520]">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Paragraphes du contenu complet */}
            <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed font-['Poppins',sans-serif]">
              {selectedArticle.content?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Métriques / Stats de l'article */}
            {selectedArticle.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-10 pt-8 border-t border-black/10">
                {selectedArticle.stats.map((st, i) => (
                  <div key={i} className="p-5 bg-slate-50 border border-black/10">
                    <span className="font-['DM_Sans',sans-serif] text-2xl sm:text-3xl font-black text-[#0086C8] block mb-1">
                      {st.value}
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-600 block">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags en bas */}
            <div className="pt-6 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags?.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono uppercase px-3 py-1 bg-slate-100 text-slate-700">
                    #{t}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-3 bg-[#021520] text-white text-xs font-black uppercase tracking-wider hover:bg-[#0086C8] transition-colors cursor-pointer"
              >
                Fermer l'article
              </button>
            </div>

          </div>
        </div>
      )}


      {/* ── 8. SECTION CONTACT & CTA ── */}
      <ContactCTA
        theme="white"
        watermark="ACTUALITÉS"
        subtitle="Restons connectés"
        title="Une question presse ou un"
        highlight="partenariat stratégique ?"
        description="Nos équipes communication et développement commercial répondent à vos sollicitations en moins de 24 heures pour toute demande d'interview ou de collaboration."
        primaryBtnText="Contacter l'équipe Presse"
        primaryBtnLink="mailto:presse@dem.sn"
        primaryBtnIcon="arrow"
        secondaryBtnText="Découvrir DEM PRO"
        secondaryBtnLink="/dem-pro"
        secondaryBtnIcon="external"
      />

    </div>
  );
}
