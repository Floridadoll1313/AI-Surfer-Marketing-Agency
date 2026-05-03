export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/me" && request.method === "GET") {
      return handleMe(request, env);
    }

    if (url.pathname === "/api/steps" && request.method === "GET") {
      return handleSteps(request, env);
    }

    if (url.pathname === "/stripe/webhook" && request.method === "POST") {
      return handleStripeWebhook(request, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

// --- A. /api/me -------------------------------------------------

async function handleMe(request, env) {
  // TODO: replace with real auth (JWT, session, etc.)
  const email = request.headers.get("x-user-email");
  if (!email) {
    return json({ isMember: false, tier: null });
  }

  // TODO: replace with real DB lookup
  // const member = await env.DB.prepare(
  //   "SELECT tier, status FROM members WHERE email = ?"
  // ).bind(email).first();

  const member = null; // TEMP: no member

  if (!member || member.status !== "active") {
    return json({ isMember: false, tier: null });
  }

  return json({ isMember: true, tier: member.tier });
}

// --- C. /api/steps ----------------------------------------------

async function handleSteps(request, env) {
  const email = request.headers.get("x-user-email");
  if (!email) {
    return json({ error: "Unauthorized" }, 401);
  }

  // TODO: join members + steps by email
  // const row = await env.DB.prepare(
  //   `SELECT s.streak_days, s.waves_ridden, s.badges
  //    FROM steps s
  //    JOIN members m ON m.id = s.member_id
  //    WHERE m.email = ?`
  // ).bind(email).first();

  const row = {
    streak_days: 7,
    waves_ridden: 42,
    badges: JSON.stringify(["first-wave", "seven-day-streak"]),
  }; // TEMP fake data

  return json({
    streakDays: row.streak_days,
    wavesRidden: row.waves_ridden,
    badges: JSON.parse(row.badges),
  });
}

// --- B. /stripe/webhook -----------------------------------------

async function handleStripeWebhook(request, env) {
  const sig = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  // TODO: verify signature with Stripe library off‑platform
  // or via a separate verification service.
  // For now, assume it's valid.

  const event = JSON.parse(rawBody);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const customerId = session.customer;
    const tier = session.metadata?.tier || "foam";

    if (email && customerId) {
      // TODO: upsert into members table
      // await env.DB.prepare(
      //   `INSERT INTO members (email, stripe_customer_id, tier, status)
      //    VALUES (?, ?, ?, 'active')
      //    ON CONFLICT(email) DO UPDATE SET
      //      stripe_customer_id = excluded.stripe_customer_id,
      //      tier = excluded.tier,
      //      status = 'active'`
      // ).bind(email, customerId, tier).run();
    }
  }

  // handle subscription updates/cancellations similarly if needed

  return new Response("ok", { status: 200 });
}

// --- helper -----------------------------------------------------

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}