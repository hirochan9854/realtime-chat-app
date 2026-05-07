# Raw Queries

Execute raw SQL when Prisma's query API isn't sufficient.

## $queryRaw

Execute SELECT queries and get typed results:

```typescript
const users = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE email LIKE ${'%@prisma.io'}
`
```

### With type

```typescript
type User = { id: number; email: string; name: string | null }

const users = await prisma.$queryRaw<User[]>`
  SELECT id, email, name FROM "User" WHERE role = ${'ADMIN'}
`
```

### With Prisma.sql

```typescript
import { Prisma } from '../generated/client'

const email = 'alice@prisma.io'
const query = Prisma.sql`SELECT * FROM "User" WHERE email = ${email}`
const users = await prisma.$queryRaw(query)
```

## $executeRaw

Execute INSERT, UPDATE, DELETE (returns affected count):

```typescript
const count = await prisma.$executeRaw`
  UPDATE "User" SET verified = true WHERE email LIKE ${'%@prisma.io'}
`
```

## SQL Injection Prevention

```typescript
// Safe (parameterized)
const email = userInput
const users = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE email = ${email}
`

// Unsafe - NEVER do this!
const users = await prisma.$queryRawUnsafe(
  `SELECT * FROM "User" WHERE email = '${email}'`
)
```

## Transactions with Raw Queries

```typescript
await prisma.$transaction(async (tx) => {
  await tx.$executeRaw`UPDATE "Account" SET balance = balance - ${amount} WHERE id = ${senderId}`
  await tx.$executeRaw`UPDATE "Account" SET balance = balance + ${amount} WHERE id = ${recipientId}`
})
```
