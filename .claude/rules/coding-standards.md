# Coding Standards

## Principles
シンプルさ第一。根本原因を直す。変更は必要最小限。

## TypeScript
strict, any禁止, type優先(not interface), Enum禁止→as const+union

## Naming
- ファイル名ケバブケース、コンポーネント名PascalCase
- 名前付きエクスポート推奨

## Lint & Format
プロジェクトのlinter/formatterを使用。具体ツールは stack 層により決定。

## Validation
スキーマバリデーション推奨。エラー形式: { error, details }。

## Testing
ユーティリティ→単体テスト必須。コンポーネント→レンダリングテスト。テストは対象と同ディレクトリ。
機能実装とテスト作成は同時に行う（後回し禁止）。
