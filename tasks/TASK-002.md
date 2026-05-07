# TASK-002: Supabase + Prismaセットアップ

## Meta

| Key | Value |
|-----|-------|
| Status | todo |
| Priority | critical |
| Type | infra |
| Branch | feature/TASK-002-supabase-prisma-setup |
| Issue | - |

## Acceptance Criteria

- [ ] Supabaseプロジェクトが作成されており、接続情報が .env.local に設定されている
- [ ] `prisma migrate dev` でテーブルが作成される（profiles / channels / messages）
- [ ] prisma.config.ts が配置されており、defineConfig で設定されている
- [ ] Supabase Realtime が channels・messages テーブルで有効化されている
- [ ] Storage バケット `chat-images` が作成されている（Public）
- [ ] `prisma generate` でクライアントが生成される

## Sub Tasks

- [ ] Supabaseダッシュボードでプロジェクト作成
- [ ] .env.local に DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY を設定
- [ ] `pnpm db:migrate` でマイグレーション実行（profiles, channels, messages テーブル作成）
- [ ] Supabaseダッシュボード → Database → Replication → channels, messages を有効化
- [ ] Supabaseダッシュボード → Storage → `chat-images` バケット作成（Public: true）
- [ ] Storage ポリシー設定（認証済みユーザーのみアップロード可、全員READ可）
- [ ] `pnpm db:studio` で Prisma Studio 確認

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |

## 注意事項

- SupabaseのConnection Pooling URLを DATABASE_URL に設定（`?pgbouncer=true` 付き）
- Direct URLを DIRECT_URL に設定（マイグレーション用）
- Supabase の接続情報は Project Settings → Database から確認
