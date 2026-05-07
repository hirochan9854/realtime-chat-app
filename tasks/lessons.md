# Lessons Learned

> このファイルはプロジェクトの「学習記憶」である。
> Claudeは以下のタイミングで必ずこのファイルを参照・更新する。

## Usage Rules（Claudeへの指示）

### 読むタイミング（MUST READ）

1. **セッション開始時**: /product-resume, /task-run, /task-start の冒頭で必ず読む
2. **タスク着手前**: そのタスクの labels, phase, 関連技術に該当する教訓をフィルタして確認
3. **実装計画作成時**: Plan Mode で計画を立てるとき、過去に同じパターンで失敗していないか確認

### 書くタイミング（MUST WRITE）

1. **ユーザーから修正指示を受けた時**: 即座に記録する。「あとで」ではなく「今」
2. **タスク完了時**: /task-done で「今回の学び」を振り返り、あれば記録
3. **レビューで指摘を受けた時**: 指摘パターンを記録
4. **デバッグで原因特定した時**: 根本原因と対策を記録

### 活用（MUST APPLY）

- 3回以上同じカテゴリの教訓が溜まったら → .claude/rules/ にルールとして昇格を提案
- 特定のファイル/ディレクトリに関する教訓 → そのディレクトリの CLAUDE.md に追記を提案
- 実装パターンの教訓 → design-system-docs や coding-standards への反映を提案

---

## Record Format

```
### L-XXX: {教訓タイトル}
- **Date:** {YYYY-MM-DD}
- **Category:** {design | implementation | architecture | review | figma | testing | performance}
- **Task:** {TASK-XXX or N/A}
- **Context:** {何をしていたか}
- **Mistake:** {何が間違っていたか / 何が期待と違ったか}
- **Correction:** {ユーザーからの修正内容}
- **Root Cause:** {なぜ間違えたか}
- **Prevention:** {次回から防ぐための具体的ルール}
- **Applied:** {false → ルール/docs に反映済みなら true に変更}
```

---

## Lessons

### L-001: Prisma v7 は schema.prisma から url/directUrl が廃止
- **Date:** 2026-05-07
- **Category:** architecture
- **Task:** TASK-001
- **Context:** `prisma generate` を実行したら P1012 エラー
- **Mistake:** `prisma/schema.prisma` の datasource に `url = env("DATABASE_URL")` を書いていた
- **Correction:** `url` と `directUrl` を schema.prisma から削除。`prisma.config.ts` で URL を管理
- **Root Cause:** Prisma v7 で datasource URL の管理場所が変更されたことを知らなかった
- **Prevention:** Prisma v7 では schema.prisma の datasource は `provider` のみ。URL は prisma.config.ts の `datasource.url` で指定。PrismaClient は `@prisma/adapter-pg` 経由で接続
- **Applied:** false

### L-003: prisma migrate dev より prisma db push で開発する
- **Date:** 2026-05-07
- **Category:** implementation
- **Task:** TASK-002
- **Context:** ローカル開発環境でのスキーマ反映方法の選択
- **Mistake:** `prisma migrate dev` でマイグレーションファイルを管理しようとした
- **Correction:** `prisma db push` を使用してスキーマを直接DBに反映
- **Root Cause:** デモアプリでは migration ファイル管理よりも素早いイテレーションが優先
- **Prevention:** ローカル開発・プロトタイプは `db:push`。本番マイグレーション管理が必要になったら `migrate dev` に切り替え
- **Applied:** false

### L-002: Prisma v7 は PrismaClient にドライバーアダプターが必要
- **Date:** 2026-05-07
- **Category:** implementation
- **Task:** TASK-001
- **Context:** Prisma v7 で PrismaClient をインスタンス化する際
- **Mistake:** `new PrismaClient()` だけでは動作しない
- **Correction:** `@prisma/adapter-pg` と `pg` をインストールし、`new PrismaClient({ adapter: new PrismaPg({ connectionString }) })` とする
- **Root Cause:** Prisma v7 からドライバーアダプターが必須になった
- **Prevention:** Prisma v7 プロジェクト開始時は必ず `@prisma/adapter-pg` + `pg` も一緒にインストール
- **Applied:** false

### L-004: prisma db push --force-reset は Supabase の anon/authenticated GRANT を消去する
- **Date:** 2026-05-07
- **Category:** architecture
- **Task:** TASK-007
- **Context:** Supabase Realtime の `postgres_changes` を購読しているのに、INSERT イベントの `payload.new` が空オブジェクトになる現象
- **Mistake:** `prisma db push --force-reset` で DB をリセットすると、Supabase ローカル開発環境が初期化時にセットしていた `GRANT SELECT ON public.* TO anon, authenticated` が一緒に消える。anon ロールが行を読めないので Realtime payload が空になる
- **Correction:** `setup-realtime.sql` に `GRANT SELECT ON public.{channels,messages,profiles} TO anon, authenticated` を明示的に書く。`db:setup` で必ず再付与
- **Root Cause:** `--force-reset` は public スキーマを DROP CASCADE するため、スキーマ依存の権限も全部消える。Supabase の初期化スクリプトは初回 `supabase start` のときだけ走るので、Prisma 側で reset するたびに再設定が必要
- **Prevention:** Supabase + Prisma を併用するプロジェクトでは、`db:setup` の SQL に anon/authenticated の GRANT を必ず含める。Realtime payload が空のときは GRANT を疑う
- **Applied:** false

### L-005: Server Action の revalidatePath 後、Realtime subscription が race condition で自分の INSERT を取りこぼす
- **Date:** 2026-05-07
- **Category:** implementation
- **Task:** TASK-007
- **Context:** チャンネル作成時、自分が作ったチャンネルが Realtime 経由で UI に反映されず、リロードしないと出てこない
- **Mistake:** Server Action 内で `revalidatePath('/chat')` を呼ぶと、Next.js の router refresh で client component が一瞬 re-mount され、`useEffect([])` 内の Realtime subscription が cleanup → 再 subscribe される。しかしその間に既に Postgres から INSERT イベントが配信済みなので、新しい subscription はそのイベントを受け取れない
- **Correction:** 自分のアクションで作ったエンティティは Realtime に頼らず、Server Action のレスポンスで作成データを返却し、client 側で直接 state に反映する。Realtime は「他ユーザーの変更を受け取る」ためにだけ使う
- **Root Cause:** Realtime subscription はリアルタイムストリームで、過去のイベントを replay しない。subscribe するタイミングがイベント発火後だと取りこぼす
- **Prevention:** `createChannel` のような mutation 系の Server Action は `{ success: true }` ではなく `{ entity: ... }` を返すパターンに統一。client 側で `addEntity(state.entity)` のように直接 state を更新する
- **Applied:** false

### L-006: Supabase auth.users と profiles テーブルの同期が外れる対策は server component 側で upsert
- **Date:** 2026-05-07
- **Category:** architecture
- **Task:** TASK-007
- **Context:** DB を `--force-reset` した後、ブラウザの cookie に残った古いセッションでアクセスすると、`auth.users` には user がいるが `profiles` テーブルが空のため `messages.user_id → profiles.id` の外部キー違反でメッセージ送信が失敗する
- **Mistake:** sign up 時にしか profile を作らない設計だと、auth.users と profiles の同期外れ（DB reset, トリガー削除, etc.）に対応できない
- **Correction:** chat ページの server component で `prisma.profile.upsert({ where: { id: user.id }, update: {}, create: { id, username: emailLocal } })` を実行。プロフィールが無ければ自動作成
- **Root Cause:** Supabase Auth スキーマと public スキーマは独立しており、auth 操作と DB 操作の間に保証されたトランザクション境界がない。トリガー削除 + DB reset で容易に同期が壊れる
- **Prevention:** auth user → DB profile のマッピングが必要なアプリでは、保護されたページの entry point（server component）で profile の存在を確認・自動作成する。sign up の create だけに頼らない
- **Applied:** false

### L-007: useActionState / Server Action 系で silent error swallow に注意
- **Date:** 2026-05-07
- **Category:** implementation
- **Task:** TASK-007
- **Context:** メッセージ送信が失敗してもエラーが画面に出ず、ユーザーには「何も起きてない」ように見える
- **Mistake:** `useMessages.send` が `sendMessage` の結果を `r.message` だけ見て、`r.error` を完全に無視。`MessageInput` 側も `await onSend()` の戻り値を捨てていた
- **Correction:** mutation 系の hook は `Promise<{ error?: string }>` を返すように統一。UI 側で `r.error` を表示
- **Root Cause:** Server Action のレスポンス型を `{ message?, error? }` のような discriminated union にしておきながら、呼び出し側が片方しか見ないと TypeScript ではエラーにならず silent fail する
- **Prevention:** mutation 系 Server Action のレスポンスは必ず両方ハンドリング。hook も同じ型で返す。lint ルールで `await onSend()` の戻り値破棄を禁止すると尚良
- **Applied:** false
