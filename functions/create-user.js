export async function onRequestPost(context) {
  const SUPABASE_URL = context.env.SUPABASE_URL;
  const SERVICE_ROLE = context.env.SUPABASE_SERVICE_ROLE;

  const { email, password } = await context.request.json();

  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SERVICE_ROLE,
      "Authorization": `Bearer ${SERVICE_ROLE}`,
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  return Response.json(data);
}
