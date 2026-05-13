import { startSurferPipeline } from "./routes/startWorkflow";
import { handleStripeWebhook } from "./routes/stripeWebhook";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/webhook/stripe") {
      return handleStripeWebhook(request, env, ctx);
    }

    if (url.pathname === "/workflow/start") {
      return startSurferPipeline(request, env, ctx);
    }

    return new Response("Ocean Tide Drop AI — The Wave Is Alive", {
      status: 200,
    });
  },
};