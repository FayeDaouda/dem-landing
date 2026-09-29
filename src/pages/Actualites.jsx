import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeroSection from '../components/sections/PageHeroSection.jsx';
import MiniTitleWithBar from '../components/atoms/MiniTitleWithBar.jsx';
import ContactCTA from '../components/sections/ContactCTA.jsx';
import {
  actualitesDakarData,
  actualitesCategories,
  FEATURED_ARTICLE_INDEX
} from '../data/actualitesData.js';
import { astucesData } from '../data/astucesData.js';
import { featuresRoadmapData } from '../data/nouveautesData.js';

export default function Actualites() {
  // Navigation & filtres Bloc 1 (Actualités)
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);

  // État Bloc 2 (Astuces : ecommercants | coursiers | clients)
  const [activeAudience, setActiveAudience] = useState("ecommercants");

  // État Bloc 3 (Nouveautés : all | released | comingSoon)
  const [roadmapFilter, setRoadmapFilter] = useState("all");

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filtrage des articles selon la catégorie et la recherche
  const filteredArticles = useMemo(() => {
    return actualitesDakarData.filter((article) => {
      const matchesCategory = activeCategory === "Tous" || article.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Article vedette sélectionné par son index (0, 1, 2, 3...)
  // Tout article de la liste peut passer en principal en modifiant simplement FEATURED_ARTICLE_INDEX
  const featuredArticle = useMemo(() => {
    const validIndex =
      typeof FEATURED_ARTICLE_INDEX === 'number' &&
        FEATURED_ARTICLE_INDEX >= 0 &&
        FEATURED_ARTICLE_INDEX < actualitesDakarData.length
        ? FEATURED_ARTICLE_INDEX
        : 0;
    return actualitesDakarData[validIndex];
  }, []);

  // Articles affichés dans la grille : si vue "Tous" sans recherche, on exclut l'article principal déjà mis en avant
  const gridArticles = useMemo(() => {
    if (activeCategory === "Tous" && !searchQuery && featuredArticle) {
      return filteredArticles.filter((article) => article.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, activeCategory, searchQuery, featuredArticle]);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <div className="w-full bg-white text-[#021520] min-h-screen font-['DM_Sans',sans-serif] selection:bg-[#00D2FF] selection:text-[#021520]">

      {/* ── 1. HERO SECTION EDITORIALE ── */}
      <PageHeroSection
        contentMiniBar="OBSERVATOIRE DE LA MOBILITÉ & VIE DE DEM"
        firstTitle="L'actualité de la livraison urbaine à Dakar."
        secondTitle="Mises à jour opérationnelles, réalité du trafic dakarois, astuces métiers et feuille de route technologique certifiée."
        watermark="ACTU"
      />

      {/* ── 2. BANDEAU DE REPÈRES VÉRIFIÉS (ZÉRO CHIFFRE INVENTÉ) ── */}
      <section className="border-t border-b border-black/10 bg-[#021520] text-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            {
              num: "10 jours",
              label: "Rythme de publication",
              sub: "Nouvelle édition actualisée tous les 10 jours"
            },
            {
              num: "< 24h",
              label: "Reversement COD garanti",
              sub: "Fonds Wave & Orange Money reversés sous 24h ouvrées"
            },
            {
              num: "Code OTP",
              label: "Validation sécurisée",
              sub: "Mot de passe unique par SMS pour certifier chaque remise"
            },
            {
              num: "Dakar",
              label: "Couverture régionale",
              sub: "Presqu'île, quartiers périphériques et banlieue"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
              <span className="font-['DM_Sans',sans-serif] font-black text-2xl sm:text-4xl text-[#00D2FF] mb-2 block">
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

      {/* ── BARRE D'ANCRAGE RAPIDE ── */}
      <nav className="bg-slate-100 border-b border-black/10 py-3 px-6 lg:px-16 sticky top-0 z-30 backdrop-blur-md bg-slate-100/90">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider overflow-x-auto">
          <span className="text-slate-500 font-mono hidden md:inline-block shrink-0">
            Navigation :
          </span>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#bloc-actus"
              className="px-3 py-1.5 bg-white text-[#021520] border border-black/10 hover:border-[#0086C8] transition-colors rounded-none"
            >
              Actu DEM & Mobilité urbaine à Dakar
            </a>
            <a
              href="#bloc-astuces"
              className="px-3 py-1.5 bg-white text-[#021520] border border-black/10 hover:border-[#0086C8] transition-colors rounded-none"
            >
              Astuces
            </a>
            <a
              href="#bloc-nouveautes"
              className="px-3 py-1.5 bg-white text-[#021520] border border-black/10 hover:border-[#0086C8] transition-colors rounded-none"
            >
              Nouveautés DEM / Coming soon
            </a>
          </div>
        </div>
      </nav>


      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── BLOC 1 — ACTU DEM & MOBILITÉ URBAINE À DAKAR ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div id="bloc-actus" className="scroll-mt-14">

        {/* En-tête de section Actu & Mobilité */}
        <section className="pt-14 pb-4 px-6 lg:px-16 bg-white border-b border-black/10">
          <div className="max-w-[1400px] mx-auto">
            <MiniTitleWithBar content="ACTUALITÉS OFFICIELLES & MOBILITÉ" />
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#021520] tracking-tight mt-3 mb-2 font-['DM_Sans',sans-serif]">
              Actu DEM & Mobilité urbaine à Dakar
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] max-w-3xl">
              Toutes les informations réelles sur DEM (lancements, vie de la flotte, chiffres vérifiés) et l'actualité de la mobilité urbaine dakaroise.
            </p>
          </div>
        </section>

        {/* Article Vedette */}
        {featuredArticle && activeCategory === "Tous" && !searchQuery && (
          <section className="py-12 lg:py-16 px-6 lg:px-16 border-b border-black/10 bg-slate-50">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 border border-black/10 bg-white shadow-xl overflow-hidden group">

                {/* Image Vedette */}
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-[#021520] border-b lg:border-b-0 lg:border-r border-black/10 min-h-[320px] lg:min-h-[460px]">
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
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-slate-500 font-mono mb-4">
                      <span>{featuredArticle.date}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#021520] tracking-tight leading-tight mb-4 font-['DM_Sans',sans-serif] group-hover:text-[#0086C8] transition-colors">
                      {featuredArticle.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                      {featuredArticle.excerpt}
                    </p>

                    {/* Points clés opérationnels */}
                    {featuredArticle.keyPoints && (
                      <div className="space-y-2 mb-6 bg-slate-50 p-4 border border-black/5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#0086C8] font-bold block mb-1">
                          En résumé :
                        </span>
                        {featuredArticle.keyPoints.slice(0, 2).map((kp, idx) => (
                          <div key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-[#0086C8] font-bold">✓</span>
                            <span><strong>{kp.title} :</strong> {kp.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {featuredArticle.tags?.map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-slate-500">
                      {featuredArticle.readTime}
                    </span>

                    <button
                      type="button"
                      onClick={() => setSelectedArticle(featuredArticle)}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider px-5 py-3 bg-[#021520] text-white hover:bg-[#0086C8] transition-colors cursor-pointer"
                    >
                      <span>Lire l'article</span>
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

        {/* Barre de filtres et recherche */}
        <section className="py-6 px-6 lg:px-16 border-b border-black/10 bg-white">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">

            {/* Boutons Catégories */}
            <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {actualitesCategories.map((category) => {
                const count = category === "Tous"
                  ? actualitesDakarData.length
                  : actualitesDakarData.filter(a => a.category === category).length;

                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2 ${isActive
                        ? "bg-[#021520] text-white border-[#021520] shadow-sm"
                        : "bg-slate-50 text-slate-700 border-black/10 hover:border-black/30 hover:bg-white"
                      }`}
                  >
                    <span>{category}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 font-mono ${isActive ? "bg-[#00D2FF] text-[#021520]" : "bg-black/10 text-slate-600"
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
                placeholder="Rechercher par sujet, tag..."
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#021520] text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>

          </div>
        </section>

        {/* Grille des articles Actu & Mobilité */}
        <section className="py-16 lg:py-24 px-6 lg:px-16 border-b border-black/10 bg-white">
          <div className="max-w-[1400px] mx-auto">

            <div className="flex justify-between items-baseline mb-12">
              <div>
                <span className="font-serif italic text-lg sm:text-xl font-light text-[#0086C8] block mb-1">
                  Chroniques de la logistique dakaroise
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#021520] tracking-tight">
                  {activeCategory === "Tous" ? "Toutes les actualités vérifiées" : activeCategory}
                </h2>
              </div>
              <span className="text-xs font-mono uppercase text-slate-500">
                {gridArticles.length} article{gridArticles.length > 1 ? "s" : ""}
              </span>
            </div>

            {gridArticles.length === 0 ? (
              <div className="p-16 border border-dashed border-black/20 text-center bg-slate-50">
                <h3 className="text-xl font-bold uppercase text-[#021520] mb-2 font-['DM_Sans',sans-serif]">
                  Aucun article ne correspond à votre recherche
                </h3>
                <p className="text-sm text-slate-600 font-['Poppins',sans-serif] mb-6">
                  Essayez un autre mot-clé ou réinitialisez vos filtres pour consulter les chroniques.
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
                {gridArticles.map((article) => (
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
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#021520] group-hover:text-[#0086C8] transition-colors font-['DM_Sans',sans-serif]">
                          Lire la chronique
                        </span>

                        <span className="w-8 h-8 flex items-center justify-center bg-slate-100 group-hover:bg-[#0086C8] group-hover:text-white transition-colors text-[#021520]">
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

      </div>


      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── BLOC 2 — ASTUCES ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section id="bloc-astuces" className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-slate-50 scroll-mt-14">
        <div className="max-w-[1400px] mx-auto">

          <div className="max-w-3xl mb-12">
            <MiniTitleWithBar content="GUIDES DE TERRAIN & CONSEILS PRATIQUES" />
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#021520] tracking-tight mt-3 mb-4 font-['DM_Sans',sans-serif]">
              Astuces
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-['Poppins',sans-serif]">
              Conseils pratiques pour les e-commerçants, les coursiers et les clients pour optimiser chaque étape de la livraison à Dakar.
            </p>
          </div>

          {/* Sélecteur d'audience interactif */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-2 border-b border-black/10">
            {[
              { id: "ecommercants", label: "Pour les E-Commerçants", count: astucesData.ecommercants.length },
              { id: "coursiers", label: "Pour les Coursiers Partenaires", count: astucesData.coursiers.length },
              { id: "clients", label: "Pour les Clients & Destinataires", count: astucesData.clients.length },
            ].map((tab) => {
              const isActive = activeAudience === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveAudience(tab.id)}
                  className={`px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 border cursor-pointer flex items-center gap-2.5 ${isActive
                      ? "bg-[#021520] text-white border-[#021520] shadow-md"
                      : "bg-white text-slate-700 border-black/10 hover:border-black/30 hover:bg-slate-100"
                    }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-2 py-0.5 font-mono ${isActive ? "bg-[#00D2FF] text-[#021520]" : "bg-black/10 text-slate-600"
                    }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grille des cartes d'astuces selon l'audience active */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {astucesData[activeAudience]?.map((astuce, index) => (
              <div
                key={astuce.id || index}
                className="bg-white border border-black/10 p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono text-slate-400">
                      Astuce #0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold uppercase text-[#021520] tracking-tight leading-snug mb-3 font-['DM_Sans',sans-serif]">
                    {astuce.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-6">
                    {astuce.summary}
                  </p>

                  {/* Checklist des étapes pratiques */}
                  <div className="space-y-3 mb-6 bg-slate-50 p-4 border border-black/5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#0086C8] font-bold block">
                      Plan d'action terrain :
                    </span>
                    {astuce.steps?.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed font-['Poppins',sans-serif]">
                        <span className="w-4 h-4 rounded-full bg-[#0086C8]/10 text-[#0086C8] flex items-center justify-center shrink-0 font-mono text-[10px] font-bold mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Tip en bas de carte */}
                <div className="pt-4 border-t border-slate-100 flex items-start gap-2.5 bg-amber-50/60 p-3 border-l-2 border-l-amber-500">
                  <p className="text-xs text-amber-950 font-medium leading-relaxed m-0">
                    <strong className="text-amber-900 font-bold uppercase tracking-wider text-[11px] block mb-0.5">Conseil DEM :</strong> {astuce.proTip}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── BLOC 3 — NOUVEAUTÉS DEM / COMING SOON ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section id="bloc-nouveautes" className="py-20 lg:py-28 px-6 lg:px-16 border-b border-black/10 bg-white scroll-mt-14">
        <div className="max-w-[1400px] mx-auto">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <MiniTitleWithBar content="Notes de mise à jour" />
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#021520] tracking-tight mt-3 font-['DM_Sans',sans-serif]">
                Nouveautés DEM / à venir
              </h2>
            </div>
          </div>

          {/* Filtres de la roadmap */}
          <div className="flex items-center gap-3 mb-10 overflow-x-auto pb-1">
            {[
              { id: "all", label: "Vue d'ensemble" },
              { id: "released", label: "Déjà disponibles" },
              { id: "comingSoon", label: "à venir" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setRoadmapFilter(f.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border cursor-pointer transition-colors ${roadmapFilter === f.id
                    ? "bg-[#021520] text-white border-[#021520]"
                    : "bg-slate-50 text-slate-700 border-black/10 hover:border-black/30 hover:bg-white"
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grille : 2 colonnes comparatives si vue d'ensemble, ou 2 colonnes de cartes en pleine largeur si filtre actif */}
          <div className={roadmapFilter === "all" ? "grid grid-cols-1 lg:grid-cols-2 gap-10" : "w-full"}>

            {/* Volet A : Déjà sortis (Disponibles maintenant) */}
            {(roadmapFilter === "all" || roadmapFilter === "released") && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b-2 border-emerald-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <h3 className="text-lg font-black uppercase text-[#021520] tracking-tight">
                      Fonctionnalités déjà déployées
                    </h3>
                  </div>
                  <span className="font-serif italic text-xs sm:text-sm text-emerald-800">
                    Opérationnelles en production
                  </span>
                </div>

                <div className={roadmapFilter === "all" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                  {featuresRoadmapData.releasedFeatures.map((feat) => (
                    <div
                      key={feat.id}
                      className="p-6 bg-slate-50 border border-emerald-500/30 hover:border-emerald-500 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="mb-2">
                          <span className="font-serif italic text-base sm:text-lg text-emerald-700 block">
                            {/* Disponible ·  */}
                            {feat.badge}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold uppercase text-[#021520] mb-2 font-['DM_Sans',sans-serif]">
                          {feat.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-4">
                          {feat.description}
                        </p>
                      </div>

                      <ul className="space-y-1.5 pt-3 border-t border-black/5 text-xs text-slate-700">
                        {feat.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Volet B : Coming soon (Strictement labellisées à venir) */}
            {(roadmapFilter === "all" || roadmapFilter === "comingSoon") && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b-2 border-amber-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <h3 className="text-lg font-black uppercase text-[#021520] tracking-tight">
                      Fonctionnalités à venir
                    </h3>
                  </div>
                  <span className="font-serif italic text-xs sm:text-sm text-amber-900">
                    Feuille de route en cours
                  </span>
                </div>

                <div className={roadmapFilter === "all" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
                  {featuresRoadmapData.comingSoonFeatures.map((feat) => (
                    <div
                      key={feat.id}
                      className="p-6 bg-amber-50/30 border border-amber-500/40 hover:border-amber-500 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="font-serif italic text-base sm:text-lg text-amber-700">
                            {/* Coming soon ·  */}
                            {feat.badge}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold uppercase text-[#021520] mb-2 font-['DM_Sans',sans-serif]">
                          {feat.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-['Poppins',sans-serif] mb-4">
                          {feat.description}
                        </p>
                      </div>

                      <ul className="space-y-1.5 pt-3 border-t border-amber-200/50 text-xs text-slate-700">
                        {feat.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">›</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>


      {/* ── 4. ESPACE PRESSE, KIT MÉDIA & NEWSLETTER DÉCADAIRE ── */}
      <section className="py-20 lg:py-28 px-6 lg:px-16 border-b border-white/10 bg-[#021520] text-white">
        <div className="max-w-[1400px] mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-5">
              <span className="font-serif italic text-lg sm:text-xl font-light text-[#00D2FF] block mb-2">
                Relations Presse & Écosystème
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-6">
                Espace Presse <br />
                <span className="font-serif italic font-normal text-[#00D2FF] lowercase">& kit média officiel.</span>
              </h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed font-['Poppins',sans-serif] mb-8">
                Journalistes, analystes et partenaires économiques : accédez à nos communiqués vérifiés, notre charte graphique et nos repères officiels sur la logistique urbaine à Dakar.
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
                    Direction de la Communication
                  </span>
                  <span className="text-xs text-white/80 block leading-relaxed">
                    Échanges disponibles sur rendez-vous à notre siège dakarois ou par visioconférence.
                  </span>
                </div>
              </div>
            </div>

            {/* Téléchargement Kit Médias & Newsletter tous les 10 jours */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="p-6 sm:p-8 bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-[#00D2FF] uppercase tracking-widest block mb-3">
                    CHARTE OFFICIELLE
                  </span>
                  <h4 className="text-lg font-bold uppercase text-white mb-2">
                    Logos Officiels & Visuels
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed m-0 mb-6">
                    Fichiers PNG haute définition, déclinaisons sur fond sombre et fond clair et charte typographique DEM.
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
                    MANIFESTE & REPÈRES
                  </span>
                  <h4 className="text-lg font-bold uppercase text-white mb-2">
                    Notre Vision Logistique
                  </h4>
                  <p className="text-xs text-white/60 leading-relaxed m-0 mb-6">
                    Découvrez les fondements de notre approche opérationnelle et nos engagements pour la mobilité à Dakar.
                  </p>
                </div>
                <Link
                  to="/notre-histoire"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00D2FF] hover:underline"
                >
                  <span>Consulter notre histoire</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Inscription newsletter décadaire */}
              <div className="sm:col-span-2 p-6 sm:p-8 bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00D2FF] block mb-1 font-mono">
                    SYNTHÈSE TOUS LES 10 JOURS
                  </span>
                  <h4 className="text-base sm:text-lg font-bold uppercase text-white m-0">
                    Recevez l'édition décadaire directement par email
                  </h4>
                  <p className="text-xs text-white/70 m-0 mt-1">
                    Actualités vérifiées, état de la mobilité à Dakar et astuces logistiques.
                  </p>
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
                      placeholder="Votre email..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-[#021520] border border-white/20 text-xs px-3 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00D2FF] w-full sm:w-52"
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


      {/* ── 5. LECTEUR MODAL D'ARTICLE (MODAL READER) ── */}
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
              className="absolute top-6 right-6 w-10 h-10 border border-black/10 flex items-center justify-center text-[#021520] hover:bg-[#021520] hover:text-white transition-colors cursor-pointer font-mono font-bold"
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

            {/* Séparateur */}
            <div className="border-b border-black/10 mb-8 pb-2"></div>

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

            {/* Points clés opérationnels dans le modal */}
            {selectedArticle.keyPoints && (
              <div className="my-10 p-6 bg-slate-50 border-l-4 border-l-[#0086C8] border border-black/10">
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#0086C8] block mb-3">
                  Points clés à retenir :
                </span>
                <div className="space-y-3">
                  {selectedArticle.keyPoints.map((kp, i) => (
                    <div key={i} className="text-sm text-slate-800">
                      <strong>• {kp.title} :</strong> {kp.desc}
                    </div>
                  ))}
                </div>
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


      {/* ── 6. SECTION CONTACT & CTA ── */}
      <ContactCTA
        theme="white"
        watermark="ACTUALITÉS"
        subtitle="Restons connectés"
        title="Une question presse ou un"
        highlight="partenariat stratégique ?"
        description="Nos équipes communication et développement commercial répondent à vos sollicitations sous 24 heures pour toute demande d'interview ou de collaboration logistique."
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
