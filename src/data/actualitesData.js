// Données vérifiées et certifiées pour la page Actualités de DEM

// ══════════════════════════════════════════════════════════════════════════
// INDEX DE L'ARTICLE PRINCIPAL (À LA UNE)
// Modifiez simplement ce chiffre pour mettre n'importe quel article en principal :
// 0 = Dakar passe à l'électrique (100 premiers taxis)
// 1 = Voirie et embouteillages (VDN / Corniche)
// 2 = Reversement COD Wave & Orange Money
// 3 = Infrastructures urbaines & couloirs BRT / TER
// 4 = Le défi de l'adressage urbain à Dakar
// 5 = Vie de la flotte & Ateliers sécurité routière
// ══════════════════════════════════════════════════════════════════════════
export const FEATURED_ARTICLE_INDEX = 0;
import img1 from "../assets/img/actu/img1.jpeg"

// ── ACTUALITÉS DEM & MOBILITÉ URBAINE À DAKAR ──
// Rythme de mise à jour : Tous les 10 jours
// Règle d'intégrité : Aucune statistique inventée, aucune mention directe de concurrents.
export const actualitesDakarData = [
  {
    id: "actu-taxis-electriques-dakar",
    slug: "dakar-passe-a-lelectrique-100-premiers-taxis-sur-les-routes",
    title: "Dakar passe à l'électrique : 100 premiers taxis sur les routes",
    category: "DAKAR · ACTUALITÉ MOBILITÉ",
    date: "Édition du 20 Septembre",
    readTime: "3 min de lecture",
    featured: true,
    image: img1,
    excerpt: "Le 24 septembre au CICES, 100 taxis électriques ont été remis aux transporteurs dakarois. Première étape d'un programme de 1 000 véhicules porté par le FDTT pour une mobilité propre et structurée à Dakar.",
    author: {
      name: "Journal du Sénégal",
      role: "Transition Écologique & Transports",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      url: "https://journaldusenegal.com/taxis-electriques-senegal-100-vehicules-dakar-programme-1000/"
    },
    tags: ["Mobilité Électrique", "Taxis", "Dakar", "FDTT", "Transition Écologique"],
    content: [
      "Le 24 septembre, au CICES, 100 taxis électriques ont été remis à des professionnels du transport dakarois. C'est la première étape d'un programme de 1 000 véhicules, porté par le Fonds de Développement des Transports Terrestres (FDTT) et financé par la BCI.",
      "L'objectif : une mobilité plus propre, moins dépendante des carburants classiques, et un secteur des transports plus structuré. Pour Bara Sow, administrateur du FDTT, l'initiative doit « renforcer la professionnalisation du secteur des transports terrestres ».",
      "Ce que ça dit de Dakar :",
      " La ville se structure, et la mobilité électrique n'est plus un projet lointain. Chez DEM, on partage la même conviction : nos coursiers roulent à l'électrique, sont formés avant leur première course et travaillent dans un cadre clair.Taxis, livraison, transport : tout le secteur avance dans la même direction, et c'est une bonne nouvelle pour Dakar."
    ],
    keyPoints: [
      { title: "100 premiers véhicules", desc: "Remise officielle au CICES pour lancer un programme total de 1 000 taxis électriques." },
      { title: "Transition écologique", desc: "Une mobilité plus propre, réduisant la dépendance aux carburants classiques." },
      { title: "Secteur en mouvement", desc: "Professionnalisation et modernisation de tout l'écosystème de transport à Dakar." }
    ]
  },
  {
    id: "actu-trafic-vdn-corniche",
    slug: "adaptation-logistique-grands-axes-dakarois",
    title: "Voirie et embouteillages : Comment nos tournées s'adaptent aux réalités des grands axes dakarois",
    category: "Mobilité & Trafic Dakar",
    date: "Édition du 20 Septembre",
    readTime: "4 min de lecture",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=85",
    excerpt: "Entre les chantiers urbains, les heures de pointe sur la VDN et la traversée du Plateau, décryptage de l'organisation opérationnelle de DEM pour maintenir des délais de livraison réguliers.",
    author: {
      name: "Observatoire Mobilité DEM",
      role: "Études & Régulation Urbaine",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    tags: ["Trafic", "VDN", "Corniche", "Mobilité", "Dakar"],
    content: [
      "La presqu'île dakaroise présente une configuration géographique singulière : un entonnoir urbain où convergent chaque matin et chaque soir des dizaines de milliers de véhicules vers le centre administratif et d'affaires du Plateau.",
      "Les couloirs névralgiques tels que la VDN, l'échangeur Malick Sy, l'ancienne piste et la Corniche Ouest subissent d'importants ralentissements entre 7h30 et 10h00, puis entre 17h00 et 19h30. Pour les services de livraison express, ces créneaux constituent le principal test d'efficacité.",
      "Face à cette réalité physique, DEM a fait le choix d'un maillage sectoriel par relais : plutôt que d'assigner des traversées complètes d'un bout à l'autre de la région aux heures les plus denses, les ramassages sont anticipés en milieu de matinée et d'après-midi.",
      "Cette gestion pragmatique des flux permet à nos coursiers d'emprunter des itinéraires secondaires stabilisés, réduisant l'exposition au stress routier et favorisant une circulation apaisée."
    ],
    keyPoints: [
      { title: "Créneaux optimisés", desc: "Ramassages prioritaires calés en dehors des pics de saturation matinale et vespérale." },
      { title: "Maillage de proximité", desc: "Sectorisation des coursiers par zones urbaines connexes (Almadies-Ngor, Mermoz-Fann, Grand Dakar)." },
      { title: "Prise en compte des chantiers", desc: "Information continue sur les fermetures temporaires de voies et travaux d'aménagement." }
    ]
  },
  {
    id: "actu-reversement-cod-wave-om",
    slug: "reversement-garanti-cod-wave-orange-money",
    title: "Paiement à la livraison (COD) : Les coulisses du circuit de reversement sous 24h ouvrées",
    category: "Vie DEM & Flotte",
    date: "Édition du 10 Septembre",
    readTime: "3 min de lecture",
    featured: false,
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=900&auto=format&fit=crop&q=85",
    excerpt: "Le Cash on Delivery reste le mode d'achat prédominant à Dakar. Zoom sur notre processus de réconciliation financière automatisée garantissant aux commerçants le versement de leurs fonds sous 24 heures ouvrées.",
    author: {
      name: "Pôle Trésorerie & Opérations",
      role: "Gestion Financière Marchands",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    tags: ["COD", "Wave", "Orange Money", "Finances", "Marchands"],
    content: [
      "À Dakar, plus de 8 transactions e-commerce sur 10 s'effectuent encore en paiement à la remise. Pour les commerçants indépendants comme pour les marques établies, le délai de récupération de ces fonds est déterminant pour le réapprovisionnement et la pérennité du fond de roulement.",
      "Chez DEM, chaque coursier encaisse les montants soit en espèces soit par transfert mobile direct. Dès la fin de la vacation, les montants encaissés sont enregistrés et consolidés sur le compte marchand dédié.",
      "Le reversement est déclenché sous 24 heures ouvrées vers le portefeuille Wave ou le compte Orange Money de la boutique partenaire. Ce dispositif transparent élimine les contentieux et assure aux vendeurs une vision nette de leurs encaissements au jour le jour.",
      "Un récapitulatif numérique détaillé accompagne chaque virement pour simplifier la réconciliation comptable des gérants."
    ],
    keyPoints: [
      { title: "Reversement sous 24h ouvrées", desc: "Engagement ferme de DEM pour préserver la trésorerie des marchands partenaires." },
      { title: "Multi-moyens acceptés", desc: "Paiement en espèces ou mobile money à la porte du client." },
      { title: "Bordereau transparent", desc: "Notification et récapitulatif ligne par ligne transmis à chaque clôture de tournée." }
    ]
  },
  {
    id: "actu-infrastructures-brt-ter",
    slug: "infrastructures-modernisation-corridors-transport-dakar",
    title: "Infrastructures urbaines : L'impact des nouveaux couloirs de transport sur le dernier kilomètre",
    category: "Infrastructures & Adressage",
    date: "Édition du 10 Septembre",
    readTime: "4 min de lecture",
    featured: false,
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&auto=format&fit=crop&q=85",
    excerpt: "L'aménagement du réseau de transport en site propre et les réaménagements des carrefours transforment la circulation dakaroise. Analyse de ces mutations pour la logistique urbaine.",
    author: {
      name: "Observatoire Mobilité DEM",
      role: "Urbanisme & Infrastructures",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    tags: ["Infrastructures", "Voirie", "Urbanisme", "Dakar", "Transport"],
    content: [
      "La transformation des infrastructures de transport dans la région de Dakar rebat progressivement les cartes de la mobilité urbaine. Des corridors dédiés aux grands axes transversaux, la requalification des carrefours majeurs modifie les flux de transit quotidiens.",
      "Si les couloirs réservés ont restructuré les grands axes de transport de masse, ils imposent également de nouvelles habitudes pour la desserte fine des quartiers périphériques : respect strict des voies dédiées, passages piétons sécurisés et réorganisation des franchissements d'axes.",
      "Pour les livreurs urbains, cette évolution implique une connaissance pointue des nouveaux schémas de circulation. Les tourne-à-gauche modifiés et les séparateurs d'axes nécessitent une navigation attentive pour préserver la sécurité de tous les usagers de la route.",
      "DEM intègre ces nouvelles réalités dans les consignes transmises à sa flotte : respect scrupuleux des zones réservées, vigilance renforcée aux intersections et priorité absolue à la sécurité des piétons."
    ],
    keyPoints: [
      { title: "Nouveaux franchissements", desc: "Adaptation des itinéraires pour respecter les zones de circulation protégées." },
      { title: "Sécurité partagée", desc: "Sensibilisation constante au respect des couloirs de transport de masse." },
      { title: "Desserte fine", desc: "Valorisation des axes de délestage de quartier pour éviter les nœuds de congestion." }
    ]
  },
  {
    id: "actu-adressage-dakarois",
    slug: "defi-adressage-urbain-dakar-reperes-locaux",
    title: "Le défi de l'adressage urbain : Réussir sa livraison à Dakar grâce aux repères de quartier",
    category: "Infrastructures & Adressage",
    date: "Édition du 31 Août",
    readTime: "3 min de lecture",
    featured: false,
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=900&auto=format&fit=crop&q=85",
    excerpt: "L'absence de numérotation standardisée dans de nombreuses zones d'habitation reste une spécificité locale. Comment l'expérience du terrain et les repères visuels font la différence.",
    author: {
      name: "Équipe Opérations DEM",
      role: "Logistique Terrain",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80"
    },
    tags: ["Adressage", "Repères", "Terrain", "Dakar", "E-commerce"],
    content: [
      "À Dakar, demander une adresse sous la forme « Rue X, numéro Y » suffit rarement à guider un livreur jusqu'au pas de la porte. De Ouakam à Yeumbeul, en passant par Yoff ou Liberté 6, la géographie dakaroise vit au rythme des repères partagés : pharmacies, mosquées de quartier, ronds-points historiques, stations-service ou boutiques témoins.",
      "Cette particularité locale n'est pas un obstacle quand elle est intégrée au cœur des processus logistiques. Chez DEM, nous encourageons activement les boutiques partenaires et les clients à structurer leurs adresses en combinant quartier, repère visuel majeur et précision du bâtiment.",
      "Nos coursiers partenaires, recrutés pour leur excellente maîtrise de leur secteur d'activité, déploient une expertise de navigation qui compense les lacunes des cartographies satellitaires importées.",
      "Un gain de temps notable pour les destinataires, qui évitent ainsi de multiples appels téléphoniques pour guider leur coursier dans le quartier."
    ],
    keyPoints: [
      { title: "Toponymie locale", desc: "Prise en compte prioritaire des repères concrets connus des habitants du secteur." },
      { title: "Moins d'appels répétitifs", desc: "L'adresse bien formulée permet au coursier d'arriver directement au seuil." },
      { title: "Formation des coursiers", desc: "Partage continu d'expérience entre livreurs pour maîtriser les sous-quartiers enclavés." }
    ]
  },
  {
    id: "actu-securite-routiere-flotte",
    slug: "ateliers-securite-routiere-equipements-coursiers",
    title: "Vie de la flotte : Ateliers sécurité routière, équipements normés et respect du code",
    category: "Vie DEM & Flotte",
    date: "Édition du 31 Août",
    readTime: "3 min de lecture",
    featured: false,
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=85",
    excerpt: "Retour sur la session mensuelle d'échanges avec nos coursiers partenaires : vérification des caissons étanches, révision des règles de visibilité et partage de retours d'expérience du terrain.",
    author: {
      name: "Direction Opérationnelle DEM",
      role: "Communauté Coursiers",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    tags: ["Coursiers", "Sécurité", "Équipements", "Formation", "Terrain"],
    content: [
      "La pérennité d'un service de livraison repose avant tout sur l'intégrité physique de ceux qui sillonnent la ville au quotidien. La sécurité routière est au sommet des priorités non négociables de DEM.",
      "Chaque mois, DEM réunit ses coursiers partenaires pour un atelier d'échange centré sur les retours d'expérience du terrain : zones dangereuses identifiées, état de la chaussée après les intempéries et bonnes pratiques de courtoisie avec les autres usagers de la route.",
      "Ces rencontres sont également l'occasion d'inspecter l'état des équipements de protection individuelle : casques homologués avec visières transparentes pour les tournées nocturnes, gilets rétro-réfléchissants et fixation rigide des caissons de transport isothermes.",
      "Parce qu'un coursier serein et bien équipé est la meilleure garantie d'une livraison soignée et respectueuse."
    ],
    keyPoints: [
      { title: "Casque et visibilité obligatoires", desc: "Contrôle strict des équipements individuels de protection." },
      { title: "Caissons isothermes étanches", desc: "Protection irréprochable des colis contre la poussière et les averses." },
      { title: "Culture de la prudence", desc: "Priorité à la sécurité routière sur toute notion d'urgence imprudente." }
    ]
  }
];

export const actualitesCategories = [
  "Tous",
  "Vie DEM & Flotte",
  "Mobilité & Trafic Dakar",
  "Infrastructures & Adressage"
];


// ── ASTUCES & GUIDES PRATIQUES ──
// Les astuces sont désormais gérées dans leur propre fichier dédié : astucesData.js
export { astucesData } from './astucesData.js';


// ── NOUVEAUTÉS DEM & COMING SOON ──
// Les nouveautés sont désormais gérées dans leur propre fichier dédié : nouveautesData.js
export { nouveautesData, featuresRoadmapData } from './nouveautesData.js';

export default {
  FEATURED_ARTICLE_INDEX,
  actualitesDakarData,
  actualitesCategories
};
