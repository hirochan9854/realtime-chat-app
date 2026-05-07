# Requirements

## Functional Requirements

### FR-001: ユーザー認証
- **Priority:** Must
- **Description:** Email + パスワードによるサインアップ・ログイン・ログアウト（Supabase Auth）
- **Acceptance Criteria:**
  - [ ] サインアップ時にメール・パスワード・ユーザー名を入力できる
  - [ ] ログイン成功後、チャット画面に遷移する
  - [ ] 未認証ユーザーは `/login` にリダイレクトされる
  - [ ] ログアウトで認証状態がクリアされる

### FR-002: チャンネル管理
- **Priority:** Must
- **Description:** ユーザーが自由にチャンネルを作成し、切り替えられる
- **Acceptance Criteria:**
  - [ ] チャンネル一覧がサイドバーに表示される
  - [ ] チャンネル名を入力して新規作成できる
  - [ ] 作成したチャンネルがリアルタイムでサイドバーに反映される（Supabase Realtime）
  - [ ] チャンネルを選択してメッセージエリアを切り替えられる

### FR-003: リアルタイムメッセージ
- **Priority:** Must
- **Description:** テキストメッセージをリアルタイムで送受信（Supabase Realtime）
- **Acceptance Criteria:**
  - [ ] テキストメッセージを送信できる
  - [ ] 新着メッセージが全接続ユーザーにリアルタイムで表示される
  - [ ] 送信者名・送信時刻が表示される
  - [ ] 新メッセージで自動スクロールされる

### FR-004: 画像送信
- **Priority:** Should
- **Description:** チャットに画像を添付して送信（Supabase Storage）
- **Acceptance Criteria:**
  - [ ] 画像ファイルを選択してアップロードできる
  - [ ] アップロード完了後、画像URLがメッセージに含まれる
  - [ ] メッセージ一覧で画像がインライン表示される

---

## Non-Functional Requirements

### NFR-001: PC対応
- **Category:** Accessibility
- **Description:** PCブラウザ（Chrome, Safari, Firefox）で正常動作すること
- **Metric:** 主要3ブラウザで動作確認

### NFR-002: リアルタイム性
- **Category:** Performance
- **Description:** メッセージ送信後、他ユーザーへの反映が1秒以内
- **Metric:** Supabase Realtime WebSocket 遅延 < 1000ms

### NFR-003: TypeScript strict
- **Category:** Code Quality
- **Description:** TypeScript strict モードを有効化し、型安全なコードを維持する
- **Metric:** `tsc --noEmit` がエラーなし
