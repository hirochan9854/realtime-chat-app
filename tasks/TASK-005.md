# TASK-005: メッセージ機能UI

## Meta

| Key | Value |
|-----|-------|
| Status | todo |
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

- [ ] src/components/chat/message-list.tsx 作成
  - [ ] メッセージ一覧を表示
  - [ ] 自動スクロール（useRef + scrollIntoView）
- [ ] src/components/chat/message-item.tsx 作成
  - [ ] 送信者名（profile.username）表示
  - [ ] 送信時刻（createdAt）表示
  - [ ] メッセージ内容（content）表示
- [ ] src/components/chat/message-input.tsx 作成
  - [ ] テキスト入力フォーム
  - [ ] Enter キーで送信
- [ ] src/hooks/use-messages.ts 作成
  - [ ] 選択チャンネルのメッセージ取得（Prisma）
  - [ ] Supabase Realtime で messages テーブル INSERT を購読
  - [ ] 新メッセージをリストに追加
- [ ] src/app/actions/messages.ts 作成（sendMessage Server Action）
- [ ] 動作確認: 2タブで同時にメッセージ送受信

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
