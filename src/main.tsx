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
