import React from "react";

export default function Pricing() {
  const tiers = [
    {
      name: "Dawn Patrol",
      price: "$97 / month",
      tag: "Starter",
      description:
        "Your cinematic entry point. A clean landing, AI‑assisted content, and your first automated workflows.",
      color: "text-neon-cyan",
    },
    {
      name: "Breakline",
      price: "$197 / month",
      tag: "Growth",
      description:
        "Multi‑page experience, deeper automations, and a tuned content engine that moves with your brand.",
      color: "text-neon-pink",
    },
    {
      name: "Hatteras Island",
      price: "$297 / month",
      tag: "Pro",
      description:
        "High‑touch creative systems, evolving brand identity, and ongoing cinematic refinement.",
      color: "text-neon-green",
    },
    {
      name: "Cape Point",
      price: "$497 / month",
      tag: "Elite",
      description:
        "Full‑stack automation, AI‑driven content pipelines, and mythic brand architecture built for scale.",
      color: "text-neon-cyan",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* PAGE HEADER */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight">
            Choose Your Path
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Four cinematic surf‑themed tiers designed to match your momentum,
            your ambition, and the myth you're building.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col gap-4 hover:border-neon-cyan transition-all"
            >
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                {tier.tag}
              </div>

              <h2 className="text-2xl font-bold">{tier.name}</h2>

              <div className={`${tier.color} text-3xl font-black`}>
                {tier.price}
              </div>

              <p className="text-sm text-slate-400 leading-relaxed">
                {tier.description}
              </p>

              <button
                className="
                  mt-4 py-3 rounded-full
                  bg-neon-cyan text-black font-bold
                  uppercase tracking-[0.25em] text-xs
                  hover:bg-white transition
                "
              >
                Select Tier
              </button>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}