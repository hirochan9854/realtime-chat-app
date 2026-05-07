# TASK-005: メッセージ機能UI

## Meta

| Key | Value |
|-----|-------|
| Status | in-progress |
| Priority | high |
| Type | feature |
| Branch | feature/TASK-005-message-ui |
| Issue | - |

## Acceptance Criteria

- [ ] 選択中チャンネルのメッセージ一覧が表示される
- [ ] 送信者名・送信時刻・メッセージ内容が表示される
- [ ] テキストを入力して Enter キーで送信できる
- [ ] 送信後、即座にメッセージが表示される（楽観的更新）
- [ ] 別タブ・別ブラウザのユーザーにもリアルタイムで反映される（Supabase Realtime）
- [ ] 新しいメッセージが届くと自動スクロールされる

## Sub Tasks

- [x] src/components/chat/message-list.tsx 作成
  - [x] メッセージ一覧を表示
  - [x] 自動スクロール（useRef + scrollIntoView）
- [x] src/components/chat/message-item.tsx 作成
  - [x] 送信者名（profile.username）表示
  - [x] 送信時刻（createdAt）表示
  - [x] メッセージ内容（content）表示
- [x] src/components/chat/message-input.tsx 作成
  - [x] テキスト入力フォーム
  - [x] Enter キーで送信
- [x] src/hooks/use-messages.ts 作成
  - [x] 選択チャンネルのメッセージ取得（Server Action）
  - [x] Supabase Realtime で messages テーブル INSERT を購読
  - [x] 新メッセージをリストに追加
- [x] src/app/actions/messages.ts 作成（fetchMessages / fetchMessageById / sendMessage）
- [ ] 動作確認: 2タブで同時にメッセージ送受信

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
| 2026-05-07 | started | 実装開始 |
