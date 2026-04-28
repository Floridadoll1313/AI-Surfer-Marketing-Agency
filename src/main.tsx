import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* PUBLIC PAGES */
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Members from './pages/Members'          // NEW — Stripe Pricing Table
import Memorial from './pages/Memorial'        // NEW — Bulls page
import Marketplace from './pages/Marketplace'
import News from './pages/News'
import Success from './pages/Success'
import ThankYou from './pages/thank-you'

/* PRICING SYSTEM */
import PricingOverview from './pages/pricing'
import ProductPage from './pages/pricing/[slug]'

/* MEMBERS AREA */
import MembersRouter from './pages/members/MembersRouter'
import ProtectedRoute from './lib/ProtectedRoute'

/* GLOBAL STYLES */
import './index.css'
import './styles/cinematic.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/members" element={<Members />} />       {/* Stripe Pricing Table */}
        <Route path="/bulls" element={<Memorial />} />        {/* Bull Memorial Page */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/news" element={<News />} />
        <Route path="/success" element={<Success />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Pricing System */}
        <Route path="/pricing" element={<PricingOverview />} />
        <Route path="/pricing/:slug" element={<ProductPage />} />

        {/* Members Area (Protected) */}
        <Route
          path="/members/*"
          element={
            <ProtectedRoute>
              <MembersRouter />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
