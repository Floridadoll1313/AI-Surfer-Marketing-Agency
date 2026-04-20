import Stripe from "stripe";

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, priceId } = await request.json();

    if (!email || !priceId) {
      return new Response(
        JSON.stringify({ error: "Missing email or priceId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Cloudflare requires explicit API version
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${env.BASE_URL}/success`,
      cancel_url: `${env.BASE_URL}/cancel`,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
