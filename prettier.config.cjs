module.exports = {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.mjs', '*.jsx', '*.json'],
      options: { parser: 'typescript' },
    },
  ],
  // フォーマットの設定
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  singleQuote: false,
  arrowParens: 'always',
  bracketSpacing: true,
  bracketSameLine: false,
  semi: true,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  proseWrap: 'preserve',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: false,
  embeddedLanguageFormatting: 'auto',
};