# TASK-006: 画像送信機能

## Meta

| Key | Value |
|-----|-------|
| Status | todo |
| Priority | medium |
| Type | feature |
| Branch | feature/TASK-006-image-upload |
| Issue | - |

## Acceptance Criteria

- [ ] メッセージ入力欄に画像アップロードボタン（クリップアイコン等）がある
- [ ] 画像ファイルを選択してアップロードできる（jpeg/png/gif）
- [ ] アップロード中はローディング表示される
- [ ] アップロード完了後、画像がメッセージとしてリアルタイムで送信される
- [ ] メッセージ一覧で画像がインライン表示される

## Sub Tasks

- [ ] src/components/chat/message-input.tsx に画像アップロードボタン追加
  - [ ] input[type=file] で画像選択（hidden + label でトリガー）
  - [ ] Supabase Storage にアップロード（`chat-images` バケット）
  - [ ] アップロード後、public URL を取得
  - [ ] sendMessage に imageUrl として渡す
- [ ] src/components/chat/message-item.tsx に画像表示追加
  - [ ] imageUrl がある場合、Next.js Image コンポーネントで表示
  - [ ] content が null で imageUrl のみのメッセージも正しく表示
- [ ] src/app/actions/messages.ts の sendMessage で imageUrl を受け取れるよう更新
- [ ] 動作確認: 画像選択 → アップロード → メッセージとして表示

## Progress Log

| Date | Action | Note |
|------|--------|------|
| 2026-05-07 | created | タスク作成 |
