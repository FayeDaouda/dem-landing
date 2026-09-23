// Feuille de route produit et nouveautés DEM
// Règle d'intégrité DEM : Séparation stricte entre les fonctionnalités déjà opérationnelles
// et les fonctionnalités futures clairement labellisées "Coming soon".

export const nouveautesData = {
  // Fonctionnalités actuellement en production, disponibles dès aujourd'hui
  releasedFeatures: [
    {
      id: "feat-live-tracking",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "Lien de suivi GPS en direct sans application requise",
      version: "Déployé",
      description: "Vos clients finaux reçoivent un lien web interactif par SMS leur permettant de suivre la progression du coursier sur la carte en temps réel, sans avoir à installer d'application.",
      benefits: [
        "Consultable sur tout smartphone via un simple navigateur web",
        "Estimation dynamique de l'heure d'arrivée du livreur",
        "Suppression des appels anxiogènes des destinataires demandant 'où est mon colis ?'"
      ],
      badge: "Expérience Client"
    },
    {
      id: "feat-otp-security",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "Validation de livraison par code secret OTP",
      version: "Déployé",
      description: "Protocole de sécurité garantissant que le colis est remis à la bonne personne. La course ne peut être clôturée qu'après saisie du code à 4 chiffres généré sur le téléphone du destinataire.",
      benefits: [
        "Suppression totale des contestations de livraison",
        "Preuve numérique horodatée enregistrée dans le portail",
        "Sécurisation des commandes à forte valeur ajoutée"
      ],
      badge: "Sécurité & Traçabilité"
    },
    {
      id: "feat-cod-instant-reversal",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "Reversement automatisé COD sous 24h ouvrées",
      version: "Déployé",
      description: "Les fonds collectés lors des livraisons en espèces ou mobile money sont réconciliés et reversés sur votre compte Wave ou Orange Money sous 24 heures ouvrées.",
      benefits: [
        "Préservation de la trésorerie et du fonds de roulement",
        "Rapprochement ligne par ligne des commandes encaissées",
        "Fin des manipulations fastidieuses de liquidités en fin de journée"
      ],
      badge: "Fintech & Trésorerie"
    },
    {
      id: "feat-multi-drop-dispatch",
      status: "DISPONIBLE",
      statusColor: "emerald",
      title: "Expédition multi-adresses DEM PRO",
      version: "Déployé",
      description: "Pour les boutiques en ligne gérant des volumes quotidiens importants, planification de tournées de ramassage groupé en un seul clic vers de multiples points de livraison à Dakar.",
      benefits: [
        "Saisie rapide de plusieurs adresses de livraison dans une même tournée",
        "Tarification dégressive avantageuse dès la 3e expédition",
        "Un seul coursier dédié affecté au ramassage de toutes vos commandes de la matinée"
      ],
      badge: "E-Commerce & Pro"
    }
  ],

  // Fonctionnalités en cours de développement, strictement étiquetées COMING SOON
  comingSoonFeatures: [
    {
      id: "feat-cs-woocommerce-shopify",
      status: "COMING SOON",
      statusColor: "amber",
      title: "Plugins d'intégration directe WooCommerce & Shopify",
      phase: "En cours de développement technique",
      availability: "Arrivée progressive",
      description: "Synchronisation automatique de votre catalogue et de vos commandes e-commerce directement vers DEM. Dès qu'un client passe commande sur votre site, la course de livraison DEM est pré-générée.",
      benefits: [
        "Zéro ressaisie manuelle des adresses et numéros de téléphone",
        "Affichage des options de livraison DEM directement dans votre panier d'achat",
        "Transmission instantanée du numéro de suivi au client final"
      ],
      badge: "Intégration CMS"
    },
    {
      id: "feat-cs-scheduled-tours",
      status: "COMING SOON",
      statusColor: "amber",
      title: "Planification récurrente automatisée des ramassages",
      phase: "Phase de prototypage & tests bêta",
      availability: "En conception",
      description: "Pour les entreprises et ateliers ayant des expéditions quotidiennes fixes, mise en place d'un créneau récurrent automatique de passage coursier sans devoir relancer une commande chaque jour.",
      benefits: [
        "Heure de passage quotidienne garantie à votre atelier ou boutique",
        "Priorité d'assignation automatique de votre flotte habituelle",
        "Facturation mensuelle consolidée simplifiée"
      ],
      badge: "Automatisation Pro"
    },
    {
      id: "feat-cs-analytics-dashboard",
      status: "COMING SOON",
      statusColor: "amber",
      title: "Tableau de bord analytique des délais par commune",
      phase: "En cours de conception UX/UI",
      availability: "À venir",
      description: "Visualisation cartographique détaillée de vos zones de vente à Dakar, des délais moyens de livraison par quartier et du taux d'encaissement de vos commandes.",
      benefits: [
        "Identification de vos quartiers les plus rentables et les plus denses",
        "Mesure de l'impact des créneaux horaires sur la satisfaction client",
        "Export de données structurées pour votre comptabilité de fin de mois"
      ],
      badge: "Data & Analyse"
    },
    {
      id: "feat-cs-dem-wallet",
      status: "COMING SOON",
      statusColor: "amber",
      title: "Portefeuille DEM Wallet pour paiements instantanés",
      phase: "En phase d'étude de conformité",
      availability: "Étude réglementaire",
      description: "Portefeuille numérique d'entreprise prépayé permettant de régler l'ensemble de vos courses en un clic, de gérer des sous-comptes d'expédition pour vos collaborateurs et de fluidifier vos dépenses logistiques.",
      benefits: [
        "Recharge directe par Wave, Orange Money ou virement bancaire",
        "Contrôle budgétaire en temps réel avec plafonds paramétrables",
        "Génération automatique d'un reçu fiscal certifié à chaque débit"
      ],
      badge: "Fintech Entreprise"
    }
  ]
};

// Alias pour compatibilité
export const featuresRoadmapData = nouveautesData;

export default nouveautesData;
