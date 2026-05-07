---
name: setup
description: 新メンバーオンボーディング。プロジェクト全体像・アーキテクチャ・進捗・DS使い方・規約をまとめて説明。
---

# New Member Setup

1. プロジェクト情報収集（requirements, architecture, tasks, design-system-docs, rules, package.json）
2. オンボーディングガイド生成:
   - プロダクト概要 / Stack / ディレクトリ構造
   - 進捗サマリー / DS使い方 / 規約サマリー / コマンド一覧
3. 環境セットアップ（希望時）:
   ```bash
   パッケージマネージャでインストール
   cp .env.example .env.local
   DB設定がある場合はDBツールの初期化を実行
   npx tsc --noEmit
   ```
4. 最初のタスク提案
