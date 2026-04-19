/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { WebBuilds } from './pages/WebBuilds';
import { GameBuilds } from './pages/GameBuilds';
import { Workflows } from './pages/Workflows';
import { Automations } from './pages/Automations';
import { Vault } from './pages/Vault';
import { Memorial } from './pages/Memorial';
import { MemberChat } from './pages/MemberChat';
import { ModuleLibrary } from './pages/ModuleLibrary';
import { AdminDashboard } from './pages/AdminDashboard';
import { AIStudio } from './pages/AIStudio';
import { AISurfer } from './pages/AISurfer';
import { SupabaseVault } from './pages/SupabaseVault';
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import { MemberDirectory } from './pages/MemberDirectory';
import { HatterasMap } from './pages/HatterasMap';
import { Marketplace } from './pages/Marketplace';
import { News } from './pages/News';
import { PromptToolkit } from './pages/PromptToolkit';
import { JoinCollective } from './pages/JoinCollective';
import { SubscriptionGate } from './components/SubscriptionGate';
import { AuthProvider } from './components/AuthProvider';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rodanthe" element={<WebBuilds />} />
          <Route path="/avon" element={<GameBuilds />} />
          <Route path="/buxton" element={<Workflows />} />
          <Route path="/frisco" element={<Automations />} />
          <Route path="/hatteras" element={<Vault />} />
          <Route path="/memorial" element={<Memorial />} />
          <Route path="/join" element={<JoinCollective />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/academy" element={<ModuleLibrary />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Member Protected Routes */}
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
  </AuthProvider>
  );
}
