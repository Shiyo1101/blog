import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "promise",
    "react",
    "react-perf",
    "jsx-a11y",
  ],
  jsPlugins: ["./lint/oxlint-plugin-project.ts"],
  // nursery（開発中）と restriction（好みが分かれる制限系）以外はすべてエラーにする
  categories: {
    correctness: "error",
    suspicious: "error",
    perf: "error",
    pedantic: "error",
    style: "error",
  },
  options: {
    typeAware: true,
  },
  env: {
    browser: true,
    es2024: true,
  },
  settings: {
    react: {
      version: "19.3.1",
    },
  },
  rules: {
    // ---- プロジェクト固有のルール ----
    "project/no-class": "error",
    "typescript/no-explicit-any": "error",
    "typescript/no-restricted-types": [
      "error",
      {
        types: {
          unknown: "unknown は使用せず、具体的な型を定義してください。",
        },
      },
    ],

    // ---- restriction カテゴリから個別に有効化するルール ----
    "eslint/no-console": "error",
    "eslint/no-var": "error",
    "eslint/no-alert": "error",
    "eslint/no-eval": "error",
    "eslint/no-param-reassign": "error",
    "typescript/no-non-null-assertion": "error",
    "typescript/no-namespace": "error",
    "typescript/explicit-module-boundary-types": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "unicorn/no-array-for-each": "error",

    // ---- 書き方を統一するための設定 ----
    "eslint/one-var": ["error", "never"],
    "typescript/consistent-type-definitions": ["error", "type"],
    "import/consistent-type-specifier-style": [
      "error",
      "prefer-top-level-if-only-type-imports",
    ],
    "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
    "unicorn/filename-case": ["error", { case: "kebabCase" }],

    // ---- oxfmt と役割が重複するため無効化 ----
    "eslint/sort-imports": "off",

    // ---- 現在の React / Astro では不要、または前提と矛盾するため無効化 ----
    // 新しい JSX Transform では React の import は不要
    "react/react-in-jsx-scope": "off",
    // shadcn/ui のコンポーネントは props のスプレッドを前提としている
    "react/jsx-props-no-spreading": "off",
    // コンポーネントは名前付きエクスポートを基本とし、ページ等の default export も許可する
    "import/no-named-export": "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "off",
    "import/group-exports": "off",
    "import/exports-last": "off",
    // `import type * as React from "react"` 等の名前空間 import を許可する
    "import/no-namespace": "off",
    // React コンポーネントの早期 return で null を返すのは一般的な書き方
    "unicorn/no-null": "off",

    // ---- 機械的に適用すると可読性が下がるため無効化 ----
    // 三項演算子は JSX の条件分岐で必須
    "eslint/no-ternary": "off",
    // オブジェクトのキーは意味のある順序で並べたい（バリアント定義など）
    "eslint/sort-keys": "off",
    // アニメーションやレイアウトの数値を全て定数化すると読みにくくなる
    "eslint/no-magic-numbers": "off",
    // map のコールバック引数など、短い識別子が自然な場面がある
    "eslint/id-length": "off",
    // コメントは日本語で記述するため大文字始まりを強制しない
    "eslint/capitalized-comments": "off",
    // 宣言時に初期化できない変数（ループ内で代入する等）を許可する
    "eslint/init-declarations": "off",
    // コンポーネントは関数宣言とアロー関数の両方を許可する（shadcn/ui は関数宣言）
    "eslint/func-style": "off",
    "react/function-component-definition": "off",
    // コンポーネントの行数・文の数・JSX のネストは UI の構造に依存するため制限しない
    "eslint/max-lines-per-function": "off",
    "eslint/max-statements": "off",
    "react/jsx-max-depth": "off",
    // useEffect の早期 return（`return;`）と、クリーンアップ関数の return が混在する定番の書き方と矛盾する
    // （`return undefined` で回避すると unicorn/no-useless-undefined と衝突する）
    "typescript/consistent-return": "off",
    // React の props や DOM の型は readonly にできないものが多く、適用しきれない
    "typescript/prefer-readonly-parameter-types": "off",
    // `onClick={() => setState(x)}` のようなアロー関数の省略記法は許可する
    "typescript/no-confusing-void-expression": [
      "error",
      { ignoreArrowShorthand: true },
    ],
    // インラインのオブジェクト・関数・JSX の props は React 19 では問題にならない場面が多い
    "react-perf/jsx-no-new-object-as-prop": "off",
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-array-as-prop": "off",
    "react-perf/jsx-no-jsx-as-prop": "off",
  },
  overrides: [
    {
      // コンポーネントとレイアウトはパスカルケース（shadcn/ui のコンポーネントを除く）
      files: [
        "src/components/**/*.{astro,tsx}",
        "src/layouts/**/*.astro",
      ],
      rules: {
        "unicorn/filename-case": ["error", { case: "pascalCase" }],
      },
    },
    {
      files: ["src/components/ui/**"],
      rules: {
        "unicorn/filename-case": ["error", { case: "kebabCase" }],
      },
    },
    {
      // ルーティング用の動的パラメーター（[tag].astro, [...slug].astro）
      files: ["src/pages/**"],
      rules: {
        "unicorn/filename-case": [
          "error",
          { case: "kebabCase", ignore: [String.raw`^\[.+\]\.astro$`] },
        ],
      },
    },
    {
      // 設定ファイルは default export が必須
      files: ["*.config.{ts,mjs,js}", "lint/**"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
  ignorePatterns: ["dist/**", ".astro/**", "node_modules/**"],
});
