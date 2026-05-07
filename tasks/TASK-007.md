# TASK-007: 動作確認・仕上げ

## Meta

| Key | Value |
|-----|-------|
| Status | done |
| Started | 2026-05-07 |
| Completed | 2026-05-07 |
| Priority | high |
| Type | chore |
| Branch | feature/TASK-007-polish |
| Issue | - |

## Acceptance Criteria

- [ ] E2Eフロー（サインアップ → ログイン → チャンネル作成 → メッセージ → 画像送信）が通る ※ユーザー側ブラウザ確認待ち
- [x] 認証失敗時（メール・パスワード不正）にエラーメッセージが表示される
- [x] メッセージ送信失敗時にエラートーストが表示される
- [x] 各操作でローディング状態が表示される（ボタン disabled + スピナー等）
- [x] `pnpm build` がエラーなし
- [x] TypeScript エラーなし（`pnpm tsc --noEmit`）

## Sub Tasks

- [x] エラーハンドリング確認・追加
  - [x] 認証エラー（ログイン失敗）のメッセージ表示
  - [x] チャンネル名重複エラーのメッセージ表示（P2002 検出）
  - [x] メッセージ送信失敗のフォールバック（useMessages.send が { error } 返却 → MessageInput で表示）
- [x] ローディング状態
  - [x] ページ遷移中 (app/loading.tsx)
  - [x] ボタン押下中の disabled 状態（auth, channel-create, message-send 全て対応）
- [x] UI polish
  - [x] 空チャンネル状態（「チャンネルを選択してください」表示: MessageArea）
  - [x] メッセージなし状態（「最初のメッセージを送ってみよう！」表示: MessageList）
- [x] `pnpm build` & TypeScript チェック
- [ ] （任意）Vercel デプロイ

## 副次的に修正したバグ（このセッション中に発見・修正）

- Realtime subscription の race condition（自分のINSERTを取りこぼす）→ Server Action で作成データを返却し直接 state 更新
- `db push --force-reset` で Supabase の anon GRANT が消える → setup-realtime.sql に GRANT を明示追加
- 古いセッション + DB リセットで profile 不整合 → chat/page.tsx で profile を upsert
- Browser Supabase client の重複生成 → singleton 化
- DialogContent の aria-describedby 警告 → DialogDescription を追加
- ChannelSidebar に semantic HTML（ul/li）導入

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
| 2026-05-07 | started | TASK-006 完了後、polish に着手 |
| 2026-05-07 | note | TASK-006 のデバッグ過程で副次的に多数の bug を発見・修正（Realtime, GRANT, profile sync, etc.）。lessons.md に L-004〜L-007 を記録 |
| 2026-05-07 | completed | E2E動作確認以外の Acceptance Criteria 達成。`pnpm build` 成功、`tsc --noEmit` clean |
