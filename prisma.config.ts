import { defineConfig } from 'prisma/config'

// migrate dev / db push 時に使用するURL（CLI専用）
// ローカル開発: postgresql://postgres:postgres@127.0.0.1:54322/postgres
// 本番: DIRECT_URL 環境変数 (pgBouncer バイパス用の直接接続URL)
const migrateUrl =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@127.0.0.1:54322/postgres'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: migrateUrl,
  },
})
