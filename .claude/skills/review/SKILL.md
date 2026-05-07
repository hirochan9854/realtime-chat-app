---
name: review
description: コードレビュー・デザインレビュー。セキュリティ、アーキテクチャ規約、AIっぽさチェック。引数にTASK番号またはPR番号。
---

# Code & Design Review

See @references/checklist.md for the full review checklist sheet.

$ARGUMENTS が指定された場合はそのタスクまたはPR番号に対してレビューを行う。

ultrathink

> Reference: .claude/rules/coding-standards.md

## 1. 対象特定
引数なし→ git diff main...HEAD。TASK-XXX→タスクファイルのFiles参照。

## 2. 自動チェック
```bash
npx tsc --noEmit
プロジェクトの lint ツールを実行
```

## 3. コードレビュー
Critical: セキュリティ、型安全性、アーキテクチャ規約違反（stack層のルールに基づく）
High: DSトークン不使用、エラーハンドリング、a11y、テスト
Medium: 可読性、DRY、domain/汚染
Nit: フォーマット

## 4. UIデザインレビュー（UI変更時必須）
design 層がインストールされている場合、デザインレビューも実施。
- [ ] 主役明確 / メリハリ / テンプレ感なし / プロダクト固有の設計
- [ ] 色の役割分離 / 同一色複数意味なし
- [ ] 実データ耐性（長文/0件/異常値/重複）
- [ ] 装飾の削ぎ落とし

## 5. アーキテクチャレビュー
- stack層のルールに基づく境界チェック、domain/ 純粋性、Repository パターン

## 6. 出力
```
## Review: {対象}
### Summary | Critical | High | Medium | Nit
### Good | Design Check | Architecture
### Verdict: Approve | Comments | Changes Required
```

修正希望時は自動修正 → tasks/lessons.md に記録。
