# TASK-004: チャンネル機能UI

## Meta

| Key | Value |
|-----|-------|
| Status | in-progress |
| Priority | high |
| Type | feature |
| Branch | feature/TASK-004-channel-ui |
| Issue | - |

## Acceptance Criteria

- [ ] /chat のサイドバーにチャンネル一覧が表示される
- [ ] チャンネル作成ボタン（+ New Channel）でダイアログが開く
- [ ] チャンネル名を入力して作成できる
- [ ] 新しいチャンネルがリアルタイムでサイドバーに反映される（Supabase Realtime）
- [ ] チャンネルをクリックして選択でき、選択中はハイライト表示される

## Sub Tasks

- [x] src/app/(chat)/chat/page.tsx 作成（Server Component: 初期チャンネル一覧 Prisma で取得）
- [x] src/components/chat/channel-sidebar.tsx 作成
  - [x] チャンネル一覧表示
  - [x] チャンネル選択（クリック）
  - [x] 選択中チャンネルのハイライト
- [x] チャンネル作成ダイアログ（shadcn/ui: Dialog, Input, Button）
- [x] src/hooks/use-channels.ts 作成
  - [x] Supabase Realtime で channels テーブル INSERT を購読
  - [x] 新チャンネル追加時にリストを更新
- [x] src/app/actions/channels.ts 作成（createChannel Server Action）
- [ ] 動作確認: チャンネル作成 → 別タブで即時反映

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
| 2026-05-07 | started | 実装開始 |
