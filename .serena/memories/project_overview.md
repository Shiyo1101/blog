# プロジェクト概要: Blog

## 目的
Astroフレームワークで構築された個人技術ブログサイト。IchigoJamに関連するコンテンツを含む。

## デプロイ先
- URL: https://uchii-blog.netlify.app
- ホスティング: Netlify

## 技術スタック

### フレームワーク
- **Astro** v5.x - メインフレームワーク（SSG）
- **React** v19.x - インタラクティブコンポーネント用
- **MDX** - ブログ記事のコンテンツ

### スタイリング
- **Tailwind CSS** v4.x - ユーティリティファーストCSS
- **shadcn/ui** (new-york スタイル) - UIコンポーネントライブラリ
- **Motion** (Framer Motion) - アニメーション

### その他の依存関係
- **Lucide React** - アイコン
- **class-variance-authority** + **clsx** + **tailwind-merge** - クラス名ユーティリティ
- **sharp** - 画像最適化

## プロジェクト構造

```
src/
├── assets/           # 静的アセット（画像など）
├── components/       # コンポーネント
│   ├── Base/         # 基本コンポーネント
│   ├── Blog/         # ブログ関連コンポーネント
│   ├── Top/          # トップページ用コンポーネント
│   └── ui/           # shadcn/ui コンポーネント
├── content/          # コンテンツ（ブログ記事）
│   ├── blog/         # MDX記事
│   └── config.ts     # コンテンツスキーマ定義
├── layouts/          # レイアウトコンポーネント
│   ├── BaseLayout.astro
│   ├── BlogLayout.astro
│   ├── GridLayout.astro
│   └── TopLayout.astro
├── lib/              # ユーティリティ関数
│   ├── utils.ts      # 共通ユーティリティ（cn, formatDate, calculateReadingTime）
│   └── constants.ts  # 定数（IchigoJam文字コード）
├── pages/            # ページルーティング
│   ├── index.astro   # トップページ
│   ├── license.astro # ライセンスページ
│   └── blog/         # ブログ関連ページ
└── styles/
    └── global.css    # グローバルスタイル

public/               # 静的ファイル（そのまま配信）
```

## ブログ記事スキーマ

```typescript
{
  title: string,
  pubDate: Date,
  description: string,
  topImage: ImageMetadata,
  tags?: string[] (2-10文字),
  draft?: boolean (default: false)
}
```

## パスエイリアス
- `@/*` → `src/*`
