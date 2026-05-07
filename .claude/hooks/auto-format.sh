#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[ -z "$FILE_PATH" ] && exit 0

case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css)
    # npx のオーバーヘッドを回避し直接実行
    BIOME="$CLAUDE_PROJECT_DIR/node_modules/.bin/biome"
    if [ -x "$BIOME" ]; then
      "$BIOME" check --fix "$FILE_PATH" 2>/dev/null
    fi
    ;;
esac
exit 0
