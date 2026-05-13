import Stripe from "stripe";

export default {
  async fetch(request, env) {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

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

    // Handle checkout completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const email = session.customer_details?.email;
      if (!email) {
        return new Response("Missing email", { status: 400 });
      }

      // Create membership token
      const token = await env.MEMBERSHIP_JWT.sign(
        {
          email,
          active: true,
        },
        { expiresIn: "365d" }
      );

      // Store in KV
      await env.MEMBERS.put(email, token);

      return new Response("Membership activated", { status: 200 });
    }

    return new Response("OK", { status: 200 });
  },
};