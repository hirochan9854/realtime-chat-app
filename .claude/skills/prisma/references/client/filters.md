# Filter Conditions and Operators

Filter operators for the `where` clause.

## Equality

```typescript
// Exact match (implicit)
where: { email: 'alice@prisma.io' }

// Not equal
where: { email: { not: 'alice@prisma.io' } }
```

## Comparison

```typescript
where: { age: { gt: 18 } }
where: { age: { gte: 18, lte: 65 } }
```

## Lists

```typescript
where: { role: { in: ['ADMIN', 'MODERATOR'] } }
where: { role: { notIn: ['GUEST', 'BANNED'] } }
```

## String Filters

```typescript
where: { email: { contains: 'prisma' } }
where: { email: { startsWith: 'alice' } }
where: { email: { endsWith: '@prisma.io' } }
where: { email: { contains: 'PRISMA', mode: 'insensitive' } }
```

## Null Checks

```typescript
where: { deletedAt: null }
where: { deletedAt: { not: null } }
```

## Logical Operators

```typescript
// AND (implicit)
where: { email: { contains: '@prisma.io' }, role: 'ADMIN' }

// OR
where: { OR: [{ email: { contains: '@gmail.com' } }, { email: { contains: '@prisma.io' } }] }

// NOT
where: { NOT: { role: 'GUEST' } }
```

## Relation Filters

```typescript
// some - at least one related record matches
where: { posts: { some: { published: true } } }

// every - all related records match
where: { posts: { every: { published: true } } }

// none - no related records match
where: { posts: { none: { published: true } } }

// is / isNot (1-to-1)
where: { profile: { is: { country: 'USA' } } }
```
