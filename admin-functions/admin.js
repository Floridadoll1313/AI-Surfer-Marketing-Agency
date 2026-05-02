export async function onRequest(context) {
  const SECRET = context.env.ADMIN_SECRET;

  // Read incoming admin key
  const incoming = context.request.headers.get("x-admin-key");

  if (!incoming || incoming !== SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Example admin response
  const data = {
    status: "ok",
    timestamp: Date.now(),
    message: "Admin endpoint is live",
  };

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}