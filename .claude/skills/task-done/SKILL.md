---
name: task-done
description: タスク完了。チェックボックス全確認→品質検証→PR作成→Issue更新。引数にTASK番号。
---

# Task Done: $ARGUMENTS

## 1. チェックボックス検証（必須）
tasks/$ARGUMENTS.md の全チェックボックスを確認:
- Acceptance Criteria: 全て [x] か
- Sub Tasks: 全て [x] か
- 未チェックがあれば警告し、残作業を確認

## 2. 品質検証（スキップ禁止）
```bash
npx tsc --noEmit
プロジェクトの lint ツールを実行
テストを実行
```
テスト失敗時は修正してからPRへ進む。
自問:「スタッフエンジニアがこれを承認するか？」

## 3. ステータス更新
status → done, completed_at 記録。Progress Log 更新。

## 4. Git & PR
```bash
git add <変更ファイルを個別指定>
git commit -m "feat($ARGUMENTS): complete implementation"
git push -u origin feature/$ARGUMENTS-{desc}
```
**注意:** `git add -A` は禁止。変更ファイルを `git status` で確認し個別にステージすること。
PR作成: [TASK-XXX] {title}, Closes #{issue}

## 5. 次タスク提案
depends_on でブロック解消されたタスクを検出 → 優先度順に提案。
