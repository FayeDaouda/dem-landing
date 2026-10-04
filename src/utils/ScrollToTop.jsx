import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const PAGE_TITLES = {
  "/": "DEM — Delivery Express Mobility | Livraison express à Dakar",
  "/notre-histoire": "Notre Histoire & Vision | DEM",
  "/a-propos": "Notre Histoire & Vision | DEM",
  "/la-maison": "Notre Histoire & Vision | DEM",
  "/services": "Nos Services de Livraison — Express, Colis & Repas | DEM",
  "/coursiers": "Devenir Coursier Partenaire — Rejoignez l'équipe | DEM",
  "/livreurs": "Devenir Coursier Partenaire — Rejoignez l'équipe | DEM",
  "/dem-pro": "Solutions Entreprises & E-commerce — DEM Pro",
  "/dempro": "Solutions Entreprises & E-commerce — DEM Pro",
  "/entreprises": "Solutions Entreprises & E-commerce — DEM Pro",
  "/chef-de-flotte": "Chefs de Flotte | DEM",
  "/flotte": "Chefs de Flotte | DEM",
  "/contact": "Contact & Support Client | DEM",
  "/privacy": "Politique de Confidentialité | DEM",
  "/terms": "Conditions Générales d'Utilisation | DEM",
  "/delete-account": "Suppression de Compte | DEM",
};

export function getTitleForPath(pathname) {
  if (PAGE_TITLES[pathname]) {
    return PAGE_TITLES[pathname];
  }
  if (pathname.startsWith("/commander")) {
    return "Passer une Commande | DEM Express";
  }
  return "DEM — Delivery Express Mobility | Livraison express à Dakar";
}

export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    // Met à jour le titre du document selon la page
    const pageTitle = getTitleForPath(pathname);
    document.title = pageTitle;

    // Envoi de la vue de page à Google Analytics pour React SPA
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-YGGB32JJXB', {
        page_path: pathname + search,
        page_title: pageTitle,
      });
    }

    if (hash) {
      const targetId = hash.replace(/^#/, '');
      const scrollToHash = () => {
        const element = document.getElementById(targetId) || document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Exécute immédiatement et planifie des retentatives pour absorber le rendu des images et de GSAP
      if (!scrollToHash()) {
        const t1 = setTimeout(scrollToHash, 100);
        const t2 = setTimeout(scrollToHash, 300);
        const t3 = setTimeout(scrollToHash, 600);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      } else {
        const t = setTimeout(scrollToHash, 250);
        return () => clearTimeout(t);
      }
    }

    // Désactive temporairement le smooth scroll
    document.documentElement.style.scrollBehavior = "auto";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Remet le smooth scroll après un micro délai si besoin
    const resetTimer = setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 0);
    return () => clearTimeout(resetTimer);
  }, [pathname, search, hash]);

  return null;
}

