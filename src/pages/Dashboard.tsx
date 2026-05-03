import React from "react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-black tracking-tight">
          AI Surfer Console
        </h1>
        <p className="text-slate-400 max-w-2xl">
          This is where the currents, campaigns, and experiments get monitored.
          A living control room for your mythic brand.
        </p>
        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <p className="text-slate-400 text-sm">
            Plug in analytics, content queues, and automations here when you’re
            ready to wire the full system.
          </p>
        </div>
      </div>
    </main>
  );
}