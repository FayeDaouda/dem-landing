import { useState } from 'react'

const S = {
  // Layout
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 32px',
    background: 'rgba(10,15,30,0.85)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(0,210,255,0.1)',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  logoMark: {
    width: 38, height: 38, borderRadius: 10,
    background: 'linear-gradient(135deg, #00D2FF, #0086C8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 900, fontSize: 16, color: '#fff', letterSpacing: '-0.5px',
  },
  logoText: { fontWeight: 800, fontSize: 18, color: '#fff' },
  logoSub: { fontSize: 10, color: '#00D2FF', fontWeight: 600, letterSpacing: 1, marginTop: -2 },
  navLinks: { display: 'flex', gap: 32, listStyle: 'none' },
  navLink: { color: '#94A3B8', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'color .2s' },
  navCta: {
    background: 'linear-gradient(135deg, #00D2FF, #0086C8)',
    color: '#fff', border: 'none', borderRadius: 10,
    padding: '9px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
  },

  // Hero
  hero: {
    minHeight: '100vh',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column', textAlign: 'center',
    padding: '120px 24px 80px',
    background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,210,255,0.12) 0%, transparent 70%)',
    position: 'relative', overflow: 'hidden',
  },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    background: 'rgba(0,210,255,0.1)', border: '1px solid rgba(0,210,255,0.25)',
    borderRadius: 100, padding: '6px 16px', marginBottom: 28,
    fontSize: 12, fontWeight: 600, color: '#00D2FF', letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
    fontWeight: 900, lineHeight: 1.1, marginBottom: 20,
    maxWidth: 700,
  },
  heroGrad: {
    background: 'linear-gradient(135deg, #00D2FF, #00E676)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
  },
  heroSub: {
    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
    color: '#94A3B8', maxWidth: 520, marginBottom: 44,
  },
  heroBtns: { display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 56 },
  btnPrimary: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'linear-gradient(135deg, #00D2FF, #0086C8)',
    color: '#fff', border: 'none', borderRadius: 14,
    padding: '14px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(0,210,255,0.3)',
  },
  btnSecondary: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
    color: '#fff', borderRadius: 14,
    padding: '14px 26px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
  },
  heroStats: {
    display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center',
  },
  statItem: { textAlign: 'center' },
  statNum: { fontSize: 28, fontWeight: 900, color: '#00D2FF' },
  statLabel: { fontSize: 12, color: '#64748B', fontWeight: 500, marginTop: 2 },

  // Sections
  section: { padding: '96px 24px' },
  sectionCenter: { padding: '96px 24px', textAlign: 'center' },
  container: { maxWidth: 1100, margin: '0 auto' },
  sectionTag: {
    display: 'inline-block',
    background: 'rgba(0,210,255,0.1)', border: '1px solid rgba(0,210,255,0.2)',
    color: '#00D2FF', borderRadius: 100, padding: '4px 14px',
    fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase',
  },
  sectionTitle: { fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, marginBottom: 14 },
  sectionDesc: { color: '#94A3B8', fontSize: 16, maxWidth: 560, margin: '0 auto 56px' },

  // Features grid
  grid3: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20,
  },
  card: {
    background: '#111827', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 20, padding: 28,
    transition: 'border-color .2s, transform .2s',
  },
  cardIcon: {
    width: 52, height: 52, borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, marginBottom: 16,
    background: 'rgba(0,210,255,0.1)',
  },
  cardTitle: { fontWeight: 700, fontSize: 17, marginBottom: 8 },
  cardDesc: { color: '#94A3B8', fontSize: 14, lineHeight: 1.6 },

  // Steps
  stepsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginTop: 12,
  },
  stepCard: {
    background: '#111827', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 20, padding: '28px 24px', position: 'relative',
  },
  stepNum: {
    width: 40, height: 40, borderRadius: 12,
    background: 'linear-gradient(135deg, #00D2FF, #0086C8)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 900, fontSize: 16, color: '#fff', marginBottom: 16,
  },
  stepTitle: { fontWeight: 700, fontSize: 16, marginBottom: 6 },
  stepDesc: { color: '#94A3B8', fontSize: 13, lineHeight: 1.6 },

  // Tabs
  tabs: { display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 40 },
  tab: {
    padding: '10px 24px', borderRadius: 100, fontWeight: 600, fontSize: 14,
    cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent', color: '#64748B', transition: 'all .2s',
  },
  tabActive: {
    background: 'linear-gradient(135deg, #00D2FF, #0086C8)',
    border: '1px solid transparent', color: '#fff',
  },

  // Download
  downloadSection: {
    padding: '96px 24px',
    background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,210,255,0.08) 0%, transparent 70%)',
  },
  downloadBox: {
    maxWidth: 700, margin: '0 auto', textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(0,210,255,0.1), rgba(0,134,200,0.1))',
    border: '1px solid rgba(0,210,255,0.2)', borderRadius: 28, padding: '56px 32px',
  },
  storeBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 12,
    background: '#0F1628', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 14, padding: '12px 24px', cursor: 'pointer',
    transition: 'border-color .2s',
  },
  storeBtnIcon: { fontSize: 28 },
  storeBtnText: { textAlign: 'left' },
  storeBtnSub: { fontSize: 10, color: '#64748B', fontWeight: 500 },
  storeBtnTitle: { fontSize: 15, fontWeight: 700, color: '#fff', marginTop: 1 },

  // Footer
  footer: {
    borderTop: '1px solid rgba(255,255,255,0.07)',
    padding: '40px 24px',
    textAlign: 'center',
    color: '#475569', fontSize: 13,
  },
  footerLinks: {
    display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap',
    marginBottom: 20,
  },
  footerLink: { color: '#64748B', fontSize: 13, fontWeight: 500 },

  // Divider
  divider: {
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(0,210,255,0.2), transparent)',
    margin: '0 auto', maxWidth: 800,
  },
}

const features = [
  { icon: '⚡', title: 'Livraison ultra-rapide', desc: 'Nos livreurs à moto sont proches de vous. Votre colis arrive en quelques minutes.' },
  { icon: '📍', title: 'Suivi en temps réel', desc: 'Suivez votre livreur sur la carte en direct, de la prise en charge jusqu\'à la livraison.' },
  { icon: '💳', title: 'Paiement simple', desc: 'Payez facilement via Mobile Money ou en espèces. Simple et sécurisé.' },
  { icon: '🛡️', title: 'Livreurs vérifiés', desc: 'Chaque livreur est identifié et validé avant de rejoindre la plateforme DEM.' },
  { icon: '🔔', title: 'Notifications instant', desc: 'Recevez des alertes à chaque étape de votre livraison directement sur votre téléphone.' },
  { icon: '🌍', title: 'Couverture locale', desc: 'DEM couvre Dakar et ses environs, avec une expansion en cours dans d\'autres villes.' },
]

const clientSteps = [
  { title: 'Créez votre commande', desc: 'Indiquez l\'adresse de départ et d\'arrivée directement sur la carte.' },
  { title: 'Un livreur accepte', desc: 'Un livreur proche de vous accepte votre commande en quelques secondes.' },
  { title: 'Suivez et recevez', desc: 'Suivez votre livreur en temps réel et recevez votre colis.' },
]

const driverSteps = [
  { title: 'Inscrivez-vous', desc: 'Créez votre compte livreur avec vos informations et votre véhicule.' },
  { title: 'Acceptez des courses', desc: 'Activez votre disponibilité et recevez des courses près de vous.' },
  { title: 'Gagnez de l\'argent', desc: 'Effectuez les livraisons et recevez vos revenus directement.' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('client')

  const steps = activeTab === 'client' ? clientSteps : driverSteps

  return (
    <>
      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.logo}>
          <div style={S.logoMark}>D</div>
          <div>
            <div style={S.logoText}>DEM</div>
            <div style={S.logoSub}>DELIVERY EXPRESS MOBILITY</div>
          </div>
        </div>
        <ul style={S.navLinks}>
          {['Fonctionnalités', 'Comment ça marche', 'Télécharger'].map(l => (
            <li key={l}><a style={S.navLink} href={`#${l.toLowerCase().replace(/\s/g, '-').replace(/[àâ]/g,'a').replace('é','e').replace('ç','c')}`}>{l}</a></li>
          ))}
        </ul>
        <button style={S.navCta} onClick={() => window.open('mailto:contact@dem.sn')}>Contact</button>
      </nav>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroBadge}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E676', display: 'inline-block' }} />
          Disponible maintenant à Dakar
        </div>
        <h1 style={S.heroTitle}>
          <span style={S.heroGrad}>Livraison express,</span>
          <br />partout au Sénégal
        </h1>
        <p style={S.heroSub}>
          DEM connecte clients et livreurs pour des livraisons rapides, fiables et traçables. Commandez en un instant, recevez en quelques minutes.
        </p>
        <div style={S.heroBtns}>
          <button style={S.btnPrimary}>
            <span>📱</span> Télécharger l'app
          </button>
          <button style={S.btnSecondary} onClick={() => document.getElementById('comment-ca-marche').scrollIntoView({ behavior: 'smooth' })}>
            <span>▶</span> Comment ça marche
          </button>
        </div>
        <div style={S.heroStats}>
          {[['Rapide', 'Livraison en minutes'], ['Fiable', 'Livreurs vérifiés'], ['Local', 'Sénégal d\'abord']].map(([n, l]) => (
            <div key={n} style={S.statItem}>
              <div style={S.statNum}>{n}</div>
              <div style={S.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={S.divider} />

      {/* FEATURES */}
      <section id="fonctionnalités" style={S.section}>
        <div style={S.container}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={S.sectionTag}>Fonctionnalités</span>
            <h2 style={S.sectionTitle}>Tout ce qu'il vous faut</h2>
            <p style={{ ...S.sectionDesc, margin: '0 auto' }}>Une expérience de livraison pensée pour le Sénégal, simple et efficace.</p>
          </div>
          <div style={S.grid3}>
            {features.map(f => (
              <div key={f.title} style={S.card}>
                <div style={S.cardIcon}>{f.icon}</div>
                <div style={S.cardTitle}>{f.title}</div>
                <div style={S.cardDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* HOW IT WORKS */}
      <section id="comment-ca-marche" style={S.sectionCenter}>
        <div style={S.container}>
          <span style={S.sectionTag}>Comment ça marche</span>
          <h2 style={S.sectionTitle}>Simple en 3 étapes</h2>
          <p style={S.sectionDesc}>Que vous soyez client ou livreur, DEM est fait pour vous.</p>

          <div style={S.tabs}>
            <button
              style={{ ...S.tab, ...(activeTab === 'client' ? S.tabActive : {}) }}
              onClick={() => setActiveTab('client')}
            >Je suis client</button>
            <button
              style={{ ...S.tab, ...(activeTab === 'driver' ? S.tabActive : {}) }}
              onClick={() => setActiveTab('driver')}
            >Je suis livreur</button>
          </div>

          <div style={S.stepsGrid}>
            {steps.map((s, i) => (
              <div key={s.title} style={S.stepCard}>
                <div style={S.stepNum}>{i + 1}</div>
                <div style={S.stepTitle}>{s.title}</div>
                <div style={S.stepDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={S.divider} />

      {/* DOWNLOAD */}
      <section id="télécharger" style={S.downloadSection}>
        <div style={S.downloadBox}>
          <span style={S.sectionTag}>Application mobile</span>
          <h2 style={{ ...S.sectionTitle, marginBottom: 12 }}>Téléchargez DEM</h2>
          <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 36 }}>
            Disponible bientôt sur iOS et Android. Soyez parmi les premiers à l'utiliser.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={S.storeBtn}>
              <span style={S.storeBtnIcon}>🤖</span>
              <div style={S.storeBtnText}>
                <div style={S.storeBtnSub}>BIENTÔT SUR</div>
                <div style={S.storeBtnTitle}>Google Play</div>
              </div>
            </div>
            <div style={S.storeBtn}>
              <span style={S.storeBtnIcon}>🍎</span>
              <div style={S.storeBtnText}>
                <div style={S.storeBtnSub}>BIENTÔT SUR</div>
                <div style={S.storeBtnTitle}>App Store</div>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 28, fontSize: 13, color: '#475569' }}>
            Vous êtes livreur ?{' '}
            <a href="mailto:contact@dem.sn" style={{ color: '#00D2FF', fontWeight: 600 }}>Rejoignez la flotte →</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerLinks}>
          <a href="https://admin.dem.sn" style={S.footerLink}>Administration</a>
          <a href="/privacy" style={S.footerLink}>Politique de confidentialité</a>
          <a href="mailto:contact@dem.sn" style={S.footerLink}>Contact</a>
        </div>
        <p>© {new Date().getFullYear()} DEM — Delivery Express Mobility. Tous droits réservés.</p>
      </footer>
    </>
  )
}
