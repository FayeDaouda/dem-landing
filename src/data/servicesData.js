// Données vérifiées pour la page Nos Services DEM
// Zéro texte placeholder, zéro emoji, conformité totale avec le modèle opérationnel DEM Dakar.

export const servicesData = [
  {
    id: "express-point-a-point",
    number: "01",
    title: "Livraison Express Point-à-Point",
    subtitle: "SERVICE 01 · PARTICULIERS & URGENCES",
    badge: "Particuliers & Urgences",
    audience: "Particuliers, professionnels pressés & envois immédiats",
    summary: "Acheminement direct de plis, colis, clés ou médicaments partout à Dakar. Un coursier géolocalisé est assigné en moins de 10 minutes pour une livraison garantie sans détour.",
    detailedDescription: "Conçue pour répondre à l'urgence du quotidien dakarois, la livraison Express Point-à-Point DEM mobilise le coursier le plus proche de votre point de collecte. Le trajet s'effectue en direct, sans transit intermédiaire ni regroupement chronophage. De la prise en charge à la remise en main propre, vous suivez le déplacement du livreur en temps réel sur carte interactive.",
    methodeTravail: "Routage contextuel dakarois sans blocage d'adresse : notre système s'appuie sur les repères visuels réels de la capitale. La remise finale est obligatoirement validée par code confidentiel OTP, assurant qu'aucun colis ne soit remis à un tiers non autorisé.",
    valeurAjoutee: "Gain de temps absolu, suppression des appels à répétition pour situer l'adresse et sécurisation totale du colis de bout en bout.",
    highlights: [
      { label: "Assignation coursier", value: "< 10 minutes" },
      { label: "Délai moyen constaté", value: "35 à 45 min" },
      { label: "Validation de remise", value: "Code OTP unique" },
      { label: "Disponibilité", value: "7 jours / 7" }
    ],
    keys: [
      "Prise en charge directe sans rupture de charge",
      "Assignation instantanée du motocycliste le plus proche",
      "Traçabilité GPS en continu sur carte interactive",
      "Validation de la remise par code OTP confidentiel",
      "Paiement au choix : Wave, Orange Money ou Espèces"
    ],
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop&q=85",
    linkText: "Commander une course express",
    linkUrl: "/#download"
  },
  {
    id: "flotte-dediee",
    number: "02",
    title: "Mise à Disposition de Flotte & Coursiers Dédiés",
    subtitle: "SERVICE 02 · RECRUTEMENT & FLOTTE COURSIERS",
    badge: "Flotte & Coursiers",
    audience: "Livreurs indépendants, chaînes de restauration, pharmacies & PME",
    summary: "Rejoignez la flotte des coursiers DEM ou déléguez intégralement votre logistique urbaine : conducteurs formés, matériels isothermes professionnels et revenus garantis.",
    detailedDescription: "DEM place le coursier au cœur de son modèle économique. En devenant livreur partenaire ou en externalisant votre flotte avec DEM, vous bénéficiez d'une infrastructure complète : équipements de protection normés, caissons étanches, optimisation algorithmique des trajets et simulateur de gains intégré pour une transparence financière absolue.",
    methodeTravail: "Affectation de coursiers attitrés formés aux exigences spécifiques de chaque secteur. En cas d'imprévu, un coursier relais issu de notre flotte prend le relais immédiatement sans interruption d'activité.",
    valeurAjoutee: "Zéro charge mentale liée à la gestion de deux-roues, simulateur interactif pour piloter la rentabilité, et présence d'ambassadeurs soignés et ponctuels sur le terrain dakarois.",
    highlights: [
      { label: "Affectation", value: "Coursiers exclusifs & libres" },
      { label: "Continuité de service", value: "Remplacement garanti" },
      { label: "Équipements", value: "Caissons étanches / froid" },
      { label: "Paiements gains", value: "Chaque semaine Wave / OM" }
    ],
    keys: [
      "Flotte exclusive positionnée à votre siège ou en tournée",
      "Conducteurs formés à votre relation client et vos procédures",
      "Maintenance, carburant et assurances pris en charge",
      "Simulateur de revenus en direct pour projeter les gains",
      "Supervision opérationnelle par un chef de flotte DEM dédié"
    ],
    hasSimulator: true,
    simulator: {
      ratePerDelivery: 1200
    },
    img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1600&auto=format&fit=crop&q=85",
    linkText: "Rejoindre ou réserver la flotte",
    linkUrl: "/coursiers"
  },
  {
    id: "dem-pro-ecommerce",
    number: "03",
    title: "DEM PRO : E-Commerce & Vente en Ligne",
    subtitle: "SERVICE 03 · COMMERÇANTS & MARQUES",
    badge: "E-Commerce & Boutiques",
    audience: "Boutiques en ligne, créateurs de mode, commerçants digitaux",
    summary: "La logistique professionnelle du dernier kilomètre pour les marchands dakarois : ramassages réguliers, expéditions Same-Day et vitrine de vente connectée.",
    detailedDescription: "DEM PRO transforme la livraison en un levier de conversion commerciale. Nous prenons en charge vos expéditions directement à votre boutique ou atelier pour les livrer le jour même à vos clients partout dans la presqu'île et sa banlieue. Vos clients reçoivent un lien de suivi en direct et sont notifiés avant l'arrivée du coursier.",
    methodeTravail: "Planification des créneaux de ramassage, communication proactive par SMS/WhatsApp avec le destinataire pour convenir du meilleur moment de passage, réduisant drastiquement les échecs de livraison et les retours d'articles.",
    valeurAjoutee: "Baisse de plus de 30% des refus de colis, fidélisation accrue de vos acheteurs et gain d'au moins 3 heures par jour sur votre gestion quotidienne.",
    highlights: [
      { label: "Livraison Same-Day", value: "Le jour même" },
      { label: "Taux de succès", value: "99,4%" },
      { label: "Réduction des retours", value: "-30% via alertes" },
      { label: "Gestion des expéditions", value: "Portail dédié" }
    ],
    keys: [
      "Ramassages quotidiens programmés à votre adresse",
      "Notification automatique du client acheteur par SMS",
      "Tarification professionnelle dégressive au volume",
      "Lien de catalogue digital pour vendre sur les réseaux",
      "Tableau de bord de suivi de l'ensemble de vos envois"
    ],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=85",
    linkText: "Découvrir les offres DEM PRO",
    linkUrl: "/dem-pro"
  },
  {
    id: "cash-on-delivery",
    number: "04",
    title: "Encaissement Cash on Delivery (COD) & Reversement 24h",
    subtitle: "SERVICE 04 · GESTION FINANCIÈRE SÉCURISÉE",
    badge: "Sécurité Financière",
    audience: "Vendeurs acceptant le paiement à la livraison",
    summary: "Encaissement scrupuleux des fonds lors de la remise (espèces, Wave ou Orange Money) et reversement garanti sous 24h ouvrées sur votre compte marchand.",
    detailedDescription: "À Dakar, le paiement à la livraison reste le mode d'achat privilégié de plus de 80% des clients en ligne. DEM sécurise l'intégralité de ce cycle financier : nos coursiers collectent la somme exacte indiquée sur le bon de commande et délivrent une preuve d'encaissement numérique instantanée. Vos fonds sont comptabilisés en temps réel dans votre solde DEM PRO.",
    methodeTravail: "Protocole strict de réconciliation journalière : chaque montant collecté est synchronisé avec l'ordre de mission. Les fonds sont automatiquement débloqués et virés sur votre compte Wave ou Orange Money sous 24h ouvrées, accompagnés d'un relevé d'opérations détaillé.",
    valeurAjoutee: "Trésorerie fluidifiée, zéro contestation sur la monnaie ou le montant perçu, et fin des litiges récurrents liés aux coursiers informels.",
    highlights: [
      { label: "Délai de reversement", value: "< 24h ouvrées" },
      { label: "Modes de paiement", value: "Wave, OM, Espèces" },
      { label: "Traçabilité des fonds", value: "100% numérique" },
      { label: "Relevé comptable", value: "Automatique" }
    ],
    keys: [
      "Encaissement exact en espèces ou QR mobile money",
      "Reversement garanti sous 24h sur Wave ou Orange Money",
      "Reçu d'encaissement électronique délivré à l'acheteur",
      "Portefeuille marchand consultable en direct sur l'application",
      "Historique financier certifié pour votre comptabilité"
    ],
    img: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1600&auto=format&fit=crop&q=85",
    linkText: "Ouvrir un compte d'encaissement COD",
    linkUrl: "/dem-pro"
  },
  {
    id: "courses-programmees",
    number: "05",
    title: "Courses Programmées & Multi-Destinations",
    subtitle: "SERVICE 05 · TOURNÉES & LOGISTIQUE PLANIFIÉE",
    badge: "Tournées & Planification",
    audience: "PME, grossistes, traiteurs, distribution périodique",
    summary: "Planification anticipée de tournées de livraison et distribution groupée vers plusieurs destinataires à travers Dakar en un seul ordre de mission.",
    detailedDescription: "Idéal pour les entreprises qui expédient des volumes récurrents ou des colis groupés chaque matin ou chaque après-midi. Vous saisissez l'ensemble de vos adresses de livraison sur notre interface, et notre moteur logistique organise la séquence de passage la plus fluide pour optimiser le temps de parcours et limiter les kilomètres superflus.",
    methodeTravail: "Découpage cartographique par zones géographiques (Plateau, Almadies/Ngor, Mermoz/Sacré-Cœur, Grand Dakar, Banlieue/Guédiawaye/Pikine) et ordonnancement chronologique des étapes pour respecter les plages horaires souhaitées.",
    valeurAjoutee: "Économie substantielle sur le coût unitaire par course, respect rigoureux des heures de rendez-vous et réduction de l'empreinte carbone urbaine.",
    highlights: [
      { label: "Saisie groupée", value: "Multi-adresses" },
      { label: "Routage optimisé", value: "Par secteur urbain" },
      { label: "Planification", value: "Jusqu'à 7 jours avant" },
      { label: "Rapport de tournée", value: "Détaillé & instantané" }
    ],
    keys: [
      "Importation simple de listes d'adresses multiples",
      "Optimisation automatique du tracé par intelligence de zone",
      "Respect des créneaux horaires convenus avec chaque destinataire",
      "Suivi de progression étape par étape en temps réel",
      "Facturation consolidée à la tournée"
    ],
    img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1600&auto=format&fit=crop&q=85",
    linkText: "Planifier une tournée groupée",
    linkUrl: "/contact"
  }
];

export const piliersData = [
  {
    id: "service-client",
    number: "01",
    tag: "Proximité & Réactivité",
    title: "Service Client Réactif & Localisé à Dakar",
    isFeatured: true,
    description: "Une équipe d'assistance dédiée basée au cœur de Dakar, joignable directement par téléphone et WhatsApp 7j/7. Nous assurons la régulation proactive des courses et intervenons en temps réel pour résoudre les imprévus d'adresses ou les aléas de circulation.",
    points: [
      "Hotline téléphonique et support WhatsApp direct 7j/7",
      "Équipe locale maîtrisant les quartiers et repères dakarois",
      "Intervention proactive dès qu'un ralentissement est détecté",
      "Médiation humaine bienveillante entre expéditeur et destinataire"
    ]
  },
  {
    id: "securite-otp",
    number: "02",
    tag: "Confiance & Contrôle",
    title: "Sécurité & Traçabilité OTP Systématique",
    isFeatured: false,
    description: "Finies les disparitions et contestations de colis. Chaque remise physique et chaque collecte de fonds est scellée par la saisie d'un code OTP unique et confidentiel reçu par le destinataire sur son téléphone.",
    points: [
      "Code OTP généré à chaque étape d'acheminement",
      "Impossibilité de clore une livraison sans validation du destinataire",
      "Horodatage et géolocalisation certifiés de la transaction",
      "Historique complet téléchargeable pour vos archives"
    ]
  },
  {
    id: "routage-terrain",
    number: "03",
    tag: "Technologie Adaptée",
    title: "Cartographie Contextuelle & Maîtrise du Terrain",
    isFeatured: false,
    description: "Une technologie d'assignation intelligente pensée pour les spécificités de Dakar : repères visuels coutumiers, contournement prédictif des embouteillages de la VDN, de la Corniche et de l'autoroute à péage.",
    points: [
      "Navigation par repères et carrefours dakarois",
      "Algorithme d'assignation tenant compte des flux réels de trafic",
      "Couverture intégrale de Dakar-Plateau jusqu'à la grande banlieue",
      "Réduction drastique des temps morts et de la consommation d'énergie"
    ]
  },
  {
    id: "valorisation-coursiers",
    number: "04",
    tag: "Éthique & Humain",
    title: "Valorisation & Professionnalisation des Coursiers",
    isFeatured: false,
    description: "Les livreurs sont le visage de DEM et de votre entreprise auprès de vos clients. Nous assurons leur sécurité, leur équipement complet aux normes et une rémunération hebdomadaire transparente et garantie.",
    points: [
      "Casques normés, gilets haute visibilité et caissons isothermes",
      "Formation continue à la sécurité routière et à l'accueil client",
      "Versement hebdomadaire ponctuel des gains sur Wave / Orange Money",
      "Pourboires clients reversés à 100% aux coursiers"
    ]
  }
];

export default servicesData;
