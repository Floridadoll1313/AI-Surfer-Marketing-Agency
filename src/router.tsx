import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Members from "./pages/members/Members";
import Dashboard from "./pages/members/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/services", element: <Services /> },
  { path: "/contact", element: <Contact /> },

  // Members Area — Dashboard is now the landing page
  { path: "/members", element: <Dashboard /> },

  // Optional: keep Members.tsx accessible if needed
  { path: "/members/home", element: <Members /> },
]);

export default router;
