# TASK-003: 認証機能

## Meta

| Key | Value |
|-----|-------|
| Status | done |
| Priority | critical |
| Type | feature |
| Branch | feature/TASK-003-authentication |
| Issue | - |

## Acceptance Criteria

- [x] /login ページにサインアップ・ログインフォームが表示される（タブで切替）
- [x] サインアップ: email + password + username でアカウント作成できる
- [x] ログイン: email + password でログインできる
- [x] ログイン後、/chat にリダイレクトされる
- [x] ログアウトボタンで認証解除・/login にリダイレクトされる
- [x] 未ログインで /chat にアクセスすると /login にリダイレクトされる（proxy.ts が処理）
- [x] フォームバリデーション（必須チェック、メール形式、パスワード長）

## Sub Tasks

- [x] src/app/(auth)/login/page.tsx 作成
- [x] src/components/auth/auth-form.tsx 作成（shadcn/ui: Tabs, Form, Input, Button）
- [x] src/app/actions/auth.ts 作成（Server Actions: signUp, signIn, signOut）
  - [x] signUp: Supabase Auth signUp → handle_new_user トリガー → prisma.profile.update(username)
  - [x] signIn: Supabase Auth signInWithPassword
  - [x] signOut: Supabase Auth signOut → /login にリダイレクト
- [x] Zod スキーマで入力バリデーション
- [x] ログイン後のリダイレクト（/chat）
- [x] src/app/(chat)/chat/page.tsx スタブ作成（ログアウトボタン付き）
- [ ] 動作確認: サインアップ → ログイン → ログアウトのフロー（pnpm dev で確認）

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
| 2026-05-07 | started | signUp/signIn/signOut Server Actions + AuthForm + ログインページ実装 |
| 2026-05-07 | completed | 全ファイル作成完了、TypeScript型チェック通過 |
