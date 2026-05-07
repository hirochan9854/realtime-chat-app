---
name: tailwind
description: |
  Tailwind CSS v4 統合リファレンス。クラス設計、レスポンシブ、カスタマイズ、
  パフォーマンス最適化、v4+shadcn/uiセットアップ、ダークモード、CSSパターン。
  UIコンポーネント作成、Tailwind設定、テーマ問題のデバッグ時に参照。
---

# Tailwind CSS v4 Reference

## v4 + shadcn/ui Quick Setup

```bash
pnpm add tailwindcss @tailwindcss/vite
pnpm dlx shadcn@latest init
rm tailwind.config.ts  # v4 doesn't use this
```

**4-Step Architecture (CRITICAL):**

1. `:root` / `.dark` でCSS変数定義（`@layer base` の外、`hsl()` ラッパー付き）
2. `@theme inline` で変数をユーティリティにマッピング
3. `@layer base` でbodyスタイル（`var(--background)` 直接参照、二重hsl禁止）
4. `bg-background text-foreground` で自動ダークモード

```css
@import "tailwindcss";

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --primary: hsl(221.2 83.2% 53.3%);
}
.dark {
  --background: hsl(222.2 84% 4.9%);
  --foreground: hsl(210 40% 98%);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
}

@layer base {
  body { background-color: var(--background); color: var(--foreground); }
}
```

## Class Design Principles

**順序**: Layout → Sizing → Spacing → Typography → Visual → Interactive

```tsx
<div className="flex items-center gap-4 w-full p-4 text-sm text-foreground bg-card rounded-lg border hover:shadow-md transition-shadow">
```

**cn() による条件付きクラス:**
```tsx
import { cn } from "@/lib/utils"
<button className={cn(
  "px-4 py-2 rounded-md font-medium transition-colors",
  variant === "primary" && "bg-primary text-primary-foreground",
  disabled && "opacity-50 cursor-not-allowed"
)}>
```

## Responsive Design

モバイルファースト。sm: → md: → lg: → xl: → 2xl:

```tsx
// モバイルから拡張
<div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// コンテナクエリ (v4)
<div className="@container">
  <div className="@sm:flex @sm:gap-4">...</div>
</div>
```

## Color & Spacing Rules

```tsx
// ハードコード / デフォルトパレット — 禁止
<p className="text-gray-800 bg-[#3b82f6]">

// セマンティックトークン — 推奨
<p className="text-foreground bg-primary">

// 任意値 — 禁止
<div className="p-[13px]">

// スケール (4px単位) — 推奨
<div className="p-3 mt-6">

// gap で間隔統一
<div className="flex gap-4">
```

## cva Pattern

```tsx
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: { sm: "h-9 px-3", default: "h-10 px-4 py-2", lg: "h-11 px-8" },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)
```

## Critical Rules

- `hsl()` で色値をラップ（`:root` / `.dark`）
- `@theme inline` で全変数をマッピング
- `components.json` で `"config": ""`
- `@plugin` ディレクティブでプラグイン追加
- `:root` を `@layer base` 内に入れない
- `hsl(var(--background))` の二重ラップ禁止
- `tailwind.config.ts` でテーマ色を定義しない
- `tailwindcss-animate` / `tw-animate-css` は非推奨

## References

### patterns/ — CSS パターン & ベストプラクティス
- `common-patterns.md` — レイアウト、cvaテンプレート
- `layout-patterns.md` — Flexbox, Grid, スペーシング
- `component-patterns.md` — カード、ナビ、フォーム、モーダル
- `responsive-design.md` — レスポンシブ、ダークモード、コンテナクエリ
- `animations.md` — トランジション、アニメーション
- `performance.md` — バンドル最適化
- `accessibility.md` — フォーカス、スクリーンリーダー、コントラスト
- `configuration.md` — CSS-first設定、プラグイン
- `reference.md` — 追加リファレンス

### v4-shadcn/ — v4 + shadcn/ui セットアップ
- `common-gotchas.md` — よくある問題と修正
- `dark-mode.md` — ダークモード実装
- `migration-guide.md` — v3→v4 移行
- `plugins-reference.md` — Typography, Forms プラグイン
- `advanced-usage.md` — カスタムカラー、高度なパターン
- `templates/` — すぐ使えるファイルテンプレート
