import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: true,      // 👈 this exposes the server to your local network
    port: 5173
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
    },
  },
});
