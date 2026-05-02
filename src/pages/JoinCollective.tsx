import React from "react";

export default function JoinCollective() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-6">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-4xl font-black tracking-tight">
          Join the Collective
        </h1>
        <p className="text-slate-400">
          Tell me who you are, what you’re building, and why your signal
          deserves to cut through the noise.
        </p>
        <form className="space-y-4">
          <input
            className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-cyan"
            placeholder="Name"
          />
          <input
            className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-cyan"
            placeholder="Email"
          />
          <textarea
            className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-sm h-32 focus:outline-none focus:border-neon-cyan"
            placeholder="What are you building?"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-neon-cyan text-black font-bold uppercase tracking-[0.25em] text-xs hover:bg-white transition"
          >
            Submit Signal
          </button>
        </form>
      </div>
    </main>
  );
}