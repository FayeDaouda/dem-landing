export const servicesData = [
  {
    id: "clients-dem",
    title: "Les Clients DEM",
    subtitle: "SERVICE 01 · PARTICULIERS & UTILISATEURS",
    content: "Pour envoyer ou recevoir n'importe quel colis à Dakar en toute simplicité. Un coursier est assigné en moins de 10 minutes, vous suivez sa progression en temps réel sur la carte et chaque remise est sécurisée par code OTP.",
    detailedDescription: "L'application DEM réinvente la mobilité des biens pour les particuliers et expéditeurs du quotidien. Qu'il s'agisse d'un pli urgent, d'un oubli de clés, d'achats en boutique, de médicaments ou de vos repas favoris, notre algorithme connecte instantanément votre besoin au livreur le plus proche. Vous bénéficiez d'une traçabilité GPS de bout en bout, d'une estimation tarifaire transparente avant confirmation et d'un paiement sécurisé via Wave, Orange Money ou Espèces.",
    highlights: [
      { label: "Délai moyen", value: "< 45 min" },
      { label: "Assignation coursier", value: "< 10 min" },
      { label: "Validation remise", value: "Code OTP" },
      { label: "Disponibilité", value: "7j / 7" },
      { label: "Modes de paiement", value: "Wave / OM / Espèces" }
    ],
    keys: [
      "Livraison point-à-point en moins de 45 minutes",
      "Assignation instantanée du coursier le plus proche",
      "Suivi GPS en temps réel sur carte interactive",
      "Sécurisation de la remise par code OTP confidentiel",
      "Paiement flexible : Wave, Orange Money ou Espèces"
    ],
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&auto=format&fit=crop&q=85",
    miniTitleWithBar: "EXPÉRIENCE & CAS D'USAGE CLIENTS DEM",
    linkText: "Télécharger l'App & Commander",
    linkUrl: "/#download",
    badge: "Particuliers & Quotidien",
    audience: "Grand Public & Expéditeurs occasionnels",
    simulatorLink: null,
    projects: [
      {
        id: "p1",
        title: "Plis urgents & Documents administratifs",
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
        tags: ["Express", "Sécurisé OTP"],
        link: "/#download"
      },
      {
        id: "p2",
        title: "Achats en boutique & Petits colis",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=600&auto=format&fit=crop&q=80",
        tags: ["Shopping", "Point-à-point"],
        link: "/#download"
      },
      {
        id: "p3",
        title: "Santé, Médicaments & Dépannages",
        image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&auto=format&fit=crop&q=80",
        tags: ["Urgence", "< 30 min"],
        link: "/#download"
      }
    ]
  },
  {
    id: "coursiers-dem",
    title: "Les Coursiers DEM (Simulateur)",
    subtitle: "SERVICE 02 · RECRUTEMENT & FLOTTE COURSIERS",
    content: "Rejoignez la première flotte de coursiers connectés à Dakar. Travaillez en toute liberté, encaissez des revenus hebdomadaires garantis sur Wave ou Orange Money, et calculez dès maintenant votre potentiel de gains avec notre simulateur intégré.",
    detailedDescription: "DEM place le coursier au cœur de son modèle économique. En devenant livreur partenaire DEM, vous êtes votre propre patron : vous choisissez librement vos jours d'activité et vos plages horaires. Notre technologie intelligente optimise vos trajets pour maximiser le nombre de livraisons par heure sans vous faire perdre de temps dans les bouchons. Chaque semaine, vos gains et pourboires sont versés sans aucun frais caché. Utilisez notre simulateur interactif pour projeter vos revenus journaliers, hebdomadaires et mensuels selon vos objectifs.",
    highlights: [
      { label: "Gain moyen / course", value: "~1 200 FCFA net" },
      { label: "Simulateur intégré", value: "Calcul en direct" },
      { label: "Versement des gains", value: "Chaque semaine" },
      { label: "Autonomie de travail", value: "100% Flexible" },
      { label: "Protection & Équipement", value: "Fournis par DEM" }
    ],
    keys: [
      "Simulateur de revenus en direct selon votre volume",
      "Paiements hebdomadaires garantis sur Wave & OM",
      "Liberté totale : connectez-vous selon vos horaires",
      "Équipements professionnels certifiés (gilet, caisson)",
      "Assistance continue et couverture d'urgence sur la route"
    ],
    img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1920&auto=format&fit=crop&q=85",
    miniTitleWithBar: "SIMULATEUR DE REVENUS & AVANTAGES COURSIER",
    linkText: "Tester le Simulateur & Postuler",
    linkUrl: "/coursiers#simulateur",
    badge: "Flotte & Revenus",
    audience: "Livreurs indépendants & Motocyclistes",
    hasSimulator: true,
    simulator: {
      ratePerDelivery: 1200,
      currency: "FCFA",
      partTimeMonthly: "124 800 FCFA (4 courses/j)",
      fullTimeMonthly: "436 800 FCFA (14 courses/j)",
      performerMonthly: "780 000 FCFA (25 courses/j)"
    },
    projects: [
      {
        id: "p4",
        title: "Temps Plein Performeur (jusqu'à 430K+ FCFA/mois)",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
        tags: ["Temps Plein", "Gains Max"],
        link: "/coursiers#simulateur"
      },
      {
        id: "p5",
        title: "Temps Partiel & Complément de revenus",
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&auto=format&fit=crop&q=80",
        tags: ["Flexible", "Soir & Week-end"],
        link: "/coursiers#simulateur"
      },
      {
        id: "p6",
        title: "Équipements de sécurité & Caissons isothermes",
        image: "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=600&auto=format&fit=crop&q=80",
        tags: ["Dotation Pro", "Sécurité"],
        link: "/coursiers"
      }
    ]
  },
  {
    id: "dem-pro",
    title: "Les DEM PRO",
    subtitle: "SERVICE 03 · ENTREPRISES & E-COMMERCE",
    content: "La solution logistique d'élite pour les marchands et e-commerçants à Dakar. Expéditions groupées Same-Day, encaissement Cash on Delivery (COD) avec reversement garanti sous 24h, catalogue digital intégré et facturation professionnelle.",
    detailedDescription: "Propulsez la croissance de votre business avec la logistique professionnelle DEM PRO. Conçu pour libérer les marques et commerçants des tracas de livraison, DEM PRO prend en charge vos expéditions du ramassage en boutique jusqu'à la remise client en moins de 2h. Nos coursiers collectent vos paiements en espèces, Wave ou Orange Money, crédités sur votre portefeuille pro et reversés sous 24h ouvrées. Vous disposez d'un catalogue digital avec lien d'achat pour vos réseaux sociaux et de factures automatiques conformes.",
    highlights: [
      { label: "Reversement COD", value: "Garanti sous 24h" },
      { label: "Livraison Same-Day", value: "< 2h à Dakar" },
      { label: "Encaissement fonds", value: "Espèces / Wave / OM" },
      { label: "Taux de retour colis", value: "-30% via OTP & SMS" },
      { label: "Outils de vente", value: "Lien Mini-Boutique" }
    ],
    keys: [
      "Expéditions multiples et ramassages groupés en boutique",
      "Encaissement Cash on Delivery avec reversement 24h chrono",
      "Création de boutique digitale avec lien de commande en ligne",
      "Facturation automatique aux normes (NINEA & Mentions légales)",
      "Traçabilité temps réel partagée avec vos clients acheteurs"
    ],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&auto=format&fit=crop&q=85",
    miniTitleWithBar: "ÉCOSYSTÈME E-COMMERCE & AVANTAGES DEM PRO",
    linkText: "Découvrir les offres DEM PRO",
    linkUrl: "/dem-pro",
    badge: "Entreprises & Marchands",
    audience: "Boutiques en ligne, Créateurs & Réseaux de vente",
    projects: [
      {
        id: "p7",
        title: "Boutiques Mode, Prêt-à-Porter & Accessoires",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80",
        tags: ["Fashion", "COD Wave 24h"],
        link: "/dem-pro"
      },
      {
        id: "p8",
        title: "High-Tech, Électronique & Objets de valeur",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80",
        tags: ["Sécurisé OTP", "Suivi Live"],
        link: "/dem-pro"
      },
      {
        id: "p9",
        title: "Cosmétiques, Parfumerie & Grande Consommation",
        image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80",
        tags: ["Same-Day", "Mini-Boutique"],
        link: "/dem-pro"
      }
    ]
  }
];

export default servicesData;
