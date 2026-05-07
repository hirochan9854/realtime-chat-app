# Project: Realtime Chat App

## WHY — Purpose

Supabase（Auth/Database/Realtime/Storage）の活用デモを目的とした、勉強会発表用リアルタイムチャットアプリ。ポートフォリオ・学習目的で、Next.js App Router + Prisma + Supabase の組み合わせを実践する。

## WHAT — Repo Map

```
src/

├── components/       # 共通UI (ロジックなし)
├── lib/              # 外部サービス連携
├── hooks/ constants/ types/ utils/ styles/

├── app/              # Next.js App Router (api/, (dashboard)/)
├── features/         # Feature単位 ({service}/{feature}/ → components, actions, queries, validation, types)
├── domain/models/    # ピュアモデル + Repositoryインターフェース
├── repositories/     # Repository実装 (Prisma)

docs/                 # spec/, architecture.md, adr/
tasks/                # TASK-XXX.md (single source of truth), lessons.md
.claude/              # agents, skills, rules, hooks, commands
```


## Architecture (CQRS)
- Read: Server Component → Repository or queries.ts → Prisma
- Write: Server Action → Zod → Repository → Prisma → revalidatePath
- Repository Mock パターンでUI先行開発を支援


## HOW — Rules

### Tech Stack
TypeScript strict
, Next.js 16 (App Router, cacheComponents), Tailwind v4, Prisma v7 (PostgreSQL multi-schema, prisma.config.ts), shadcn/ui, react-hook-form + Zod, Biome, Vitest, Playwright


### Dev Flow
共通Component → ページUI(mockdata) → 動的化(実データ)


### Key Rules (details in .claude/rules/)
- `git add -A` 禁止 — 変更ファイルを個別にステージ
- ライブラリのAPI・設定で迷ったら Context7 MCP で最新ドキュメントを確認。自分の知識よりドキュメントを優先
- tasks/lessons.md: セッション開始時に確認、修正を受けたら即記録、3回同カテゴリ→rules/昇格

- CQRS境界: features/ 以外から features/ をimportしない
- shadcn/ui First: そのまま使う → 拡張 → 自作の順
- Repository Mock: UI先行開発 → 実DB切替
- next.config.ts: `cacheComponents: true` を必ず設定（Next.js 16 では `experimental.dynamicIO` の後継）
- prisma.config.ts: Prisma v7 では `defineConfig` を使った設定ファイルが必要。`schema.prisma` の datasource URL は `prisma.config.ts` の `datasource.url` で上書きされる


### Context Management
- Long session禁止。Split: investigate → plan → execute
- 3+ steps → Plan mode (Shift+Tab)
- 調査はサブエージェントに委譲


### Skills
/product-start, /product-resume, /add-feature, /status, /task-plan, /task-start, /task-done, /bug-fix, /review, /setup, /pre-deploy
, /db-schema, /domain-model, /nextjs, /prisma, /shadcn, /tailwind, /vitest, /playwright


### Commands
/commit, /plan, /learn, /diff, /guard, /task-run, /task-list, /init
, /check, /ds-gen, /update-docs


### MCP Servers
GitHub (PR/Issue), Context7 (最新ドキュメント), Figma (デザイン), Playwright (E2E), PostgreSQL (DB), Memory (セッション間記憶)

