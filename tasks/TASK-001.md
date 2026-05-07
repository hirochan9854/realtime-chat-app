# TASK-001: プロジェクトセットアップ

## Meta

| Key | Value |
|-----|-------|
| Status | done |
| Priority | critical |
| Type | infra |
| Branch | feature/TASK-001-project-setup |
| Issue | - |

## Acceptance Criteria

- [x] Next.js App Router が `pnpm dev` で起動する
- [x] shadcn/ui が初期化されており、Button コンポーネントが使える
- [x] Supabase パッケージ（@supabase/supabase-js, @supabase/ssr）がインストール済み
- [x] Prisma パッケージがインストール済み
- [x] `.env.local.example` が用意されており、必要な環境変数が分かる
- [x] middleware.ts が配置されており、未認証時に /login へリダイレクトされる
- [x] lib/supabase/client.ts, server.ts が用意されている
- [x] lib/prisma.ts シングルトンが用意されている

## Sub Tasks

- [x] package.json の name を `realtime-chat-app` に更新
- [x] shadcn/ui を `npx shadcn@latest init` で初期化
- [x] .env.local.example を作成（DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY）
- [x] src/lib/supabase/client.ts 作成（createBrowserClient）
- [x] src/lib/supabase/server.ts 作成（createServerClient with cookies）
- [x] src/lib/supabase/middleware.ts 作成（updateSession）
- [x] middleware.ts をプロジェクトルートに作成（認証ガード）
- [x] src/lib/prisma.ts 作成（PrismaClient シングルトン）
- [x] src/types/index.ts 作成（共通型定義）
- [x] `pnpm dev` で起動確認

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
| 2026-05-07 | started | 実装開始。product-start で90%完了済み。残り: pnpm allow-build, prisma generate, shadcn button, dev確認 |
| 2026-05-07 | completed | Prisma v7 対応（schema.prisma から url 廃止、@prisma/adapter-pg 導入）、prisma generate 成功、TypeScript エラーなし |
