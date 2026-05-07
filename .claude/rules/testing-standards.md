# Testing Standards

## Test Structure
- テストは対象ファイルと同ディレクトリに配置
- ファイル名: {target}.test.ts / {target}.test.tsx
- テスト観点: 正常系 → 境界値 → エラーケース → エッジケース

## Coverage
- ユーティリティ関数: 単体テスト必須
- コンポーネント: レンダリングテスト
- Server Action: 入力/出力テスト
- Zodスキーマ: バリデーションテスト
- 主要ユーザーフロー: E2Eテスト

## Tools
- Unit: Vitest + @testing-library/react
- E2E: Playwright
