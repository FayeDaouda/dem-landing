import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './tailwind.css'
import ScrollToTop from './utils/ScrollToTop.jsx'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import LaMaison from './pages/LaMaison.jsx'
import Services from './pages/Services.jsx'
import Livreurs from './pages/Livreurs.jsx'
import Entreprises from './pages/Entreprises.jsx'
import Flotte from './pages/Flotte.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './Privacy.jsx'
import Terms from './Terms.jsx'
import DeleteAccount from './DeleteAccount.jsx'
import OrderRequest from './OrderRequest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/la-maison" element={<LaMaison />} />
          <Route path="/services" element={<Services />} />
          <Route path="/livreurs" element={<Livreurs />} />
          <Route path="/entreprises" element={<Entreprises />} />
          <Route path="/flotte" element={<Flotte />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/commander/:merchantId" element={<OrderRequest />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
