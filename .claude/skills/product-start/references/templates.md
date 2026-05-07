# Document & Task Templates

## docs/spec/interview-record.md

```markdown
# Interview Record

## {カテゴリ名}

**Q:** {質問}
**A:** {回答}

---
```

## docs/spec/context-notes.md

```markdown
# Context Notes

## プロジェクト背景
{背景}

## 制約・前提条件
{制約}

## 重要な判断
{判断とその理由}
```

## docs/spec/requirements.md

```markdown
# Requirements

## Functional Requirements

### FR-001: {機能名}
- **Priority:** Must / Should / Could / Won't
- **Description:** {説明}
- **Acceptance Criteria:**
  - [ ] {基準1}
  - [ ] {基準2}

## Non-Functional Requirements

### NFR-001: {項目名}
- **Category:** Performance / Security / Accessibility / SEO
- **Description:** {説明}
- **Metric:** {計測基準}
```

## docs/spec/user-stories.md

```markdown
# User Stories

## US-001: {ストーリー名}
- **As a** {ユーザー}
- **I want to** {アクション}
- **So that** {目的}
- **Priority:** Must / Should / Could / Won't
- **Acceptance Criteria:**
  - [ ] {基準}
```

## docs/architecture.md

```markdown
# Architecture

## System Overview
{全体構成}

## Data Model
{データモデル}

## API Design
{API設計}

## Directory Structure
{ディレクトリ構成}
```

## tasks/TASK-XXX.md

```markdown
# TASK-XXX: {タスクタイトル}

## Meta

| Key | Value |
|-----|-------|
| Status | todo |
| Priority | high |
| Type | feature / fix / design-system / infra |
| Branch | feature/TASK-XXX-{short-desc} |
| Issue | #{issue-number} |

## Acceptance Criteria

- [ ] {基準1}
- [ ] {基準2}

## Sub Tasks

- [ ] {サブタスク1}
- [ ] {サブタスク2}

## Progress Log

| Date | Action | Note |
|------|--------|------|
| {date} | created | タスク作成 |
```
