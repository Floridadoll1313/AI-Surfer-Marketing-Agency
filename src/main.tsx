import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

/* PUBLIC PAGES */
import Home from './pages/Home'
import Services from './pages/Services'
import Contact from './pages/Contact'
import JoinCollective from './pages/JoinCollective'
import Lore from './pages/Lore'
import Marketplace from './pages/Marketplace'
import ArchipelagoMap from './pages/ArchipelagoMap'
import HatterasMap from './pages/HatterasMap'
import GameBuilds from './pages/GameBuilds'
import AISurfer from './pages/AISurfer'
import AIStudio from './pages/AIStudio'
import Automations from './pages/Automations'
import Blueprints from './pages/Blueprints'
import AdminDashboard from './pages/AdminDashboard'
import News from './pages/News'
import WebBuilds from './pages/WebBuilds'

/* PRICING SYSTEM */
import PricingOverview from './pages/pricing'
import ProductPage from './pages/pricing/[slug]'
import ThankYou from './pages/thank-you'

/* MEMBERS AREA */
import MembersRouter from './pages/members/MembersRouter'
import ProtectedRoute from './lib/ProtectedRoute'

/* GLOBAL STYLES */
import './index.css'
import './styles/cinematic.css'

<Routes>

  {/* Public Pages */}
  <Route path="/" element={<Home />} />
  <Route path="/services" element={<Services />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/join" element={<JoinCollective />} />
<Route path="/lore" element={<Lore />} />
  <Route path="/marketplace" element={<Marketplace />} />
  <Route path="/archipelago" element={<ArchipelagoMap />} />
  <Route path="/hatteras" element={<HatterasMap />} />
  <Route path="/game-builds" element={<GameBuilds />} />
  <Route path="/ai-surfer" element={<AISurfer />} />
  <Route path="/ai-studio" element={<AIStudio />} />
  <Route path="/automations" element={<Automations />} />
  <Route path="/blueprints" element={<Blueprints />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/news" element={<News />} />
  <Route path="/web-builds" element={<WebBuilds />} />

  {/* Pricing System */}
  <Route path="/pricing" element={<PricingOverview />} />
  <Route path="/pricing/:slug" element={<ProductPage />} />
  <Route path="/thank-you" element={<ThankYou />} />

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
