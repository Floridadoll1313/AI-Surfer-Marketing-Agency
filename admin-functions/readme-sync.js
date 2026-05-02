export async function onRequest(context) {
  const stripeKey = context.env.STRIPE_SECRET_KEY;

  // Fetch all active recurring prices
  const pricesRes = await fetch("https://api.stripe.com/v1/prices?active=true&expand[]=data.product", {
    headers: {
      Authorization: `Bearer ${stripeKey}`
    }
  });

  const pricesData = await pricesRes.json();

  // Filter subscription prices only
  const tiers = pricesData.data
    .filter(p => p.recurring)
    .map(p => ({
      name: p.product.name,
      price: (p.unit_amount / 100).toFixed(2),
      interval: p.recurring.interval,
      id: p.id
    }))
    .sort((a, b) => a.price - b.price);

  // Build README content dynamically
  let tierSection = "## 🏄 **LIVE STRIPE TIERS (AUTO‑SYNCED)**\n\n";

  tiers.forEach(tier => {
    tierSection += `### 🌊 **${tier.name} — $${tier.price} / ${tier.interval}**\n`;
    tierSection += `Stripe Price ID: \`${tier.id}\`\n\n`;
  });

  const readme = `
# 🌊 Ocean Tide Drop AI  
*A cinematic tide. A mythic system. A glowing surf‑engine built for creators who build with precision and soul.*

---

## 🌅 THE TIDE BEGINS HERE

Ocean Tide Drop AI is a living wave — a mythic system forged in the Outer Banks surf and engineered for creators who demand beauty, speed, and emotional resonance.

---

${tierSection}

---

## 🌊 CORE SYSTEM FEATURES

- Cloudflare Pages + Workers  
- Stripe Subscriptions  
- JWT Membership Tokens  
- KV Storage  
- Gemini AI  
- Admin‑locked endpoints  
- A glowing, mythic surf identity  

---

## 🐚 MASCOT  
**Ocean Tide Drop AI SURFER** — a glowing cosmic surf‑entity guiding creators through the tide.

---

## 🌊 LICENSE  
Powered by the tide. Build with intention.
`;

  return new Response(readme, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}