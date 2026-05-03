import React from "react";
import PageWrapper from "../components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <h1 className="text-4xl font-bold text-cyan-300 mb-6">
        Welcome to Ocean Tide Drop AI
      </h1>
      <p className="text-lg text-cyan-200">
        Ride the wave of intelligence.
      </p>
    </PageWrapper>
  );
}