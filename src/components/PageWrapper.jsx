import React from "react";

export default function PageWrapper({ children }) {
  return (
    <div className="pt-24 px-6 fade-in min-h-screen">
      {children}
    </div>
  );
}