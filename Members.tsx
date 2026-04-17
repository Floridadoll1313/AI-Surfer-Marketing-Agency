import "./dashboard.css";
import React from "react";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-glass">
        <h1 className="dashboard-title">Victoria’s Dashboard</h1>
        <p className="dashboard-subtitle">
          Private Founder Cockpit — Ocean Tide Drop AI Surfer
        </p>

        <div className="dashboard-grid">
          <div className="dashboard-tile">Realm Metrics</div>
          <div className="dashboard-tile">Lore Engine</div>
          <div className="dashboard-tile">Member Signals</div>
          <div className="dashboard-tile">Cinematic Systems</div>
        </div>
      </div>
    </div>
  );
}
