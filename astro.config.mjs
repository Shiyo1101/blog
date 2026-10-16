// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Astro 7 のプリレンダー出力は cookie を外部 import するため、
    // 親ディレクトリにある古い CJS 版 cookie が解決されないようバンドルする
    resolve: {
      noExternal: ["cookie"],
    },
  },
  integrations: [
    react(),
    mdx({
      optimize: true,
    }),
    sitemap(),
    robotsTxt({
      policy: [{ userAgent: "*", allow: "/" }],
      sitemap: "https://uchii-blog.netlify.app/sitemap-index.xml",
      host: "uchii-blog.netlify.app",
    }),
  ],
  site: "https://uchii-blog.netlify.app",
});
