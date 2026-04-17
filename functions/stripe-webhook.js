import Stripe from "stripe";

export default {
  async fetch(request, env) {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const signature = request.headers.get("stripe-signature");
    const body = await request.text();

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Create a signed membership token
      const token = await env.MEMBERSHIP_JWT.sign(
        {
          email: session.customer_details.email,
          active: true,
        },
        { expiresIn: "365d" }
      );

      // Store membership in KV
      await env.MEMBERS.store.put(session.customer_details.email, token);

      return new Response("Membership activated", { status: 200 });
    }

    return new Response("OK", { status: 200 });
  },
};
