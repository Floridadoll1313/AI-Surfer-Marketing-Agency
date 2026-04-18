import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

import Dashboard from "./pages/members/Dashboard";
import Members from "./pages/members/Members";
import CheckoutAI from "./pages/members/CheckoutAI";

import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

// Simple auth wrapper (expand later if needed)
function RequireAuth({ children }) {
  const token = localStorage.getItem("membership");

  if (!token) {
    return <CheckoutAI />;
  }

  return children;
}

// 404 fallback for unknown member tools
function MemberNotFound() {
  return (
    <div style={{ padding: "40px", color: "#7feaff", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.4rem", textShadow: "0 0 12px #00c8ff" }}>
        Tool Not Found
      </h1>
      <p style={{ marginTop: "12px", opacity: 0.8 }}>
        This tool doesn’t exist yet — or it’s still being forged in the neon tides.
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <Contact /> },

  // CHECKOUT RESULT ROUTES
  { path: "/success", element: <Success /> },
  { path: "/cancel", element: <Cancel /> },

  // MEMBERS AREA — now fully structured
  {
    path: "/members",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },

  // Optional: keep Members.tsx accessible
  {
    path: "/members/home",
    element: (
      <RequireAuth>
        <Members />
      </RequireAuth>
    ),
  },

  // Dynamic tool routes (e.g., /members/workflows)
  {
    path: "/members/:tool",
    element: (
      <RequireAuth>
        <Members />
      </RequireAuth>
    ),
  },

  // 404 fallback for unknown member routes
  {
    path: "/members/*",
    element: (
      <RequireAuth>
        <MemberNotFound />
      </RequireAuth>
    ),
  },
]);

export default router;
