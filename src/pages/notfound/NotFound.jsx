import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #00111a, #000000)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          marginBottom: "1rem",
          letterSpacing: "2px",
          textShadow: "0 0 20px rgba(0, 200, 255, 0.6)",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "1.8rem",
          marginBottom: "1rem",
          opacity: 0.9,
        }}
      >
        This wave doesn’t exist.
      </h2>

      <p
        style={{
          maxWidth: "500px",
          fontSize: "1.1rem",
          lineHeight: "1.6",
          opacity: 0.8,
          marginBottom: "2rem",
        }}
      >
        The page you’re looking for drifted out to sea.  
        Let’s paddle back to safety.
      </p>

      <Link
        to="/"
        style={{
          padding: "0.8rem 1.6rem",
          background: "rgba(0, 200, 255, 0.2)",
          border: "1px solid rgba(0, 200, 255, 0.5)",
          borderRadius: "8px",
          color: "white",
          textDecoration: "none",
          fontSize: "1.1rem",
          backdropFilter: "blur(6px)",
          boxShadow: "0 0 12px rgba(0, 200, 255, 0.4)",
          transition: "0.2s ease",
        }}
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;