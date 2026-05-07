# Relation Queries

Query and modify related records.

## Include Relations

```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true, profile: true }
})
```

## Nested Writes

### Create with relations

```typescript
const user = await prisma.user.create({
  data: {
    email: 'alice@prisma.io',
    posts: {
      create: [{ title: 'Post 1' }, { title: 'Post 2' }]
    }
  }
})
```

### Create or connect

```typescript
const post = await prisma.post.create({
  data: {
    title: 'New Post',
    author: {
      connectOrCreate: {
        where: { email: 'alice@prisma.io' },
        create: { email: 'alice@prisma.io', name: 'Alice' }
      }
    }
  }
})
```

### Connect existing

```typescript
const post = await prisma.post.create({
  data: {
    title: 'New Post',
    author: { connect: { id: 1 } }
  }
})
```

## Update Relations

```typescript
// Upsert related
const user = await prisma.user.update({
  where: { id: 1 },
  data: {
    profile: {
      upsert: {
        create: { bio: 'New bio' },
        update: { bio: 'Updated bio' }
      }
    }
  }
})
```

## Count Relations

```typescript
const users = await prisma.user.findMany({
  select: {
    name: true,
    _count: { select: { posts: true, followers: true } }
  }
})
// { name: 'Alice', _count: { posts: 5, followers: 100 } }
```
