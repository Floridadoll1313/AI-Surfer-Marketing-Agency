import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  async function fetchAdminStats() {
    try {
      const res = await fetch("/admin/stats");

      if (!res.ok) throw new Error("Unauthorized");

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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#00111f] via-[#002a45] to-[#003b5c] text-white p-10 animate-fadeIn">
      <h1 className="text-4xl font-extrabold mb-8 tracking-wide drop-shadow-lg">
        Admin Control Center
      </h1>

      {error && (
        <p className="text-red-400 text-lg bg-red-900/20 p-4 rounded-xl border border-red-700/40">
          {error}
        </p>
      )}

      {!stats && !error && (
        <p className="text-lg opacity-80 animate-pulse">Loading admin stats…</p>
      )}

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* STATUS CARD */}
          <div className="backdrop-blur-xl bg-white/5 borde
