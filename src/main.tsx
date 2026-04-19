import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PricingOverview from './pages/pricing'
import ProductPage from './pages/pricing/[slug]'
import ThankYou from './pages/thank-you'

// Import your global + cinematic styling
import './index.css'
import './styles/cinematic.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/pricing" element={<PricingOverview />} />
        <Route path="/pricing/:slug" element={<ProductPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
