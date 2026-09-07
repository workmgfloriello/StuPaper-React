import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
 plugins: [
  react(),
  tailwindcss(),
  VitePWA({
    registerType: "autoUpdate",
    manifest: false,
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
    },
  }),
],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 3000,
  },

  build: {
    outDir: "out",
  },
});