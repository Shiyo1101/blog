// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import { ichigoJamLanguage } from "./src/lib/ichigojam/language";

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
  markdown: {
    shikiConfig: {
      // 配色は global.css の --astro-code-* でデザイントークンに合わせる
      theme: "css-variables",
      // ```ichigojam のフェンス記法でも IchigoJam BASIC をハイライトする
      langs: [ichigoJamLanguage],
    },
  },
  build: {
    // 描画を止める CSS のリクエストをなくすため、HTML に直接埋め込む（日本語フォントの CSS は別途非同期で読み込む）
    inlineStylesheets: "always",
  },
  site: "https://uchii-blog.netlify.app",
});
