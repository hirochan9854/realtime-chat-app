#!/bin/bash
# enforce-checks.sh — コミット前の品質チェック

INPUT=$(cat)
STOP_HOOK_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
[ "$STOP_HOOK_ACTIVE" = "true" ] && exit 0

# TypeScript コンパイルチェック（常に実行）
if [ -f tsconfig.json ]; then
  TSC_OUTPUT=$(npx tsc --noEmit 2>&1)
  if [ $? -ne 0 ]; then
    echo "TypeScript errors found. Fix before completing:" >&2
    echo "$TSC_OUTPUT" >&2
    exit 1
  fi
fi

# Lint チェック（stack 層がインストールした設定に基づく）
# biome.json が存在する場合は Biome を実行
if [ -f biome.json ]; then
  LINT_OUTPUT=$(npx biome check . 2>&1)
  if [ $? -ne 0 ]; then
    echo "Lint errors found. Fix before completing:" >&2
    echo "$LINT_OUTPUT" >&2
    exit 1
  fi
fi

echo "All checks passed."
