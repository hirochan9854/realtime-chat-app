---
paths:
  - "src/**/*"
---

# Stack Standards (Next.js + React)

## Server Components
- Server Components デフォルト。'use client' は必要時のみ
- 名前付きエクスポート。default は page.tsx のみ
- ファイル名ケバブケース、コンポーネント名PascalCase
- Design tokens only. No hardcoded colors or sizes

## Server Actions
'use server' + Zod + revalidatePath
