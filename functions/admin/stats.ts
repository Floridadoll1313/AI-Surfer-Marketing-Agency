export async function onRequest(context) {
  const SECRET = context.env.ADMIN_SECRET;

  const incoming = context.request.headers.get("x-admin-key");

  if (!incoming || incoming !== SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Example admin data
  const data = {
    status: "ok",
    timestamp: Date.now(),
    message: "Admin endpoint is live",
  };

  return Response.json(data);
}
