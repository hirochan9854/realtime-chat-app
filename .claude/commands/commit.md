変更内容を確認し、Conventional Commits 形式でコミットする。

1. `git status` で変更ファイル一覧を確認
2. `git diff` でステージ済み＋未ステージの差分を確認
3. 変更ファイルを個別に `git add <file>` でステージ（`git add -A` は禁止）
   - .env, credentials, node_modules, ビルド成果物はステージしない
4. 変更内容から type を選択: feat / fix / refactor / style / docs / test / chore / perf
5. 関連 TASK 番号を tasks/ から推測
6. メッセージ提案 → ユーザー確認 → `git commit`

Format: `{type}(TASK-XXX): {description}`
$ARGUMENTS があればそれを説明として使う。
