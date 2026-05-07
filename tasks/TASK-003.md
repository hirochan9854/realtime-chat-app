# TASK-003: 認証機能

## Meta

| Key | Value |
|-----|-------|
| Status | todo |
| Priority | critical |
| Type | feature |
| Branch | feature/TASK-003-authentication |
| Issue | - |

## Acceptance Criteria

- [ ] /login ページにサインアップ・ログインフォームが表示される（タブで切替）
- [ ] サインアップ: email + password + username でアカウント作成できる
- [ ] ログイン: email + password でログインできる
- [ ] ログイン後、/chat にリダイレクトされる
- [ ] ログアウトボタンで認証解除・/login にリダイレクトされる
- [ ] 未ログインで /chat にアクセスすると /login にリダイレクトされる
- [ ] フォームバリデーション（必須チェック、メール形式、パスワード長）

## Sub Tasks

- [ ] src/app/(auth)/login/page.tsx 作成
- [ ] src/components/auth/auth-form.tsx 作成（shadcn/ui: Tabs, Form, Input, Button）
- [ ] src/app/actions/auth.ts 作成（Server Actions: signUp, signIn, signOut）
  - [ ] signUp: Supabase Auth signUp → profiles テーブルに Prisma でINSERT
  - [ ] signIn: Supabase Auth signInWithPassword
  - [ ] signOut: Supabase Auth signOut → /login にリダイレクト
- [ ] Zod スキーマで入力バリデーション
- [ ] ログイン後のリダイレクト（/chat）
- [ ] 動作確認: サインアップ → ログイン → ログアウトのフロー

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
