# Changelog

All notable changes to the Durgesh Dutt Sinha Flagship Engineering Portfolio are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-09-22

### Summary
Major architectural release completing the authoritative quality and integrity transformation across 6 planned engineering waves. Features full claims truth grounding, enterprise configuration hardening, a multi-layered Playwright/Axe-core test harness, complete WCAG 2.1 AA accessibility remediation, and self-hosted typography.

### Added
- **Automated Verification Harness (Wave 3)**:
   - Playwright end-to-end test suite (`tests/e2e/scenarios.spec.ts`) covering 10 critical user journeys across desktop and mobile viewports.
   - Automated accessibility scans (`tests/e2e/a11y.spec.ts`) using `@axe-core/playwright` on 3 routes only (`/`, `/recruiter`, `/work/roleradar`), asserting 0 critical or serious WCAG 2.1 AA violations; the `color-contrast` rule is explicitly disabled via `ACCEPTED_RULES`. These tests run locally only — no CI workflow executes Playwright.
  - Zero-console-exception scanner (`tests/e2e/console.spec.ts`) checking all routes for unhandled errors.
  - Static route smoke tests (`tests/e2e/smoke.spec.ts`) verifying 200 OK responses on all static pre-rendered pages.
   - Link-integrity scanner (`scripts/check-links.mjs`): builds a route map from the exported HTML in `out/`, resolves every internal link and `#anchor` against it, and validates external URL syntax. Exits non-zero on a broken internal link, an unmatched anchor, or a missing `out/` directory.
   - Lighthouse CI configuration (`.lighthouserc.json`) committed, but **no workflow executes it** — no Lighthouse score is gated in CI. `docs/performance-evidence.md` records reported figures that are not backed by a committed audit artifact.
- **Accessibility & Interaction Remediation (Wave 4)**:
  - Accessibility CSS utility classes (`html.a11y-reduced-motion`, `html.a11y-high-contrast`, `html.a11y-larger-text`) in `styles/globals.css`.
   - Focus trapping and focus restoration on Escape/close for all three modals: the Accessibility Panel, the Project Case Study modal, and the Command Palette. The palette also gained `role="dialog"`, `aria-modal="true"` and an `aria-labelledby` accessible name, and its search input and icon-only close button now carry accessible names. The accessibility preference switches and the repository search/sort controls likewise gained accessible names.
  - Explicit `<label htmlFor>` and `id` bindings across all Contact form inputs and group semantics.
  - Screen reader live regions (`aria-live="polite"` for dispatch status, `role="alert"` for execution faults).
  - WebGL Error Boundary (`WebGLErrorBoundary`) and safe WebGL initialization in `HeroSection.tsx` and `AICoreScene.tsx` preventing site collapse on devices without GPU acceleration.
  - Standard site shell (Navbar, Footer, `<main id="main-content">`) on 404 (`app/not-found.tsx`) and Error boundary (`app/error.tsx`) pages.
  - Comprehensive interaction documentation covering 13 manual keyboard and screen-reader flows in `docs/testing.md`.
- **Claims & Truth Grounding (Wave 1)**:
  - Public claims registry (`docs/claims.md`) documenting all verified metrics and anti-regression assertions.
  - Single source of truth `lib/stats.ts` unifying stats across proof strips, recruiter profiles, and changelog.
- **Production Hardening & Governance (Wave 2)**:
   - KV rate-limit binding declared but **commented out** in `wrangler.toml` (`[[kv_namespaces]]` / `binding = "RATE_LIMIT"`), so rate limiting is inactive and fails open; documented manual provision runbook in `docs/deployment.md`.
  - Documented Next.js CVE risk acceptance and mitigation record in `SECURITY.md`.
  - Standalone dependency audit script (`scripts/audit.mjs`) mapped to `npm run audit`.
  - Self-hosted Google Fonts (`next/font/google`) in `app/layout.tsx` replacing external render-blocking `@import`.
  - MIT License in root `LICENSE`.

### Changed
- Grounded `lib/github-health.ts` and UI in real repositories (`MarketMatch-AI`, `RoleRadar`, `jarvis-realtime-assistant`, `fittrack-ai`); removed non-existent slugs.
- Normalized Hero call-to-action hierarchy: primary gradient button ("View Selected Work") paired with secondary glass button ("Download Résumé") and semantic link ("ATS HTML View").
- Replaced arbitrary "#n Top" badges with descriptive technical category pills in `ProjectsSection.tsx`.
- Removed unverified percentages and ROI multipliers in `lib/case-studies.ts` in favor of verified engineering specs and explicit contributions.
- Sanitized personal telephone strings into optional `NEXT_PUBLIC_PHONE` environment variable.
- Tightened Content Security Policy in `public/_headers`, removing `unsafe-eval`.
- Fixed skip-to-content anchor destination from `#about` to `#main-content`.

### Removed
- Removed dead light theme CSS tokens and typography overrides in `styles/globals.css`.
- Purged dead `app/opengraph-image.tsx` duplicate.
- Removed brittle CDP test scripts (`scripts/capture-*.mjs`, `test-*.mjs`) superseded by native Playwright harness.

---

## [1.0.0] - 2026-09-11
- Initial public release of the Flagship Engineering Portfolio featuring Three.js neural core, interactive AI Lab, and initial Cloudflare Pages deployment.
