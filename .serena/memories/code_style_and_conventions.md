# コードスタイルとコンベンション

## TypeScript設定
- **厳格モード**: `astro/tsconfigs/strict` を継承
- `any`/`unknown` 型の使用禁止
- `class` はエラー拡張などの必要な場合のみ使用

## Biome設定 (biome.json)

### フォーマッター
```json
{
  "formatter": {
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80,
    "lineEnding": "lf"
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "trailingCommas": "all",
      "semicolons": "always",
      "arrowParentheses": "always",
      "bracketSpacing": true
    }
  }
}
```

### リンター
- recommendedルールを有効化
- `noUnusedImports`: error（Astroファイルは除外）
- `noUnusedVariables`: warn（Astroファイルは除外）
- `useExhaustiveDependencies`: warn
- `useHookAtTopLevel`: error
- `noExplicitAny`: error
- Tailwind CSSディレクティブ対応

### import順序
- Biomeの`organizeImports`による自動ソート
- アルファベット順

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
