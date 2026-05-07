---
name: prisma
description: |
  Prisma ORM 統合リファレンス。Client API (CRUD、フィルタ、リレーション、トランザクション)、
  CLI (init, generate, migrate, db push/pull, studio)、データベースセットアップ
  (PostgreSQL, MySQL, SQLite, MongoDB, ドライバアダプタ)。
  Triggers on: prisma query, findMany, create, update, delete, $transaction,
  prisma init, prisma generate, prisma migrate, prisma db, configure postgres.
---

# Prisma ORM Reference

## Quick Setup (PostgreSQL)

```bash
npm install prisma --save-dev && npm install @prisma/client
npx prisma init --datasource-provider postgresql
```

```prisma
datasource db { provider = "postgresql" }
generator client { provider = "prisma-client" output = "../generated" }
```

```typescript
import { PrismaClient } from '../generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })
```

## Client API Quick Reference

| Method | Description |
|--------|-------------|
| `findUnique()` | ユニークフィールドで1件取得 |
| `findFirst()` | 最初の一致レコード |
| `findMany()` | 複数レコード取得 |
| `create()` | 新規作成 |
| `createMany()` | 一括作成 |
| `update()` | 1件更新 |
| `updateMany()` | 一括更新 |
| `upsert()` | 更新 or 作成 |
| `delete()` | 1件削除 |
| `deleteMany()` | 一括削除 |
| `count()` / `aggregate()` / `groupBy()` | 集計 |

### Query Options
`where`, `select`, `include`, `omit`, `orderBy`, `take`, `skip`, `cursor`, `distinct`

### Filter Operators
`equals`, `not`, `in`, `notIn`, `lt/lte/gt/gte`, `contains`, `startsWith`, `endsWith`, `mode`

### Relation Filters
`some`, `every`, `none`, `is`, `isNot`

### Quick Examples

```typescript
// Find with filter
const users = await prisma.user.findMany({
  where: { role: 'ADMIN' },
  orderBy: { createdAt: 'desc' },
  take: 10,
})

// Create with relation
const user = await prisma.user.create({
  data: {
    email: 'alice@example.com',
    posts: { create: { title: 'Hello' } },
  },
  include: { posts: true },
})

// Transaction
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'alice@example.com' } }),
  prisma.post.create({ data: { title: 'Hello', authorId: 1 } }),
])
```

## CLI Quick Reference

```bash
prisma init                          # プロジェクト初期化
prisma generate                      # Client生成
prisma migrate dev --name add_users  # マイグレーション作成・適用
prisma migrate deploy                # 本番マイグレーション適用
prisma migrate status                # ステータス確認
prisma db push                       # スキーマ直接反映（マイグレーションなし）
prisma db pull                       # DBからスキーマ取得
prisma db seed                       # シードデータ投入
prisma studio                        # DB GUI
prisma validate                      # スキーマ検証
prisma format                        # スキーマフォーマット
```

**Bun使用時:** `bunx --bun prisma ...`

## Driver Adapters

| Database | Adapter | JS Driver |
|----------|---------|-----------|
| PostgreSQL | `@prisma/adapter-pg` | `pg` |
| MySQL | `@prisma/adapter-mariadb` | `mariadb` |
| SQLite | `@prisma/adapter-better-sqlite3` | `better-sqlite3` |
| SQL Server | `@prisma/adapter-mssql` | `node-mssql` |
| MongoDB | N/A (Prisma 6.x使用) | N/A |

## References

### client/ — Client API 詳細
- `constructor.md` — PrismaClient構成オプション
- `model-queries.md` — CRUD操作
- `query-options.md` — select, include, omit, orderBy
- `filters.md` — フィルタ条件・演算子
- `relations.md` — リレーションクエリ・ネスト操作
- `transactions.md` — トランザクションAPI
- `raw-queries.md` — $queryRaw, $executeRaw
- `client-methods.md` — $connect, $disconnect, $on, $extends

### cli/ — CLI コマンド詳細
- `init.md`, `generate.md`, `dev.md`
- `db-pull.md`, `db-push.md`, `db-seed.md`, `db-execute.md`
- `migrate-dev.md`, `migrate-deploy.md`, `migrate-reset.md`
- `migrate-status.md`, `migrate-resolve.md`, `migrate-diff.md`
- `studio.md`, `mcp.md`, `validate.md`, `format.md`, `debug.md`

### setup/ — データベース別セットアップ
- `postgresql.md`, `mysql.md`, `sqlite.md`, `mongodb.md`
- `sqlserver.md`, `cockroachdb.md`, `prisma-postgres.md`
- `prisma-client-setup.md`
