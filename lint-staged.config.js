import { defineConfig } from "lint-staged/config";

// コミットするファイルだけを整形・検査する（整形で変わった内容は自動でステージされる）
export default defineConfig({
  "*.{js,mjs,cjs,ts,tsx,astro,json,jsonc,css,md,mdx,yml,yaml}":
    "oxfmt --no-error-on-unmatched-pattern",
  "*.{js,mjs,cjs,ts,tsx,astro}": "oxlint --no-error-on-unmatched-pattern",
  "*.{astro,tsx,mdx}": "markuplint",
});
