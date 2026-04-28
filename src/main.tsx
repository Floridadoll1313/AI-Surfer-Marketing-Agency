import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// IMPORTANT: Cloudflare requires exact case + exact folder
import AuthProvider from "./Components/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);