# Client Methods

Prisma Client instance methods.

## $connect()

Explicitly connect to the database:

```typescript
const prisma = new PrismaClient({ adapter })

// Explicit connection
await prisma.$connect()
```

### When to use

Usually not needed - Prisma connects automatically on first query. Use for:
- Fail fast on startup
- Health checks
- Pre-warming connections

## $disconnect()

Close database connection:

```typescript
await prisma.$disconnect()
```

### Graceful shutdown

```typescript
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
```

### In tests

```typescript
afterAll(async () => {
  await prisma.$disconnect()
})
```

## $on()

Subscribe to events:

```typescript
const prisma = new PrismaClient({
  adapter,
  log: [{ level: 'query', emit: 'event' }]
})

prisma.$on('query', (e) => {
  console.log('Query:', e.query)
  console.log('Duration:', e.duration, 'ms')
})
```

## $extends()

Add extensions for custom behavior:

```typescript
const prisma = new PrismaClient({ adapter }).$extends({
  model: {
    user: {
      async findByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } })
      }
    }
  }
})
```

### Query extensions

```typescript
const prisma = new PrismaClient({ adapter }).$extends({
  query: {
    user: {
      async findMany({ args, query }) {
        // Add default filter
        args.where = { ...args.where, deletedAt: null }
        return query(args)
      }
    }
  }
})
```

## Type utilities

```typescript
import { Prisma } from '../generated/client'

// Input types
type UserCreateInput = Prisma.UserCreateInput
type UserWhereInput = Prisma.UserWhereInput

// Output types
type User = Prisma.UserGetPayload<{}>
type UserWithPosts = Prisma.UserGetPayload<{
  include: { posts: true }
}>
```
