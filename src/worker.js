export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // A. Membership check
    if (url.pathname === "/api/me" && request.method === "GET") {
      return handleMe(request, env);
    }

    // C. Steps Wall data
    if (url.pathname === "/api/steps" && request.method === "GET") {
      return handleSteps(request, env);
    }

    // B. Stripe webhook
    if (url.pathname === "/stripe/webhook" && request.method === "POST") {
      return handleStripeWebhook(request, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

// ------------------------------------------------------------
// A. /api/me — Membership Check
// ------------------------------------------------------------
async function handleMe(request, env) {
  const email = request.headers.get("x-user-email");

  if (!email) {
    return json({ isMember: false, tier: null });
  }

  // TODO: Replace with real D1 query
  // const member = await env.DB.prepare(
  //   "SELECT tier, status FROM members WHERE email = ?"
  // ).bind(email).first();

  const member = null; // TEMP

  if (!member || member.status !== "active") {
    return json({ isMember: false, tier: null });
  }

  return json({ isMember: true, tier: member.tier });
}

// ------------------------------------------------------------
// C. /api/steps — Steps Wall Data
// ------------------------------------------------------------
async function handleSteps(request, env) {
  const email = request.headers.get("x-user-email");

  if (!email) {
    return json({ error: "Unauthorized" }, 401);
  }

  // TODO: Replace with real D1 join
  // const row = await env.DB.prepare(`
  //   SELECT s.streak_days, s.waves_ridden, s.badges
  //   FROM steps s
  //   JOIN members m ON m.id = s.member_id
  //   WHERE m.email = ?
  // `).bind(email).first();

  const row = {
    streak_days: 7,
    waves_ridden: 42,
    badges: JSON.stringify(["first-wave", "seven-day-streak"]),
  }; // TEMP

  return json({
    streakDays: row.streak_days,
    wavesRidden: row.waves_ridden,
    badges: JSON.parse(row.badges),
  });
}

// ------------------------------------------------------------
// B. Stripe Webhook — Membership Activation
// ------------------------------------------------------------
async function handleStripeWebhook(request, env) {
  const raw = await request.text();
  const event = JSON.parse(raw);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const customerId = session.customer;
    const tier = session.metadata?.tier || "foam";

    if (email && customerId) {
      // TODO: Replace with real D1 upsert
      // await env.DB.prepare(`
      //   INSERT INTO members (email, stripe_customer_id, tier, status)
      //   VALUES (?, ?, ?, 'active')
      //   ON CONFLICT(email) DO UPDATE SET
      //     stripe_customer_id = excluded.stripe_customer_id,
      //     tier = excluded.tier,
      //     status = 'active'
      // `).bind(email, customerId, tier).run();
    }
  }

  return new Response("ok", { status: 200 });
}

// ------------------------------------------------------------
// Helper
// ------------------------------------------------------------
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}