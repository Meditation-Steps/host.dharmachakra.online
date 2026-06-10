import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-404",
      closeBundle() {
        // Copy index.html to 404.html for GitHub Pages SPA support
        copyFileSync(resolve(__dirname, "dist/index.html"), resolve(__dirname, "dist/404.html"));
      },
    },
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
