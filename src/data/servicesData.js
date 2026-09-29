// Données vérifiées pour la page Nos Services DEM
// Zéro texte placeholder, zéro emoji, conformité totale avec le modèle opérationnel DEM Dakar.

export const servicesData = [
  {
    id: "coursiers",
    number: "01",
    title: "Coursiers",
    subtitle: "SERVICE 01 · RECRUTEMENT, ÉQUIPEMENT & REVENUS",
    badge: "Coursiers d'abord",
    audience: "Livreurs indépendants, conducteurs de moto & candidats livreurs",
    summary: "Rejoignez le réseau DEM : application avec repères dakarois réels, reversement transparent des gains, équipements complets et fin des négociations au téléphone.",
    detailedDescription: "DEM replace le coursier au centre de l'équation logistique. Fini le harcèlement téléphonique, les litiges de monnaie et les pertes de temps. Grâce à notre application dédiée, chaque coursier reçoit des missions claires, guidées par les repères urbains de Dakar, avec une tarification juste et des gains versés chaque semaine sur Wave ou Orange Money.",
    methodeTravail: "Affectation intelligente selon la position réelle, validation des étapes par code OTP confidentiel et simulateur de gains intégré pour une visibilité totale sur vos revenus.",
    valeurAjoutee: "Protection financière, valorisation du métier, équipements de sécurité fournis et autonomie complète.",
    highlights: [
      { label: "Versement des gains", value: "Hebdomadaire Wave / OM" },
      { label: "Pourboires", value: "100% au coursier" },
      { label: "Équipements", value: "Casque & caisson fournis" },
      { label: "Modèle", value: "Pass fixe sans commission" }
    ],
    keys: [
      "Formation des coursiers",
      "Application mobile fluide avec navigation par repères dakarois",
      "Paiement garanti chaque semaine sur Wave ou Orange Money",
      "Zéro commission par course grâce aux formules de pass",
      "Équipements de sécurité et caissons professionnels fournis",
      "Assistance opérationnelle directe en cas d'imprévu sur la route"
    ],
    hasSimulator: true,
    simulator: {
      ratePerDelivery: 1200
    },
    img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1600&auto=format&fit=crop&q=85",
    linkText: "Rejoindre la flotte DEM",
    linkUrl: "/coursiers"
  },
  {
    id: "clients-express",
    number: "02",
    title: "Clients & Service Client 7j/7",
    subtitle: "SERVICE 02 · EXPÉRIENCE CLIENT & SERVICE CLIENT DÉDIÉ",
    badge: "Service Client Dédié",
    audience: "Clients particuliers, résidents dakarois & destinataires exigeants",
    summary: "Vos envois et livraisons du quotidien soutenus par un service client réactif basé à Dakar. Traçabilité GPS en direct, intervention humaine proactive en cas d'imprévu et remise scellée par code OTP.",
    detailedDescription: "Chez DEM, l'expérience client repose sur une promesse claire : un service client humain, réactif et basé au cœur de Dakar, joignable directement par téléphone et WhatsApp 7j/7. Fini les coursiers perdus et les livraisons sans nouvelles : nos régulateurs surveillent vos courses en direct, vous informent en temps réel et interviennent immédiatement pour guider le livreur. Chaque colis est remis en main propre et validé par un code OTP confidentiel.",
    methodeTravail: "Régulation proactive par notre équipe d'assistance à Dakar, canal WhatsApp direct 7j/7, guidage contextuel dakarois sans blocage d'adresse et validation obligatoire par code OTP.",
    valeurAjoutee: "Assistance humaine disponible 7j/7, temps de réponse sous 2 minutes, zéro litige grâce au code OTP et tranquillité d'esprit garantie.",
    statsHeader: "SERVICE CLIENT LOCAL DAKAR · ENGAGEMENTS & PERFORMANCE",
    
    dynamicStats: [
      {
        value: "< 2 min",
        target: 2,
        prefix: "< ",
        suffix: " min",
        decimals: 0,
        label: "Temps de réponse support",
        desc: "Assistance WhatsApp direct & Hotline 7j/7",
        progress: 96
      },
      {
        value: "98.7%",
        target: 98.7,
        decimals: 1,
        suffix: "%",
        label: "Satisfaction client",
        desc: "Résolution immédiate dès le premier échange",
        progress: 98.7
      },
      {
        value: "7j / 7",
        target: 7,
        suffix: "j / 7",
        decimals: 0,
        label: "Disponibilité assistance",
        desc: "De 08h00 à 22h00 sans interruption",
        progress: 100
      },
      {
        value: "99.4%",
        target: 99.4,
        decimals: 1,
        suffix: "%",
        label: "Remises validées OTP",
        desc: "Preuve de livraison sans litige ni contestation",
        progress: 99.4
      }
    ],
    highlights: [
      { label: "Support Client", value: "7j/7 Hotline & WhatsApp" },
      { label: "Temps de réponse", value: "< 2 minutes" },
      { label: "Validation remise", value: "Code OTP confidentiel" },
      { label: "Équipe support", value: "100% basée à Dakar" }
    ],
    keys: [
      "Service client réactif basé à Dakar joignable 7j/7 par WhatsApp et téléphone",
      "Intervention humaine immédiate en cas de retard ou d'adresse introuvable",
      "Traçabilité GPS continue de votre coursier sur carte interactive",
      "Validation obligatoire de la remise par code OTP unique",
      "Paiements flexibles et sécurisés : Wave, Orange Money ou espèces à l'arrivée"
    ],
    img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop&q=85",
    linkText: "Commander avec suivi & assistance",
    linkUrl: "/#download"
  },
  {
    id: "dem-pro",
    number: "03",
    title: "DEM Pro : Marchands & E-Commerce",
    subtitle: "SERVICE 03 · COMMERÇANTS & VENTE EN LIGNE",
    badge: "Marchands & E-Commerce",
    audience: "Boutiques Instagram, TikTok, WhatsApp, créateurs de mode & commerçants",
    summary: "Les commerçants et e-commerçants ayant rejoint le réseau DEM Pro propulsent leurs ventes et sécurisent leur trésorerie : ramassages programmés, livraisons Same-Day, encaissement Cash on Delivery et reversement garanti sous 24h.",
    detailedDescription: "DEM Pro transforme la livraison en levier de conversion commerciale. Nous collectons vos colis directement à votre boutique ou atelier pour les livrer le jour même à vos clients partout à Dakar. Vos clients sont notifiés par SMS, et vos encaissements à la livraison sont sécurisés dans votre portefeuille numérique avec virement sous 24h ouvrées.",
    methodeTravail: "Portail de commande groupée, notification SMS automatique de l'acheteur avant livraison pour convenir de l'horaire et réconciliation financière quotidienne automatique.",
    valeurAjoutee: "Baisse de plus de 30% des refus de colis, trésorerie disponible sous 24h et gain de plusieurs heures de gestion chaque jour.",
    highlights: [
      { label: "Livraison Same-Day", value: "Le jour même" },
      { label: "Taux de succès", value: "99,4%" },
      { label: "Reversement COD", value: "< 24h ouvrées" },
      { label: "Gestion des envois", value: "Portail dédié" }
    ],
    keys: [
      "Ramassages quotidiens programmés à votre boutique ou domicile",
      "Notification automatique de l'acheteur par SMS",
      "Encaissement exact des fonds à la livraison (Wave, OM, Espèces)",
      "Reversement garanti sous 24h ouvrées sur votre compte mobile money",
      "Tableau de bord complet pour piloter commandes et trésorerie"
    ],
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&auto=format&fit=crop&q=85",
    linkText: "Découvrir DEM Pro",
    linkUrl: "/dem-pro"
  },
  {
    id: "chef-de-flotte",
    number: "04",
    title: "Espace Chefs de Flotte & Gestionnaires",
    subtitle: "SERVICE 04 · GESTIONNAIRES DE PARCS & INVESTISSEURS",
    badge: "Chefs de Flotte",
    audience: "Propriétaires de motos, responsables d'équipes de livraison & investisseurs",
    summary: "Les chefs de flotte ayant rejoint le réseau DEM maximisent la rentabilité de leur parc : formules de pass prépayé sans commission cachée, affectation intelligente des courses et supervision en temps réel.",
    detailedDescription: "Vous possédez une ou plusieurs motos à Dakar et souhaitez rentabiliser votre investissement sans friction. DEM met à votre disposition un portail de gestion complet pour suivre vos coursiers, surveiller le volume de courses en temps réel, optimiser leur journée de travail et éliminer les kilomètres à vide.",
    methodeTravail: "Supervision cartographique en direct de votre équipe, répartition algorithmique équitable des commandes et tarification claire par abonnement ou pass journalier/hebdomadaire.",
    valeurAjoutee: "Rentabilité prévisible par moto, visibilité totale sur l'activité des conducteurs et réduction drastique des temps d'inactivité.",
    highlights: [
      { label: "Modèle tarifaire", value: "Pass fixe sans commission" },
      { label: "Supervision", value: "Temps réel sur carte" },
      { label: "Rentabilité", value: "Maximale par moto" },
      { label: "Gestion", value: "Portail multi-coursiers" }
    ],
    keys: [
      "Suivi cartographique de l'ensemble de votre flotte en temps réel",
      "Formules de pass avantageuses sans prélèvement sur vos gains",
      "Historique détaillé des courses réalisées par chaque conducteur",
      "Répartition intelligente et continue des commandes disponibles",
      "Rapports d'activité et de performance téléchargeables"
    ],
    img: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1600&auto=format&fit=crop&q=85",
    linkText: "Accéder à l'espace Chef de Flotte",
    linkUrl: "/chef-de-flotte"
  },
  {
    id: "courses-programmees",
    number: "05",
    title: "Courses Programmées & Tournées Multi-Destinations",
    subtitle: "SERVICE 05 · ENTREPRISES, TOURNÉES & LOGISTIQUE PLANIFIÉE",
    badge: "Entreprises & Tournées",
    audience: "PME, grossistes, traiteurs, pharmacies & distribution récurrente",
    summary: "Planification anticipée de tournées de livraison et distribution groupée vers plusieurs adresses à Dakar en un seul ordre de mission optimisé.",
    detailedDescription: "Idéal pour les structures qui expédient des volumes réguliers chaque matin ou chaque après-midi. Vous saisissez l'ensemble de vos adresses, et notre moteur logistique calcule la séquence de passage la plus fluide pour optimiser le temps de parcours, limiter les kilomètres superflus et respecter les créneaux convenus.",
    methodeTravail: "Découpage par zones géographiques dakaroises, ordonnancement logique des étapes et affectation d'un coursier dédié pour toute la durée de la tournée.",
    valeurAjoutee: "Coût unitaire réduit par point de livraison, ponctualité exemplaire et simplification complète de votre logistique récurrente.",
    highlights: [
      { label: "Saisie groupée", value: "Multi-adresses en 1 clic" },
      { label: "Routage", value: "Optimisé par zone urbaine" },
      { label: "Planification", value: "Jusqu'à 7 jours à l'avance" },
      { label: "Facturation", value: "Consolidée à la tournée" }
    ],
    keys: [
      "Importation simple de listes d'adresses multiples",
      "Optimisation automatique de l'itinéraire par secteur urbain",
      "Respect strict des plages horaires avec chaque destinataire",
      "Suivi de progression étape par étape en direct",
      "Facturation consolidée adaptée aux entreprises"
    ],
    img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1600&auto=format&fit=crop&q=85",
    linkText: "Planifier une tournée d'entreprise",
    linkUrl: "/contact"
  }
];

export const piliersData = [
  {
    id: "service-client",
    number: "1",
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
    number: "2",
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
    number: "3",
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
    number: "4",
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
