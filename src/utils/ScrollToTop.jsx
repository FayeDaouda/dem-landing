import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const PAGE_TITLES = {
  "/": "DEM — Delivery Express Mobility | Livraison express à Dakar",
  "/a-propos": "À Propos — Notre Histoire & Vision | DEM",
  "/la-maison": "À Propos — Notre Histoire & Vision | DEM",
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
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Met à jour le titre du document selon la page
    document.title = getTitleForPath(pathname);

    // Désactive temporairement le smooth scroll
    document.documentElement.style.scrollBehavior = "auto";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // Remet le smooth scroll après un micro délai si besoin
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 0);
  }, [pathname]);

  return null;
}

