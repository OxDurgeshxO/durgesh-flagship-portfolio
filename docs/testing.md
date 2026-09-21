# Quality Verification & Accessibility Testing Record

This document records the comprehensive automated testing suite, performance gates, and verified manual keyboard/screen-reader interaction flows for the Durgesh Dutt Sinha Flagship Portfolio (`v2`).

---

## 1. Automated Testing Architecture

The verification pipeline consists of four independent layers executed in sequence:

```
Automated Test Pipeline
├── Unit & Sanitization Tests (Node.js Native Runner)
│   ├── tests/routes.test.mjs      (HTTP routes, export parity, slug integrity)
│   ├── tests/assets.test.mjs      (Asset bytes, MIME types, og-image, resume.pdf)
│   ├── tests/content.test.mjs     (Truth pass: 0 unverified claims, 0 local path leaks)
│   └── tests/security.test.mjs    (CSP compliance, rate limit schemas, KV bindings)
│
├── End-to-End & Accessibility Tests (Playwright + Axe-Core)
│   ├── tests/e2e/scenarios.spec.ts (9 user journeys across desktop & mobile viewports)
│   ├── tests/e2e/a11y.spec.ts      (Automated WCAG 2.1 AA audits on all routes via axe-core)
│   ├── tests/e2e/console.spec.ts   (0 unhandled page errors, 0 console exceptions)
│   └── tests/e2e/smoke.spec.ts     (Static pre-rendered exports status 200 checks)
│
├── Static Asset & Link Crawler (check-links.mjs)
│   └── Crawls all 20 pre-rendered HTML files, validating 0 broken internal links / anchors
│
└── Production Audit & Security Scanner (audit.mjs & Lighthouse CI)
    ├── Checks .env, package vulnerabilities, CSP headers, bundle sizes
    └── .lighthouserc.json enforces Performance, Accessibility (>=95), Best Practices, SEO
```

---

## 2. Test Execution Commands

```bash
# 1. Run unit, content sanitization, and security test suite
npm test

# 2. Run TypeScript static typechecker
npm run typecheck

# 3. Run ESLint code quality scan
npm run lint

# 4. Run automated link and anchor integrity crawler
node scripts/check-links.mjs

# 5. Run full Playwright test suite (desktop and mobile)
npx playwright test

# 6. Run comprehensive pre-deployment verification gate
npm run verify

# 7. Run production security and configuration audit
npm run audit
```

---

## 3. Verified Keyboard & Screen-Reader Interaction Flows (WCAG 2.1 AA)

Each interaction flow below has been manually verified using physical keyboard navigation (Tab, Shift+Tab, Enter, Space, Escape, Alt+A, Ctrl+K) and NVDA / VoiceOver screen-reader simulations.

### Flow 1: Skip-to-Content Link Navigation
- **Initial State**: Focus at top of document (`document.body`).
- **Keystrokes**: Press `Tab` once.
- **Visual Feedback**: `.skip-to-content` banner slides into view at `top: 1.5rem` with high-contrast violet accent background and white text.
- **Action**: Press `Enter`.
- **Target**: Focus transitions instantly to `<main id="main-content">`, bypassing navbar navigation links.
- **Screen Reader Announcement**: *"Skip to main content, link"*, followed by *"Main, landmark"*.
- **Result**: **PASS**.

### Flow 2: Navigation Bar Keyboard Traversal
- **Keystrokes**: `Tab` through brand identity and navigation links (`About`, `Experience`, `Education`, `Projects`, `Contact`).
- **Visual Feedback**: High-contrast focus outline ring (`2px solid var(--gradient-start)` with `3px offset`) appears around each anchor.
- **Action**: Press `Enter` on "Projects".
- **Result**: Smooth scrolls viewport to `#projects` section; updates URL hash without reloading.
- **Result**: **PASS**.

### Flow 3: Hero Call-to-Action Buttons
- **Keystrokes**: `Tab` through primary and secondary CTA buttons in HeroSection.
  1. "View Selected Work" (Primary gradient)
  2. "Download Résumé" (Secondary glass)
  3. "ATS HTML View" (Semantic subpage link)
  4. "Contact" (Direct jump)
- **Visual Feedback**: Visible focus indicators on all buttons; active states do not collapse layout.
- **Screen Reader Announcement**: Each link clearly describes destination and action; PDF download clearly indicates file download.
- **Result**: **PASS**.

### Flow 4: Command Palette Dialog (HUD)
- **Keystrokes**: Press `Ctrl+K` (or `Cmd+K`) from anywhere on the page.
- **Dialog Semantics**: Container renders with `role="dialog"`, `aria-modal="true"`, and `aria-label="Command Palette"`.
- **Focus Trap**: Focus is automatically directed into `<input aria-label="Search commands, projects, and site sections">`. Pressing `Tab` cycles strictly within palette interactive elements (input, close button, suggestions).
- **List Traversal**: `ArrowDown` and `ArrowUp` keys select palette actions; `Enter` triggers action execution.
- **Dismissal & Focus Restore**: Pressing `Escape` closes the palette and restores focus to the previously active element before `Ctrl+K` was pressed.
- **Result**: **PASS**.

### Flow 5: Accessibility & Display Preferences Panel
- **Keystrokes**: Press `Alt+A` or click the floating accessibility button (`aria-label="Open Accessibility Panel (Alt + A)"`).
- **Dialog Semantics**: Modal opens with `role="dialog"`, `aria-modal="true"`, and `aria-label="Accessibility & Display Preferences"`.
- **Focus Management**: Focus moves to first interactive switch. `Tab` and `Shift+Tab` are trapped inside dialog.
- **Switch Controls**:
  - Reduced Motion toggle (`role="switch"`, `aria-checked="true/false"`) -> applies `html.a11y-reduced-motion`.
  - High Contrast toggle (`role="switch"`, `aria-checked="true/false"`) -> applies `html.a11y-high-contrast`.
  - Enlarged Typography toggle (`role="switch"`, `aria-checked="true/false"`) -> applies `html.a11y-larger-text`.
- **Dismissal & Focus Restore**: Pressing `Escape` or clicking close button restores focus to trigger button.
- **Result**: **PASS**.

### Flow 6: Projects Section Category Filtering & Case Study Modal
- **Keystrokes**: `Tab` into category filter list -> `Enter` to filter ("All", "AI Agents", "Full-Stack", "Machine Learning").
- **Modal Opening**: Navigate to "Architecture Deep Dive" button -> press `Enter`.
- **Modal Semantics**: Container opens with `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`.
- **Focus Trap**: Focus placed on close button (`aria-label="Close Case Study Modal"`). `Tab` cycles through modal action links ("View Full Architecture Case Study", "GitHub Repository", "Live Deployment").
- **Modal Close**: Pressing `Escape` closes modal and restores focus back to the triggering card button.
- **Result**: **PASS**.

### Flow 7: External Project Link Traversal
- **Keystrokes**: `Tab` through GitHub source and live demo buttons across project cards.
- **Attributes**: External links include `target="_blank"` and `rel="noopener noreferrer"`.
- **Screen Reader Announcement**: External links announce new window destination cleanly.
- **Result**: **PASS**.

### Flow 8: Case Study Detail Page (`/work/[slug]`)
- **Structure**: Semantic hierarchy strictly follows: `<h1>` (Project Title) -> `<h2>` (Architecture Overview, Engineering Challenges, Technical Specifications) -> `<h3>` (Sub-sections).
- **Navigation**: Back link `Return to Flagship Projects` provides clear navigation back to the homepage `#projects` anchor.
- **Result**: **PASS**.

### Flow 9: Contact Form Submission & Accessible Feedback
- **Form Controls**:
  - Subject options grouped under `role="group"` with `aria-labelledby="contact-subject-label"`. Individual buttons carry `aria-pressed="true/false"`.
  - Name: `<label htmlFor="contact-name">` explicitly associated with `<input id="contact-name" name="name">`.
  - Email: `<label htmlFor="contact-email">` explicitly associated with `<input id="contact-email" name="email">`.
  - Message: `<label htmlFor="contact-message">` explicitly associated with `<textarea id="contact-message" name="message">`.
- **Status Announcements**:
  - Error state rendered inside `<div role="alert" aria-live="assertive">`.
  - Sent success state rendered inside `<div role="status" aria-live="polite">`.
- **Result**: **PASS**.

### Flow 10: Interactive AI Lab Sandboxes (`/lab`)
- **Controls**: Inputs for MarketMatch AI simulation and Resume Analyzer demo carry explicit accessible labels.
- **Live Output**: Benchmark latency calculation and simulated scoring output announce changes via polite live regions upon completion.
- **Result**: **PASS**.

### Flow 11: GitHub Health Realtime Dashboard (`/github-health`)
- **Table Accessibility**: Repository tables include `<caption>`, `<th scope="col">`, and `<th scope="row">` associations.
- **Status Indicators**: Status pills (Healthy, Syncing, Archived) include text labels alongside color dots.
- **Result**: **PASS**.

### Flow 12: Theme Mode Indicator
- **Controls**: Fixed theme toggle button carries `aria-label="Dark Theme (Default)"`.
- **Keyboard Action**: Pressing `Enter` / `Space` displays floating tooltip explaining the dark default calibration without interrupting document navigation flow.
- **Result**: **PASS**.

### Flow 13: Landmark Navigation & Heading Hierarchy
- **Landmarks**:
  - `banner` / `<nav>`: Main navigation header
  - `main id="main-content"`: Primary unique content landmark on all routes
  - `contentinfo` / `<footer>`: Global footer with social links and disclosure
  - `dialog`: Palette, Accessibility, and Case Study modals
- **Headings**: Exact 1 `<h1>` per route. Heading levels (H2, H3, H4) are strictly non-skipping.
- **Images**: All icons and decorative Three.js canvases carry `aria-hidden="true"`; all informational graphics have descriptive `alt` text.
- **Result**: **PASS**.
