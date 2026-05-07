# TASK-007: 動作確認・仕上げ

## Meta

| Key | Value |
|-----|-------|
| Status | todo |
| Priority | high |
| Type | chore |
| Branch | feature/TASK-007-polish |
| Issue | - |

## Acceptance Criteria

- [ ] E2Eフロー（サインアップ → ログイン → チャンネル作成 → メッセージ → 画像送信）が通る
- [ ] 認証失敗時（メール・パスワード不正）にエラーメッセージが表示される
- [ ] メッセージ送信失敗時にエラートーストが表示される
- [ ] 各操作でローディング状態が表示される（ボタン disabled + スピナー等）
- [ ] `pnpm build` がエラーなし
- [ ] TypeScript エラーなし（`pnpm tsc --noEmit`）

## Sub Tasks

- [ ] エラーハンドリング確認・追加
  - [ ] 認証エラー（ログイン失敗）のメッセージ表示
  - [ ] チャンネル名重複エラーのメッセージ表示
  - [ ] メッセージ送信失敗のフォールバック
- [ ] ローディング状態
  - [ ] ページ遷移中 (Next.js loading.tsx)
  - [ ] ボタン押下中の disabled 状態
- [ ] UI polish
  - [ ] 空チャンネル状態（「チャンネルを選択してください」表示）
  - [ ] メッセージなし状態（「最初のメッセージを送ってみよう！」表示）
- [ ] `pnpm build` & TypeScript チェック
- [ ] （任意）Vercel デプロイ

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
