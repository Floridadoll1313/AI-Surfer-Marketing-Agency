import React from "react";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">🌊 OTD</div>

      <nav className="sidebar-nav">
        <a href="/members/dashboard" className="sidebar-link">Dashboard</a>
        <a href="/members/realm" className="sidebar-link">Realm Metrics</a>
        <a href="/members/lore" className="sidebar-link">Lore Engine</a>
        <a href="/members/signals" className="sidebar-link">Member Signals</a>
        <a href="/members/cinematic" className="sidebar-link">Cinematic Systems</a>
      </nav>
    </div>
  );
}
