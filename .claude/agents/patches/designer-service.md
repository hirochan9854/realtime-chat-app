# Designer Patch: Webサービス

## shadcn/ui Integration
- shadcn/ui に存在するものはカスタム実装しない
- カスタマイズはテーマ（CSS変数）で行う
- cn() で条件付きクラス結合

## Tailwind Token Examples
- ✅ text-foreground bg-muted p-3 rounded-lg
- ❌ text-[#333] bg-[#f5f5f5] p-[13px]
