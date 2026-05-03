import React from "react";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Members() {
  const { loading, isMember, tier } = useAuth();

  // Loading state
  if (loading) {
    return (
      <PageWrapper>
        <p className="text-cyan-200">Checking your membership status…</p>
      </PageWrapper>
    );
  }

  // Not a member → show paywall
  if (!isMember) {
    return (
      <PageWrapper>
        <h1 className="text-4xl font-bold text-cyan-300 mb-4">
          Members Only
        </h1>

        <p className="text-lg text-cyan-200 mb-8 max-w-xl">
          This realm is reserved for active Ocean Tide Drop members.
          Unlock the Steps Wall, streak engine, wave history, and more.
        </p>

        <Link
          to="/pricing"
          className="inline-block px-8 py-4 bg-cyan-400 text-black font-bold rounded-xl shadow-neon hover:bg-cyan-300 transition text-lg"
        >
          View Surfboard Tiers
        </Link>
      </PageWrapper>
    );
  }

  // Member → show Steps Wall placeholder
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-cyan-300 mb-2">
        Welcome Back, Surfer
      </h1>

      <p className="text-lg text-cyan-200 mb-10">
        Tier: <span className="font-semibold">{tier ?? "Unknown"}</span>
      </p>

      {/* Steps Wall */}
      <section className="bg-black/40 rounded-xl p-8 shadow-neon backdrop-blur-md">
        <h2 className="text-3xl font-bold text-cyan-300 mb-4">
          Steps Wall
        </h2>

        <p className="text-cyan-200 mb-6">
          Your streaks, waves ridden, survivor milestones, and tribe rank
          will appear here once your backend is connected.
        </p>

        <div className="text-sm text-cyan-400/80">
          This section will automatically update once your Cloudflare Worker
          and `/api/me` endpoint are live.
        </div>
      </section>
    </PageWrapper>
  );
}