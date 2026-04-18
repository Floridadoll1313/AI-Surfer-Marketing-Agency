/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
<img src="/logo.png" alt="Logo" />

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
import { ArchipelagoMap } from './pages/ArchipelagoMap';
import { Marketplace } from './pages/Marketplace';
import { News } from './pages/News';
import { PromptToolkit } from './pages/PromptToolkit';
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
          <Route path="/chat" element={<MemberChat />} />
          <Route path="/academy" element={<ModuleLibrary />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/studio" element={<AIStudio />} />
          <Route path="/ai-surfer" element={<AISurfer />} />
          <Route path="/supabase-vault" element={<SupabaseVault />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/directory" element={<MemberDirectory />} />
          <Route path="/map" element={<ArchipelagoMap />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/news" element={<News />} />
          <Route path="/toolkit" element={<PromptToolkit />} />
        </Routes>
      </Layout>
    </Router>
  </AuthProvider>
  );
}
