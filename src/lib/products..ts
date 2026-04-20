// src/lib/products.js

import brandImg from './brand-architecture.png'
import cinematicImg from './cinematic web design systems.png'
import membershipImg from './subscription.png'
import workflowImg from './workflow.png'

export const products = [
  {
    slug: 'brand-architecture',
    name: 'Brand Architecture & Identity Systems',
    image: brandImg,
    alt: 'Brand Architecture glowing oceanic identity system',
    seoTitle: 'Brand Architecture & Identity Systems | Ocean Tide Drop',
    narrative: `
      Beneath the tide lies the forge where identity is born.
      This is where scattered ideas become a unified myth — a living system
      that speaks with clarity, resonance, and inevitability.
      Your brand becomes a lighthouse, a signal fire, a story that cannot be ignored.
    `,
    features: [
      'Mythic brand narrative construction',
      'Identity system architecture',
      'Visual direction & symbolic language',
      'Messaging pillars & story cadence',
      'Foundational brand system for all future assets'
    ],
    stripePriceId: 'YOUR_BRAND_ARCHITECTURE_PRICE_ID'
  },

  {
    slug: 'cinematic-web-design',
    name: 'Cinematic Web Design Systems',
    image: cinematicImg,
    alt: 'Cinematic web design glowing lighthouse system',
    seoTitle: 'Cinematic Web Design Systems | Ocean Tide Drop',
    narrative: `
      A website is not a container — it is a beacon.
      This system transforms your digital presence into a cinematic lighthouse engine,
      guiding the right people toward your world with clarity and emotional gravity.
    `,
    features: [
      'Cinematic hero sequences',
      'Neon-ocean gradients & glow systems',
      'Modular component architecture',
      'Responsive, fluid, immersive layouts',
      'Conversion-focused storytelling'
    ],
    stripePriceId: 'YOUR_CINEMATIC_WEB_PRICE_ID'
  },

  {
    slug: 'automation-ai',
    name: 'Automation & AI Workflow Systems',
    image: workflowImg,
    alt: 'Automation and AI workflow cathedral underwater',
    seoTitle: 'Automation & AI Workflow Systems | Ocean Tide Drop',
    narrative: `
      Beneath the surface lies the machine cathedral — a place where workflows
      become self-running, intelligent, and alive. This system frees you from
      repetitive tasks and builds an engine that works even when you rest.
    `,
    features: [
      'AI-powered workflow automation',
      'Customer journey orchestration',
      'Smart triggers & conditional logic',
      'Automated content & communication loops',
      'Scalable backend systems'
    ],
    stripePriceId: 'YOUR_AUTOMATION_AI_PRICE_ID'
  },

  {
    slug: 'membership',
    name: 'AI Surfer Membership',
    image: membershipImg,
    alt: 'AI Surfer membership glowing ocean sanctuary',
    seoTitle: 'AI Surfer Membership | Ocean Tide Drop',
    narrative: `
      The tide that carries you. This membership is a sanctuary for creators
      navigating the waves of building their world. You are not alone — you are
      supported, guided, and uplifted by a living current of tools, rituals,
      and creative expansion.
    `,
    features: [
      'Monthly creative expansions',
      'AI Surfer guidance & rituals',
      'Members-only tools & templates',
      'Early access to new drops',
      'Ongoing support & narrative immersion'
    ],
    stripePriceId: 'YOUR_MEMBERSHIP_PRICE_ID'
  }
]
