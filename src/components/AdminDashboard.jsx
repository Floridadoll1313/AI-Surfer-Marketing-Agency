import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  async function fetchAdminStats() {
    try {
      const res = await fetch("/admin/stats", {
        headers: {
          "x-admin-key": import.meta.env.VITE_ADMIN_SECRET,
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setStats(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchAdminStats();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {error && <p className="text-red-400">{error}</p>}

      {stats ? (
        <pre className="bg-black/40 p-4 rounded-lg">
          {JSON.stringify(stats, null, 2)}
        </pre>
      ) : (
        <p>Loading admin stats…</p>
      )}
    </div>
  );
}
