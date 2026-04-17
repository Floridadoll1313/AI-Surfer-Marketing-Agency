import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const tools = [
    { name: "Workflows", path: "workflows", size: "hero" },
    { name: "Strategy", path: "strategy", size: "hero" },
    { name: "Blueprint Library", path: "blueprints", size: "hero" },
    { name: "Production", path: "production", size: "medium" },
    { name: "Website Build", path: "websitebuild", size: "medium" },
    { name: "Automation Scorecard", path: "automation", size: "medium" },
    { name: "Lead Sniper", path: "leadsniper", size: "medium" },
    { name: "Market Insights", path: "marketinsights", size: "medium" },
    { name: "ROI Calculator", path: "roi", size: "medium" },
    { name: "Secure CTA", path: "securecta", size: "medium" },
    { name: "Vault", path: "vault", size: "medium" },
    { name: "Voice Interface", path: "voice", size: "medium" },
    { name: "Token Arbitrage", path: "token", size: "medium" },
    { name: "Agent Marketplace", path: "agents", size: "medium" },
    { name: "PromptForge", path: "promptforge", size: "small" },
    { name: "Interaction", path: "interaction", size: "small" },
    { name: "Pricing", path: "pricing", size: "small" },
    { name: "About", path: "about", size: "small" },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Member Dashboard</h1>

      <div className="dashboard-grid">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className={`tile tile-${tool.size}`}
          >
            <div className="tile-content">{tool.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
