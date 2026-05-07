# Architect Patch: Webサービス

## Architecture Principles
- CQRS: Read → Server Component → Repository → Prisma, Write → Server Action → Zod → Repository → Prisma → revalidatePath
- Prismaマルチスキーマ: prisma/schema.prisma(共通) + prisma/schemas/{service}.prisma(固有)
- App Router のファイル規約（page.tsx, layout.tsx, loading.tsx, error.tsx）

## Repository Mock パターン
- domain/models/{entity}.ts → 型 + Repository インターフェース
- repositories/mock/ → MockRepository
- repositories/prisma/ → PrismaRepository
- lib/registry.ts → 環境変数で切替

## Task Decomposition
タスク順序: DS構築 → ページUI(mock) → DB → バックエンド → 動的化 → テスト → デプロイ
