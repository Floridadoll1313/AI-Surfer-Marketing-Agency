import React from "react";
import "./hud.css";

export default function HUD() {
  return (
    <div className="hud">
      <div className="hud-item">🌀 System Stable</div>
      <div className="hud-item">🌙 Ocean Depth: 92%</div>
      <div className="hud-item">⚡ AI Sync: Active</div>
    </div>
  );
}
