# Model Queries

CRUD operations for your Prisma models.

## Read Operations

### findUnique / findUniqueOrThrow

```typescript
const user = await prisma.user.findUnique({ where: { id: 1 } })
const user = await prisma.user.findUniqueOrThrow({ where: { id: 1 } })
```

### findFirst / findFirstOrThrow

```typescript
const user = await prisma.user.findFirst({
  where: { role: 'ADMIN' },
  orderBy: { createdAt: 'desc' }
})
```

### findMany

```typescript
const users = await prisma.user.findMany({
  where: { role: 'USER' },
  orderBy: { name: 'asc' },
  take: 10,
  skip: 0
})
```

## Create Operations

### create

```typescript
const user = await prisma.user.create({
  data: { email: 'alice@prisma.io', name: 'Alice' }
})
```

### createMany

```typescript
const result = await prisma.user.createMany({
  data: [
    { email: 'alice@prisma.io', name: 'Alice' },
    { email: 'bob@prisma.io', name: 'Bob' }
  ],
  skipDuplicates: true
})
// Returns { count: 2 }
```

## Update Operations

### update

```typescript
const user = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Alice Smith' }
})
```

### Atomic operations

```typescript
const post = await prisma.post.update({
  where: { id: 1 },
  data: {
    views: { increment: 1 },
    likes: { decrement: 1 },
  }
})
```

### upsert

```typescript
const user = await prisma.user.upsert({
  where: { email: 'alice@prisma.io' },
  update: { name: 'Alice Smith' },
  create: { email: 'alice@prisma.io', name: 'Alice' }
})
```

## Delete Operations

```typescript
const user = await prisma.user.delete({ where: { id: 1 } })
const result = await prisma.user.deleteMany({ where: { role: 'GUEST' } })
```

## Aggregation Operations

```typescript
const count = await prisma.user.count({ where: { role: 'ADMIN' } })

const result = await prisma.post.aggregate({
  _avg: { views: true },
  _sum: { views: true },
  _count: { _all: true }
})
```
