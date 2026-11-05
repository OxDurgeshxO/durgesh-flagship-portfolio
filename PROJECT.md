# Project: V10 Flagship Portfolio Hardening

## Architecture
- **Framework**: Next.js 14.2 App Router with Static HTML Export (`output: 'export'`)
- **Hosting Target**: Cloudflare Pages + Cloudflare Pages Functions (`functions/api/*`)
- **State Management**: React Context (`ThemeProvider`), custom window events (`performance-mode-change`, `experience-mode-change`), localStorage
- **3D Graphics**: Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`) with procedural geometry and fallback error boundaries
- **Styling**: Tailwind CSS + CSS custom property tokens across 6 dark themes (`cobalt`, `aurora`, `graphite`, `ember`, `sage`, `noir`)
- **Test Infrastructure**: Node.js test runner (`tests/*.test.mjs`, 70 unit/integration tests), Playwright Axe a11y suite (`tests/e2e/a11y.spec.ts`, 22 tests), link checker (`scripts/check-links.mjs`)

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---|---|---|---|
| 1 | Baseline Test Suite Pass | 64/64 tests green with `.agents` folder excluded from path scanner | M1 | Survey (Explorer 3) |
| 2 | Focus Trapping in Accessibility Panel | Attach `panelRef` and `handleKeyDownTrap` to dialog modal | M2 | Survey (Explorer 2) |
| 3 | WCAG 2.5.3 (Label in Name) Conformance | Match visible text with accessible name on Navbar, Hero, Recruiter, Resume | M2 | Survey (Explorer 2) |
| 4 | WCAG 1.3.1 (Heading Order) Hierarchy | Ensure strict descending heading order across Lab, Performance, Health, Work | M2 | Survey (Explorer 2) |
| 5 | Clean Console Form Field Attributes | Add `id`, `name`, `autoComplete`, `aria-label` to companion and contact inputs | M2 | Survey (Explorer 2) |
| 6 | Mobile Touch Target Padding | Increase tap clearance on floating controls and resume links | M2 | Survey (Explorer 2) |
| 7 | Performance Mode Event Synchronization | Dispatch both `performance-mode-change` and `experience-mode-change` | M3 | Survey (Explorers 1 & 2) |
| 8 | Permissions-Policy & Privacy Alignment | Align `_headers` (`microphone=(self)`) and voice recognition | M3 | Survey (Explorers 1 & 3) |
| 9 | Dynamic Link Security Hygiene | Attach `rel="noopener noreferrer"` to programmatic anchor creations | M3 | Survey (Explorer 3) |
| 10 | 3D Studio WebGL Error Boundary | Wrap `<Canvas>` in `CyberBotStudioShell` with localized fallback | M3 | Survey (Explorer 3) |
| 11 | Async Error Resilience in Lab | Prevent unhandled rejections on video play and validate API response status | M3 | Survey (Explorer 3) |
| 12 | SpaceEdu Route Resolution | Provide clean App Router page or direct anchor to `spaceedu.html` | M4 | Survey (Explorer 1) |
| 13 | Typo Correction in AboutSection | Correct `UNLOXr` to `UNLOX®` | M4 | Survey (Explorer 1) |
| 14 | Guided Tour Landmark Target | Route tour step 3 to `#github-projects` instead of duplicate `#projects` | M4 | Survey (Explorer 1) |
| 15 | Full Verification & Roadmap | 64 tests passing, build, typecheck, lint, links, a11y, recommendations | M5 | Dispatch Requirements |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M1 | Baseline Test Suite Restoration | Exclude `.agents` and `ORIGINAL_REQUEST.md` in `tests/content.test.mjs`; add `.agents` to `.gitignore` | none | DONE |
| M2 | Accessibility & Usability Hardening | Focus trap in `AccessibilityPanel`, Label in Name, Heading order, form inputs, touch targets | M1 | DONE |
| M3 | State Sync, Reliability & Security | Performance mode sync, Permissions-Policy, dynamic links, Studio error boundary, async guards | M1 | DONE |
| M4 | Navigation & Content Polish | SpaceEdu routing, `UNLOX®` typo, tour landmark alignment | M1 | DONE |
| M5 | Comprehensive Verification & Roadmap | Verify 64+ tests, typecheck, lint, build, preview server, prioritized roadmap report | M2, M3, M4 | DONE |

## Interface Contracts
### Performance & Experience Mode Contract
- `lib/performance.ts`: `savePerformanceMode(mode: PerformanceMode)` MUST write to both `portfolio_performance_mode` and `portfolio-experience-mode`, and dispatch both `performance-mode-change` (`detail: { mode }`) and `experience-mode-change` (`detail: { mode }`).
- `components/accessibility/AccessibilityPanel.tsx`: Receives `experience-mode-change` and synchronizes internal radio state.

### Modal Dialog Contract
- `components/accessibility/AccessibilityPanel.tsx`: `<motion.div role="dialog">` MUST receive `ref={panelRef}` and `onKeyDown={handleKeyDownTrap}`. When open, initial focus goes to first interactive control; Tab key cycles within focusable elements; Escape closes panel.

### Security Headers Contract
- `public/_headers`: `Permissions-Policy` must include `camera=(self), microphone=(self)` to permit Web Speech API speech recognition and optional webcam gesture tracking without third-party iframe leaks.

## Code Layout
```
app/                          # Next.js App Router static pages
  ├── page.tsx                # Homepage
  ├── cyberbot/page.tsx       # CyberBot 3D companion studio
  ├── resume/page.tsx         # ATS-compliant interactive resume
  ├── recruiter/page.tsx      # Fast-track recruiter briefing
  ├── performance/page.tsx    # Live WebGL & CWV diagnostics
  ├── changelog/page.tsx      # Engineering release timeline
  ├── lab/page.tsx            # Interactive AI Engineering Lab
  ├── github-health/page.tsx  # Repository health telemetry
  ├── privacy/page.tsx        # Privacy center & data policy
  ├── work/[slug]/page.tsx    # 5 Flagship engineering case studies
  └── spaceedu/page.tsx       # SpaceEdu 3D simulation route
components/                   # UI components
  ├── sections/               # Home sections (Navbar, Hero, About, Experience, etc.)
  ├── companion/              # CyberBot 3D studio, speech bubble, quick dial
  ├── accessibility/          # Accessibility preferences panel & contrast guards
  ├── lab/                    # AI Lab interactive modules (Resume, FitTrack, MarketMatch)
  └── recruiter/              # Recruiter metrics and modals
lib/                          # Utilities, theme registry, performance mode, API guards
functions/api/                # Cloudflare Pages Functions edge endpoints
tests/                        # Test suite (64 unit/integration tests + Playwright a11y)
public/                       # Static public assets, _headers, manifest
```
