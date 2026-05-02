import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

// Core Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Members from "./pages/Members";

// Feature Pages
import Marketplace from "./pages/Marketplace";
import News from "./pages/News";
import Memorial from "./pages/Memorial";
import JoinCollective from "./pages/JoinCollective";

// System Pages
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import ThankYou from "./pages/thank-you";

// Pricing
import PricingIndex from "./pages/pricing/index";
import PricingDetail from "./pages/pricing/[slug]";

// Worldbuilding
import ArchipelagoMap from "./pages/ArchipelagoMap";
import Lore from "./pages/Lore";

// Admin
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  return (
    <Router>
      {/* Global Header with Logo + Nav */}
      <Header />

      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/members" element={<Members />} />

        {/* Feature Pages */}
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/news" element={<News />} />
        <Route path="/memorial" element={<Memorial />} />
        <Route path="/join" element={<JoinCollective />} />

        {/* System Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/success" element={<Success />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Pricing */}
        <Route path="/pricing" element={<PricingIndex />} />
        <Route path="/pricing/:slug" element={<PricingDetail />} />

        {/* Worldbuilding */}
        <Route path="/map" element={<ArchipelagoMap />} />
        <Route path="/lore" element={<Lore />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
