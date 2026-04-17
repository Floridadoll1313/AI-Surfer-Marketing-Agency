import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Members Area pages
import MemberPortal from "./pages/members/MemberPortal";
import MemberPass from "./pages/members/MemberPass";
import MemberServices from "./pages/members/MemberServices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/members",
    element: <MemberPortal />,
  },
  {
    path: "/members/pass",
    element: <MemberPass />,
  },
  {
    path: "/members/services",
    element: <MemberServices />,
  }
]);

export default router;
