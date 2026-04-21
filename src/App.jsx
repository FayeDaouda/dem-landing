import { useState } from 'react'

const C = {
  cyan:  '#00D2FF',
  cyan2: '#0086C8',
  teal:  '#00897B',
  dark:  '#021520',
  card:  'rgba(255,255,255,0.08)',
  cardB: 'rgba(255,255,255,0.13)',
  text:  '#FFFFFF',
  muted: 'rgba(255,255,255,0.65)',
  grad:  'linear-gradient(160deg, #00D2FF 0%, #0086C8 55%, #005A8C 100%)',
  gradDark: 'linear-gradient(160deg, #004D66 0%, #002D45 55%, #001830 100%)',
}

const features = [
  { icon: '⚡', title: 'Livraison ultra-rapide', desc: 'Nos livreurs à moto sont proches de vous. Votre colis arrive en quelques minutes.' },
  { icon: '📍', title: 'Suivi en temps réel', desc: 'Suivez votre livreur sur la carte en direct, de la prise en charge jusqu\'à la livraison.' },
  { icon: '💳', title: 'Paiement simple', desc: 'Payez via Mobile Money ou en espèces. Simple et sécurisé.' },
  { icon: '🛡️', title: 'Livreurs vérifiés', desc: 'Chaque livreur est identifié et validé avant de rejoindre la plateforme DEM.' },
  { icon: '🔔', title: 'Notifications instant', desc: 'Recevez des alertes à chaque étape de votre livraison.' },
  { icon: '🌍', title: 'Couverture locale', desc: 'DEM couvre Dakar et ses environs, expansion en cours.' },
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
  const [menuOpen, setMenuOpen] = useState(false)
  const steps = activeTab === 'client' ? clientSteps : driverSteps

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.dark, color: C.text, overflowX: 'hidden' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        a { color: inherit; text-decoration: none; }

        .nav-link:hover { color: #fff !important; }
        .card-hover:hover { border-color: rgba(0,210,255,0.4) !important; transform: translateY(-3px); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,210,255,0.45) !important; }
        .btn-secondary:hover { background: rgba(255,255,255,0.12) !important; }
        .store-btn:hover { border-color: rgba(0,210,255,0.5) !important; }
        .footer-link:hover { color: #fff !important; }

        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-title { font-size: 2rem !important; }
          .hero-stats { gap: 24px !important; }
          .section-pad { padding: 64px 20px !important; }
          .grid3 { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .store-btns { flex-direction: column !important; align-items: center !important; }
          .footer-links { gap: 16px !important; }
          .download-box { padding: 36px 20px !important; }
          .phone-mockup { display: none !important; }
          .hero-inner { flex-direction: column !important; text-align: center !important; }
          .hero-text { max-width: 100% !important; }
          .hero-btns { justify-content: center !important; }
        }

        @media (min-width: 769px) {
          .hamburger { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 32px',
        background: 'rgba(0,21,32,0.88)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0,210,255,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.png" alt="DEM" style={{ width: 40, height: 40, borderRadius: 10, objectFit: 'cover' }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.3px' }}>DEM</div>
            <div style={{ fontSize: 9, color: C.cyan, fontWeight: 600, letterSpacing: 1 }}>DELIVERY EXPRESS MOBILITY</div>
          </div>
        </div>

        <ul className="nav-links" style={{ display: 'flex', gap: 28, listStyle: 'none' }}>
          {[['Fonctionnalités','features'],['Comment ça marche','how'],['Télécharger','download']].map(([l,id]) => (
            <li key={id}>
              <span className="nav-link" onClick={() => scrollTo(id)}
                style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'color .2s' }}>
                {l}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a href="https://admin.dem.sn" className="nav-cta-desktop"
            style={{
              background: 'rgba(0,210,255,0.12)', border: '1px solid rgba(0,210,255,0.3)',
              color: C.cyan, borderRadius: 10, padding: '8px 16px',
              fontWeight: 600, fontSize: 12, cursor: 'pointer',
            }}>Admin ↗</a>
          <button className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', display: 'none' }}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed', top: 65, left: 0, right: 0, zIndex: 99,
          background: 'rgba(0,21,32,0.97)', borderBottom: '1px solid rgba(0,210,255,0.15)',
          padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {[['Fonctionnalités','features'],['Comment ça marche','how'],['Télécharger','download']].map(([l,id]) => (
            <span key={id} onClick={() => scrollTo(id)}
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: 500, cursor: 'pointer', padding: '6px 0' }}>
              {l}
            </span>
          ))}
          <a href="https://admin.dem.sn"
            style={{ color: C.cyan, fontSize: 14, fontWeight: 600, padding: '6px 0' }}>
            Administration ↗
          </a>
        </div>
      )}

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        background: C.grad,
        display: 'flex', alignItems: 'center',
        padding: '100px 32px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Déco arrière-plan */}
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -150, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(0,0,0,0.1)', pointerEvents: 'none' }} />

        <div className="hero-inner" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48 }}>
          {/* Texte */}
          <div className="hero-text" style={{ maxWidth: 560 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.15)', borderRadius: 100, padding: '6px 16px',
              marginBottom: 24, fontSize: 12, fontWeight: 600, letterSpacing: 0.5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FF88', display: 'inline-block' }} />
              Disponible maintenant à Dakar
            </div>

            <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 18 }}>
              Livraison express,<br />
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>partout au Sénégal</span>
            </h1>

            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', marginBottom: 36, lineHeight: 1.7 }}>
              DEM connecte clients et livreurs pour des livraisons rapides, fiables et traçables. Commandez en un instant, recevez en quelques minutes.
            </p>

            <div className="hero-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
              <button className="btn-primary" onClick={() => scrollTo('download')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: '#fff', color: C.cyan2, border: 'none', borderRadius: 14,
                  padding: '14px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)', transition: 'all .2s',
                }}>
                <span>📱</span> Télécharger l'app
              </button>
              <button className="btn-secondary" onClick={() => scrollTo('how')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', borderRadius: 14,
                  padding: '14px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                  transition: 'all .2s',
                }}>
                <span>▶</span> Comment ça marche
              </button>
            </div>

            <div className="hero-stats" style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
              {[['Rapide', 'Livraison en minutes'], ['Fiable', 'Livreurs vérifiés'], ['Local', 'Sénégal d\'abord']].map(([n, l]) => (
                <div key={n}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 500, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="phone-mockup" style={{ flexShrink: 0 }}>
            <div style={{
              width: 240, height: 480,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 36,
              border: '2px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: 16, gap: 12,
              boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
              position: 'relative',
            }}>
              <div style={{ width: 60, height: 5, background: 'rgba(255,255,255,0.4)', borderRadius: 3 }} />
              <img src="/logo.png" alt="DEM" style={{ width: 72, height: 72, borderRadius: 18, marginTop: 8 }} />
              <div style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>DEM</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>Delivery Express Mobility</div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 14px', marginTop: 8 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>ADRESSE DE LIVRAISON</div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>Plateau, Dakar</div>
              </div>
              <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '12px 14px' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>LIVREUR EN ROUTE</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🏍</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>Mamadou D.</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>⭐ 4.9 · 3 min</div>
                  </div>
                </div>
              </div>
              <div style={{
                width: '100%', background: '#fff', borderRadius: 14, padding: '13px',
                textAlign: 'center', fontWeight: 800, fontSize: 13, color: C.cyan2, marginTop: 'auto',
              }}>
                Suivre ma livraison →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="section-pad" style={{ padding: '96px 32px', background: C.gradDark }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              display: 'inline-block', background: 'rgba(0,210,255,0.15)', border: '1px solid rgba(0,210,255,0.3)',
              color: C.cyan, borderRadius: 100, padding: '4px 14px',
              fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 14, textTransform: 'uppercase',
            }}>Fonctionnalités</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: 12 }}>Tout ce qu'il vous faut</h2>
            <p style={{ color: C.muted, fontSize: 15, maxWidth: 500, margin: '0 auto' }}>Une expérience pensée pour le Sénégal, simple et efficace.</p>
          </div>
          <div className="grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 18 }}>
            {features.map(f => (
              <div key={f.title} className="card-hover" style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 20, padding: 26, transition: 'all .25s',
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: 14, background: 'rgba(0,210,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 14,
                }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</div>
                <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="section-pad" style={{ padding: '96px 32px', background: C.grad, textAlign: 'center' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.15)', borderRadius: 100, padding: '4px 14px',
            fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 14, textTransform: 'uppercase',
          }}>Comment ça marche</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: 12 }}>Simple en 3 étapes</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 40 }}>Que vous soyez client ou livreur, DEM est fait pour vous.</p>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 40 }}>
            {[['client','Je suis client'],['driver','Je suis livreur']].map(([v,l]) => (
              <button key={v} onClick={() => setActiveTab(v)} style={{
                padding: '10px 24px', borderRadius: 100, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                border: activeTab === v ? '1px solid transparent' : '1px solid rgba(255,255,255,0.25)',
                background: activeTab === v ? '#fff' : 'transparent',
                color: activeTab === v ? C.cyan2 : 'rgba(255,255,255,0.75)',
                transition: 'all .2s',
              }}>{l}</button>
            ))}
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18 }}>
            {steps.map((s, i) => (
              <div key={s.title} style={{
                background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 20, padding: '28px 24px', textAlign: 'left',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 16, color: C.cyan2, marginBottom: 16,
                }}>{i + 1}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ── */}
      <section id="download" className="section-pad" style={{ padding: '96px 32px', background: C.gradDark }}>
        <div className="download-box" style={{
          maxWidth: 680, margin: '0 auto', textAlign: 'center',
          background: 'rgba(0,210,255,0.08)', border: '1px solid rgba(0,210,255,0.2)',
          borderRadius: 28, padding: '56px 32px',
        }}>
          <img src="/logo.png" alt="DEM" style={{ width: 72, height: 72, borderRadius: 18, marginBottom: 20 }} />
          <span style={{
            display: 'inline-block', background: 'rgba(0,210,255,0.15)', border: '1px solid rgba(0,210,255,0.3)',
            color: C.cyan, borderRadius: 100, padding: '4px 14px',
            fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase',
          }}>Application mobile</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: 12 }}>Téléchargez DEM</h2>
          <p style={{ color: C.muted, fontSize: 15, marginBottom: 36 }}>
            Disponible bientôt sur iOS et Android.<br />Soyez parmi les premiers à l'utiliser.
          </p>
          <div className="store-btns" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['🤖','BIENTÔT SUR','Google Play'],['🍎','BIENTÔT SUR','App Store']].map(([icon, sub, title]) => (
              <div key={title} className="store-btn" style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 14, padding: '12px 24px', cursor: 'pointer', transition: 'border-color .2s',
              }}>
                <span style={{ fontSize: 28 }}>{icon}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 500 }}>{sub}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginTop: 1 }}>{title}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 28, fontSize: 13, color: C.muted }}>
            Vous êtes livreur ?{' '}
            <a href="mailto:contact@dem.sn" style={{ color: C.cyan, fontWeight: 600 }}>Rejoignez la flotte →</a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '36px 24px', textAlign: 'center',
        color: 'rgba(255,255,255,0.35)', fontSize: 13,
        background: '#010E18',
      }}>
        <div className="footer-links" style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {[
            ['Politique de confidentialité', '/privacy'],
            ['Contact', 'mailto:contact@dem.sn'],
            ['Administration', 'https://admin.dem.sn'],
          ].map(([l, h]) => (
            <a key={l} href={h} className="footer-link"
              style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: 500, transition: 'color .2s' }}>{l}</a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} DEM — Delivery Express Mobility. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
