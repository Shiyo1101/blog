import astroParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import typescriptEslintParser from "@typescript-eslint/parser";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

const eslintConfig = [
  // 除外ファイルの設定
  {
    ignores: [".astro/", "dist/", "node_modules"],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  eslintConfigPrettier,
  // Astro + TypeScript
  {
    files: ["*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    plugins: {
      'unused-imports': unusedImports,
      import: importPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // ESLint rules, React
      "react/jsx-uses-react": "off", // React 17以降は import React は不要
      "react/react-in-jsx-scope": "off", // React 17以降は不要
      "react-hooks/rules-of-hooks": "error", // Hooksのルールを強制
      "react-hooks/exhaustive-deps": "warn", // dependencies arrayの警告
      // unused-imports
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // import order
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            // grups の設定
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
