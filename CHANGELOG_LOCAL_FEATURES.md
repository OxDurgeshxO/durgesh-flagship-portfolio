# 📋 Local Portfolio Changes Manifest & Rollback Guide

> **Created:** 2026-09-10  
> **Target Directory:** `C:\Users\Durgesh\.gemini\antigravity-ide\scratch\durgesh-flagship-portfolio`  
> **Baseline Git Commit:** `60df205` (`feat: hide portfolio repo from Top 5 + add Footer View Source & Live Site links`)  
> **Scope:** Strictly Local Testing (`http://localhost:3000`). No remote commits or pushes have been made.

---

## 📑 Summary of Changes by Component & Feature

### 1. 📄 Resume CTA Disabled & Marked as Upcoming Feature
* **Files Modified:**
  * `components/sections/HeroSection.tsx` (Converted to disabled glass button with `✨ Upcoming` badge & floating tooltip)
  * `app/page.tsx` (SSR loading skeleton updated with `Upcoming` badge)
  * `components/CommandPalette.tsx` (Marked action as `Resume Viewer [Upcoming Feature]`)
* **What Changed:**
  * The Resume button is now gracefully disabled with a glowing `✨ Upcoming` badge matching the Theme Toggle styling.
  * Hovering or clicking triggers an animated floating tooltip: *"Interactive 3D Resume Viewer & live ATS matrix coming in v2.0!"*.
* **Asset Kept in Reserve:**
  * The authentic 534 KB verified resume remains securely in `public/resume.pdf` for when you choose to activate it.
* **How to Check:**
  * Open `http://localhost:3000`, look at the Hero CTA: notice `Resume [✨ Upcoming]` button and hover over it.
* **How to Undo / Re-enable Direct Download:**
  * In `HeroSection.tsx`, change `<button>` back to `<a href="/resume.pdf" target="_blank">`.

---

### 2. ⌨️ Futuristic Command Palette HUD (`Ctrl + K` / `Cmd + K`)
* **Files Added / Modified:**
  * `components/CommandPalette.tsx` *(NEW)*
  * `components/PortfolioShell.tsx` *(MODIFIED - mounted `<CommandPalette />`)*
  * `components/sections/Navbar.tsx` *(MODIFIED - added "Search ⌘K" button)*
* **What Changed:**
  * Pressing `Ctrl + K` (or `Cmd + K`) or clicking "Search ⌘K" in the navbar opens a Raycast-style spotlight search modal.
  * Allows searching sections, launching case studies, copying direct email, visiting GitHub/LinkedIn, downloading resume, and toggling audio mute.
* **How to Check:**
  * Open `http://localhost:3000` and press `Ctrl + K` or click the search button in the top navbar.
* **How to Undo:**
  * Run:
    ```powershell
    Remove-Item components/CommandPalette.tsx
    git checkout HEAD -- components/PortfolioShell.tsx components/sections/Navbar.tsx
    ```

---

### 3. 🏷️ Interactive Project Category Filter Tabs
* **File Modified:**
  * `components/sections/FeaturedProjectsSection.tsx`
* **What Changed:**
  * Added animated category filter pills: `✨ All Platforms`, `Full Stack AI`, `Computer Vision`, `Machine Learning`.
  * Cards dynamically filter with fluid Framer Motion `layout` animations.
* **How to Check:**
  * Scroll to `#projects` on `http://localhost:3000` and click between category tabs.
* **How to Undo:**
  * Run: `git checkout HEAD -- components/sections/FeaturedProjectsSection.tsx`

---

### 4. 🔊 CyberBot Audio Mute/Unmute Controller
* **File Modified:**
  * `components/companion/RoamingCompanion3D.tsx`
* **What Changed:**
  * Added `isMuted` state with `localStorage ('cyberbot_muted')` persistence.
  * Added an audio toggle button (`🔊` / `🔇`) directly into CyberBot's companion pill.
  * Audio synthesis immediately short-circuits when muted.
* **How to Check:**
  * Look at the floating companion pill at bottom right and click the sound icon.
* **How to Undo:**
  * Run: `git checkout HEAD -- components/companion/RoamingCompanion3D.tsx`

---

### 5. 📋 Contact Form "Copy Draft to Clipboard" Backup
* **File Modified:**
  * `components/sections/ContactSection.tsx`
* **What Changed:**
  * Added a dedicated **"📋 Copy Draft to Clipboard"** button with a 2-second visual checkmark (`✓ Draft Copied!`).
  * Formatted headers (`To:`, `Subject:`, `From:`, `Message:`) for instant pasting into webmail.
* **How to Check:**
  * Scroll to `#contact`, fill out fields, and click "Copy Draft to Clipboard".
* **How to Undo:**
  * Run: `git checkout HEAD -- components/sections/ContactSection.tsx`

---

### 6. 🧭 Navbar Scroll Spy
* **File Modified:**
  * `components/sections/Navbar.tsx`
* **What Changed:**
  * Real-time scroll observer tracks active section (`about`, `experience`, `education`, `projects`, `contact`) and illuminates the active navbar link with a glowing violet/rose pill.
* **How to Undo:**
  * Included in `Navbar.tsx` rollback: `git checkout HEAD -- components/sections/Navbar.tsx`.

---

### 7. 🎨 Palette Harmonization (100% Elimination of Legacy Cyan)
* **Files Modified:**
  * `components/sections/HeroSection.tsx` (CTA gradients & resume badge)
  * `components/sections/AboutSection.tsx` (Opportunities badge, divider line, email CTA)
  * `components/sections/EducationSection.tsx` (ambient orbs, BCA card, divider line, institution text)
  * `components/sections/ExperienceSection.tsx` & `lib/data.ts` (UNLOX role accent `#f43f5e`, divider line)
  * `components/sections/FeaturedProjectsSection.tsx` (FitTrack accent `#fb7185`, flagship badge, live demo buttons)
  * `components/sections/ProjectsSection.tsx` (rank badges, live demo button)
  * `components/sections/ContactSection.tsx` (availability pill, input focus rings, send CTA)
  * `components/sections/Footer.tsx` (tech stack & social links)
  * `components/companion/SpeechBubble.tsx` ("Next Insight" pill)
  * `app/page.tsx` (SSR loading skeleton)
* **What Changed:**
  * ~30 instances of legacy cyan (`#00d4ff`, `text-cyan-300`, `border-cyan-500`) were harmonized into **Sunset Violet (`#a855f7`)** and **Rose Quartz (`#f43f5e` / `#fb7185`)**.
* **How to Check:**
  * Run: `git grep -i "text-cyan" components/ app/` → returns 0 results.
* **How to Undo:**
  * Restore specific component with `git checkout HEAD -- <filepath>`.

---

### 8. 🌐 3D AI Neural Core Cursor Tracking Fix
* **File Modified:**
  * `components/3d/AICoreScene.tsx`
* **What Changed:**
  * Replaced element-level event handling on `pointer-events-none` container with window-level `pointermove` listener inside `useEffect`.
* **How to Undo:**
  * Run: `git checkout HEAD -- components/3d/AICoreScene.tsx`

---

### 9. 🧪 Automated Test Suite & Screenshot Scripts
* **Files Added:**
  * `scripts/test-portfolio.mjs` (42-check comprehensive automated test runner)
  * `scripts/capture-live-screenshot.mjs` (Chrome CDP screenshot capture)
  * `scripts/capture-palette-screenshot.mjs` (Command Palette screenshot capture)
  * `scripts/capture-projects-screenshot.mjs` (Projects filter screenshot capture)
* **How to Run Tests Again:**
  * Run: `node scripts/test-portfolio.mjs` (all 42 automated tests pass).

---

### 10. 🛡️ Security Vulnerabilities Elimination & Safe Dependency Overrides
* **Files Modified:**
  * `package.json` & `package-lock.json`
* **What Changed:**
  * Added non-breaking `overrides` for `undici@^6.28.1`, `cookie@^0.7.2`, `ws@^8.21.3`, `glob@^10.5.0`, `esbuild@^0.25.0`, and updated `postcss@^8.5.28`.
  * Reduced dependency vulnerabilities from 11 down to 2 (transitive Next 14 core bundle).
  * Safely preserved React 18 / Next 14 runtime stability without breaking `@react-three/fiber`.

---

### 11. 🧹 Memory Leak Prevention & Event-Driven Architecture
* **Files Modified:**
  * `components/sections/HeroSection.tsx` (Added `resumeTimerRef` and cleanup on unmount)
  * `components/ThemeToggle.tsx` (Added `timerRef` and cleanup on unmount)
  * `components/CommandPalette.tsx` (Replaced `window.alert()` with in-app toast notification; replaced `location.reload()` with reactive `cyberbot-mute-toggle` custom event)
  * `components/companion/RoamingCompanion3D.tsx` (Listens to `cyberbot-mute-toggle` for instantaneous zero-reload audio state change)

---

### 12. 🎨 LoadingScreen & Tailwind Theme Polish
* **Files Modified:**
  * `components/LoadingScreen.tsx` (Purged `#00d4ff` and `#6c63ff` -> harmonized to Sunset Violet & Rose Quartz)
  * `tailwind.config.ts` (Purged `#00d4ff44` from `pulseGlow` keyframes)
  * `styles/globals.css` (Removed unused legacy `.glow-cyan` class)
  * `components/3d/CardTilt3D.tsx` (Set default accent color to `#a855f7`)

---

## ⏪ Master Rollback Recipes

### Recipe A: Undo Only Phase 3 Flagship Features (Keep Core Fixes & Palette)
To remove only the Command Palette and Category Filters while keeping the resume and color fixes:
```powershell
Remove-Item components/CommandPalette.tsx
git checkout HEAD -- components/PortfolioShell.tsx components/sections/Navbar.tsx components/sections/FeaturedProjectsSection.tsx
npm run build
```

### Recipe B: Complete Revert of ALL Changes to Baseline Commit (`60df205`)
To wipe all modifications and untracked test scripts and return to the exact commit `60df205`:
```powershell
# Discard all modifications in tracked files
git checkout HEAD -- .

# Remove untracked files added in this session
Remove-Item components/CommandPalette.tsx -ErrorAction SilentlyContinue
Remove-Item scripts/ -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item public/live-*.png -ErrorAction SilentlyContinue
Remove-Item public/test-screenshot.png -ErrorAction SilentlyContinue
Remove-Item CHANGELOG_LOCAL_FEATURES.md -ErrorAction SilentlyContinue

# Rebuild
npm run build
```

