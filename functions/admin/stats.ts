// functions/admin/stats.ts
import { createClient } from '@supabase/supabase-js';

export interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  DB: D1Database;
  KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;

    // --- AUTH CHECK (Admin Only) ---
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response("Unauthorized", { status: 401 });
    }

    // You can expand this later with JWT validation
    const email = authHeader.replace("Bearer ", "");
    const allowedAdmins = ["shannon@oceantidedrop.com"];
    if (!allowedAdmins.includes(email)) {
      return new Response("Forbidden", { status: 403 });
    }

    // --- SUPABASE CLIENT ---
    const supabase = createClient(
      env.SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY
    );

    // --- SUPABASE: USER COUNT ---
    const { count: userCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    // --- D1: SYSTEM LOGS ---
    const logs = await env.DB.prepare(
      "SELECT id, level, message, created_at FROM system_logs ORDER BY created_at DESC LIMIT 20"
    ).all();

    // --- KV: SYSTEM STATUS ---
    const systemStatus = await env.KV.get("system_status") || "OPERATIONAL";

    // --- KV: CACHED TOTAL USERS ---
    const cachedUsers = await env.KV.get("total_users");

    return new Response(
      JSON.stringify({
        ok: true,
        supabase: {
          userCount,
        },
        d1: {
          logs: logs.results || [],
        },
        kv: {
          systemStatus,
          cachedUsers,
        },
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.toString() }), {
      status: 500,
    });
  }
};
