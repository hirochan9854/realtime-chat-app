---
paths:
  - "src/domain/**/*"
  - "src/repositories/**/*"
  - "src/features/**/*"
---

# Architecture (CQRS)

## CQRS
- domain/models/: ピュアモデル + Repositoryインターフェースのみ
- features/{service}/{feature}/: UI都合の型, Server Actions, クエリ
- features/ 以外から features/ をimportしない(app/ page.tsxは例外)
- Read: Server Component → Repository or queries.ts → Prisma
- Write: Server Action → Zod → Repository → Prisma → revalidatePath

## Repository Mock パターン
- domain/models/{entity}.ts に型 + Repository インターフェースを定義
- repositories/mock/ に MockRepository（UI先行開発用）
- repositories/prisma/ に PrismaRepository（実DB接続用）
- lib/registry.ts で環境変数により切替
- UI構築フェーズ → mock、バックエンド実装後 → real に切替
