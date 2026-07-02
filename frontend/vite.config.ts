import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "EmbryoApp",
        short_name: "EmbryoApp",
        description: "Gestión de programas de transferencia de embriones bovinos",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        icons: [],
      },
    }),
  ],
  server: {
    port: 5173,
  },
});