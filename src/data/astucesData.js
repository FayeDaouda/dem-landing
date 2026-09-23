// Guides pratiques et astuces de livraison à Dakar
// Conseils concrets segmentés par audience : E-Commerçants, Coursiers et Clients

export const astucesData = {
  ecommercants: [
    {
      id: "astuce-eco-1",
      badge: "Packaging & Transport",
      title: "Optimiser le conditionnement de vos colis pour le transport à moto",
      summary: "À Dakar, les vibrations des chaussées et la poussière urbaine imposent un emballage renforcé pour préserver l'expérience de déballage de vos clients.",
      steps: [
        "Privilégiez des cartons compacts calés avec du papier kraft ou du film à bulles pour les flacons cosmétiques et produits fragiles.",
        "Scellez hermétiquement vos emballages textiles dans des pochettes inviolables étanches aux projections d'eau et de poussière.",
        "Évitez les sacs en papier fins non renforcés qui risquent de se déchirer sous le poids des articles lors de la manipulation du caisson."
      ],
      proTip: "Un emballage soigné et intact renforce immédiatement la perception haut de gamme de votre marque dès le seuil de la porte."
    },
    {
      id: "astuce-eco-2",
      badge: "Cash on Delivery",
      title: "Réduire les échecs et refus au moment de la livraison en espèces (COD)",
      summary: "Le paiement à la livraison peut générer des retours si le client est absent ou s'il n'a pas préparé le montant exact de la commande.",
      steps: [
        "Confirmez systématiquement par message la disponibilité du destinataire avant de déclencher la course de ramassage.",
        "Rappelez précisément le montant total dû et incitez votre client à préparer l'appoint en espèces ou à utiliser son compte Wave.",
        "Précisez à votre client qu'il recevra un code OTP sécurisé par SMS pour valider la remise sans litige."
      ],
      proTip: "Une confirmation en amont réduit le taux d'annulation de plus de 40% sur les commandes à paiement contre remboursement."
    },
    {
      id: "astuce-eco-3",
      badge: "Adressage Efficace",
      title: "Recueillir une adresse dakaroise exploitable sans perdre de temps",
      summary: "Évitez les allers-retours téléphoniques du livreur en collectant 3 informations incontournables dès la prise de commande.",
      steps: [
        "Le quartier précis et la commune (ex. : Mermoz Pyrotechnie, Liberté 6 Extension, Ouest Foire vers Cices).",
        "Le repère physique immanquable situé à moins de 100 mètres (pharmacie, boulangerie, école, mosquée connue).",
        "La description du bâtiment et l'étage (ex. : Immeuble carrelé bleu en face de la boutique, 2e étage gauche)."
      ],
      proTip: "La demande du partage de localisation GPS WhatsApp lors de la commande permet au coursier de vous trouver sans hésitation."
    },
    {
      id: "astuce-eco-4",
      badge: "Gestion des Horaires",
      title: "Synchroniser vos expéditions pour contourner les heures de pointe",
      summary: "Envoyer ses colis aux bons horaires permet d'éviter les embouteillages dakarois et de livrer vos clients bien plus rapidement.",
      steps: [
        "Programmez vos ramassages matinaux entre 10h00 et 11h30, juste après la dissipation des bouchons d'entrée au Plateau et sur la VDN.",
        "Pour les livraisons du soir, déclenchez vos courses avant 15h30 pour une remise effective avant la ruée de 17h00-19h00.",
        "Regroupez vos commandes par zone géographique similaire pour accélérer le traitement du livreur."
      ],
      proTip: "Un colis confié à 11h arrive souvent plus vite à destination qu'un colis expédié à 8h30 bloqué dans le trafic."
    }
  ],

  coursiers: [
    {
      id: "astuce-cou-1",
      badge: "Sécurité Routière",
      title: "Circulation en ville : Les réflexes vitaux pour rouler en sécurité à Dakar",
      summary: "La circulation dakaroise requiert une concentration de tous les instants pour anticiper les comportements imprévus des véhicules.",
      steps: [
        "Gardez toujours vos distances avec les bus et taxis urbains et ne dépassez jamais par la droite à l'approche d'un arrêt.",
        "Ralentissez systématiquement sur les ronds-points et carrefours encombrés, même lorsque vous avez la priorité apparente.",
        "Méfiez-vous des bas-côtés sablonneux qui diminuent drastiquement l'adhérence des deux-roues lors des freinages d'urgence."
      ],
      proTip: "Le port permanent du casque homologué bien attaché et du gilet réfléchissant est la base incontournable de votre métier."
    },
    {
      id: "astuce-cou-2",
      badge: "Relation Client & OTP",
      title: "L'art de la remise soignée : Politesse, vérification et code de validation",
      summary: "Vous êtes le visage de la marque auprès du client. Votre posture professionnelle garantit la satisfaction et de futurs pourboires.",
      steps: [
        "Saluez chaleureusement le client par son nom et présentez le colis avec les deux mains en montrant l'état impeccable du paquet.",
        "Demandez poliment le code OTP reçu par SMS avant de remettre le colis physique : 'Pour finaliser votre livraison en toute sécurité'.",
        "En cas de paiement en espèces, recomptez posément les billets devant le client et assurez-vous d'avoir toujours de la petite monnaie."
      ],
      proTip: "Un sourire, une salutation polie et le respect du code OTP font de vous un coursier reconnu et respecté."
    },
    {
      id: "astuce-cou-3",
      badge: "Entretien Matériel",
      title: "Prendre soin de sa monture et de son caisson isotherme",
      summary: "Un deux-roues bien entretenu évite les pannes immobilisantes et vous assure un revenu régulier chaque semaine.",
      steps: [
        "Contrôlez chaque matin la pression des pneus, la tension des freins et le fonctionnement de vos feux avant et arrière.",
        "Nettoyez l'intérieur du caisson avec un chiffon humide pour éliminer sable et poussière avant de charger les nouveaux colis.",
        "Assurez-vous de la bonne étanchéité du joint de fermeture du caisson, en particulier lors des saisons pluvieuses ou très venteuses."
      ],
      proTip: "10 minutes de vérification le matin évitent 3 heures d'immobilisation au garage en plein milieu d'une tournée."
    }
  ],

  clients: [
    {
      id: "astuce-cli-1",
      badge: "Réception Efficace",
      title: "Faciliter la livraison de son colis sans perdre de temps",
      summary: "Quelques réflexes simples permettent au coursier de vous déposer votre commande en moins de deux minutes chrono.",
      steps: [
        "Gardez votre téléphone sous la main lorsque vous attendez une livraison confirmée pour répondre rapidement à l'appel d'approche.",
        "Si votre rue n'est pas répertoriée, envoyez directement votre géolocalisation WhatsApp au livreur en précisant la couleur du portail.",
        "Désignez une personne de confiance (gardien, collègue, voisin) si vous devez vous absenter momentanément de l'adresse indiquée."
      ],
      proTip: "Le partage de localisation instantanée est l'outil le plus rapide pour guider un livreur dans les venelles de Dakar."
    },
    {
      id: "astuce-cli-2",
      badge: "Code OTP & Sécurité",
      title: "Le réflexe du code OTP : Pourquoi et comment l'utiliser",
      summary: "Le code SMS que vous recevez protège votre achat et garantit que votre commande ne soit jamais remise à un inconnu.",
      steps: [
        "Vous recevez un SMS contenant votre code secret dès que le livreur arrive à proximité de votre adresse.",
        "Vérifiez visuellement que le colis correspond bien à votre commande avant de transmettre oralement ce code au coursier.",
        "Ne communiquez jamais votre code par téléphone avant que le livreur ne soit physiquement présent devant vous."
      ],
      proTip: "Le code OTP est votre signature numérique : il protège votre argent et certifie la bonne exécution du service."
    },
    {
      id: "astuce-cli-3",
      badge: "Paiement Rapide",
      title: "Préparer son règlement en espèces ou via Mobile Money",
      summary: "Une transaction fluide évite de retenir le livreur et assure une remise agréable et sans attente.",
      steps: [
        "Si vous réglez en espèces, préparez le montant exact de votre commande pour éviter les aléas de recherche de monnaie.",
        "Si vous préférez Wave ou Orange Money, ayez votre application prête pour scanner le QR Code ou effectuer le transfert instantané.",
        "Exigez la confirmation du reçu ou de la notification de clôture qui atteste la fin de la transaction."
      ],
      proTip: "Payer par Wave ou avoir l'appoint prêt fait gagner un temps précieux à votre livreur pour ses prochaines missions."
    }
  ]
};

export default astucesData;
