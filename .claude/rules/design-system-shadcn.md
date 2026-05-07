---
paths:
  - "src/components/**/*"
  - "src/features/**/components/**/*"
---

# shadcn/ui Design System

## Token Usage
- ✅ text-foreground bg-muted p-3 rounded-lg
- ❌ text-[#333] bg-[#f5f5f5] p-[13px] rounded-[10px]

## shadcn/ui First
1. そのまま使う → 2. 拡張(Wrapper) → 3. 自作(なければのみ)

## Component Pattern
cva + forwardRef + displayName + cn() + className prop
アクセシビリティ: aria, キーボードナビ, コントラスト4.5:1+
