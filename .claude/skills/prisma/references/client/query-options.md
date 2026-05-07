# Query Options

Options for controlling query behavior.

## select

Choose specific fields to return:

```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: { id: true, name: true, email: true }
})
```

### Select with relations

```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  select: {
    name: true,
    posts: { select: { title: true, published: true } }
  }
})
```

### Select relation count

```typescript
const users = await prisma.user.findMany({
  select: {
    name: true,
    _count: { select: { posts: true } }
  }
})
```

## include

Include related records:

```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true, profile: true }
})
```

### Filtered include

```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 5
    }
  }
})
```

## omit

Exclude specific fields:

```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  omit: { password: true }
})
```

## orderBy

Sort results:

```typescript
const users = await prisma.user.findMany({
  orderBy: [{ role: 'desc' }, { name: 'asc' }]
})
```

## take & skip (Pagination)

```typescript
// Page 1
const users = await prisma.user.findMany({ take: 10, skip: 0 })

// Page 2
const users = await prisma.user.findMany({ take: 10, skip: 10 })
```

## cursor (Cursor-based pagination)

```typescript
const firstPage = await prisma.user.findMany({ take: 10, orderBy: { id: 'asc' } })

const nextPage = await prisma.user.findMany({
  take: 10,
  skip: 1,
  cursor: { id: firstPage[firstPage.length - 1].id },
  orderBy: { id: 'asc' }
})
```

## distinct

```typescript
const cities = await prisma.user.findMany({
  distinct: ['city'],
  select: { city: true }
})
```
