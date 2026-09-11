# Testing Strategy & Quality Verification

## Automated Testing Suite

The project includes an automated test runner leveraging Node.js native test runner (`node --test`).

---

## Test Organization

```
tests/
├── routes.test.mjs        # Validates page exports, HTTP routes, and canonical case study slugs
├── assets.test.mjs        # Verifies existence and byte integrity of critical public assets
├── content.test.mjs       # Sanitization scanner: checks for personal paths, unverified claims
└── security.test.mjs      # Validates API security schemas, rate limiting, and zero secret leaks
```

---

## Execution Commands

### Run Full Test Suite
```bash
npm test
```

### Run TypeScript Static Typecheck
```bash
npm run typecheck
```

### Run ESLint Verification
```bash
npm run lint
```

### Run Unified Verification Gate
```bash
npm run verify
```

The `verify` script chains `lint`, `typecheck`, `build`, and `test` sequentially to guarantee zero regressions before pull request submission.
