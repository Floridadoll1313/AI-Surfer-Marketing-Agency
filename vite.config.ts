import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import cf from "@cloudflare/vite-plugin";

// This config works for:
// - Cloudflare Pages
// - Cloudflare Workers
// - React 19
// - Tailwind 4
// - Your exact package.json setup

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cf(), // Enables Cloudflare Worker compatibility
  ],

  // Cloudflare Pages requires this
  base: "/",

  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
  },

  server: {
    port: 5173,
    strictPort: true,
  },

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});