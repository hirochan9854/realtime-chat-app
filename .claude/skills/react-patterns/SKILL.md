---
name: react-patterns
description: |
  React パフォーマンス最適化 (68ルール) + コンポジションパターン (10ルール)。
  コンポーネント作成、データフェッチ、コードレビュー、リファクタリング、
  バンドル最適化、コンポーネントAPI設計時に参照。
---

# React Patterns & Performance

## Performance Rules (68 rules, by priority)

| Priority | Category | Impact | Prefix | Rules |
|----------|----------|--------|--------|-------|
| 1 | Waterfalls排除 | CRITICAL | `async-` | 6 |
| 2 | バンドルサイズ | CRITICAL | `bundle-` | 5 |
| 3 | サーバーサイド | HIGH | `server-` | 10 |
| 4 | クライアントデータ | MEDIUM-HIGH | `client-` | 4 |
| 5 | 再レンダリング | MEDIUM | `rerender-` | 15 |
| 6 | レンダリング | MEDIUM | `rendering-` | 11 |
| 7 | JavaScript | LOW-MEDIUM | `js-` | 14 |
| 8 | Advanced | LOW | `advanced-` | 3 |

### CRITICAL — 必ず適用

- `async-parallel` — 独立した操作は `Promise.all()`
- `async-suspense-boundaries` — Suspenseでストリーミング
- `async-defer-await` — awaitを使うブランチに移動
- `bundle-barrel-imports` — バレルファイルを避け直接import
- `bundle-dynamic-imports` — 重いコンポーネントは `next/dynamic`
- `bundle-defer-third-party` — analytics等はhydration後にロード

### HIGH — サーバーサイド

- `server-auth-actions` — Server ActionをAPIルートと同様に認証
- `server-cache-react` — `React.cache()` でリクエスト単位の重複排除
- `server-serialization` — クライアントに渡すデータを最小化
- `server-parallel-fetching` — コンポーネント構造でフェッチを並列化

## Composition Patterns (10 rules)

| Priority | Category | Prefix |
|----------|----------|--------|
| 1 | コンポーネント設計 | `architecture-` |
| 2 | 状態管理 | `state-` |
| 3 | 実装パターン | `patterns-` |
| 4 | React 19 API | `react19-` |

### Key Rules

- `architecture-avoid-boolean-props` — booleanプロップの代わりにコンポジション
- `architecture-compound-components` — 共有コンテキストで複合コンポーネント
- `state-decouple-implementation` — Providerだけが状態管理方法を知る
- `patterns-explicit-variants` — booleanモードの代わりに明示的バリアント
- `patterns-children-over-render-props` — renderXプロップよりchildren
- `react19-no-forwardref` — forwardRef不要、`use()` で `useContext()` 置換

## References

### performance/ — パフォーマンス最適化ルール
68個のルールファイル（`async-*.md`, `bundle-*.md`, `server-*.md` 等）
- `AGENTS.md` — 全ルール展開済みの完全ガイド (103KB)

### composition/ — コンポジションパターン
10個のルールファイル（`architecture-*.md`, `state-*.md`, `patterns-*.md` 等）
- `AGENTS.md` — 全ルール展開済みの完全ガイド (22KB)

各ルールファイルには: 理由、❌ 悪い例、✅ 良い例、追加コンテキスト
