import fs from 'node:fs'
import path from 'node:path'

const hookPath = path.resolve(process.cwd(), '.git/hooks/pre-push')
const hookContent = `#!/usr/bin/env sh
# Automated Local Quality Gate before Git Push
echo "[Quality Gate] Running pre-push verification pipeline..."

echo "[1/3] Verifying TypeScript types..."
npm run typecheck || { echo "❌ TypeScript compilation failed. Push aborted."; exit 1; }

echo "[2/3] Running unit & security specifications..."
npm test || { echo "❌ Unit test suite failed. Push aborted."; exit 1; }

echo "[3/3] Checking static link integrity..."
npm run check:links || { echo "❌ Broken links detected. Push aborted."; exit 1; }

echo "✅ All pre-push quality gates passed."
exit 0
`

try {
  const hooksDir = path.dirname(hookPath)
  if (fs.existsSync(hooksDir)) {
    fs.writeFileSync(hookPath, hookContent, { mode: 0o755 })
    console.log('[Git Hooks] Successfully installed .git/hooks/pre-push quality gate.')
  } else {
    console.warn('[Git Hooks] .git directory not found. Skipping hook installation.')
  }
} catch (err) {
  console.warn('[Git Hooks] Could not install pre-push hook:', err.message)
}

