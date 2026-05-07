# Context Notes

## プロジェクト背景

勉強会での発表デモ用に作成するリアルタイムチャットアプリ。
Supabase の各機能（Auth / Database / Realtime / Storage）をすべて使い、
機能の活用例をポートフォリオ・学習目的として示すことが目的。

## 制約・前提条件

- 今週中（〜7日以内）に完成させる必要がある → スピード重視
- デモ用途のため大規模スケーリングは不要（数人〜数十人規模）
- PCブラウザのみ対応（モバイル対応不要）
- ダークモード不要
- 認証は Email + パスワードのみ（OAuth は不要）

## 重要な判断

### Prisma + Supabase の併用

Supabase の DB アクセスに Prisma を採用。TypeScript の型安全性と優れた DX が目的。
ただし Prisma は Supabase の RLS をバイパスして直接 PostgreSQL に接続するため、
RLS によるセキュリティ制御は Prisma 経由のクエリには適用されない。
デモ用途のため許容する。

Supabase クライアントは Auth / Realtime / Storage にのみ使用する。

### シンプルさ優先

発表デモのため、余分な機能（メッセージ削除・編集、リアクション等）は含めない。
コードの読みやすさ・Supabase 各機能の分かりやすい活用を優先する。
