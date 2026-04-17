import Stripe from "stripe";

export default {
  async fetch(request, env) {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const { email } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price: env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${env.PUBLIC_URL}/members?success=true`,
      cancel_url: `${env.PUBLIC_URL}/members?canceled=true`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
