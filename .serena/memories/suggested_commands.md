# 開発コマンド一覧

## 基本コマンド

| コマンド | 説明 |
|---------|------|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | 本番ビルド |
| `pnpm preview` | ビルド結果のプレビュー |

## コード品質

| コマンド | 説明 |
|---------|------|
| `pnpm lint` | ESLintによるコードチェック |
| `pnpm lint:fix` | ESLintの自動修正 |
| `pnpm format` | Prettier + ESLintによるフォーマット |

## shadcn/ui コンポーネント追加

```bash
pnpm dlx shadcn@latest add <component-name>
```

## システムコマンド (macOS/Darwin)

| コマンド | 説明 |
|---------|------|
| `ls -la` | ファイル一覧（詳細） |
| `cd <path>` | ディレクトリ移動 |
| `grep -r "<pattern>" .` | パターン検索 |
| `find . -name "<pattern>"` | ファイル検索 |

## Git コマンド

| コマンド | 説明 |
|---------|------|
| `git status` | 状態確認 |
| `git add .` | 全変更をステージング |
| `git commit -m "message"` | コミット |
| `git push origin <branch>` | リモートにプッシュ |
| `git pull origin <branch>` | リモートからプル |
| `git checkout -b <branch>` | 新しいブランチを作成して切り替え |
