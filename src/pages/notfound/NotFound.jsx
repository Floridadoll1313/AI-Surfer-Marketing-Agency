import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black">404</h1>
        <p className="text-slate-400">
          This wave doesn’t exist yet. You might be early.
        </p>
        <Link
          to="/"
          className="inline-flex px-6 py-3 rounded-full bg-neon-cyan text-black text-xs font-bold uppercase tracking-[0.25em]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}