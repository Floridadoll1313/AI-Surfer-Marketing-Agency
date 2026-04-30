import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Members from "./pages/Members";
import JoinCollective from "./pages/JoinCollective";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";
import Lore from "./pages/Lore";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/notfound/NotFound";
import Layout from "./pages/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "members", element: <Members /> },
      { path: "join", element: <JoinCollective /> },
      { path: "pricing", element: <Pricing /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "lore", element: <Lore /> },
      { path: "marketplace", element: <Marketplace /> },
    ],
  },
]);