# Reviewer Patch: Webサービス

## Critical Checks
- CQRS境界違反: features/ 外から features/ をimport していないか
- 'use client' が不要な箇所に付いていないか
- Repository インターフェースを経由せず直接 PrismaClient を使っていないか

## High Priority Checks
- Server Actions に Zod バリデーションがあるか
- revalidatePath が書き込み後に呼ばれているか
- デザイントークン不使用（ハードコード色値・サイズ）がないか
- shadcn/ui に存在するコンポーネントを自作していないか
- テスト欠如（主要ロジック）

## Auto Check
- `npx tsc --noEmit`
- `npx biome check .`
- `pnpm test --run`
