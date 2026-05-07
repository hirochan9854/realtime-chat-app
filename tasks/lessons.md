# Lessons Learned

> このファイルはプロジェクトの「学習記憶」である。
> Claudeは以下のタイミングで必ずこのファイルを参照・更新する。

## Usage Rules（Claudeへの指示）

### 読むタイミング（MUST READ）

1. **セッション開始時**: /product-resume, /task-run, /task-start の冒頭で必ず読む
2. **タスク着手前**: そのタスクの labels, phase, 関連技術に該当する教訓をフィルタして確認
3. **実装計画作成時**: Plan Mode で計画を立てるとき、過去に同じパターンで失敗していないか確認

### 書くタイミング（MUST WRITE）

1. **ユーザーから修正指示を受けた時**: 即座に記録する。「あとで」ではなく「今」
2. **タスク完了時**: /task-done で「今回の学び」を振り返り、あれば記録
3. **レビューで指摘を受けた時**: 指摘パターンを記録
4. **デバッグで原因特定した時**: 根本原因と対策を記録

### 活用（MUST APPLY）

- 3回以上同じカテゴリの教訓が溜まったら → .claude/rules/ にルールとして昇格を提案
- 特定のファイル/ディレクトリに関する教訓 → そのディレクトリの CLAUDE.md に追記を提案
- 実装パターンの教訓 → design-system-docs や coding-standards への反映を提案

---

## Record Format

```
### L-XXX: {教訓タイトル}
- **Date:** {YYYY-MM-DD}
- **Category:** {design | implementation | architecture | review | figma | testing | performance}
- **Task:** {TASK-XXX or N/A}
- **Context:** {何をしていたか}
- **Mistake:** {何が間違っていたか / 何が期待と違ったか}
- **Correction:** {ユーザーからの修正内容}
- **Root Cause:** {なぜ間違えたか}
- **Prevention:** {次回から防ぐための具体的ルール}
- **Applied:** {false → ルール/docs に反映済みなら true に変更}
```

---

## Lessons

### L-001: Prisma v7 は schema.prisma から url/directUrl が廃止
- **Date:** 2026-05-07
- **Category:** architecture
- **Task:** TASK-001
- **Context:** `prisma generate` を実行したら P1012 エラー
- **Mistake:** `prisma/schema.prisma` の datasource に `url = env("DATABASE_URL")` を書いていた
- **Correction:** `url` と `directUrl` を schema.prisma から削除。`prisma.config.ts` で URL を管理
- **Root Cause:** Prisma v7 で datasource URL の管理場所が変更されたことを知らなかった
- **Prevention:** Prisma v7 では schema.prisma の datasource は `provider` のみ。URL は prisma.config.ts の `datasource.url` で指定。PrismaClient は `@prisma/adapter-pg` 経由で接続
- **Applied:** false

### L-003: prisma migrate dev より prisma db push で開発する
- **Date:** 2026-05-07
- **Category:** implementation
- **Task:** TASK-002
- **Context:** ローカル開発環境でのスキーマ反映方法の選択
- **Mistake:** `prisma migrate dev` でマイグレーションファイルを管理しようとした
- **Correction:** `prisma db push` を使用してスキーマを直接DBに反映
- **Root Cause:** デモアプリでは migration ファイル管理よりも素早いイテレーションが優先
- **Prevention:** ローカル開発・プロトタイプは `db:push`。本番マイグレーション管理が必要になったら `migrate dev` に切り替え
- **Applied:** false

### L-002: Prisma v7 は PrismaClient にドライバーアダプターが必要
- **Date:** 2026-05-07
- **Category:** implementation
- **Task:** TASK-001
- **Context:** Prisma v7 で PrismaClient をインスタンス化する際
- **Mistake:** `new PrismaClient()` だけでは動作しない
- **Correction:** `@prisma/adapter-pg` と `pg` をインストールし、`new PrismaClient({ adapter: new PrismaPg({ connectionString }) })` とする
- **Root Cause:** Prisma v7 からドライバーアダプターが必須になった
- **Prevention:** Prisma v7 プロジェクト開始時は必ず `@prisma/adapter-pg` + `pg` も一緒にインストール
- **Applied:** false
