---
name: nextjs
description: |
  Next.js 統合リファレンス。ファイル規約、RSC境界、データパターン、async API、
  メタデータ、エラーハンドリング、ルートハンドラ、画像/フォント最適化、バンドル、
  PPR、use cache、cacheLife、cacheTag。
user-invocable: false
---

# Next.js Reference

## File Conventions → `references/file-conventions.md`
プロジェクト構造、特殊ファイル、ルートセグメント、Middleware (v16: proxy)

## RSC Boundaries → `references/rsc-boundaries.md`
asyncクライアントコンポーネント検出、非シリアライズprops、Server Action例外

## Async Patterns (v15+) → `references/async-patterns.md`
async `params`/`searchParams`、async `cookies()`/`headers()`

## Data Patterns → `references/data-patterns.md`
Server Components vs Server Actions vs Route Handlers、ウォーターフォール回避

## Error Handling → `references/error-handling.md`
`error.tsx`, `not-found.tsx`, `redirect`, `forbidden`, `unauthorized`

## Route Handlers → `references/route-handlers.md`
`route.ts`、GET/page.tsx競合、Server Actionsとの使い分け

## Metadata & OG → `references/metadata.md`
静的/動的メタデータ、`generateMetadata`、OG画像生成

## Image / Font → `references/image.md`, `references/font.md`
`next/image` 必須、リモート画像設定、`next/font`、Tailwind統合

## Bundling → `references/bundling.md`
サーバー非互換パッケージ、CSS import、ESM/CJS問題、バンドル分析

## Cache Components (Next.js 16+) → `references/cache-components.md`

PPR (Partial Prerendering) で静的・キャッシュ・動的コンテンツを1ルートで混合。

```ts
// next.config.ts
const nextConfig = { cacheComponents: true }
```

**3つのコンテンツタイプ:**
1. **Static** — 同期コード、ビルド時プリレンダリング
2. **Cached** — `'use cache'` + `cacheLife('hours')` で非同期データをキャッシュ
3. **Dynamic** — `<Suspense>` でラップ、リクエスト毎に新鮮なデータ

```tsx
async function Stats() {
  'use cache'
  cacheLife('hours')
  cacheTag('dashboard-stats')
  const stats = await db.stats.aggregate()
  return <StatsDisplay stats={stats} />
}
```

**キャッシュ無効化:**
- `updateTag('tag')` — 即時（同リクエスト内で反映）
- `revalidateTag('tag')` — バックグラウンド（次リクエストで反映）

**制約:** `use cache` 内で `cookies()`/`headers()` 不可 → 引数で渡すか `'use cache: private'`

**移行:** `unstable_cache()` → `'use cache'` + `cacheTag()` + `cacheLife()`

## Other References
- `references/directives.md` — `'use client'`, `'use server'`, `'use cache'`
- `references/functions.md` — Navigation hooks, Server functions, Generate functions
- `references/runtime-selection.md` — Node.js vs Edge runtime
- `references/scripts.md` — `next/script`、ロード戦略
- `references/hydration-error.md` — ハイドレーションエラーの原因と修正
- `references/suspense-boundaries.md` — CSRバイルアウト、Suspense必須hooks
- `references/parallel-routes.md` — モーダル、`@slot`、`(.)`インターセプター
- `references/self-hosting.md` — Docker `output: 'standalone'`、キャッシュハンドラ
- `references/debug-tricks.md` — MCPエンドポイント、`--debug-build-paths`
