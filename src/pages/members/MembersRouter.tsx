import { Routes, Route } from 'react-router-dom'

import Dashboard from './Dashboard'
import MemberChat from './MemberChat'
import MemberDirectory from './MemberDirectory'
import Memorial from './Memorial'
import ModuleLibrary from './ModuleLibrary'
import Profile from './Profile'
import Progression from './Progression'
import PromptToolkit from './PromptToolkit'
import SupabaseVault from './SupabaseVault'
import Vault from './Vault'
import WebBuilds from './WebBuilds'
import Workflows from './Workflows'
import Helpers from './Helpers'
import CheckoutAI from './CheckoutAI'

export default function MembersRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="chat" element={<MemberChat />} />
      <Route path="directory" element={<MemberDirectory />} />
      <Route path="memorial" element={<Memorial />} />
      <Route path="modules" element={<ModuleLibrary />} />
      <Route path="profile" element={<Profile />} />
      <Route path="progression" element={<Progression />} />
      <Route path="prompts" element={<PromptToolkit />} />
      <Route path="supabase-vault" element={<SupabaseVault />} />
      <Route path="vault" element={<Vault />} />
      <Route path="web-builds" element={<WebBuilds />} />
      <Route path="workflows" element={<Workflows />} />
      <Route path="helpers" element={<Helpers />} />
      <Route path="checkout-ai" element={<CheckoutAI />} />
    </Routes>
  )
}
