// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx()],
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "IchigoJam",
        cssVariable: "--font-ichigojam",
        variants: [
          {
            weight: "400",
            style: "normal",
            src: ["./src/assets/fonts/IchigoJam-1.4.woff"],
          },
        ],
      },
    ],
  },
});
