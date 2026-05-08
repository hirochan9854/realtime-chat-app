#!/usr/bin/env bash
# 本番Supabase へのスキーマ・Realtime・Storage セットアップを一撃で適用する
# 前提: .env.production.local に DATABASE_URL / DIRECT_URL が定義されていること
set -euo pipefail

if [ ! -f .env.production.local ]; then
  echo "Error: .env.production.local が見つかりません" >&2
  exit 1
fi

# .env.production.local を読み込んで export する
set -a
. ./.env.production.local
set +a

if [ -z "${DIRECT_URL:-}" ]; then
  echo "Error: DIRECT_URL が設定されていません" >&2
  exit 1
fi

echo "→ Prisma スキーマを本番に push..."
npx prisma db push

echo "→ Realtime publication と GRANT を設定..."
psql "$DIRECT_URL" -f supabase/setup-realtime.sql

echo "→ Storage バケットと RLS ポリシーを設定..."
psql "$DIRECT_URL" -f supabase/setup-storage.sql

echo "✓ 本番セットアップ完了"
