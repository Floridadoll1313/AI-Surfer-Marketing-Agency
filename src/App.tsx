import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/pricing/Pricing";
import Members from "./pages/Members";
import NotFound from "./pages/notfound/NotFound";
import { useAuth } from "./components/AuthProvider";
import Navbar from "./components/Navbar";

export default function App() {
  const { isMember, isAdmin } = useAuth();

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Members-only */}
        <Route
          path="/members"
          element={
            isMember ? (
              <Members />
            ) : (
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>You must be logged in to access this page.</h2>
              </div>
            )
          }
        />

        {/* Admin-only */}
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <div style={{ padding: "2rem" }}>
                <h1>Admin Dashboard</h1>
              </div>
            ) : (
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h2>Admins only.</h2>
              </div>
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}