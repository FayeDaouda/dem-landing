import { Link } from 'react-router-dom'

const C = {
  cyan: '#00D2FF',
  cyan2: '#0086C8',
}

const sections = [
  {
    title: '1. Acceptation des conditions',
    content: (
      <p>En téléchargeant et en utilisant l'application DEM, vous acceptez les présentes conditions d'utilisation dans leur intégralité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.</p>
    ),
  },
  {
    title: '2. Description du service',
    content: (
      <p>DEM est une plateforme mobile de mise en relation entre des clients souhaitant effectuer des livraisons et des livreurs/chauffeurs indépendants au Sénégal. DEM n'est pas un prestataire de transport ; il s'agit d'une plateforme d'intermédiation technologique.</p>
    ),
  },
  {
    title: '3. Éligibilité',
    content: (
      <ul style={{ paddingLeft: 20 }}>
        <li>Vous devez avoir au moins <strong>18 ans</strong> pour utiliser l'application.</li>
        <li>Les drivers doivent posséder un permis de conduire valide et être titulaires des autorisations légales requises au Sénégal.</li>
        <li>Vous devez fournir des informations exactes lors de l'inscription.</li>
      </ul>
    ),
  },
  {
    title: '4. Inscription et compte',
    content: (
      <ul style={{ paddingLeft: 20 }}>
        <li>L'inscription se fait via un numéro de téléphone vérifié par code OTP.</li>
        <li>Vous êtes responsable de la confidentialité de votre compte.</li>
        <li>Tout accès non autorisé doit être signalé immédiatement à <a href="mailto:support@dem.sn" style={{ color: C.cyan }}>support@dem.sn</a>.</li>
      </ul>
    ),
  },
  {
    title: '5. Utilisation acceptable',
    content: (
      <>
        <p style={{ marginBottom: 8 }}>Il est interdit de :</p>
        <ul style={{ paddingLeft: 20 }}>
          <li>Utiliser l'application à des fins illégales ou frauduleuses.</li>
          <li>Transporter des marchandises illicites, dangereuses ou prohibées par la loi sénégalaise.</li>
          <li>Harceler, menacer ou intimider d'autres utilisateurs.</li>
          <li>Tenter de contourner les systèmes de sécurité de la plateforme.</li>
          <li>Créer plusieurs comptes pour la même identité.</li>
        </ul>
      </>
    ),
  },
  {
    title: '6. Responsabilités des parties',
    content: (
      <>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>DEM s'engage à :</p>
        <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
          <li>Fournir une plateforme technique fonctionnelle et sécurisée.</li>
          <li>Traiter les données conformément à notre <Link to="/privacy" style={{ color: C.cyan }}>Politique de confidentialité</Link>.</li>
          <li>Traiter les signalements et litiges dans les meilleurs délais.</li>
        </ul>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>DEM ne peut être tenu responsable de :</p>
        <ul style={{ paddingLeft: 20 }}>
          <li>La qualité ou le comportement des drivers indépendants.</li>
          <li>Les dommages causés lors d'une livraison (marchandise, accidents, retards).</li>
          <li>L'indisponibilité temporaire du service pour maintenance ou force majeure.</li>
        </ul>
      </>
    ),
  },
  {
    title: '7. Paiements et tarification',
    content: (
      <ul style={{ paddingLeft: 20 }}>
        <li>Les tarifs sont affichés avant confirmation de la commande.</li>
        <li>Le paiement est traité via les moyens intégrés à la plateforme.</li>
        <li>Les remboursements sont soumis à l'examen de l'équipe DEM en cas de litige justifié.</li>
      </ul>
    ),
  },
  {
    title: '8. Évaluations et avis',
    content: (
      <p>Les clients peuvent noter les drivers après chaque course. Les avis doivent être honnêtes et non diffamatoires. DEM se réserve le droit de supprimer tout avis contraire à ces conditions.</p>
    ),
  },
  {
    title: '9. Suspension et résiliation',
    content: (
      <>
        <p>DEM peut suspendre ou supprimer tout compte qui viole les présentes conditions, sans préavis, en cas de comportement frauduleux, abusif ou dangereux.</p>
        <p style={{ marginTop: 10 }}>Vous pouvez supprimer votre compte à tout moment depuis <strong>Profil → Compte → Supprimer mon compte</strong>.</p>
      </>
    ),
  },
  {
    title: '10. Propriété intellectuelle',
    content: (
      <p>L'application DEM, son logo, son design et son contenu sont la propriété exclusive de DEM. Toute reproduction ou utilisation sans autorisation préalable écrite est interdite.</p>
    ),
  },
  {
    title: '11. Droit applicable',
    content: (
      <p>Les présentes conditions sont régies par le droit sénégalais. Tout litige sera soumis à la juridiction compétente de Dakar, Sénégal.</p>
    ),
  },
  {
    title: '12. Modifications',
    content: (
      <p>DEM se réserve le droit de modifier ces conditions à tout moment. Les modifications importantes seront notifiées via l'application. La poursuite de l'utilisation après modification vaut acceptation des nouvelles conditions.</p>
    ),
  },
  {
    title: '13. Contact',
    content: (
      <ul style={{ paddingLeft: 20 }}>
        <li>E-mail : <a href="mailto:support@dem.sn" style={{ color: C.cyan }}>support@dem.sn</a></li>
        <li>Adresse : Dakar, Sénégal</li>
      </ul>
    ),
  },
]

export default function Terms() {
  return (
    <div style={{ minHeight: '100vh', background: '#010E18', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #00D2FF 0%, #0086C8 55%, #005A8C 100%)',
        padding: '48px 24px 40px', textAlign: 'center',
      }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, textDecoration: 'none' }}>
          <img src="/logo.png" alt="DEM" style={{ width: 40, height: 40, borderRadius: 10 }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 700, letterSpacing: 1.2 }}>DELIVERY EXPRESS MOBILITY</span>
        </Link>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, color: '#fff', marginBottom: 8 }}>
          Conditions d'utilisation
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Dernière mise à jour : avril 2026</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>
        {sections.map(s => (
          <div key={s.title} style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 15, fontWeight: 700, color: '#fff',
              borderLeft: `3px solid ${C.cyan}`, paddingLeft: 12, marginBottom: 14,
            }}>{s.title}</h2>
            <div style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.75)' }}>{s.content}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 24px', textAlign: 'center',
        color: 'rgba(255,255,255,0.35)', fontSize: 13, background: '#010E18',
      }}>
        <p>© {new Date().getFullYear()} DEM — Delivery Express Mobility &nbsp;|&nbsp;
          <Link to="/" style={{ color: C.cyan }}>Retour à l'accueil</Link>
        </p>
      </div>
    </div>
  )
}
