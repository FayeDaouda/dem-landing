import { Link } from 'react-router-dom'

const C = {
  cyan: '#00D2FF',
  cyan2: '#0086C8',
}

const sections = [
  {
    title: '1. Qui sommes-nous ?',
    content: (
      <p>DEM (Delivery Express Mobility) est une application mobile de mise en relation entre clients et livreurs/chauffeurs au Sénégal. Nous nous engageons à protéger vos données personnelles conformément aux lois applicables.</p>
    ),
  },
  {
    title: '2. Données collectées',
    content: (
      <>
        <p style={{ fontWeight: 600, marginBottom: 10 }}>2.1 Données fournies par l'utilisateur</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 20 }}>
            <thead>
              <tr style={{ background: 'rgba(0,210,255,0.15)' }}>
                {['Donnée', 'Utilisateurs', 'Finalité'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(0,210,255,0.2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Numéro de téléphone', 'Clients, Drivers', 'Authentification par code OTP'],
                ['Nom complet', 'Drivers', 'Identification sur la plateforme'],
                ['Photo de profil', 'Drivers', 'Affichage dans l\'application'],
                ['Numéro de plaque', 'Drivers', 'Vérification du véhicule'],
                ['Photo carte d\'identité', 'Drivers', 'Vérification d\'identité'],
                ['Photo permis de conduire', 'Drivers', 'Vérification des qualifications'],
              ].map(([d, u, f], i) => (
                <tr key={d} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>{d}</td>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>{u}</td>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontWeight: 600, marginBottom: 10 }}>2.2 Données collectées automatiquement</p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'rgba(0,210,255,0.15)' }}>
                {['Donnée', 'Utilisateurs', 'Finalité'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(0,210,255,0.2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Localisation GPS précise', 'Clients, Drivers', 'Mise en relation, suivi en temps réel'],
                ['Localisation en arrière-plan', 'Drivers uniquement', 'Suivi de course lorsque l\'app est en arrière-plan'],
                ['Historique des courses', 'Clients, Drivers', 'Facturation, litiges, statistiques'],
              ].map(([d, u, f], i) => (
                <tr key={d} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>{d}</td>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>{u}</td>
                  <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>{f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    title: '3. Utilisation des données',
    content: (
      <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['Authentification :', 'votre numéro sert uniquement à l\'envoi du code OTP. Il n\'est pas partagé à des fins commerciales.'],
          ['Mise en relation :', 'votre position GPS est partagée en temps réel entre client et driver pendant une course active uniquement.'],
          ['Vérification des drivers :', 'les documents d\'identité sont examinés par notre équipe et ne sont pas partagés avec des tiers.'],
          ['Amélioration du service :', 'l\'historique est utilisé pour les paiements, les statistiques et la résolution de litiges.'],
        ].map(([k, v]) => (
          <li key={k}><strong style={{ color: '#fff' }}>{k}</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>{v}</span></li>
        ))}
      </ul>
    ),
  },
  {
    title: '4. Partage des données',
    content: (
      <>
        <p style={{ marginBottom: 10 }}>Nous ne vendons pas vos données personnelles. Elles peuvent être partagées avec :</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Les autres utilisateurs :', 'nom et position pendant une course active uniquement.'],
            ['Nos prestataires techniques :', 'hébergement Render.com, base de données PostgreSQL, service SMS OTP (Africa\'s Talking).'],
            ['Les autorités compétentes :', 'uniquement sur obligation légale.'],
          ].map(([k, v]) => (
            <li key={k}><strong style={{ color: '#fff' }}>{k}</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>{v}</span></li>
          ))}
        </ul>
      </>
    ),
  },
  {
    title: '5. Localisation en arrière-plan',
    content: (
      <p>L'application DEM utilise la localisation GPS <strong style={{ color: '#fff' }}>en arrière-plan uniquement pour les drivers</strong> lorsqu'une course est active, afin de permettre le suivi en temps réel par le client et la navigation assistée. La collecte s'arrête automatiquement à la fin de la course. Elle n'est <strong style={{ color: '#fff' }}>jamais activée pour les clients</strong>.</p>
    ),
  },
  {
    title: '6. Conservation des données',
    content: (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'rgba(0,210,255,0.15)' }}>
              {['Donnée', 'Durée'].map(h => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: '#fff', borderBottom: '1px solid rgba(0,210,255,0.2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Compte utilisateur', 'Jusqu\'à la suppression du compte'],
              ['Historique des courses', '2 ans après la dernière course'],
              ['Documents d\'identité', 'Supprimés sous 30 jours après refus ou suppression'],
              ['Logs techniques', '90 jours'],
            ].map(([d, dur], i) => (
              <tr key={d} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#fff' }}>{d}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>{dur}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    title: '7. Vos droits',
    content: (
      <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          ['Accéder', 'à vos données personnelles'],
          ['Rectifier', 'vos informations (via l\'application ou par e-mail)'],
          ['Supprimer', 'votre compte et toutes vos données'],
          ['Vous opposer', 'au traitement de vos données'],
          ['Portabilité', 'de vos données sur demande'],
        ].map(([k, v]) => (
          <li key={k}><strong style={{ color: '#fff' }}>{k}</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>{v}</span></li>
        ))}
      </ul>
    ),
  },
  {
    title: '8. Suppression du compte',
    content: (
      <p>Vous pouvez supprimer votre compte à tout moment depuis l'application :<br />
        <strong style={{ color: C.cyan }}>Profil → Compte → Supprimer mon compte</strong><br /><br />
        <span style={{ color: 'rgba(255,255,255,0.7)' }}>La suppression est immédiate et irréversible. Elle entraîne la suppression de votre profil, vos documents et votre historique de courses.</span>
      </p>
    ),
  },
  {
    title: '9. Sécurité',
    content: (
      <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          'Toutes les communications sont chiffrées (HTTPS/TLS).',
          'Les tokens d\'authentification JWT sont stockés localement sur votre appareil.',
          'Les mots de passe administrateurs sont hashés (bcrypt).',
          'L\'accès aux données est restreint au personnel autorisé.',
        ].map(t => <li key={t} style={{ color: 'rgba(255,255,255,0.7)' }}>{t}</li>)}
      </ul>
    ),
  },
  {
    title: '10. Mineurs',
    content: <p>L'application DEM est réservée aux personnes âgées de <strong style={{ color: '#fff' }}>18 ans et plus</strong>. Nous ne collectons pas sciemment de données concernant des mineurs.</p>,
  },
  {
    title: '11. Modifications',
    content: <p>Nous pouvons mettre à jour cette politique. En cas de modification importante, vous serez informé via l'application. La date de dernière mise à jour figure en haut de ce document.</p>,
  },
  {
    title: '12. Contact',
    content: (
      <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <li style={{ color: 'rgba(255,255,255,0.7)' }}>E-mail : <a href="mailto:privacy@dem.sn" style={{ color: C.cyan }}>privacy@dem.sn</a></li>
        <li style={{ color: 'rgba(255,255,255,0.7)' }}>Adresse : Dakar, Sénégal</li>
      </ul>
    ),
  },
]

export default function Privacy() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: '#021520', color: 'rgba(255,255,255,0.75)', minHeight: '100vh' }}>
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
          Politique de confidentialité
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
            <div style={{ fontSize: 14, lineHeight: 1.75 }}>{s.content}</div>
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
