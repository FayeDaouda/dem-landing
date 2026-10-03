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
    valeurAjoutee: "Des revenus qui te reviennent, un métier valorisé, un équipement fourni et une liberté totale.",
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
    title: "DEM PRO : MARCHANDS, E-COMMERCANTS & ARTISANS",
    subtitle: "SERVICE 02 · COMMERÇANTS & VENTE EN LIGNE",
    badge: "Les professionnels",
    audience: "Commerçants & E-commerçants",
    summary: "Le coursier est le dernier contact avec votre client, il est donc formé pour être à la hauteur : ponctuel, présentable et courtois. Et derrière lui, le profil DEM Pro vous simplifie la gestion au quotidien, bien au-delà de la livraison.",
    detailedDescription: "Avec le Compte DEM Pro votre business devient plus simple.",
    methodeTravail: "Portail de commande groupée, notification SMS automatique de l'acheteur avant livraison pour convenir de l'horaire et réconciliation financière quotidienne automatique.",
    valeurAjoutee: "Des clients mieux servis, une image de marque soignée et des heures de gestion gagnées chaque jour.",
    points: [
      "Envoyez plusieurs colis en un clic, ou programmez-les pour plus tard",
      "Vos performances en chiffres, pour piloter votre stratégie",
      "Un catalogue produits à partager, plus besoin de site",
      "L'historique de vos ventes, jour après jour",
      "Un support dédié",
      "Toute votre équipe sur un seul compte",
      "Des factures personnalisables",
      "Vous avez déjà un site ? Branchez-le à DEM et déléguez toutes vos livraisons",
      "Un wallet intégré pour vos encaissements"
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
    title: "Clients",
    subtitle: "SERVICE 03 · EXPÉRIENCE CLIENT & SERVICE CLIENT DÉDIÉ",
    badge: "Service Client De qualité",
    audience: "Clients particuliers, résidents dakarois & destinataires exigeants",
    summary: "Envoyez l'esprit tranquille. Vos colis du quotidien sont livrés le jour même, partout à Dakar. Vous suivez chaque course en temps réel, vous connaissez votre prix dès la commande, et notre service client, basé à Dakar, intervient à la moindre difficulté. Une fois le colis livré, le coursier peut vous envoyer une photo comme preuve. Vous n'avez plus à vous inquiéter : on s'occupe de tout.",
    detailedDescription: "Être bien servi une fois sur deux, ce n'est pas normal. Être bien servi à chaque fois, c'est <b>DEM.</b>",
    methodeTravail: "Régulation proactive par notre équipe d'assistance à Dakar, canal WhatsApp direct 7j/7, guidage contextuel dakarois sans blocage d'adresse.",
    valeurAjoutee: "Un service de qualité, et vos colis en sécurité. Une assistance disponible 7j/7, des réponses en quelques secondes grâce à Adja, notre assistant IA, un humain toujours prêt à intervenir et la sérénité à chaque envoi. Chaque course est suivie en temps réel, et nos agents prennent le relais dès que vous avez besoin d'eux.",
    statsHeader: "SERVICE CLIENT LOCAL DAKAR · ENGAGEMENTS & PERFORMANCE",

    dynamicStats: [
      {
        value: "2 min",
        target: 2,
        suffix: " min",
        decimals: 0,
        label: "TEMPS D'ATTENTE MOYEN",
        desc: "Pour trouver un coursier à proximité",
        progress: 100
      },
      {
        value: "73%",
        target: 73,
        decimals: 0,
        suffix: "%",
        label: "SATISFACTION CLIENT",
        desc: "Mesurée auprès de nos clients",
        progress: 73
      },
      {
        value: "24h / 24",
        target: 24,
        suffix: "h / 24",
        decimals: 0,
        label: "ASSISTANCE 7j / 7",
        desc: "Adja répond tout de suite, un humain dans la minute de 8h à 22h",
        progress: 100
      },
      {
        value: "0",
        target: 0,
        decimals: 0,
        label: "COLIS PERDU",
        desc: "Depuis le lancement de DEM",
        progress: 100
      }
    ],
    highlights: [
      { label: "Support Client", value: "7j/7 Hotline & WhatsApp" },
      { label: "Temps de réponse", value: "< 2 minutes" },
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
    id: "coursiers-pour-entreprises",
    number: "04",
    title: "COURSIERS DÉDIÉS · SANS APPLICATION",
    subtitle: "SERVICE 04 · ENTREPRISES, TOURNÉES & LOGISTIQUE PLANIFIÉE",
    badge: "Entreprises & Tournées",
    audience: " PME, grossistes, traiteurs, pharmacies et toute entreprise qui livre régulièrement",
    summary: "Un appel, et on s'occupe de tout.",
    detailedDescription: "Idéal pour les entreprises qui livrent tous les jours, le matin ou l'après-midi. Vous nous envoyez vos adresses par le canal qui vous arrange, et on s'occupe du reste : l'organisation, la livraison et le suivi.",
    methodeTravail: "Un interlocuteur unique chez DEM, des coursiers formés qui connaissent votre activité, et des tournées organisées zone par zone pour livrer plus vite.",
    valeurAjoutee: "Plus de gestion de coursiers ni de recrutement : vous avez une équipe de livraison, sans aucun salaire à votre charge.",
    highlights: [
      { label: "Coursiers dédiés", value: "Affectés à votre entreprise" },
      { label: "Zéro application", value: "Un appel ou un message suffit" },
      { label: "Tournées organisées", value: "Zone par zone" },
      { label: "Facturation", value: "Une seule facture, regroupée" }
    ],
    keys: [
      "Importation simple de listes d'adresses multiples",
      "Optimisation automatique de l'itinéraire par secteur urbain",
      "Respect strict des plages horaires avec chaque destinataire",
      "Suivi de progression étape par étape en direct",
      "Facturation consolidée adaptée aux entreprises"
    ],
    img: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1600&auto=format&fit=crop&q=85",
    linkText: "Demander un devis personnalisé",
    linkUrl: "/contact"
  },
  {
    id: "chef-de-flotte",
    number: "5",
    title: "GESTIONNAIRES & CHEFS DE FLOTTE",
    subtitle: "SERVICE 05 · GESTIONNAIRES DE PARCS & INVESTISSEURS",
    badge: "Chefs de Flotte",
    audience: "Propriétaires de motos, responsables d'équipes de livraison & investisseurs",
    summary: "Vos motos roulent, mais savez-vous vraiment ce qui se passe sur le terrain ? En intégrant le réseau DEM, un réseau déjà structuré, vous professionnalisez enfin votre flotte, sans stress. Depuis votre téléphone ou votre ordinateur, vous voyez votre flotte en temps réel et vous agissez directement sur elle. Où sont vos coursiers, combien de courses ils font, comment ils travaillent : tout est entre vos mains.",
    detailedDescription: "Vous possédez une ou plusieurs motos à Dakar et souhaitez rentabiliser votre investissement sans friction. DEM met à votre disposition un portail de gestion complet pour suivre vos coursiers, surveiller le volume de courses en temps réel, optimiser leur journée de travail et éliminer les kilomètres à vide.",
    methodeTravail: "Supervision cartographique en direct de votre équipe, répartition algorithmique équitable des commandes et tarification claire par abonnement ou pass journalier/hebdomadaire.",
    valeurAjoutee: "Le contrôle total de votre flotte, une vision claire sur chaque coursier et des revenus plus prévisibles. Vous gérez, DEM vous donne les outils.",
    highlights: [
      { label: "Formation", value: "Vos coursiers formés à la méthode DEM" },
      { label: "Courses", value: "Envoyées automatiquement au coursier le plus proche" },
      { label: "Pass", value: "Formules prépayées dégressives" },
      { label: "Performance", value: "Suivie coursier par coursier" },
      { label: "Revenus", value: "Plus prévisibles par moto" },
      { label: "Réseau", value: "Accès à toute la demande DEM à Dakar" },
      { label: "Support", value: "Une équipe joignable à chaque course" }
    ],
    keys: [
      "Suivi cartographique de l'ensemble de votre flotte en temps réel",
      "Formules de pass avantageuses sans prélèvement sur vos gains",
      "Historique détaillé des courses réalisées par chaque conducteur",
      "Répartition intelligente et continue des commandes disponibles",
      "Rapports d'activité et de performance téléchargeables"
    ],
    img: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1600&auto=format&fit=crop&q=85",
    linkText: "En savoir plus",
    linkUrl: "/chef-de-flotte"
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
