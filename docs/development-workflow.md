# 開発ワークフロー設計書

## 概要

本ドキュメントは `/product-start` から始まる開発フロー全体を定義する。
UI先行開発を基本とし、デザイン資産の有無とプロジェクト種別で分岐する。

---

## Phase 1: 初期化

docs/spec/, docs/adr/, tasks/, tasks/lessons.md を作成。
既存ドキュメントがあれば読み取り、ベースにするか確認する。

---

## Phase 2: 共通ヒアリング

**原則: 疑問点がゼロになるまで質問を続ける。**
1つずつ質問。AskUserQuestion で選択肢ベース。
曖昧な回答には具体例で確認。矛盾はその場で解決。

### 共通ヒアリング項目

1. プロダクトビジョン（目的、課題、成功指標）
2. ターゲットユーザー（ペルソナ、利用シーン）
3. 主要機能（MoSCoW分類）
4. ページ構成・画面遷移
5. 技術要件（認証、外部API、DB）
6. 非機能要件（SEO、a11y、レスポンシブ）
7. スケジュール・MVP範囲

---

## Phase 3: 層インストール

ヒアリング結果に基づき、必要な層をインストールする。
**インストールにより新しいスキル・ルール・エージェントが追加され、以降のフェーズが強化される。**

### Step 3-1: プロジェクト種別の判定

**Q: 「何を作りますか？」**

| 回答 | アクション |
|------|----------|
| Webサービス（SaaS, 管理画面, Webアプリ等） | `/init stack-service` |
| LP/Webサイト | `/init stack-site`（将来） |

### Step 3-2: デザインの有無

**Q: 「既にデザイン（Figma, カンプ, ワイヤーフレーム）はありますか？」**

| 回答 | アクション |
|------|----------|
| No | `/init design` → Phase 4 へ |
| Yes | design 層はスキップ → Phase 4 で Figma 読み取り |

---

## Phase 4: デザインヒアリング

### パス判定

- **パスA**: デザインなし & DSなし → DS方針 + デザイン方針の詳細ヒアリング（カラー、フォント、角丸、モーション等）
- **パスB**: デザインなし & DSあり → 使用するDS + サービスデザイン方針のヒアリング
- **パスC**: デザインあり → Figma URL取得 → MCP でデザイン読み取り → 不明点を追加質問

---

## Phase 5: FW固有ヒアリング

stack 層のスキル知識に基づいた追加質問:
- アーキテクチャに関する質問（architecture ルールに基づく）
- データモデルに関する質問（ORM スキルに基づく）
- 認証・APIに関する質問（FW スキルに基づく）

---

## Phase 6: ドキュメント生成（順番厳守、各ユーザー確認）

### 全パス共通

1. docs/spec/interview-record.md
2. docs/spec/context-notes.md
3. docs/spec/user-stories.md (MoSCoW + Acceptance Criteria)
4. docs/spec/requirements.md (FR-XXX + NFR-XXX)
5. docs/architecture.md（stack 層のアーキテクチャパターンを反映）

### パスA のみ追加

6. docs/design-system.md（カラーパレット、タイポグラフィ、スペーシング、コンポーネント方針）

重要判断は docs/adr/ADR-XXX.md に記録。

---

## Phase 7: タスク分解（UI先行開発）

**タスク順序の原則:**

```
1. プロジェクトセットアップ
2. DS構築（パスA: ゼロから / パスC: デザインから抽出）※パスBはスキップ
3. ページUI構築（mock data使用、1ページ単位）
4. DBスキーマ設計（早期に実施、UIと並行可）
5. バックエンド実装（認証、API、Repository実装）
6. 動的化（mock → 実データ切替）
7. テスト
8. デプロイ
```

tasks/TASK-001.md〜。チェックボックス付き Acceptance Criteria と Sub Tasks。
タスクの具体内容はインストール済みの層のスキル・ルールに基づいて生成する。

---

## Phase 8: GitHub Issue

親Issue + Sub-Issue。ラベル + マイルストーン。TASK-XXX.md に URL記録。

---

## フロー全体図

```
/product-start
│
├─ Phase 1: 初期化
│
├─ Phase 2: 共通ヒアリング（疑問点ゼロまで）
│
├─ Phase 3: 層インストール
│  ├── 「何を作りますか？」 → /init stack-service
│  └── 「デザインはありますか？」 → No → /init design
│
├─ Phase 4: デザインヒアリング
│  ├── パスA: デザインなし & DSなし
│  ├── パスB: デザインなし & DSあり
│  └── パスC: デザインあり（Figma）
│
├─ Phase 5: FW固有ヒアリング（stack 層の知識）
│
├─ Phase 6: ドキュメント生成
│
├─ Phase 7: タスク分解（UI先行）
│
└─ Phase 8: GitHub Issue

/task-start TASK-001 〜 開発サイクル開始
│
├─ DS構築（design 層 + stack 層のスキル）
├─ ページUI実装（1ページ単位、mock data）
├─ DBスキーマ設計
├─ バックエンド実装
├─ 動的化（mock → 実データ）
├─ テスト
└─ デプロイ
```
