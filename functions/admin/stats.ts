interface Env {
  ADMIN_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const adminKey = context.request.headers.get("x-admin-key");

  if (!adminKey || adminKey !== context.env.ADMIN_SECRET) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Replace with your actual admin stats logic
  return Response.json({
    status: "operational",
    timestamp: new Date().toISOString(),
  });
};
