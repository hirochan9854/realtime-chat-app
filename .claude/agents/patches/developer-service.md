# Developer Patch: Webサービス

## Architecture Rules
- App Router: src/app/ にファイルベースルーティング
- Server Components デフォルト。'use client' は必要時のみ
- domain/models/ にピュアモデル + Repository インターフェース
- repositories/mock/ に MockRepository（UI先行）
- repositories/prisma/ に PrismaRepository（実DB）
- Server Action: 'use server' + Zod + Repository + revalidatePath

## Component Pattern
- shadcn/ui コンポーネント: cva + forwardRef + cn() + displayName
- `npx shadcn@latest add {name}` で追加

## Dev Flow
共通Component → ページUI(mockdata) → 動的化(実データ)

## Completion Verification
- `npx tsc --noEmit`
- `npx biome check .`
- `pnpm test --run`
- `pnpm build` で SSR/SSG エラーがないか確認
