import React from "react";
import MemberNotFound from "./MemberNotFound";

// Import your tool pages here
// Example:
// import Workflows from "./tools/Workflows";

export default function ToolLoader({ tool }) {
  const toolMap = {
    workflows: () => <div>Workflows Tool Coming Soon</div>,
    strategy: () => <div>Strategy Tool Coming Soon</div>,
    blueprints: () => <div>Blueprint Library Coming Soon</div>,
    production: () => <div>Production Tool Coming Soon</div>,
    websitebuild: () => <div>Website Build Coming Soon</div>,
    automation: () => <div>Automation Scorecard Coming Soon</div>,
    leadsniper: () => <div>Lead Sniper Coming Soon</div>,
    marketinsights: () => <div>Market Insights Coming Soon</div>,
    roi: () => <div>ROI Calculator Coming Soon</div>,
    securecta: () => <div>Secure CTA Coming Soon</div>,
    vault: () => <div>Vault Coming Soon</div>,
    voice: () => <div>Voice Interface Coming Soon</div>,
    token: () => <div>Token Arbitrage Coming Soon</div>,
    agents: () => <div>Agent Marketplace Coming Soon</div>,
    promptforge: () => <div>PromptForge Coming Soon</div>,
    interaction: () => <div>Interaction Tool Coming Soon</div>,
    pricing: () => <div>Pricing Tool Coming Soon</div>,
    about: () => <div>About Page Coming Soon</div>,
  };

  const Component = toolMap[tool];

  if (!Component) {
    return <MemberNotFound />;
  }

  return <Component />;
}
