# Project Engineering Rules

## 1. Zero Regressions & Verification First
- Every modification must pass `npm test`, `npm run typecheck`, `npm run check:links`, and `npm run build`.
- No broken links or 404 routes.

## 2. Accessibility & Performance Budgets
- WCAG AA compliance across all components (minimum 4.5:1 text contrast).
- All interactive elements must support keyboard navigation (`Tab`, `Escape`, `Enter`).
- Honor `prefers-reduced-motion` across all 3D canvas animations and transitions.
- LCP budget < 1.2s; zero cumulative layout shift (CLS = 0).

## 3. WebGL & Memory Hygiene
- Dispose Three.js geometries, materials, and textures on component unmount.
- Guard against WebGL context loss gracefully.
- No memory leaks during Next.js client-side page transitions.

## 4. Content Authenticity & Security
- No fabricated claims, ratings, or unverified badges.
- Strict input validation and sanitization on all edge function endpoints.
- Zero secrets or private API keys in client-side bundles.

