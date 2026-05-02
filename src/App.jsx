<img
  src="/logo.png"
  alt="Ocean Tide Drop Logo"
  className="w-32 md:w-40 lg:w-48 max-w-full h-auto mx-auto block"
/>

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";

<Route path="/admin" element={<AdminDashboard />} />

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Members from "./pages/Members";
import Marketplace from "./pages/Marketplace";
import News from "./pages/News";
import Memorial from "./pages/Memorial";
import JoinCollective from "./pages/JoinCollective";
import Dashboard from "./pages/Dashboard";
import Success from "./pages/Success";
import ThankYou from "./pages/thank-you";
import PricingIndex from "./pages/pricing/index";
import PricingDetail from "./pages/pricing/[slug]";
import ArchipelagoMap from "./pages/ArchipelagoMap";
import Lore from "./pages/Lore";

export default function App() {
  return (
    <Router>
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

      </Routes>
    </Router>
  );
}
