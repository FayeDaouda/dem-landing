import { Link } from 'react-router-dom'

const C = {
  cyan: '#00D2FF',
  cyan2: '#0086C8',
}

export default function DeleteAccount() {
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
          Suppression de compte
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Votre droit à l'effacement des données personnelles</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Info box */}
        <div style={{
          background: 'rgba(0,210,255,0.08)',
          border: '1px solid rgba(0,210,255,0.2)',
          borderRadius: 16,
          padding: '24px 28px',
          marginBottom: 36,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            Conformément à la réglementation sur la protection des données, vous pouvez demander la suppression de votre compte et de toutes vos données personnelles à tout moment.
          </p>
        </div>

        {/* Option 1 — Via l'app */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{
            fontSize: 15, fontWeight: 700, color: '#fff',
            borderLeft: `3px solid ${C.cyan}`, paddingLeft: 12, marginBottom: 14,
          }}>Option 1 — Directement depuis l'application</h2>
          <div style={{ fontSize: 14, lineHeight: 1.75 }}>
            <p style={{ marginBottom: 12 }}>La méthode la plus rapide. La suppression est immédiate et irréversible.</p>
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 12,
              padding: '16px 20px',
              fontFamily: 'monospace',
              fontSize: 14,
              color: C.cyan,
              letterSpacing: 0.3,
            }}>
              Profil → Compte → Supprimer mon compte
            </div>
          </div>
        </div>

        {/* Option 2 — Par email */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{
            fontSize: 15, fontWeight: 700, color: '#fff',
            borderLeft: `3px solid ${C.cyan}`, paddingLeft: 12, marginBottom: 14,
          }}>Option 2 — Par e-mail</h2>
          <div style={{ fontSize: 14, lineHeight: 1.75 }}>
            <p style={{ marginBottom: 12 }}>Si vous n'avez plus accès à l'application, envoyez une demande par e-mail :</p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <li><strong style={{ color: '#fff' }}>E-mail :</strong> <a href="mailto:privacy@dem.sn" style={{ color: C.cyan }}>privacy@dem.sn</a></li>
              <li><strong style={{ color: '#fff' }}>Objet :</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>Suppression de mon compte DEM</span></li>
              <li><strong style={{ color: '#fff' }}>Contenu :</strong> <span style={{ color: 'rgba(255,255,255,0.7)' }}>Votre numéro de téléphone enregistré</span></li>
            </ul>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
              Délai de traitement : sous 48 heures ouvrables.
            </p>
          </div>
        </div>

        {/* Ce qui est supprimé */}
        <div style={{ marginBottom: 36 }}>
          <h2 style={{
            fontSize: 15, fontWeight: 700, color: '#fff',
            borderLeft: `3px solid ${C.cyan}`, paddingLeft: 12, marginBottom: 14,
          }}>Ce qui sera supprimé</h2>
          <div style={{ fontSize: 14, lineHeight: 1.75 }}>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Votre profil et informations personnelles',
                'Votre numéro de téléphone',
                'Vos documents d\'identité (drivers)',
                'Votre historique de courses',
                'Votre solde de parrainage',
              ].map(item => (
                <li key={item} style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span style={{ color: C.cyan, marginRight: 8 }}>✓</span>{item}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: 16, color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              Certaines données peuvent être conservées jusqu'à 2 ans pour des obligations légales (litiges, facturation).
            </p>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: '20px 24px',
          fontSize: 14,
        }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)' }}>
            Pour toute question concernant vos données personnelles :{' '}
            <a href="mailto:privacy@dem.sn" style={{ color: C.cyan }}>privacy@dem.sn</a>
          </p>
        </div>

      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 24px', textAlign: 'center',
        color: 'rgba(255,255,255,0.35)', fontSize: 13, background: '#010E18',
      }}>
        <p>© {new Date().getFullYear()} DEM — Delivery Express Mobility &nbsp;|&nbsp;
          <Link to="/" style={{ color: C.cyan }}>Retour à l'accueil</Link>
          &nbsp;|&nbsp;
          <Link to="/privacy" style={{ color: C.cyan }}>Politique de confidentialité</Link>
        </p>
      </div>
    </div>
  )
}
