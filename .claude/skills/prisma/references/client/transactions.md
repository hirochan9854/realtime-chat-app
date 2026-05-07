# Transactions

Execute multiple operations atomically.

## Sequential Transactions

Array of operations executed in order:

```typescript
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { email: 'alice@prisma.io' } }),
  prisma.post.create({ data: { title: 'Hello', authorId: 1 } })
])
```

## Interactive Transactions

For complex logic and dependent operations:

```typescript
await prisma.$transaction(async (tx) => {
  const sender = await tx.account.update({
    where: { id: senderId },
    data: { balance: { decrement: amount } }
  })

  if (sender.balance < 0) {
    throw new Error('Insufficient funds')
  }

  await tx.account.update({
    where: { id: recipientId },
    data: { balance: { increment: amount } }
  })
})
```

### Transaction options

```typescript
await prisma.$transaction(
  async (tx) => {
    // operations
  },
  {
    maxWait: 5000,
    timeout: 10000,
    isolationLevel: 'Serializable'
  }
)
```

## Best Practices

- Keep transactions short
- Only DB operations in transaction (compute outside)
- Handle errors appropriately

```typescript
try {
  await prisma.$transaction(async (tx) => {
    // operations
  })
} catch (e) {
  if (e.code === 'P2002') {
    // Handle unique constraint violation
  }
  throw e
}
```

## Sequential vs Interactive

| Feature | Sequential | Interactive |
|---------|------------|-------------|
| Syntax | Array | Async function |
| Dependent ops | No | Yes |
| Conditional logic | No | Yes |
| Performance | Better | More flexible |
