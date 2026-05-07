# Architecture

## System Overview

勉強会発表用リアルタイムチャットアプリ。Next.js (App Router) + Supabase + Prisma 構成。

```
Browser
  └── Next.js (App Router) — React UI, Server Components, Server Actions
        ├── Prisma Client ──────────────────── PostgreSQL (Supabase DB)
        └── Supabase JS Client
              ├── Auth ────────────────────── Supabase Auth
              ├── Realtime ──────────────── Supabase Realtime (WebSocket)
              └── Storage ───────────────── Supabase Storage (chat-images)
```

## 役割分担

| 機能 | 使うもの | 理由 |
|------|----------|------|
| DB CRUD | Prisma Client | 型安全なクエリ、TypeScript DX |
| 認証 | @supabase/supabase-js | Auth管理はSupabaseに委任 |
| リアルタイム | @supabase/supabase-js | Supabase Realtimeへの購読 |
| ファイル保存 | @supabase/supabase-js | Storage APIはSupabaseクライアント |

> ⚠️ PrismaはSupabase RLSをバイパス。Prismaは`DATABASE_URL`（接続プーラー）、マイグレーションは`DIRECT_URL`（直接接続）を使用。

## Data Model

```prisma
Profile {
  id        String (UUID)  // auth.users.id と同じ
  username  String
}

Channel {
  id        String (UUID)
  name      String (unique)
  createdBy String? (Profile.id)
}

Message {
  id        String (UUID)
  channelId String (Channel.id)
  userId    String (Profile.id)
  content   String?          // テキストなし（画像のみ）も可
  imageUrl  String?          // Supabase Storage の public URL
  createdAt DateTime
}
```

## Directory Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx         # サインアップ・ログイン
│   ├── (chat)/
│   │   └── chat/
│   │       └── page.tsx         # メインチャット
│   ├── layout.tsx
│   └── page.tsx                 # → /chat or /login にリダイレクト
├── components/
│   ├── auth/
│   │   └── auth-form.tsx
│   └── chat/
│       ├── channel-sidebar.tsx
│       ├── message-list.tsx
│       ├── message-input.tsx
│       └── message-item.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # createBrowserClient
│   │   ├── server.ts            # createServerClient (cookies)
│   │   └── middleware.ts        # updateSession
│   └── prisma.ts                # PrismaClient シングルトン
├── types/
│   └── index.ts
└── hooks/
    ├── use-channels.ts          # チャンネル一覧 + Realtime購読
    └── use-messages.ts          # メッセージ一覧 + Realtime購読

prisma/
├── schema.prisma
└── migrations/

middleware.ts                    # Next.js ミドルウェア（認証ガード）
```

## API Design

### Server Actions（書き込み系）

```
createChannel(name: string) → Channel
sendMessage({ channelId, content, imageUrl }) → Message
createProfile({ id, username }) → Profile
```

### Queries（読み込み系）

```
getChannels() → Channel[]             # 初期表示用 (Prisma)
getMessages(channelId) → Message[]    # 初期表示用 (Prisma)
```

### Realtime Subscriptions（リアルタイム）

```
channels:INSERT → チャンネルサイドバー更新
messages:INSERT → メッセージリスト更新 (channelId フィルタ)
```

## 環境変数

```
# Prisma (Supabase PostgreSQL)
DATABASE_URL=postgresql://...@...supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://...@...supabase.com:5432/postgres

# Supabase Client
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Supabase Storage
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # サーバーサイドのStorage操作に使用
```

## ローカル開発セットアップ

### 必要なもの
- Docker Desktop（Supabase ローカル環境に必要）

### 手順

```bash
# 1. 依存インストール
pnpm install

# 2. 環境変数設定
cp .env.local.example .env.local
# → ローカル開発用の値がそのまま使える（変更不要）

# 3. Supabase ローカル起動
pnpm supabase:start
# Docker でSupabase一式が起動する（初回は数分かかる）
# Studio: http://127.0.0.1:54323

# 4. Prisma でテーブル作成
pnpm db:migrate
# → prisma/migrations/ にマイグレーションファイルが生成される

# 5. Realtime 有効化（テーブル作成後に必要）
# supabase/seed.sql を手動で実行するか、Studio の SQL Editor で：
# ALTER PUBLICATION supabase_realtime ADD TABLE channels;
# ALTER PUBLICATION supabase_realtime ADD TABLE messages;

# 6. 開発サーバー起動
pnpm dev
# → http://localhost:3000
```

### リセット

```bash
# Prisma マイグレーションをリセット（テーブルを再作成）
pnpm db:reset

# Supabase 全体をリセット（seed.sql が再実行される）
# ※ seed.sql は prisma テーブルが存在する前提なので db:migrate 後に実行
pnpm supabase:reset
```

### 便利なツール

| ツール | URL |
|--------|-----|
| Supabase Studio | http://127.0.0.1:54323 |
| メール確認 (Inbucket) | http://127.0.0.1:54324 |
| Prisma Studio | `pnpm db:studio` |

## 本番環境セットアップ

1. Supabase ダッシュボードでプロジェクト作成
2. `.env.local` を本番の値に更新（コメントアウトされた本番用セクション参照）
3. `pnpm db:migrate` でテーブル作成
4. Supabase ダッシュボード → Realtime で channels・messages テーブルを有効化
5. Storage バケット `chat-images` は `config.toml` で自動設定済み（ローカルのみ）
   本番は手動でダッシュボードから作成
