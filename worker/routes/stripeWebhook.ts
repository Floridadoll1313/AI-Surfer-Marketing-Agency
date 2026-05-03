export async function handleStripeWebhook(request, env) {
  const body = await request.json();

  // Immediately start the workflow
  const run = await env.WORKFLOW_ENGINE.start("surferPipeline", body);

  return Response.json({ status: "ok", runId: run.id });
}