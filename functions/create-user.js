It creates a Supabase user server‑side, using the service role key.

`js
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { email, password, metadata } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing email or password" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const url = ${env.VITESUPABASEURL}/auth/v1/admin/users;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: Bearer ${env.SUPABASESERVICEROLE_KEY},
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        user_metadata: metadata || {},
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ user: data }), {
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
`
