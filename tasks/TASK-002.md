# TASK-002: Supabase + Prismaセットアップ

## Meta

| Key | Value |
|-----|-------|
| Status | done |
| Priority | critical |
| Type | infra |
| Branch | feature/TASK-002-supabase-prisma-setup |
| Issue | - |

## Acceptance Criteria

- [x] Supabaseプロジェクトが作成されており、接続情報が .env.local に設定されている
- [x] `prisma db push` でテーブルが作成される（profiles / channels / messages）
- [x] prisma.config.ts が配置されており、defineConfig で設定されている
- [x] Supabase Realtime が channels・messages テーブルで有効化されている
- [x] Storage バケット `chat-images` が作成されている（Public）
- [x] `prisma generate` でクライアントが生成される

## Sub Tasks

- [x] ローカルSupabase起動（npx supabase start）
- [x] .env.local に DATABASE_URL, DIRECT_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY を設定
- [x] `pnpm db:push` でスキーマ反映（profiles, channels, messages テーブル作成）
- [x] psqlでプロフィール自動作成トリガー設定（handle_new_user）
- [x] Supabase Realtime 有効化（ALTER PUBLICATION supabase_realtime ADD TABLE channels/messages）
- [x] Storage バケット `chat-images` 作成（config.toml経由で自動作成）
- [x] Storage ポリシー設定（認証済みユーザーのみアップロード可、全員READ可）
- [x] `pnpm db:generate` でPrismaクライアント再生成

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
| 2026-05-07 | started | ローカルSupabase起動 → db push → プロフィールトリガー追加 |
| 2026-05-07 | completed | db:push成功、トリガー/Realtime/Storageポリシー設定完了 |

## 注意事項

- SupabaseのConnection Pooling URLを DATABASE_URL に設定（`?pgbouncer=true` 付き）
- Direct URLを DIRECT_URL に設定（マイグレーション用）
- Supabase の接続情報は Project Settings → Database から確認
