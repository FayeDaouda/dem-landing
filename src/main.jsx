import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
          <Route path="/notre-histoire" element={<NotreHistoire />} />
          <Route path="/a-propos" element={<NotreHistoire />} />
          <Route path="/la-maison" element={<NotreHistoire />} />
          <Route path="/services" element={<Services />} />
          <Route path="/coursiers" element={<Coursiers />} />
          <Route path="/livreurs" element={<Coursiers />} />
          <Route path="/dem-pro" element={<DemPro />} />
          <Route path="/dempro" element={<DemPro />} />
          <Route path="/entreprises" element={<DemPro />} />
          <Route path="/chef-de-flotte" element={<ChefDeFlotte />} />
          <Route path="/flotte" element={<ChefDeFlotte />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/commander/:merchantId" element={<OrderRequest />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </StrictMode>
)
