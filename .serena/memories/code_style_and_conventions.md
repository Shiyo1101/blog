# コードスタイルとコンベンション

## TypeScript設定
- **厳格モード**: `astro/tsconfigs/strict` を継承
- `any`/`unknown` 型の使用禁止
- `class` はエラー拡張などの必要な場合のみ使用

## Prettier設定
```javascript
{
  trailingComma: 'all',      // 末尾カンマ
  tabWidth: 2,               // インデント幅
  printWidth: 80,            // 行幅
  singleQuote: false,        // ダブルクォート使用
  arrowParens: 'always',     // アロー関数の括弧
  bracketSpacing: true,      // オブジェクトリテラルのスペース
  semi: true,                // セミコロン使用
  endOfLine: 'lf',           // 改行コード
}
```

## ESLint ルール

### import順序
```
1. builtin (Node.js組み込み)
2. external (外部パッケージ)
3. internal (プロジェクト内部)
4. parent, sibling (相対パス)
5. index
6. object
7. type
```
- グループ間は空行で区切る
- アルファベット順（大文字小文字区別なし）

### 未使用変数
- 未使用のインポートはエラー
- `_` で始まる変数は無視される

### React Hooks
- `rules-of-hooks`: error
- `exhaustive-deps`: warn

## ファイル命名規則
- コンポーネント: PascalCase (`Button.tsx`, `BlogCard.astro`)
- ユーティリティ: camelCase (`utils.ts`, `constants.ts`)
- ページ: kebab-case または 動的ルート (`index.astro`, `[...slug].astro`)

## コンポーネント構成
- Astroコンポーネント: `.astro`
- Reactコンポーネント: `.tsx`
- shadcn/uiコンポーネント: `src/components/ui/`

## ユーティリティ関数

### `cn()` - クラス名結合
```typescript
import { cn } from "@/lib/utils";

cn("base-class", condition && "conditional-class", "another-class")
```

### `formatDate()` - 日付フォーマット
```typescript
import { formatDate } from "@/lib/utils";

formatDate(new Date()) // "2024年1月15日" (日本語形式)
```

### `calculateReadingTime()` - 読了時間計算
```typescript
import { calculateReadingTime } from "@/lib/utils";

calculateReadingTime(content) // 分数を返す
```
