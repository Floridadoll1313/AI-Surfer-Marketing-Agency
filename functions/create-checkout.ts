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

    // Create Checkout Session using Stripe's REST API (Workers-compatible)
    const body = new URLSearchParams({
      mode: "subscription",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      customer_email: email,
      success_url: `${env.BASE_URL}/success`,
      cancel_url: `${env.BASE_URL}/cancel`,
    });

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    const session = await response.json();

    if (session.error) {
      return new Response(JSON.stringify({ error: session.error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}