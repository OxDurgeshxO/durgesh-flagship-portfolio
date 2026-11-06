# Active Tasks & Roadmap

## V10 Hardening & Audit Milestones
- [x] **M1 Baseline Stabilization**: Excluded transient subagent artifacts from path scanners; restored 64 baseline tests.
- [x] **M2 Accessibility & Usability (WCAG 2.1 AA)**: Focus trap in `AccessibilityPanel.tsx`, WCAG 2.5.3 Label in Name, heading hierarchy fixes, 44px mobile touch targets.
- [x] **M3 State Sync, Reliability & Security**: Dual-event dispatch (`performance-mode-change` & `experience-mode-change`), `Permissions-Policy: microphone=(self)`, `rel="noopener noreferrer"` on dynamic anchors, `StudioWebGLErrorBoundary` 2D fallback.
- [x] **M4 Navigation & Content Polish**: Responsive `/spaceedu` simulation route, `UNLOX®` trademark typo correction, CyberBot guided tour landmark step alignment to `#github-projects`.
- [x] **M5 Verification Gate & Post-Audit Remediation**: React hydration #418/#423 resolution on `/spaceedu`, Earth PNG converted to 144KB WebP (97.3% payload savings), Firefox speech compatibility guidance.
- [x] **M6 CyberBot 2.0 Elevation & Navigation Streamlining**:
  - [x] Removed redundant `CyberBot 3D` navbar tab from desktop and mobile nav.
  - [x] Expanded knowledge corpus to 18 technical domains with n-gram tokenization and Levenshtein fuzzy distance ($\ge 0.75$).
  - [x] Built dynamic 3D visor eye state machine (`idle`, `listening`, `speaking`, `dancing`, `happy`) with emerald waveform bars and rotational inertia damping.
  - [x] Built contextual scroll spy wired to `SECTION_CONTEXT_CHIPS`.
  - [x] Built 3-step candidate qualification wizard in `CyberBotQuickDial.tsx`.
- [x] **M7 Strategic Feature Wave & Vision Integration**:
  - [x] In-Browser 2D Vector Embedding & Cosine Similarity Sandbox (`lib/vector-math.ts` & `components/lab/VectorEmbeddingSandbox.tsx`).
  - [x] Recruiter ATS Role Lens & Skill Tailoring Chips on `/resume` (`lib/resume-roles.ts` & `components/resume/RoleHighlighter.tsx`).
  - [x] Interactive Architecture Diagram Zoom (75%–150%), Reset, and Fullscreen Modal Expansion (`components/case-study/ArchitectureDiagram.tsx`).
  - [x] Stale-while-revalidate PWA offline cache (`public/sw.js` & `components/PwaRegister.tsx`).
  - [x] Battery-aware WebGL frameloop auto-throttle via `navigator.getBattery()` (`components/3d/AICoreScene.tsx`).
  - [x] Live webcam canvas mirroring with contrast veil in FitTrack kinematics demo (`components/lab/FitTrackDemo.tsx`).
  - [x] Dedicated 1200x630 vector OpenGraph social sharing cards for all 5 flagship case studies (`public/images/og/` & `app/work/[slug]/page.tsx`).
  - [x] Expanded automated test suite to 103 passing tests (0 failures).

## Long-Term Maintenance & External Infrastructure
- [ ] **Cloudflare Production KV**: Bind active `RATE_LIMIT` KV namespace in Cloudflare dashboard (`wrangler kv:namespace create RATE_LIMIT`).
- [ ] **Production Email Token**: Add `RESEND_API_KEY` environment secret in Cloudflare Pages dashboard for live recruiter contact forwarding.
- [ ] **FitTrack MediaPipe Web Worker**: Future upgrade from mathematical kinematic simulation to background worker camera pose estimation.
