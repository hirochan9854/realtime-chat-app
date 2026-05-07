
## Architecture (CQRS)
- Read: Server Component → Repository or queries.ts → Prisma
- Write: Server Action → Zod → Repository → Prisma → revalidatePath
- Repository Mock パターンでUI先行開発を支援
