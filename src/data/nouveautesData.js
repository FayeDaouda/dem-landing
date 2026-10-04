// Feuille de route produit et nouveautés DEM
// Règle d'intégrité DEM : Séparation stricte entre les fonctionnalités déjà opérationnelles
// et les fonctionnalités futures clairement labellisées "Coming soon".

export const nouveautesData = {
  // Fonctionnalités actuellement en production, disponibles dès aujourd'hui
  releasedFeatures: [
    {
      id: "feat-nouveau-site",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "Un nouveau site pour DEM",
      version: "Déployé",
      description: "DEM fait peau neuve. Nouvelle présentation de nos services, simulateur de gains pour les coursiers, offres détaillées pour les pros et les chefs de flotte : tout est plus clair, pour que chacun trouve sa formule en quelques clics.",
      benefits: [
        "Présentation claire et transparente de l'ensemble de nos services",
        "Simulateur interactif de gains et de rentabilité pour coursiers et flottes",
        "Accès rapide aux grilles tarifaires et formulaires d'adhésion"
      ],
      badge: "Plateforme & Web"
    },
    {
      id: "feat-dem-pro-formules",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "DEM Pro : trois formules pour chaque activité",
      version: "Déployé",
      description: "Starter, Business et Premium : DEM Pro évolue avec trois formules adaptées à chaque niveau d'activité, dès 2 300 F par semaine. Boutique en ligne, wallet intégré, factures à votre logo : choisissez celle dont vous avez besoin, et évoluez à votre rythme.",
      benefits: [
        "Trois formules souples (Starter, Business, Premium) dès 2 300 F / semaine",
        "Lien de commande partageable et catalogue marchand en ligne",
        "Wallet intégré, factures automatisées et historique complet des ventes"
      ],
      badge: "DEM Pro & E-Commerce"
    },
    {
      id: "feat-adja-ia-support",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "Adja, notre assistante IA, rejoint le service client",
      version: "Déployé",
      description: "Une question sur une course ? Adja, notre assistant IA entraîné à la réalité de Dakar, répond en quelques secondes. Et un humain reste toujours prêt à prendre le relais.",
      benefits: [
        "Réponse instantanée 24/7 sur le statut et le suivi de vos courses",
        "Entraînée sur la toponymie dakaroise et les spécificités locales",
        "Passation fluide vers un conseiller humain à tout moment"
      ],
      badge: "Service Client & IA"
    },
    {
      id: "feat-flotte-formules",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "Chefs de flotte : deux nouvelles formules",
      version: "Déployé",
      description: "Formule 10 jours pour démarrer, formule 1 mois avec 4 dimanches offerts : les chefs de flotte peuvent désormais rejoindre DEM avec la formule qui correspond à leur flotte.",
      benefits: [
        "Formule 10 jours pour tester et démarrer sans engagement lourd",
        "Formule 1 mois avantageuse avec 4 dimanches offerts",
        "Compte chef de flotte pour suivre chaque moto et coursier en temps réel"
      ],
      badge: "Partenariat Flotte"
    }
  ],

  // Fonctionnalités en cours de développement, strictement étiquetées COMING SOON
  comingSoonFeatures: [
    {
      id: "feat-agrandissement-flotte",
      status: "COMING SOON",
      statusColor: "amber",
      title: "La flotte DEM va s'agrandir",
      phase: "En déploiement prochain",
      availability: "Très bientôt",
      description: "De nouvelles motos électriques vont bientôt rejoindre la flotte DEM. Plus de coursiers sur la route, c'est plus de disponibilité partout à Dakar. On vous en dit plus très vite.",
      benefits: [
        "Arrivée prochaine de nouvelles motos électriques 100 % silencieuses et écologiques",
        "Disponibilité accrue et délais d'intervention réduits dans tous les quartiers de Dakar",
        "Formation renforcée des nouveaux coursiers à la méthode et aux standards DEM"
      ],
      badge: "Flotte Électrique"
    }
  ]
};

// Alias pour compatibilité
export const featuresRoadmapData = nouveautesData;

export default nouveautesData;

