# Local Portfolio Features & Evolution History

> **Baseline Git Commit:** `60df205` (`feat: hide portfolio repo from Top 5 + add Footer View Source & Live Site links`)  
> **Scope:** Local Development and Validation across core architectural iterations.

---

## Summary of Evolutionary Features by Component

### 1. Futuristic Command Palette HUD (`Ctrl + K` / `Cmd + K`)
* **Components:** `components/CommandPalette.tsx`, `components/PortfolioShell.tsx`, `components/sections/Navbar.tsx`
* **Features:**
  * Raycast-style spotlight search modal accessible via `Ctrl + K` / `Cmd + K` or Navbar quick action.
  * Search across application routes, flagship case studies, technical summaries, GitHub, and live controls.

---

### 2. Interactive Project Category Filter Tabs
* **Component:** `components/sections/FeaturedProjectsSection.tsx`
* **Features:**
  * Animated category filter pills: `All Platforms`, `Full Stack AI`, `Computer Vision`, `Machine Learning`.
  * Projects dynamically filter with fluid Framer Motion layout transitions.

---

### 3. CyberBot Audio Mute/Unmute Controller
* **Component:** `components/companion/RoamingCompanion3D.tsx`
* **Features:**
  * Client-persisted audio mute toggle (`cyberbot_muted`).
  * Sound synthesis suppresses gracefully when muted or when user prefers reduced noise.

---

### 4. Contact Form "Copy Draft to Clipboard" Backup
* **Component:** `components/sections/ContactSection.tsx`
* **Features:**
  * Secondary clipboard backup button enabling one-click copying of formatted messages if email clients fail.

---

### 5. Navbar Real-Time Scroll Spy
* **Component:** `components/sections/Navbar.tsx`
* **Features:**
  * Scroll observer dynamically tracking active view sections (`#about`, `#experience`, `#education`, `#projects`, `#contact`) and applying high-contrast active state indicators.

---

### 6. Design System & Palette Harmonization
* **Harmonization:** Standardized on Sunset Violet (`#a855f7`) and Rose Quartz (`#f43f5e` / `#fb7185`) across cards, badges, gradients, and canvas lighting.

---

### 7. 3D Neural Core Cursor Tracking Optimization
* **Component:** `components/3d/AICoreScene.tsx`
* **Features:**
  * Decoupled window-level pointer event listeners inside client hooks to avoid blocking DOM rendering.

---

### 8. Memory Leak Prevention & Event-Driven Architecture
* **Components:** `components/sections/HeroSection.tsx`, `components/ThemeToggle.tsx`, `components/CommandPalette.tsx`
* **Features:**
  * Implemented explicit timer ref cancellations on component unmount and decoupled reactive custom events for cross-component state updates.
