import React from "react";

export default function News() {
  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "800px",
        margin: "0 auto",
        color: "white",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "1rem",
          textShadow: "0 0 12px rgba(0, 150, 255, 0.6)",
        }}
      >
        Ocean Tide Drop News
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          opacity: 0.85,
          marginBottom: "2rem",
        }}
      >
        Updates, releases, and behind‑the‑scenes currents from the Ocean Tide Drop
        universe.
      </p>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>🚀 New Features Coming Soon</h2>
        <p style={{ opacity: 0.85 }}>
          The Ocean Tide Drop AI Surfer Console is evolving. Expect new tools,
          smoother flows, and deeper integration with your cinematic brand
          ecosystem.
        </p>
      </div>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>🌊 Community Highlights</h2>
        <p style={{ opacity: 0.85 }}>
          Stories from creators riding the wave with Ocean Tide Drop. Soon you’ll
          be able to submit your own wins and be featured here.
        </p>
      </div>

      <div
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>📣 Announcements</h2>
        <p style={{ opacity: 0.85 }}>
          Major updates, launches, and tide‑shifting news will appear here as the
          platform expands.
        </p>
      </div>
    </div>
  );
}