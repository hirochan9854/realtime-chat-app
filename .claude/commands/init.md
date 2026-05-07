層のインストールを実行する。

$ARGUMENTS に応じて対応する層をインストール:

- `design` — デザイン創出能力（Anti-AI, DS構築, Figma連携, ページデザイン等）
- `stack-service` — Webサービス技術スタック（Next.js, Prisma, shadcn, Vitest, Playwright, Biome等）
- `stack-site` — LP/Webサイト技術スタック（Astro等、将来対応）
- `status` — インストール済み層の確認

例: `/init design`, `/init stack-service`

## 処理

<!-- TODO: CLI公開後は `npx @ts-workflow/cli add $ARGUMENTS` に置き換える -->
`.claude/ts-workflow-source` からソースリポジトリのパスを読み取り、ローカルスクリプトで層を追加する。

```bash
REPO_ROOT=$(cat .claude/ts-workflow-source)
bash "$REPO_ROOT/scripts/add.sh" $ARGUMENTS .
```

スクリプトが以下を行う:
1. ソースリポジトリから指定された層のディレクトリを取得
2. .claude/ の中身をプロジェクトの .claude/ にマージ
3. 開発環境ファイル（src/, tests/, configs等）があればプロジェクトルートに配置
4. claude-md/ のファイルを番号順に結合して CLAUDE.md を生成/更新
5. layers.lock を更新
6. package.json が配置された場合、`pnpm install` を実行するか確認

## インストール後: バージョン確認（MANDATORY）

`stack-service` など package.json を含む層をインストールしたら、必ず以下を実施する:

1. package.json の全依存ライブラリを列挙する
2. Context7 `resolve-library-id` で各ライブラリの最新メジャーバージョンを確認する
3. テンプレートより新しいメジャーバージョンがあれば package.json を更新する
4. メジャーバージョンアップは `query-docs` で破壊的変更を確認し、必要なら設定ファイルも更新する
5. 更新後に `pnpm install` を実行する

**理由:** テンプレートファイルは陳腐化する。自前知識でバージョンを判断しない。
