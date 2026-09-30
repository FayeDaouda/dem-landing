// Données vérifiées pour la page Nos Services DEM
// Zéro texte placeholder, zéro emoji, conformité totale avec le modèle opérationnel DEM Dakar.

export const servicesData = [
  {
    id: "coursiers",
    number: "1",
    title: "Coursiers",
    subtitle: "SERVICE 01 · RECRUTEMENT, ÉQUIPEMENT & REVENUS",
    badge: "Coursiers d'abord",
    audience: "Coursiers indépendants, & candidats coursiers",
    summary: "Rejoignez le réseau DEM \n<strong>ACTIVE TON PASS. ROULE. GAGNE. GARDE TOUT.</strong>",
    detailedDescription: "Chez DEM, tu n'es pas de passage. Tu es un coursier professionnel. On te forme, on te suit et on te donne les outils pour faire de ton métier une expérience valorisante. Toi, tu roules. Le reste, on s'en occupe.",
    valeurAjoutee: "Protection financière, valorisation du métier, équipements de sécurité fournis et autonomie complète.",
    points: [
      "Une application simple, pensée pour toi",
      "Des courses dans tout Dakar, dès que tu es en ligne",
      "100 % de tes gains de course, zéro commission",
      "Des prix fixés par zone, sans surprise",
      "Une formation terrain",
      "Une formation service client",
      "Une équipe joignable avant, pendant et après chaque course"
    ],
    
    hasSimulator: true,
    simulator: {
      ratePerDelivery: 1300
    },
    img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1600&auto=format&fit=crop&q=85",
    linkText: "",
    linkUrl: "/contact"
  },
  {
    id: "dem-pro",
    number: "2",
    title: "DEM Pro : Marchands & E-Commerce",
    subtitle: "SERVICE 02 · COMMERÇANTS & VENTE EN LIGNE",
    badge: "Marchands & E-Commerce",
    audience: "Commerçants & E-commerçants",
    summary: "Propulsez vos ventes en rejoignant le réseau <b>DEM.</b>",
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
    linkUrl: "/dem-pro"
  },
  {
    id: "clients-express",
    number: "3",
    title: "Clients & Service Client 7j/7",
    subtitle: "SERVICE 03 · EXPÉRIENCE CLIENT & SERVICE CLIENT DÉDIÉ",
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
    id: "chef-de-flotte",
    number: "4",
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
    title: "Un service client local, joignable et réactif",
    isFeatured: true,
    description: "Une équipe basée à Dakar, joignable directement par téléphone et WhatsApp, 7j/7. Adja, notre assistant IA entraîné à la réalité de Dakar, répond en quelques secondes, et un humain reste toujours prêt à intervenir. Nous suivons les courses en direct et intervenons tout de suite en cas de souci d'adresse ou d'imprévu sur la route.",
    points: [
      "Téléphone et WhatsApp direct, 7j / 7",
      "Adja, notre assistant IA, avec un humain toujours prêt à intervenir",
      "Une équipe locale qui connaît les quartiers et les repères de Dakar",
      "Une intervention rapide dès qu'une course prend du retard",
      "Une médiation humaine et bienveillante entre l'expéditeur et le destinataire"
    ]
  },
  {
    id: "securite-otp",
    number: "2",
    tag: "Sécurité & contrôle",
    title: "Des courses suivies et prouvées",
    isFeatured: false,
    description: "Finie l'incertitude sur vos colis. Grâce à notre technologie, nous savons à chaque instant où se trouve le coursier, du retrait jusqu'à la livraison. Une fois le colis remis, le coursier peut envoyer une photo comme preuve de livraison. Et dans votre compte, vous retrouvez un rapport détaillé de chacune de vos courses.",
    points: [
      "Un suivi en temps réel de chaque course",
      "Une photo de preuve de livraison envoyée par le coursier",
      "Un rapport détaillé de chaque course dans votre compte",
      "Des coursiers identifiés, formés et équipés par DEM"
    ]
  },
  {
    id: "routage-terrain",
    number: "3",
    tag: "Technologie adaptée",
    title: "Cartographie contextuelle & maîtrise du terrain",
    isFeatured: false,
    description: "Une technologie pensée pour les réalités de Dakar. La navigation se fait par repères et carrefours dakarois, et l'app anticipe les embouteillages de la VDN, de la Corniche et de l'autoroute à péage pour les contourner. Chaque course est confiée au coursier le plus proche.",
    points: [
      "Une navigation par repères et carrefours dakarois",
      "Un contournement anticipé des embouteillages",
      "Le coursier le plus proche assigné à chaque course",
      "Une couverture de toute la région de Dakar, du Plateau à la grande banlieue",
      "Moins de temps perdu, pour le coursier comme pour le client"
    ]
  },
  {
    id: "valorisation-coursiers",
    number: "4",
    tag: "Éthique & humain",
    title: "Valorisation & professionnalisation des coursiers",
    isFeatured: false,
    description: "Nos coursiers sont le visage de DEM et le reflet de notre service. Si vous êtes un pro, ils sont aussi le visage de votre entreprise auprès de vos clients. C'est pour ça qu'on les forme, qu'on les équipe avant qu'ils roulent, et qu'ils gardent 100 % de leurs courses.",
    points: [
      "Un équipement complet fourni avant la première course",
      "Une formation terrain à la sécurité routière et à l'accueil client",
      "100 % des gains de course pour le coursier",
      "Des prix par zone, clairs et justes, connus à l'avance"
    ]
  }
];

export default servicesData;
