import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Public Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";

// Member System
import SubscriptionGate from "./components/SubscriptionGate";
import MemberChat from "./pages/members/MemberChat";
import AIStudio from "./pages/members/AIStudio";
import AISurfer from "./pages/members/AISurfer";
import SupabaseVault from "./pages/members/SupabaseVault";
import MemberDirectory from "./pages/members/MemberDirectory";
import HatterasMap from "./pages/members/HatterasMap";
import Marketplace from "./pages/members/Marketplace";
import News from "./pages/members/News";
import PromptToolkit from "./pages/members/PromptToolkit";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* MEMBER PROTECTED ROUTES */}
          <Route path="/chat" element={<SubscriptionGate><MemberChat /></SubscriptionGate>} />
          <Route path="/studio" element={<SubscriptionGate><AIStudio /></SubscriptionGate>} />
          <Route path="/ai-surfer" element={<SubscriptionGate><AISurfer /></SubscriptionGate>} />
          <Route path="/supabase-vault" element={<SubscriptionGate><SupabaseVault /></SubscriptionGate>} />
          <Route path="/directory" element={<SubscriptionGate><MemberDirectory /></SubscriptionGate>} />
          <Route path="/map" element={<SubscriptionGate><HatterasMap /></SubscriptionGate>} />
          <Route path="/marketplace" element={<SubscriptionGate><Marketplace /></SubscriptionGate>} />
          <Route path="/news" element={<SubscriptionGate><News /></SubscriptionGate>} />
          <Route path="/toolkit" element={<SubscriptionGate><PromptToolkit /></SubscriptionGate>} />

        </Routes>
      </Layout>
    </Router>
  );
}
