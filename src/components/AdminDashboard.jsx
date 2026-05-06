async function fetchAdminStats() {
  try {
    // No secret header needed — auth is handled server-side
    // Or if you still want client-side key validation, pass a
    // non-secret token. But the real secret stays server-only.
    const res = await fetch("/admin/stats");

    if (!res.ok) throw new Error("Unauthorized");

    const data = await res.json();
    setStats(data);
  } catch (err) {
    setError(err.message);
  }
}
