import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-hero">
      <div className="hero-content">
        <h1 className="hero-title">Ocean Tide Drop Agency</h1>
        <p className="hero-subtitle">
          Cinematic branding, digital storytelling, and modern web experiences.
        </p>
        <a href="/services" className="hero-button">
          Explore Services
        </a>
      </div>
    </div>
  );
}
