import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './tailwind.css'
import ScrollToTop from './utils/ScrollToTop.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import NotreHistoire from './pages/NotreHistoire.jsx'
import Services from './pages/Services.jsx'
import Coursiers from './pages/Coursiers.jsx'
import DemPro from './pages/DemPro.jsx'
import ChefDeFlotte from './pages/ChefDeFlotte.jsx'
import Contact from './pages/Contact.jsx'
import Actualites from './pages/Actualites.jsx'
import Download from './pages/Download.jsx'
import EssaiGratuitDemPro from './pages/EssaiGratuitDemPro.jsx'
import Privacy from './Privacy.jsx'
import Terms from './Terms.jsx'
import DeleteAccount from './DeleteAccount.jsx'
import OrderRequest from './OrderRequest.jsx'
import NotFound from './pages/NotFound.jsx'

// Chargé à la demande : la carte (Leaflet) n'alourdit pas le reste du site
const Tracking = lazy(() => import('./Tracking.jsx'))

// Pages du site : en-tête et pied de page communs.
function SiteLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/notre-histoire" element={<NotreHistoire />} />
          <Route path="/a-propos" element={<NotreHistoire />} />
          <Route path="/la-maison" element={<NotreHistoire />} />
          <Route path="/services" element={<Services />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/news" element={<Actualites />} />
          {/* <Route path="/coursiers" element={<Coursiers />} />
          <Route path="/livreurs" element={<Coursiers />} /> */}
          <Route path="/dem-pro" element={<DemPro />} />
          <Route path="/dempro" element={<DemPro />} />
          <Route path="/entreprises" element={<DemPro />} />
          <Route path="/chef-de-flotte" element={<ChefDeFlotte />} />
          <Route path="/flotte" element={<ChefDeFlotte />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/download" element={<Download />} />
          <Route path="/essai-gratuit-dem-pro" element={<EssaiGratuitDemPro />} />
          <Route path="/essai-gratuit" element={<EssaiGratuitDemPro />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Boutique DEM Pro et suivi de commande : pages plein écran, avec
            leur propre barre (pas l'en-tête ni le pied de page du site). */}
        <Route path="/commander/:merchantId" element={<OrderRequest />} />
        <Route
          path="/suivi/:id"
          element={<Suspense fallback={<div style={{ minHeight: '100vh', background: '#f4f6fa' }} />}><Tracking /></Suspense>}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
