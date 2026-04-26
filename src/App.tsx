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
