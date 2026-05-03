import React from "react";
import { Zap, Waves, Sparkles } from "lucide-react";

export default function Services() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          Services
        </h1>
        <p className="text-slate-400 max-w-2xl">
          A stacked lineup of cinematic systems, built for founders who want
          their brand to feel like a mythic signal in the dark.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <Zap className="text-neon-cyan mb-3" />
            <h2 className="font-bold mb-2">Dawn Patrol</h2>
            <p className="text-sm text-slate-400">
              Starter cinematic identity, landing page, and AI‑assisted content.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <Waves className="text-neon-pink mb-3" />
            <h2 className="font-bold mb-2">Breakline</h2>
            <p className="text-sm text-slate-400">
              Multi‑page experience, automations, and content engine tuned to your voice.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-white/10">
            <Sparkles className="text-neon-green mb-3" />
            <h2 className="font-bold mb-2">Hatteras Island</h2>
            <p className="text-sm text-slate-400">
              Ongoing retainer, live experiments, and evolving mythic brand systems.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}