import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import ssrPlugin from "vite-ssr-components/plugin";

export default defineConfig({
  plugins: [cloudflare(), ssrPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: "./src/routes.tsx",
      },
    },
  },
});
