---
name: pre-deploy
description: デプロイ前チェックリスト一括実行。タスク状態、TypeScript、lint、テスト、環境変数、DB、ビルド、セキュリティ。
---

# Pre-Deploy Checklist

## Checks
1. **Tasks**: in-progress/未完了criticalがないか + チェックボックス完了率
2. **TypeScript**: `npx tsc --noEmit`
3. **Lint**: プロジェクトの lint ツールを実行
4. **Tests**: テストを実行
5. **Env**: .env.example vs .env.local 差分
6. **DB**: DBツールのステータス確認（layers.lockで判定）
7. **Build**: ビルドを実行
8. **Security**: 依存パッケージ監査, ハードコード秘密情報, console.log残り, TODO/FIXME
9. **Design**: ハードコード色値(grep), design-system-docs最新か

## Report
```
PRE-DEPLOY: READY | CAUTION | DO NOT DEPLOY
Tasks OK|NG | TS OK|NG | Lint OK|NG | Tests OK|NG
Env OK|WARN | DB OK|NG | Build OK|NG | Security OK|WARN
```
NG → 問題詳細+修正方法。「自動修正しますか？」
