// src/main.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PricingOverview from './pages/pricing'
import ProductPage from './pages/pricing/[slug]'
import ThankYou from './pages/thank-you'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/pricing" element={<PricingOverview />} />
      <Route path="/pricing/:slug" element={<ProductPage />} />
      <Route path="/thank-you" element={<ThankYou />} />
    </Routes>
  </BrowserRouter>
)
