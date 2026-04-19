import { Routes, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import Members from './Members'
import MembersNotFound from './MembersNotFound'

import AIStudio from './AIStudio'
import AISurfer from './AISurfer'
import AdminDashboard from './AdminDashboard'
import Automations from './Automations'
import Blueprints from './Blueprints'
import CheckoutAI from './CheckoutAI'
import GameBuilds from './GameBuilds'
import HatterasMap from './HatterasMap'
import MemberChat from './MemberChat'
import MemberDirectory from './MemberDirectory'
import ModuleLibrary from './ModuleLibrary'
import Profile from './Profile'
import Progression from './Progression'
import PromptToolkit from './PromptToolkit'
import SupabaseVault from './SupabaseVault'
import ToolLoader from './ToolLoader'
import Tools from './Tools'
import Vault from './Vault'
import WebBuilds from './WebBuilds'
import Workflows from './Workflows'

export default function MembersRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="members" element={<Members />} />

      <Route path="ai-studio" element={<AIStudio />} />
      <Route path="ai-surfer" element={<AISurfer />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="automations" element={<Automations />} />
      <Route path="blueprints" element={<Blueprints />} />
      <Route path="checkout-ai" element={<CheckoutAI />} />
      <Route path="game-builds" element={<GameBuilds />} />
      <Route path="hatteras-map" element={<HatterasMap />} />
      <Route path="chat" element={<MemberChat />} />
      <Route path="directory" element={<MemberDirectory />} />
      <Route path="modules" element={<ModuleLibrary />} />
      <Route path="profile" element={<Profile />} />
      <Route path="progression" element={<Progression />} />
      <Route path="prompts" element={<PromptToolkit />} />
      <Route path="supabase-vault" element={<SupabaseVault />} />
      <Route path="loader" element={<ToolLoader />} />
      <Route path="tools" element={<Tools />} />
      <Route path="vault" element={<Vault />} />
      <Route path="web-builds" element={<WebBuilds />} />
      <Route path="workflows" element={<Workflows />} />

      {/* Catch-all */}
      <Route path="*" element={<MembersNotFound />} />
    </Routes>
  )
}
